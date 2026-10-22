# Bàn giao: thiết kế wiki Học Sinh Chân Kinh

Wiki: https://hsck.lophocmatngu.wiki (Miraheze, MediaWiki 1.46.2). Truy cập bằng User-Agent trong biến `MIRAHEZE_UA`. Chủ dự án: Pisces (gọi là Song Ngư khi trả lời tiếng Việt). Có điều gì chưa rõ thì hỏi ngay.

Chưa có bot password, nên chưa có trang nào được đăng lên wiki. Mọi thứ trong repo là bản để dán tay.

## Đã chốt

- Đây là wiki tưởng niệm. Bộ truyện dừng ở Tập 25; Tập 26 chỉ là chuyện fan kể với nhau, trên wiki gọi là "Truyền thuyết Tập 26".
- Skin: Vector 2010 cho máy tính, Minerva cho di động. CSS chia theo cách của Weird Gloop: `Common.css` cho cả hai, `Vector.css` chỉ máy tính, `Minerva.css` chỉ di động, CSS của bản mẫu nằm trong TemplateStyles. Bỏ những gì Miraheze không có (GloopThemes, ThemeToggle…).
- Trang Chính theo kiểu Kỷ yếu (phương án D). Các bản mẫu không dính tới Trang Chính được giữ nguyên.
- Màu dùng một bộ biến `--hs-*` (OKLCH) trong `Common.css`; bảng tra ở README. Bộ `--hsck-*` cũ đã bỏ, trừ hai biến cục bộ cho header trong `Minerva.css`.
- Phông tiêu đề: Bricolage Grotesque qua Google Fonts (CSP của Miraheze cho phép).
- Nền Vector đang là màu `--hs-desk`. Song Ngư sẽ tự đưa ảnh nền sau; chỗ thay có ghi chú trong `Vector.css`. Ảnh phải tải lên wiki vì CSP chặn ảnh ngoài.
- "Demo" nghĩa là gửi ảnh chụp, không đăng thử lên wiki.

## Khảo sát độc giả (79 câu trả lời)

- 61% muốn nhiều hình và màu tươi.
- 32% sẽ viết bài nếu có hướng dẫn dễ hiểu. Vì vậy Trang Chính có nút "Viết bài đầu tiên trong 5 phút".
- Khoảng 80% đến từ Facebook, nên giao diện điện thoại (Minerva) được ưu tiên.
- 30% muốn vào ban quản trị, 44% trả lời "có lẽ". Từ đây có ý tưởng trang Ban cán sự.

Ý kiến về quan hệ nhân vật nhỏ tuổi và câu "đã có wiki HSCK khác" là của độc giả Lớp Học Mật Ngữ, bỏ qua.

## Trạng thái file

| Thư mục | Nội dung |
|---|---|
| `wiki/` | Bản dùng thật: MediaWiki CSS, Sidebar, Trang Chính, bản mẫu. Mọi CSS TemplateStyles đã qua bộ lọc sanitized-css. |
| `demo/` | Trang nhân vật mẫu để chụp ảnh. |
| `drafts/trang-chinh/` | Ba phương án Trang Chính không chọn: A (sơ đồ lớp), B (bảng tin), C (bài kiểm tra). |
| `drafts/ban-mau/` | Thẻ học sinh, Quan hệ. Vẫn dùng biến `--hsck-*` cũ, cần đổi sang `--hs-*` trước khi dùng. |
| `drafts/nen-vector/` | Ba nền Vector đã thử: ô ly, bảng đen, trời mây. |
| `tools/` | Dựng và chụp ảnh demo. |

## Công cụ

```sh
python3 -I tools/build.py <thư mục gốc> <outdir>     # gọi API parse, xuất HTML + modulestyles
NODE_PATH=$(npm root -g) node tools/shot.js <outdir> [thư mục ảnh]   # ONLY=trang-chinh-vector-day,... tùy chọn
python3 -I tools/test-infobox.py .                    # kiểm tra hàm chuẩn hoá dữ liệu Bucket
NODE_PATH=$(npm root -g) node tools/shot-page.js <outdir> <Tên_trang> <tiền tố>  # chụp trang thật, chỉ chèn CSS
```

`build.py` dùng thư mục `pages/` nếu có, không thì lấy Trang Chính và trang demo. Playwright đi qua `HTTPS_PROXY`.

Lưu ý kỹ thuật:
- Kiểm tra CSS TemplateStyles bằng `action=parse` với `templatesandboxtitle` và `templatesandboxcontentmodel=sanitized-css`. Bộ lọc từ chối `text-decoration-thickness`, `text-underline-offset` và khai báo `background` gộp có `pos / size`.
- RandomSelection trên Miraheze bị cache, đừng dùng cho nội dung "ngẫu nhiên".
- Khung hồ sơ của UserProfileV2 (`.profile-masthead`) nằm ngoài `.mw-parser-output`, nên CSS "Học bạ" phải ở `Common.css`.

## Trang cần tạo trên wiki

- `Project:Viết bài đầu tiên` (nút chính của Trang Chính trỏ vào đây)
- `Project:Ban cán sự`
- `Truyền thuyết Tập 26`
- `Tập 1` đến `Tập 25`
- `Bản mẫu:Ảnh thẻ`, `Bản mẫu:Trang Chính/styles.css` cùng các bản mẫu trong `wiki/`

## Câu hỏi còn mở

- Đổi tên nhóm quyền cho hợp chủ đề lớp học qua `MediaWiki:Group-*-member`?
- Có làm bản mẫu "Lưu bút cá nhân" cho trang thành viên không?
- Ảnh bìa và ảnh nhân vật: nguồn và bản quyền.
- Ảnh nền Vector của Song Ngư.
- Tên nhân vật thật để thay "Nhân vật 1…10" trong Ảnh tập thể.
- Nút "Ký lưu bút" (InputBox `type=create`) bị khóa khi ô trống. Đó là hành vi mặc định của InputBox; hỏi xem có cần đổi không.
