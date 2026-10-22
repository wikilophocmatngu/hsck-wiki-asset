--------------------------------------------------------------------------------
-- Mô đun:Infobox
--
-- Bộ dựng hộp thông tin. Thêm các hàm title, header, group, section, row,
-- image, images, tabber vào mọi nút mw.html (vá metatable dùng chung).
-- Mỗi loại hộp nằm ở Mô đun:Infobox/<Loại>, gọi bộ dựng này để vẽ hộp và
-- InfoboxBuilder.store() để lưu dữ liệu vào Bucket.
--
-- Nhóm (group) bị ẩn khi không có nội dung: group() đánh dấu _skip,
-- row()/image() xoá dấu đó trên nút và mọi nút cha. Dấu được đọc lúc dựng
-- HTML, nên thứ tự gọi không quan trọng.
--
-- Dựa trên https://meta.weirdgloop.org/w/Module:InfoboxBuilder, qua bản của
-- Wiki 100 Bạn Gái (100bangai.songngu.xyz). Cần Extension:TabberNeue cho
-- tabber(), Extension:Bucket cho store().
--------------------------------------------------------------------------------

local InfoboxBuilder = {}

local htmlmt = getmetatable(mw.html.create())
local htmlindex = htmlmt.__index
local html_build_original = htmlindex._build

-- Cỡ ảnh khi ảnh không tự ghi cỡ. Trùng cỡ của PageImages để ảnh thu nhỏ
-- thường đã có sẵn.
local DEFAULT_IMAGE_SIZE = '300px'

-- InfoboxBuilder() hoặc InfoboxBuilder('nhan-vat'): loại (nếu có) thêm class
-- infobox-<loại> vào gốc để tạo kiểu riêng.
setmetatable(InfoboxBuilder, {
	__call = function(self, kind)
		local root = mw.html.create('div')
			:addClass('infobox-root')
		if kind then
			root:addClass('infobox-' .. kind)
		end
		return root
	end,
	__index = htmlindex,
	__tostring = htmlmt.__tostring
})

htmlindex._build = function(t, ret)
	if t._skip then
		return
	end
	html_build_original(t, ret)
end

local function isBlank(v)
	if v == nil or v == false then return true end
	return mw.text.trim(tostring(v)) == ''
end

local function unskip(node)
	local t = node
	while t do
		t._skip = nil
		t = t.parent
	end
end

htmlindex.title = function(self, value)
	if isBlank(value) then return self end
	return self:tag('div'):addClass('infobox-title'):wikitext(value):done()
end

-- Cố ý không gọi unskip(): nhóm chỉ có tiêu đề mà không có nội dung vẫn ẩn.
htmlindex.header = function(self, value)
	if isBlank(value) then return self end
	return self:tag('div'):addClass('infobox-header'):wikitext(value):done()
end

-- args.layout = 'horizontal': các hàng xếp cạnh nhau, nhãn nằm trên giá trị.
htmlindex.group = function(self, args)
	local group = self:tag('div'):addClass('infobox-group')
	if args and not isBlank(args.layout) then
		group:addClass('infobox-group-' .. args.layout)
	end
	group._skip = true
	return group
end

htmlindex.section = function(self, label, args)
	local group = self:group(args)
	group:header(label)
	return group
end

-- Thẻ inline người sửa hay quên đóng trong giá trị. Để hở thì trình duyệt
-- kéo thẻ đó sang mọi hàng phía sau của hộp.
local CLOSABLE = { 'small', 'big', 'b', 'i', 'u', 's', 'span', 'sub', 'sup', 'font', 'center' }

local function closeOpenTags(value)
	local missing = {}
	for _, tag in ipairs(CLOSABLE) do
		local lower = value:lower()
		local _, opened = lower:gsub('<' .. tag .. '[%s>]', '')
		local _, closed = lower:gsub('</' .. tag .. '%s*>', '')
		for _ = 1, opened - closed do
			table.insert(missing, 1, '</' .. tag .. '>')
		end
	end
	return value .. table.concat(missing)
end

htmlindex.row = function(self, args)
	local label = args.label
	local value = args.value
	if isBlank(value) then
		return self
	end

	unskip(self)

	local row = self:tag('div'):addClass('infobox-row-container')
	if not isBlank(label) then
		row:tag('div'):addClass('infobox-row-label'):wikitext(label):done()
	end

	-- Các dấu xuống dòng giúp wikitext dạng khối (danh sách, bảng, bản mẫu)
	-- trong giá trị được đọc đúng.
	return row
		:wikitext('\n'):tag('div'):addClass('infobox-row-value'):wikitext('\n' .. closeOpenTags(tostring(value))):done()
	:done()
end

local function isMarkup(image)
	return image:find('\127', 1, true) or image:match('<%s*gallery') or image:match('<%s*tabber')
end

htmlindex.image = function(self, args)
	local image = args.image
	local caption = args.caption
	if isBlank(image) and isBlank(caption) then
		return self
	end

	unskip(self)

	if image and not isMarkup(image) then
		image = image:gsub('%[%[', ''):gsub('%]%]', ''):gsub('^File:', ''):gsub('|thumb', ''):gsub('|$', '')
		image = string.format('[[File:%s]]', image)
	end

	local container = self:tag('div'):addClass('infobox-image-container')
		:tag('div'):addClass('infobox-image'):wikitext(image):done()
	if not isBlank(caption) then
		container:tag('div'):addClass('infobox-image-caption'):wikitext(caption):done()
	end
	return container:done()
end

local Tabber = {}
Tabber.__index = Tabber
setmetatable(Tabber, { __index = htmlindex })

htmlindex.tabber = function(self)
	local obj = mw.html.create()
	obj.parent = self
	setmetatable(obj, Tabber)
	self:node(obj)
	return obj
end

function Tabber:_build(ret)
	local tabs = {}
	for _, tab in ipairs(self.nodes) do
		table.insert(tabs, tab.name .. '=' .. tostring(tab))
	end
	table.insert(ret, mw.getCurrentFrame():extensionTag('tabber', table.concat(tabs, '|-|')))
end

function Tabber:tab(name)
	local obj = self:tag('div'):addClass('infobox-tab')
	-- Cú pháp tab là `Tên=Nội dung` nối bằng `|-|`, nên hai ký tự này sẽ
	-- cắt chuỗi sai chỗ.
	obj.name = tostring(name or #self.nodes):gsub('[=|]', '-')
	return obj
end

-- Trả về ảnh sẵn sàng cho :image(), hoặc nil nếu tệp không có trên wiki.
-- Giữ tuỳ chọn hiển thị như |300px; chuẩn hoá tên tệp để mọi dạng tiền tố
-- không gian tên đều dùng được. Mỗi lần gọi tính là một hàm tốn kém.
local function resolveImage(value)
	if isBlank(value) then return nil end

	-- Dấu ngoặc giữ số lần thay của gsub không lọt vào trim().
	local stripped = (tostring(value):gsub('%[%[', ''):gsub('%]%]', ''))
	local parts = mw.text.split(mw.text.trim(stripped), '|')
	local name = mw.text.trim(parts[1])
	if name == '' then return nil end

	local ok, title = pcall(mw.title.new, name)
	if ok and title and title.namespace ~= 6 then
		ok, title = pcall(mw.title.new, name, 'File')
	end
	if not ok or not title or not title.file or not title.file.exists then
		return nil
	end

	parts[1] = title.text
	return table.concat(parts, '|')
end

local function withSize(image)
	for _, part in ipairs(mw.text.split(image, '|')) do
		if part:match('^%s*%d*x?%d+px%s*$') then
			return image
		end
	end
	return image .. '|' .. DEFAULT_IMAGE_SIZE
end

-- Thêm một ảnh, hoặc một tabber mỗi ảnh một tab.
--   list: { { label = 'Lúc nhỏ', image = 'X.png', caption = '...' }, ... }
--   opts.default: tệp hiện khi không ảnh nào tồn tại.
-- Tệp không tồn tại bị bỏ qua, nên gõ sai tên không bao giờ hiện liên kết đỏ.
htmlindex.images = function(self, list, opts)
	opts = opts or {}
	local found = {}
	for _, item in ipairs(list) do
		local raw = not isBlank(item.image) and tostring(item.image) or nil
		if raw and isMarkup(raw) then
			table.insert(found, { label = item.label, image = raw, caption = item.caption })
		else
			local image = resolveImage(raw)
			if image then
				table.insert(found, { label = item.label, image = withSize(image), caption = item.caption })
			end
		end
	end

	if #found == 0 then
		local image = resolveImage(opts.default)
		if not image then return self end
		found[1] = { image = withSize(image), caption = opts.caption }
	end

	if #found == 1 then
		return self:image{ image = found[1].image, caption = found[1].caption }
	end

	unskip(self)
	local tabber = self:tabber()
	for i, item in ipairs(found) do
		local label = not isBlank(item.label) and item.label or tostring(i)
		tabber:tab(label):image{ image = item.image, caption = item.caption }
	end
	return self
end

-- Tham số của bản mẫu gọi tới, bị ghi đè bởi tham số không trống của chính
-- #invoke (bản mẫu dùng cách này để truyền giá trị cần wikitext mới tính được).
-- Giá trị được cắt khoảng trắng, giá trị trống bị bỏ, nên `args.x or mặc định` dùng được.
function InfoboxBuilder.getArgs(frame)
	local args = {}
	local parent = frame:getParent()
	for _, source in ipairs({ parent and parent.args or {}, frame.args }) do
		for k, v in pairs(source) do
			if type(v) == 'string' then v = mw.text.trim(v) end
			if not isBlank(v) then
				args[k] = v
			end
		end
	end
	return args
end

-- Tham số không trống đầu tiên trong các tên cho trước (tên gọi khác).
function InfoboxBuilder.pick(args, ...)
	for _, name in ipairs({ ... }) do
		if not isBlank(args[name]) then
			return args[name]
		end
	end
	return nil
end

-- Định dạng ngày theo ngôn ngữ của wiki, như {{#time:}}. Giá trị không phải
-- ngày được trả lại nguyên vẹn.
function InfoboxBuilder.formatDate(format, value)
	if isBlank(value) then return nil end
	local ok, result = pcall(function()
		return mw.language.getContentLanguage():formatDate(format, value)
	end)
	return ok and result or value
end

-- Trả lại `value` nguyên vẹn nếu đã là liên kết, nếu không thì [[target|text]].
function InfoboxBuilder.link(value, target, text)
	if isBlank(value) then return nil end
	if tostring(value):find('[[', 1, true) then
		return value
	end
	return string.format('[[%s|%s]]', target, text or target)
end

-- Thẻ TemplateStyles của hộp. Đặt trước hộp trong kết quả của mô đun.
function InfoboxBuilder.styles()
	return mw.getCurrentFrame():extensionTag('templatestyles', '', { src = 'Mô đun:Infobox/styles.css' })
end

--------------------------------------------------------------------------------
-- Dữ liệu cho Bucket
--------------------------------------------------------------------------------

-- Chữ thuần: bỏ strip marker (<ref>, <nowiki>…), thẻ HTML và cú pháp liên kết.
-- "[[Tập 1|tập đầu]]" → "tập đầu", "<small>(thể chất)</small> 8" → "(thể chất) 8".
function InfoboxBuilder.plain(value)
	if isBlank(value) then return nil end
	local s = mw.text.killMarkers(tostring(value))
	s = s:gsub('%[%[[^%]|]*|([^%]]*)%]%]', '%1'):gsub('%[%[([^%]]*)%]%]', '%1')
	s = s:gsub('<[^>]*>', ' '):gsub("'''?", ''):gsub('%s+', ' ')
	s = mw.text.trim(s)
	return s ~= '' and s or nil
end

-- Số đầu tiên trong giá trị: "[[Tập 7]]" → 7, "20 trang" → 20.
function InfoboxBuilder.number(value)
	local s = InfoboxBuilder.plain(value)
	return s and tonumber(s:match('%d+%.?%d*')) or nil
end

-- Tên tệp không kèm tiền tố: "Tập tin:A.png", "[[File:A.png|…]]" → "A.png".
function InfoboxBuilder.file(value)
	if isBlank(value) then return nil end
	local s = mw.text.trim(mw.text.killMarkers(tostring(value)))
	s = s:gsub('^%[%[', ''):gsub('|.*$', ''):gsub('%]%]$', ''):gsub('^[^:]+:', '', 1)
	s = mw.text.trim(s)
	return s ~= '' and s or nil
end

-- Ngày dạng YYYY-MM-DD (đọc bằng cùng bộ đọc với {{#time:}}), không đọc được thì nil.
function InfoboxBuilder.isoDate(value)
	local s = InfoboxBuilder.plain(value)
	if not s then return nil end
	local ok, out = pcall(function()
		return mw.language.getContentLanguage():formatDate('Y-m-d', s)
	end)
	return ok and out:match('^%d%d%d%d%-%d%d%-%d%d$') or nil
end

-- Lưu một dòng vào Bucket `name` (lược đồ ở trang Bucket:<Name>).
-- Mặc định chỉ lưu từ bài viết (không gian chính). Lưu lỗi thì không làm hỏng
-- hộp, mà trả về thể loại theo dõi để ban quản trị tìm và sửa.
function InfoboxBuilder.store(name, data)
	if mw.title.getCurrentTitle().namespace ~= 0 then
		return ''
	end
	-- `bucket` là bảng gọi được (có __call), không phải hàm; nil khi Bucket chưa được bật.
	if bucket == nil then
		return '[[Thể loại:Trang lưu Bucket bị lỗi]]'
	end
	local ok = pcall(function()
		bucket(name).put(data)
	end)
	return ok and '' or '[[Thể loại:Trang lưu Bucket bị lỗi]]'
end

InfoboxBuilder.isBlank = isBlank
InfoboxBuilder.unskip = unskip
InfoboxBuilder.resolveImage = resolveImage

return InfoboxBuilder
