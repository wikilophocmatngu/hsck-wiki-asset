# hsck-wiki-asset

Giao diện và nội dung khởi tạo cho **Wiki Học Sinh Chân Kinh** (https://hsck.lophocmatngu.wiki, Miraheze, MW 1.46.2).
Skin: **Vector 2010** (máy tính) + **Minerva Neue** (di động).

## Bảng màu (lấy từ bìa truyện)

| Tên | Mã | Dùng cho | Tương phản |
|---|---|---|---|
| Lá đậm | `#0d6b52` | tiêu đề hộp, header Minerva, nhãn | 6.5:1 với chữ trắng |
| Mực | `#1d4f9c` | liên kết (Minerva), tiêu đề phụ | 7.9:1 trên nền trắng |
| Hồng đậm | `#b0336a` | hộp "Tham gia đóng góp" | 6.0:1 với chữ trắng |
| Cam | `#f6a65a` | viền nhấn, hộp "Tập truyện" | 8.1:1 với chữ `#202122` |
| Trời | `#6dcff6` → `#eaf6fc` | nền banner, nền Vector | 14.6:1 với chữ `#202122` |

## Ánh xạ file → trang wiki

| File | Trang wiki |
|---|---|
| `wiki/MediaWiki/Common.css` | `MediaWiki:Common.css` |
| `wiki/MediaWiki/Vector.css` | `MediaWiki:Vector.css` |
| `wiki/MediaWiki/Minerva.css` | `MediaWiki:Minerva.css` |
| `wiki/MediaWiki/Sidebar.wikitext` | `MediaWiki:Sidebar` |
| `wiki/Trang_Chính.wikitext` | `Trang Chính` |
| `wiki/Bản_mẫu/Hộp_nhân_vật.wikitext` | `Bản mẫu:Hộp nhân vật` |
| `wiki/Bản_mẫu/Hộp_tập_truyện.wikitext` | `Bản mẫu:Hộp tập truyện` |

Sửa các trang `MediaWiki:*.css` cần quyền `interface-admin`. CSS mới có thể mất vài phút mới hiện (cache ResourceLoader).

## Việc cần làm trên ManageWiki

1. `Special:ManageWiki/settings` → *Styling*: `$wgDefaultSkin = vector` (Vector 2010) và skin di động = `minerva`.
2. Giữ `$wgMFCustomSiteModules = false` (mặc định), để `Common.css` vẫn nạp trên di động.
3. Tạo các trang thể loại: `Nhân vật`, `Học sinh`, `Giáo viên`, `Tập truyện`, `Địa điểm`, `Bản mẫu hộp thông tin`.
4. Khi có logo: đặt `$wgLogos` (`1x`/`2x` cho Vector 2010, `wordmark` cho Minerva). Hiện logo `snxyzmetawiki` chỉ là placeholder.
5. (Tùy chọn) Đổi tên không gian `Project` (`$wgMetaNamespace`), ví dụ thành `Wiki Học Sinh Chân Kinh`. Sidebar và Trang Chính đang dùng tiền tố `Project:` nên vẫn chạy sau khi đổi.

## Kiểm tra

- `https://hsck.lophocmatngu.wiki/wiki/Trang_Chính?useskin=vector`
- `https://hsck.lophocmatngu.wiki/wiki/Trang_Chính?useskin=minerva`: đặt hệ điều hành sang chế độ tối (hoặc chọn chế độ tối trong tùy chọn giao diện của Minerva nếu wiki đã bật), rồi thu cửa sổ nhỏ hơn 640px.
