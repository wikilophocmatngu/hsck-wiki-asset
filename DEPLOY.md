# Deploy lên hsck.lophocmatngu.wiki

Mỗi tệp trong `wiki/` ứng với một trang wiki: bỏ phần mở rộng `.wikitext`/`.lua`/`.json`, đổi `_` thành dấu cách, thư mục là không gian tên (`Bản_mẫu/` → `Bản mẫu:`, `Mô_đun/` → `Mô đun:`). Làm theo đúng thứ tự dưới đây, vì trang sau dùng trang trước.

Kiểm tra trước khi đăng (đã chạy ở commit hiện tại, đều đạt):

```sh
python3 -I tools/test-infobox.py .            # hàm Lua, Yesno, hai mô đun hộp
DEMO_FILES=1 python3 -I tools/build.py . out  # mọi TemplateStyles qua bộ lọc, mọi trang dựng được
```

## 0. ManageWiki

Đã bật sẵn trên wiki: Scribunto, Bucket, TabberNeue, TemplateStyles, ParserFunctions, InputBox, UserProfileV2, Gadgets, MobileFrontend.

- Skin mặc định: `vector` (Vector 2010); di động: `minerva`.
- Giữ `$wgMFCustomSiteModules = false` để `Common.css` vẫn nạp trên di động.
- **Không** bật Extension:DarkMode: nó đảo màu cả trang, vải xanh thành cam. Vector đã có chế độ tối theo hệ điều hành.
- Logo: `$wgLogos` với `1x`/`2x` (135×135, 270×270) cho Vector và `wordmark` (`width` 89, `height` 48) cho Minerva.
- Chân trang: PR miraheze/mw-config#6600.

## 1. Tệp ảnh (Đặc biệt:Tải lên)

| Tệp | Dùng ở | Bắt buộc? |
|---|---|---|
| `RankIcon-<nhóm>.svg` × 12 (`wiki/Tập_tin/`) | biểu tượng nhóm quyền trên trang hồ sơ | có, hoặc thay bằng PNG rồi sửa tên trong bước 6 |
| logo `1x`, `2x`, `wordmark` | `$wgLogos` | có |
| `Đầu_trang.webp` | ảnh dải đầu trang (`Vector.css`, `Minerva.css`) | không: thiếu thì dải đầu trang chỉ có nền xanh |
| `Ô <chủ đề>.webp` × 6, `Khoảnh khắc <1–3>.webp`, `Chân dung <tên>.webp` × 14 | Trang Chính | thiếu thì Trang Chính hiện liên kết tệp màu đỏ |

## 2. Bucket (cần quyền sửa không gian Bucket)

1. `Bucket:Characters` ← `wiki/Bucket/Characters.json`
2. `Bucket:Volumes` ← `wiki/Bucket/Volumes.json`

## 3. Mô đun

1. `Mô đun:Arguments`
2. `Mô đun:Yesno`
3. `Mô đun:Infobox`
4. `Mô đun:Infobox/styles.css` (wiki tự nhận mô hình *sanitized-css* cho trang `…/styles.css`)
5. `Mô đun:Nhân vật`
6. `Mô đun:Tập truyện`

## 4. Bản mẫu

Đăng trang `styles.css` **trước** bản mẫu dùng nó.

1. `Bản mẫu:Trang Chính/styles.css`, `Bản mẫu:Tiết lộ/styles.css`, `Bản mẫu:Thoại/styles.css`, `Bản mẫu:Hộp điều hướng/styles.css`, `Bản mẫu:Xem thêm/styles.css`
2. `Bản mẫu:Ảnh thẻ`, `Bản mẫu:Ô chủ đề`, `Bản mẫu:Tiết lộ`, `Bản mẫu:Hộp thông báo`, `Bản mẫu:Thoại`, `Bản mẫu:Xem thêm`, `Bản mẫu:Hộp điều hướng`, `Bản mẫu:InfoboxGallery`, `Bản mẫu:Nhân vật`, `Bản mẫu:Tập truyện`

## 5. Giao diện (cần quyền interface-admin)

1. `MediaWiki:Common.css`
2. `MediaWiki:Vector.css`
3. `MediaWiki:Minerva.css`
4. `MediaWiki:Sidebar`

CSS mới có thể mất vài phút mới hiện (cache ResourceLoader).

## 6. Gadget và biểu tượng nhóm quyền

1. `MediaWiki:Gadget-RankIcons.js`, `MediaWiki:Gadget-MinervaMenu.js`, `MediaWiki:Gadget-OOUIDemo.js`, `MediaWiki:Gadget-OOUIDemo/core.js`
2. `MediaWiki:Gadgets-definition`
3. `MediaWiki:RankIcon-<nhóm>` × 12

## 7. Trang Chính và trang đích

1. `Trang Chính` ← `wiki/Trang_Chính.wikitext` (thay trang mặc định đang có)
2. Các trang Trang Chính và menu trỏ tới (chưa có, cần viết nội dung): `Project:Viết bài đầu tiên`, `Project:Ban cán sự`, `Project:Có thể bạn chưa biết`, `Truyền thuyết Tập 26`, `Tập 1` … `Tập 25`, các trang thể loại `Nhân vật`, `Học sinh`, `Giáo viên`, `Tập truyện`, `Địa điểm`, `Bài sơ khai`, `Bài cần ảnh`, `Bài cần nguồn`, `Trang lưu Bucket bị lỗi`.

## 8. Kiểm tra sau khi đăng

- `Trang_Chính?useskin=vector` và `?useskin=minerva`, đổi hệ điều hành sang tối.
- `Thành_viên:Pisces?useskin=minerva`: biểu tượng nhóm quyền hiện, logo Miraheze trên nhóm toàn cục.
- Mở menu trượt trên Minerva: có hai nhóm Nhân vật… và Viết bài đầu tiên…
- `WHSCK:OOUI_demo?useskin=vector` và `?useskin=minerva`, sáng và tối: nút "Chính · Nguy hiểm" đỏ đậm chữ trắng, trang không cuộn ngang trên điện thoại.
- Tạo thử một bài có `{{Nhân vật}}`, rồi xem trang `Bucket:Characters` có dòng mới không. Bài vào `Thể loại:Trang lưu Bucket bị lỗi` nghĩa là lưu không được.
