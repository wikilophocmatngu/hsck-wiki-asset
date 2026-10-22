-- Mô đun:Yesno
-- Đọc giá trị kiểu có/không trong wikitext một cách nhất quán, như bản mẫu {{yesno}}.
-- Theo https://en.wikipedia.org/wiki/Module:Yesno (CC BY-SA 4.0), thêm các từ tiếng Việt.
--
--   local yesno = require('Module:Yesno')
--   yesno('có') --> true     yesno('không') --> false
--   yesno(nil) --> nil       yesno('gì đó', true) --> true (giá trị mặc định)

local YES = { ['yes'] = true, ['y'] = true, ['true'] = true, ['t'] = true, ['on'] = true,
	['có'] = true, ['c'] = true, ['đúng'] = true, ['bật'] = true }
local NO = { ['no'] = true, ['n'] = true, ['false'] = true, ['f'] = true, ['off'] = true,
	['không'] = true, ['k'] = true, ['sai'] = true, ['tắt'] = true }

return function(val, default)
	if type(val) == 'string' then
		val = mw.ustring.lower(mw.text.trim(val))
	end
	if val == nil then
		return nil
	elseif val == true or YES[val] or tonumber(val) == 1 then
		return true
	elseif val == false or NO[val] or tonumber(val) == 0 then
		return false
	end
	return default
end
