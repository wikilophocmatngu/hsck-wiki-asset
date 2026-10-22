# hsck-wiki-asset

Giao diện và nội dung khởi tạo cho Wiki Học Sinh Chân Kinh (https://hsck.lophocmatngu.wiki, Miraheze, MW 1.46.2).
Đây là wiki tưởng niệm: bộ truyện đã ngưng ở Tập 25; Tập 26 chỉ là chuyện kể trong cộng đồng fan.
Skin: Vector 2010 (máy tính) và Minerva Neue (di động), tổ chức theo cách các wiki Weird Gloop vẫn làm
(không dùng GloopThemes, Less hay các tính năng riêng khác của họ vì Miraheze không có):

- `MediaWiki:Common.css`: dùng cho cả hai giao diện: `@import` phông Bricolage Grotesque (Google Fonts), một bộ biến màu duy nhất `--hs-*` (OKLCH, có giá trị tối), phông tiêu đề h1/h2, và khung hồ sơ thành viên "Học bạ" (UserProfileV2, nằm ngoài `.mw-parser-output` nên không dùng TemplateStyles được).
- `MediaWiki:Vector.css`: chỉ máy tính: dải đầu trang vải xanh, tab bìa hồ sơ, trang giấy kem, ruy băng đánh dấu trang, thanh bên, chân trang "bìa sau". Có chỗ chờ ảnh nền riêng.
- `MediaWiki:Minerva.css`: chỉ di động: giấy kem (chế độ sáng), header vải xanh, menu trượt giấy có lề đỏ, tiêu đề mục dạng tab, chân trang "bìa sau".
- CSS của từng bản mẫu nằm trong TemplateStyles (`Bản mẫu:X/styles.css`), lấy màu qua `var(--hs-*, dự phòng)`.
- Hộp điều hướng dùng class `navbox`, nên MobileFrontend tự gỡ nó trên di động.

## Bảng màu "Kỷ yếu" (token `--hs-*` trong `Common.css`)

| Token | Vai trò | Tương phản |
|---|---|---|
| `--hs-blue` / `--hs-spine` | vải bìa (header, chân trang, tiêu đề hộp), gáy bìa | chữ `--hs-chalk` 7.0:1 |
| `--hs-peach` | chữ ép trên bìa, gạch nhấn, ruy băng | trên `--hs-blue` 4.0:1, chỉ cho chữ lớn |
| `--hs-paper` / `--hs-paper-fixed` | giấy kem (đổi theo chế độ tối / luôn sáng) | — |
| `--hs-pen` | mực đỏ: con dấu, ô điểm, chữ ký | 5.6:1 trên giấy |
| `--hs-accent` | chữ nhấn, tiêu đề | 7.9:1 trên giấy |
| `--hs-ink-fixed` | chữ trên bề mặt luôn sáng | 8.1:1 trên cam |

## Ánh xạ file → trang wiki

| File | Trang wiki |
|---|---|
| `wiki/MediaWiki/Common.css` | `MediaWiki:Common.css` |
| `wiki/MediaWiki/Vector.css` | `MediaWiki:Vector.css` |
| `wiki/MediaWiki/Minerva.css` | `MediaWiki:Minerva.css` |
| `wiki/MediaWiki/Sidebar.wikitext` | `MediaWiki:Sidebar` |
| `wiki/Trang_Chính.wikitext` | `Trang Chính` (kiểu Kỷ yếu: bìa, Ảnh tập thể, 25 năm học, Lưu bút) |
| `wiki/Bucket/Characters.json`, `Volumes.json` | `Bucket:Characters`, `Bucket:Volumes`: lược đồ dữ liệu hộp thông tin |
| `wiki/Mô_đun/Infobox.lua` | `Mô đun:Infobox`: bộ dựng hộp (theo Weird Gloop, qua bản của Wiki 100 Bạn Gái) và `store()` lưu vào Bucket |
| `wiki/Mô_đun/Infobox/styles.css` | `Mô đun:Infobox/styles.css` (TemplateStyles của mọi hộp) |
| `wiki/Mô_đun/Infobox/Nhân_vật.lua`, `Tập_truyện.lua` | `Mô đun:Infobox/Nhân vật`, `Mô đun:Infobox/Tập truyện`: vẽ hộp, thêm thể loại, lưu Bucket |
| `wiki/Bản_mẫu/Hộp_nhân_vật.wikitext` | `Bản mẫu:Hộp nhân vật` (gọi mô đun) |
| `wiki/Bản_mẫu/Hộp_tập_truyện.wikitext` | `Bản mẫu:Hộp tập truyện` (gọi mô đun) |
| `wiki/Bản_mẫu/Hộp_thông_báo.wikitext` | `Bản mẫu:Hộp thông báo`: sơ khai, cần ảnh, cần nguồn (dùng CSS của Tiết lộ) |
| `wiki/Bản_mẫu/Xem_thêm.wikitext` + `Xem_thêm/styles.css` | `Bản mẫu:Xem thêm`: dòng dẫn sang bài liên quan |
| `wiki/Bản_mẫu/Ô_chủ_đề.wikitext` | `Bản mẫu:Ô chủ đề`: ô có ảnh trên Trang Chính |
| `wiki/Bản_mẫu/Trang_Chính/styles.css` | `Bản mẫu:Trang Chính/styles.css` (TemplateStyles) |
| `wiki/Bản_mẫu/Ảnh_thẻ.wikitext` | `Bản mẫu:Ảnh thẻ`: một ảnh trong "Ảnh tập thể" (chưa có ảnh thì hiện chữ cái đầu tên riêng) |
| `wiki/Bản_mẫu/Thoại.wikitext` + `Thoại/styles.css` | `Bản mẫu:Thoại`: bong bóng thoại kiểu truyện tranh |
| `wiki/Bản_mẫu/Tiết_lộ.wikitext` + `Tiết_lộ/styles.css` | `Bản mẫu:Tiết lộ`: cảnh báo tiết lộ có "con dấu" đỏ |
| `wiki/Bản_mẫu/Hộp_điều_hướng.wikitext` + `Hộp_điều_hướng/styles.css` | `Bản mẫu:Hộp điều hướng`: navbox (tối đa 6 nhóm) |

Thư mục khác: `drafts/` = ý tưởng đã demo nhưng chưa dùng (không đăng); `tools/` = công cụ dựng ảnh demo (`build.py` chạy thử cả mô đun Lua qua TemplateSandbox, `test-infobox.py` kiểm tra các hàm chuẩn hoá dữ liệu Bucket); `HANDOFF.md` = bối cảnh và việc còn dở.

Thứ tự đăng: trang `Bucket:*` → `Mô đun:Infobox` → các trang `styles.css` → `Mô đun:Infobox/*` → bản mẫu. Lưu trang `styles.css` **trước** các bản mẫu dùng nó. Trang `Bản mẫu:Hộp thông tin/styles.css` cũ không còn dùng. Các trang trong `demo/` chỉ là bài minh họa, không cần đăng.

Hộp thông tin tự lưu dữ liệu vào Bucket khi bài nằm trong không gian chính. Nếu lưu lỗi, hộp vẫn hiện bình thường và bài vào `Thể loại:Trang lưu Bucket bị lỗi`.

Sửa các trang `MediaWiki:*.css` cần quyền `interface-admin`. CSS mới có thể mất vài phút mới hiện (cache ResourceLoader).

## Việc cần làm trên ManageWiki

1. `Special:ManageWiki/settings` → *Styling*: `$wgDefaultSkin = vector` (Vector 2010) và skin di động = `minerva`.
2. Giữ `$wgMFCustomSiteModules = false` (mặc định), để `Common.css` vẫn nạp trên di động.
3. Tạo các trang Trang Chính đang trỏ tới: `Project:Viết bài đầu tiên` (hướng dẫn ngắn có hình), `Project:Ban cán sự`, `Truyền thuyết Tập 26` (ghi rõ ngay đầu là chuyện kể của fan, không phải tập đã phát hành), `Tập 1` … `Tập 25`.
4. Tạo các trang thể loại: `Nhân vật`, `Học sinh`, `Giáo viên`, `Tập truyện`, `Địa điểm`, `Bản mẫu hộp thông tin`, `Bản mẫu điều hướng`, `Bản mẫu định dạng`, `Bản mẫu thông báo`, `Bản mẫu trang chính`.
5. Logo: tải lên `HSCK-logo-1x.png` (135×135), `HSCK-logo-2x.png` (270×270) và `HSCK-wordmark.png` (178×96), rồi đặt `$wgLogos` với `1x`, `2x` cho Vector 2010 và `wordmark` (`width` 89, `height` 48) cho Minerva. Logo được tách từ bìa Tập 25 bằng Canva (bản thử đầu dùng `tools/cut-logo.py`). `Minerva.css` đã tắt việc đảo màu logo ở chế độ tối.
6. (Tùy chọn) Đổi tên không gian `Project` (`$wgMetaNamespace`), ví dụ thành `Wiki Học Sinh Chân Kinh`. Sidebar và Trang Chính đang dùng tiền tố `Project:` nên vẫn chạy sau khi đổi.

## Kiểm tra

- `https://hsck.lophocmatngu.wiki/wiki/Trang_Chính?useskin=vector`
- `https://hsck.lophocmatngu.wiki/wiki/Trang_Chính?useskin=minerva`: đặt hệ điều hành sang chế độ tối (hoặc chọn chế độ tối trong tùy chọn giao diện của Minerva nếu wiki đã bật), rồi thu cửa sổ nhỏ hơn 640px.
