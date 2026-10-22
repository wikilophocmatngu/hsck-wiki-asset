--------------------------------------------------------------------------------
-- Mô đun:Infobox/Nhân vật
--
-- Hộp thông tin nhân vật, gọi từ {{Hộp nhân vật}}.
-- Vẽ hộp, thêm thể loại và lưu một dòng vào [[Bucket:Nhan vat]].
-- Tên tham số giữ nguyên như bản mẫu wikitext cũ.
--------------------------------------------------------------------------------

local InfoboxBuilder = require('Module:Infobox')

local p = {}

-- Thể loại phụ theo tham số `loại`.
local KIND_CATEGORY = {
	['học sinh'] = 'Học sinh',
	['giáo viên'] = 'Giáo viên',
}

-- hình, hình2, hình3: nhiều ảnh thì thành tab, nhãn tab lấy từ nhãn, nhãn2, nhãn3.
local function imageList(args)
	local list = {}
	for i = 1, 3 do
		local n = i == 1 and '' or tostring(i)
		table.insert(list, {
			image = args['hình' .. n],
			label = args['nhãn' .. n],
			caption = args['chú thích' .. n],
		})
	end
	return list
end

function p.main(frame)
	return p._main(InfoboxBuilder.getArgs(frame))
end

function p._main(args)
	local page = mw.title.getCurrentTitle()
	local name = args['tên'] or page.text
	local kind = args['loại'] and mw.ustring.lower(args['loại'])

	local infobox = InfoboxBuilder('nhan-vat'):title(name)
	infobox:images(imageList(args))
	infobox:section('Thông tin')
		:row{ label = 'Tên khác', value = args['tên khác'] }
		:row{ label = 'Giới tính', value = args['giới tính'] }
		:row{ label = 'Sinh nhật', value = args['sinh nhật'] }
		:row{ label = 'Vai trò', value = args['vai trò'] }
		:row{ label = 'Lớp', value = args['lớp'] }
		:row{ label = 'Gia đình', value = args['gia đình'] }
		:row{ label = 'Xuất hiện đầu', value = args['xuất hiện đầu'] }

	local out = InfoboxBuilder.styles() .. tostring(infobox)
	if page.namespace == 0 then
		out = out .. '[[Thể loại:Nhân vật]]'
		if KIND_CATEGORY[kind] then
			out = out .. '[[Thể loại:' .. KIND_CATEGORY[kind] .. ']]'
		end
	end

	local plain = InfoboxBuilder.plain
	return out .. InfoboxBuilder.store('nhan_vat', {
		ten = plain(name),
		ten_khac = plain(args['tên khác']),
		gioi_tinh = plain(args['giới tính']),
		sinh_nhat = plain(args['sinh nhật']),
		vai_tro = plain(args['vai trò']),
		lop = plain(args['lớp']),
		loai = kind,
		xuat_hien_dau = InfoboxBuilder.number(args['xuất hiện đầu']),
		hinh = InfoboxBuilder.file(args['hình']),
	})
end

return p
