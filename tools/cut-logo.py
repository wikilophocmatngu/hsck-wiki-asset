# Tách logo khỏi nền trời của bìa Tập 25: python3 -I cut-logo.py <bìa> <ra.png> <ngưỡng, vd 60>
# ponytail: vùng cắt và điểm mồi viết cứng cho bìa Tập 25 (1348×2000); ảnh khác thì sửa crop() và seed.
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
src, out, thr = sys.argv[1], sys.argv[2], float(sys.argv[3])
im = Image.open(src).convert('RGB').crop((250, 40, 1260, 610))
a = np.asarray(im).astype(int)
sky = np.median(np.concatenate([a[:8].reshape(-1,3), a[-8:].reshape(-1,3)]), axis=0)
print('sky', sky)
fg = (np.sqrt(((a - sky) ** 2).sum(-1)) > thr).astype(np.uint8) * 255
m = Image.fromarray(fg, 'L').copy()
ImageDraw.floodfill(m, (350, 260), 128)          # seed trên khối xanh lá: chỉ giữ thành phần nối với logo
keep = (np.asarray(m) == 128).astype(np.uint8) * 255
# lấp lỗ bên trong (nền lọt giữa chữ không nối ra mép): nền thật = vùng nối ra mép
inv = Image.fromarray(255 - keep, 'L').copy(); ImageDraw.floodfill(inv, (0, 0), 7)
keep = np.where(np.asarray(inv) == 7, 0, 255).astype(np.uint8)
mask = Image.fromarray(keep, 'L').filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(0.8))
rgba = im.convert('RGBA'); rgba.putalpha(mask)
rgba = rgba.crop(rgba.getbbox()); rgba.save(out); print(rgba.size)
