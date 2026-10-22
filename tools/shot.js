// Screenshot demo pages: load the real wiki skin, swap in rendered content + our CSS.
// Usage: node shot.js <outdir>
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const out = process.argv[2];
const css = JSON.parse(fs.readFileSync(path.join(out, 'css.json'), 'utf8'));
const BASE = 'https://hsck.lophocmatngu.wiki/wiki/';
// Demo: ảnh chưa tải lên wiki thì thay bằng data URL từ file cục bộ (DEMO_IMG=đường dẫn)
const demoImg = process.env.DEMO_IMG ? 'data:image/webp;base64,' + fs.readFileSync(process.env.DEMO_IMG).toString('base64') : null;

const keys = process.argv[3] ? process.argv[3].split(',') : null;
const shots = keys ? keys.flatMap(k => [[k, 'Trang_Chính', 'vector', 'light', 1280], [k, 'Trang_Chính', 'minerva', 'light', 390], [k, 'Trang_Chính', 'minerva', 'night', 390]]) : [
  ['trang-chinh', 'Trang_Chính', 'vector', 'light', 1280],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'vector', 'light', 1280],
  ['trang-chinh', 'Trang_Chính', 'minerva', 'light', 390],
  ['trang-chinh', 'Trang_Chính', 'minerva', 'night', 390],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'light', 390],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'night', 390],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'light', 390, 'menu'],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'night', 390, 'menu'],
];

(async () => {
  const browser = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } });
  for (const [key, page, skin, theme, width, menu] of shots) {
    if (process.env.ONLY_SKIN && skin !== process.env.ONLY_SKIN) continue;
    const data = JSON.parse(fs.readFileSync(path.join(out, key + '.json'), 'utf8'));
    const ctx = await browser.newContext({ userAgent: process.env.MIRAHEZE_UA, viewport: { width, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE + encodeURIComponent(page) + '?useskin=' + skin, { waitUntil: 'networkidle' });
    await p.evaluate(({ data, styles, theme }) => {
      const h = document.documentElement;
      h.className = h.className.replace(/skin-theme-clientpref-\w+/g, '') + ' skin-theme-clientpref-' + (theme === 'night' ? 'night' : 'day');
      const heading = document.querySelector('#firstHeading');
      if (heading) heading.textContent = data.title;
      const content = document.querySelector('#mw-content-text');
      content.innerHTML = data.html;
      const s = document.createElement('style');
      s.textContent = styles;
      document.head.appendChild(s);
      if (window.mw && data.modulestyles) mw.loader.load(data.modulestyles);
      if (window.mw) mw.loader.using('jquery.makeCollapsible').then(() => $(content).find('.mw-collapsible').makeCollapsible());
    }, { data, styles: (css.common + '\n' + css[skin]).replace(/url\("[^"]*Special:Redirect\/file\/[^"]*"\)/g, m => demoImg ? `url("${demoImg}")` : m), theme });
    await p.getByRole('button', { name: 'OK' }).click().catch(() => {}); // đóng thông báo cookie của Miraheze để chụp
    if (menu) await p.click('#main-menu-input');
    await p.waitForTimeout(2500);
    const file = path.join(out, `${key}-${skin}-${theme}${menu ? '-menu' : ''}.png`);
    await p.screenshot({ path: file, fullPage: !menu });
    console.log(file);
    await ctx.close();
  }
  await browser.close();
})();
