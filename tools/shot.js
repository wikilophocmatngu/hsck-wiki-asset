// Chụp ảnh demo: nạp skin thật của wiki, thay nội dung bằng trang đã dựng và CSS trong repo.
// Ảnh chưa tải lên wiki lấy từ <imgdir> theo tên tệp (kể cả logo HSCK-logo-1x.png, HSCK-wordmark.png).
// Usage: NODE_PATH=$(npm root -g) node shot.js <outdir> [imgdir] ; ONLY=trang-chinh-vector-day,... để chụp một phần
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const [out, imgdir] = process.argv.slice(2);
const css = JSON.parse(fs.readFileSync(path.join(out, 'css.json'), 'utf8'));
const mime = f => f.endsWith('.png') ? 'image/png' : 'image/webp';
const imgs = !imgdir ? {} : Object.fromEntries(fs.readdirSync(imgdir).map(f => [f.normalize('NFC'), `data:${mime(f)};base64,` + fs.readFileSync(path.join(imgdir, f)).toString('base64')]));
const fixUrls = s => s.replace(/url\("[^"]*Special:Redirect\/file\/([^"]*)"\)/g, (m, n) => { const k = decodeURIComponent(n).replace(/_/g, ' ').normalize('NFC'); return imgs[k] ? `url("${imgs[k]}")` : m; });
const shots = [
  ['trang-chinh', 'Trang_Chính', 'vector', 'day', 1440],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'vector', 'day', 1440],
  ['trang-chinh', 'Trang_Chính', 'minerva', 'day', 390],
  ['trang-chinh', 'Trang_Chính', 'minerva', 'night', 390],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'day', 390],
  ['nhan-vat-mau', 'Nhân_vật_mẫu', 'minerva', 'night', 390],
  ['tap-7', 'Tập_7', 'vector', 'day', 1440],
  ['tap-7', 'Tập_7', 'minerva', 'night', 390],
];
(async () => {
  const browser = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } });
  for (const [key, page, skin, theme, width] of shots) {
    if (process.env.ONLY && !process.env.ONLY.split(',').includes(`${key}-${skin}-${theme}`)) continue;
    const data = JSON.parse(fs.readFileSync(path.join(out, key + '.json'), 'utf8'));
    const ctx = await browser.newContext({ userAgent: process.env.MIRAHEZE_UA, viewport: { width, height: 900 } });
    const p = await ctx.newPage();
    await p.goto('https://hsck.lophocmatngu.wiki/wiki/' + encodeURIComponent(page) + '?useskin=' + skin, { waitUntil: 'networkidle' });
    await p.evaluate(({ data, styles, theme, imgs }) => {
      const h = document.documentElement;
      h.className = h.className.replace(/skin-theme-clientpref-\w+/g, '') + ' skin-theme-clientpref-' + theme;
      const heading = document.querySelector('#firstHeading'); if (heading) heading.textContent = data.title;
      const content = document.querySelector('#mw-content-text'); content.innerHTML = data.html;
      // Ảnh chưa tải lên wiki: thay bằng ảnh cục bộ cùng tên
      content.querySelectorAll('.mw-broken-media').forEach(s => {
        const a = s.closest('a'); const name = ((a && a.title) || s.textContent).replace(/^[^:]*:/, '').normalize('NFC');
        if (!imgs[name]) return;
        const img = document.createElement('img'); img.src = imgs[name]; img.className = 'mw-file-element'; img.alt = '';
        if (s.dataset.width) img.width = +s.dataset.width;
        s.replaceWith(img);
      });
      if (document.body.classList.contains('skin-minerva')) content.querySelectorAll('.mw-editsection, .navbox').forEach(e => e.remove()); // như MobileFrontend
      // Hộp thể loại theo kết quả parse
      const cl = document.querySelector('#catlinks');
      data.cats = data.cats.filter(c => !c.includes('không_tồn_tại'));
      if (cl && data.cats.length) {
        cl.className = 'catlinks';
        cl.innerHTML = '<div id="mw-normal-catlinks" class="mw-normal-catlinks"><a href="#">Thể loại</a>: <ul>' + data.cats.map(c => `<li><a href="#">${c.replace(/_/g, ' ')}</a></li>`).join('') + '</ul></div>';
      }
      // Logo HSCK
      const logo = document.querySelector('.mw-wiki-logo');
      if (logo && imgs['HSCK-logo-1x.png']) logo.style.backgroundImage = `url(${imgs['HSCK-logo-1x.png']})`;
      const bb = document.querySelector('.branding-box a');
      if (bb && imgs['HSCK-wordmark.png']) bb.innerHTML = `<img src="${imgs['HSCK-wordmark.png']}" width="89" height="48" alt="Wiki Học Sinh Chân Kinh" style="display:block">`;
      const s = document.createElement('style'); s.textContent = styles; document.head.appendChild(s);
      if (window.mw && data.modulestyles) mw.loader.load(data.modulestyles);
      if (window.mw) mw.loader.using('jquery.makeCollapsible').then(() => $(content).find('.mw-collapsible').makeCollapsible());
    }, { data, styles: fixUrls(css.common + '\n' + css[skin]), theme, imgs });
    await p.getByRole('button', { name: 'OK' }).click().catch(() => {});
    await p.waitForTimeout(2500);
    const file = path.join(out, `${key}-${skin}-${theme}.png`);
    await p.screenshot({ path: file, fullPage: true });
    console.log(file);
    await ctx.close();
  }
  await browser.close();
})();
