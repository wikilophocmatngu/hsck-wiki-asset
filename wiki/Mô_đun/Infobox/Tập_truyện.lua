--------------------------------------------------------------------------------
-- Mô đun:Infobox/Tập truyện
--
-- Hộp thông tin tập truyện, gọi từ {{Hộp tập truyện}}.
-- Vẽ hộp, thêm thể loại và lưu một dòng vào [[Bucket:Tap truyen]].
-- Số tập lấy từ tên trang ("Tập 7") khi không ghi `số tập`; tập trước/sau tự
-- tính từ số tập, trừ khi ghi rõ.
--------------------------------------------------------------------------------

local InfoboxBuilder = require('Module:Infobox')

local p = {}

-- Tập cuối đã phát hành. Tập 26 chỉ là chuyện kể của fan nên không có "tập sau".
local LAST = 25

local function volumeLink(n, text)
	return InfoboxBuilder.link(n, 'Tập ' .. n, text)
end

function p.main(frame)
	return p._main(InfoboxBuilder.getArgs(frame))
end

function p._main(args)
	local page = mw.title.getCurrentTitle()
	local number = tonumber(args['số tập']) or tonumber(page.text:match('^Tập (%d+)$'))
	local name = args['tên'] or page.text
	local title = number and ('Tập ' .. number .. ': ' .. name) or name
	if number and name == page.text then title = page.text end

	local infobox = InfoboxBuilder('tap-truyen'):title(title)
	infobox:images{ { image = args['bìa'], caption = args['chú thích'] } }
	infobox:section('Xuất bản')
		:row{ label = 'Phát hành', value = InfoboxBuilder.formatDate('j/n/Y', args['phát hành']) }
		:row{ label = 'Nhà xuất bản', value = args['nhà xuất bản'] }
		:row{ label = 'Số trang', value = args['số trang'] }
		:row{ label = 'ISBN', value = args['isbn'] }

	local previous = args['tập trước'] or (number and number > 1 and number - 1)
	local following = args['tập sau'] or (number and number < LAST and number + 1)
	local nav = infobox:group{ layout = 'horizontal' }
	nav:row{ label = 'Tập trước', value = previous and volumeLink(previous, '← Tập ' .. previous) }
	if number and (previous or following) then
		nav:row{ value = "'''" .. number .. "'''" }
	end
	nav:row{ label = 'Tập sau', value = following and volumeLink(following, 'Tập ' .. following .. ' →') }

	local out = InfoboxBuilder.styles() .. tostring(infobox)
	if page.namespace == 0 then
		out = out .. '[[Thể loại:Tập truyện]]'
	end

	local plain = InfoboxBuilder.plain
	return out .. InfoboxBuilder.store('tap_truyen', {
		so_tap = number,
		ten = plain(args['tên']),
		phat_hanh = InfoboxBuilder.isoDate(args['phát hành']),
		nha_xuat_ban = plain(args['nhà xuất bản']),
		so_trang = InfoboxBuilder.number(args['số trang']),
		isbn = plain(args['isbn']),
		bia = InfoboxBuilder.file(args['bìa']),
	})
end

return p
