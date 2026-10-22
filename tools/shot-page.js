// Chụp một trang thật của wiki, chỉ chèn CSS mới (không thay nội dung). Usage: node shot-page.js <outdir> <Tên_trang> <tiền tố file>
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [out, page, prefix] = process.argv.slice(2);
const css = JSON.parse(fs.readFileSync(path.join(out, 'css.json'), 'utf8'));
(async () => {
  const b = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } });
  for (const [skin, theme, width] of [['vector', 'light', 1280], ['minerva', 'light', 390], ['minerva', 'night', 390]]) {
    const c = await b.newContext({ userAgent: process.env.MIRAHEZE_UA, viewport: { width, height: 900 } });
    const p = await c.newPage();
    await p.goto('https://hsck.lophocmatngu.wiki/wiki/' + encodeURIComponent(page) + '?useskin=' + skin, { waitUntil: 'networkidle' });
    await p.evaluate(({ s, theme }) => {
      const h = document.documentElement;
      h.className = h.className.replace(/skin-theme-clientpref-\w+/g, '') + ' skin-theme-clientpref-' + theme.replace('light', 'day');
      const st = document.createElement('style'); st.textContent = s; document.head.appendChild(st);
    }, { s: css.common + '\n' + css[skin], theme });
    await p.getByRole('button', { name: 'OK' }).click().catch(() => {});
    await p.waitForTimeout(2500);
    const f = path.join(out, `${prefix}-${skin}-${theme}.png`);
    await p.screenshot({ path: f, fullPage: true }); console.log(f);
    await c.close();
  }
  await b.close();
})();
