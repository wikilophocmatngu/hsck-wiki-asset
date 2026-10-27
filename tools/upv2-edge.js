// Thử các trường hợp biên của masthead UserProfileV2: dựng 7 hồ sơ theo đúng HTML của extension,
// chạy logic gadget RankIcons (parse qua API thật), chụp trên nhiều bề rộng và chế độ màu.
// NODE_PATH=$(npm root -g) node upv2-edge.js <repo> <outdir> [draft.css thay khối hồ sơ trong Common.css]   (upv2-markup.json: HTML mạng xã hội, bút chì, nút Sửa lấy từ mã nguồn UserProfileV2)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [repo, out, draft] = process.argv.slice(2);
const common = fs.readFileSync(path.join(repo, 'wiki/MediaWiki/Common.css'), 'utf8');
const a = common.indexOf('/* ===== Trang thành viên (UserProfileV2)'), b = common.indexOf('/* ===== Thành phần gốc');
const css = (draft ? common.slice(0, a) + fs.readFileSync(draft, 'utf8') + '\n' + common.slice(b) : common) + '\n.edge-label{margin:2rem 0 .5rem;font:700 .8rem/1.2 sans-serif;color:#888;text-transform:uppercase;letter-spacing:.08em}';
const skinCss = s => fs.readFileSync(path.join(repo, 'wiki/MediaWiki', s === 'vector' ? 'Vector.css' : 'Minerva.css'), 'utf8');
const dir = path.join(repo, 'wiki/MediaWiki'), fdir = path.join(repo, 'wiki/Tập_tin');
const icons = Object.fromEntries(fs.readdirSync(dir).filter(f => f.startsWith('RankIcon-')).map(f => [f.slice(9, -9), fs.readFileSync(path.join(dir, f), 'utf8')]));
const files = Object.fromEntries(fs.readdirSync(fdir).filter(f => f.startsWith('RankIcon-')).map(f => [f.slice(9, -4), 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(fdir, f)).toString('base64')]));
const mk = JSON.parse(fs.readFileSync(path.join(__dirname, 'upv2-markup.json'), 'utf8'));
// Ảnh thử (tùy chọn, không có trong repo): DEFAULT_AVATAR = resources/avatars/default.png của UserProfileV2, WIDE_AVATAR = một ảnh ngang bất kỳ
const PISCES = '//static.wikitide.net/hsckwiki/upv2avatars/avatar_3.jpg';
const img = f => f && fs.existsSync(f) ? 'data:image/' + (f.endsWith('png') ? 'png' : 'webp') + ';base64,' + fs.readFileSync(f).toString('base64') : PISCES;
const AV = { pisces: PISCES, def: img(process.env.DEFAULT_AVATAR), wide: img(process.env.WIDE_AVATAR) };
const LABEL = { bureaucrat: 'Hành chính viên', 'interface-admin': 'Bảo quản viên giao diện', sysop: 'Bảo quản viên', autoconfirmed: 'Thành viên tự động xác nhận',
  steward: 'Tiếp viên', 'global-admin': 'Bảo quản viên toàn cục', trustandsafety: 'Thành viên Tin cậy và An toàn', techteam: 'Thành viên Nhóm Công Nghệ',
  'wiki-mechanic': 'Kĩ thuật viên', 'global-patroller': 'Tuần tra viên toàn cục', 'global-ipblock-exempt': 'Người được miễn cấm IP toàn cục',
  'assistant-steward': 'Trợ lý tiếp viên', 'global-interwiki-admin': 'Bảo quản viên liên wiki toàn cục', founder: '⧼group-founder-member⧽', checkuser: 'Kiểm định viên', suppress: 'Giám sát viên' };
const discordLong = mk.discord.replace('username="pisces.hsck"', 'username="averyveryverylongdiscordusername_with_numbers_1234567890"');
const V = [
  { id: 'A. Chủ hồ sơ, đủ mọi phần', name: 'Pisces', av: AV.pisces, groups: ['bureaucrat', 'interface-admin', 'sysop'], owner: true, stats: ['0 Sửa đổi'], social: mk.twitter + mk.mastodon + mk.discord, about: 'Dựng lớp Học Sinh Chân Kinh. Thích nhất Tập 7.' },
  { id: 'B. Thành viên mới: ảnh mặc định, không nhóm, không giới thiệu', name: 'Ban Moi', av: AV.def, groups: [], stats: ['0 Sửa đổi'] },
  { id: 'C. Tên rất dài không dấu cách, có tên thật, giới thiệu 200 ký tự có đường dẫn', name: 'PiscesHocSinhChanKinhFanCungTuTap1DenTap25KhongCoDauCach', realname: 'aka Nguyễn Văn Song Ngư Thích Đọc Truyện Tranh', av: AV.pisces, groups: ['autoconfirmed'], stats: ['1.234 Sửa đổi'], about: 'Đọc từ Tập 1. Danh sách tập yêu thích: https://hsck.lophocmatngu.wiki/wiki/Thành_viên:PiscesHocSinhChanKinh/Danh_sách_tập_yêu_thích_từ_Tập_1_đến_Tập_25' },
  { id: 'D. Nhóm toàn cục (tiếp viên Miraheze) + sửa đổi toàn cục', name: 'Steward Miraheze', av: AV.def, groups: ['sysop', 'bureaucrat', 'steward', 'global-admin', 'trustandsafety', 'techteam', 'wiki-mechanic', 'global-patroller', 'global-ipblock-exempt', 'assistant-steward', 'global-interwiki-admin'], stats: ['56 Sửa đổi', '123.456 Sửa đổi toàn cục'], social: mk.discord },
  { id: 'E. Nhóm thiếu tên hiển thị và nhóm chưa có biểu tượng', name: 'Kiem Dinh', av: AV.pisces, groups: ['founder', 'checkuser', 'suppress'], stats: ['7 Sửa đổi'] },
  { id: 'F. Ảnh ngang (không đúng 3×4) + tên Discord rất dài', name: 'Anh Ngang', av: AV.wide, groups: ['sysop'], stats: ['42 Sửa đổi'], social: mk.twitter + discordLong },
  { id: 'G. Tài khoản bị khoá toàn cục', name: 'Bi Khoa', av: AV.def, groups: [], stats: ['3 Sửa đổi'], social: mk.twitter, locked: true },
];
const html = v => '<p class="edge-label">' + v.id + '</p><div class="profile-masthead"><div class="profile-wrapper"><section class="profile-identitybox"><div class="profile-avatar"><img class="profile-avatar-image" src="' + v.av + '">' + (v.owner ? mk.pencil : '') +
  '</div><div class="profile-information"><div class="profile-header"><div class="profile-header-attributes"><h1>' + v.name + '</h1>' + (v.realname ? '<h2>' + v.realname + '</h2>' : '') +
  v.groups.map(g => '<span class="profile-user-group" data-group="' + g + '">' + LABEL[g] + '</span>').join('') + '</div><div class="profile-header-actions">' + (v.owner ? mk.edit : '') + '</div></div>' +
  '<ul class="profile-header-statistics">' + v.stats.map(s => '<li>' + s + '</li>').join('') + '</ul>' + (v.social ? '<div class="profile-externalLinks">' + v.social + '</div>' : '') +
  '<div class="profile-header-about">' + (v.about || '') + '</div></section></div></div>' +
  (v.locked ? '<div class="cdx-message cdx-message--block cdx-message--warning"><span class="cdx-message__icon"></span><div class="cdx-message__content">Tài khoản người dùng này đã bị khóa toàn cục.</div></div>' : '');
const SHOTS = [['vector', 'day', 1280], ['vector', 'day', 900], ['minerva', 'day', 390], ['minerva', 'night', 390], ['minerva', 'os', 390, 'dark'], ['minerva', 'day', 320], ['minerva', 'day', 768]];
(async () => {
  const br = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } });
  for (const [skin, theme, width, scheme] of SHOTS) {
    const c = await br.newContext({ userAgent: process.env.MIRAHEZE_UA, viewport: { width, height: 800 }, colorScheme: scheme || 'light' });
    const p = await c.newPage();
    await p.goto('https://hsck.lophocmatngu.wiki/wiki/Th%C3%A0nh_vi%C3%AAn:Pisces?useskin=' + skin, { waitUntil: 'networkidle' });
    await p.evaluate(({ css, theme, body, icons, files }) => {
      const h = document.documentElement;
      h.className = h.className.replace(/skin-theme-clientpref-\w+/g, '') + ' skin-theme-clientpref-' + theme;
      document.querySelectorAll('.mw-cookiewarning-container, .noarticletext').forEach(e => e.remove());
      const m = document.querySelector('.profile-masthead'); m.insertAdjacentHTML('beforebegin', '<div id="edge">' + body + '</div>'); m.remove();
      const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
      const cache = {};
      return mw.loader.using('mediawiki.api').then(() => Promise.all([...document.querySelectorAll('#edge .profile-user-group[data-group]')].map(el => {
        const g = el.dataset.group; if (!icons[g]) return null;   // nhóm chưa có trang MediaWiki:RankIcon-*: gadget giữ chữ
        cache[g] = cache[g] || new mw.Api().post({ action: 'parse', text: icons[g], contentmodel: 'wikitext', prop: 'text', disablelimitreport: true, formatversion: 2 });
        return cache[g].then(data => {
          const tmp = document.createElement('div'); tmp.innerHTML = data.parse.text;
          const block = tmp.querySelector('.mw-parser-output > p') || tmp.firstElementChild || tmp;
          const html = block.innerHTML.trim(); if (!html) return;
          el.title = el.textContent; el.innerHTML = html;
          el.querySelectorAll('.mw-broken-media').forEach(s => { const i = document.createElement('img'); i.src = files[g]; i.alt = s.textContent; i.width = 20; i.height = 20; s.replaceWith(i); });
        });
      })));
    }, { css: css + '\n' + skinCss(skin), theme, body: V.map(html).join(''), icons, files });
    await p.waitForTimeout(1500);
    const box = await (await p.$('#edge')).boundingBox();
    const file = `${out}/edge-${skin}-${theme}-${width}.png`;
    await p.screenshot({ fullPage: true, path: file, clip: { x: 0, y: Math.max(0, box.y - 10), width, height: box.height + 20 } });
    console.log(file, Math.round(box.height));
    await c.close();
  }
  await br.close();
})();
