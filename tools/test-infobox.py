# Kiểm tra các hàm chuẩn hoá dữ liệu Bucket của Mô đun:Infobox, chạy qua TemplateSandbox của wiki (không lưu gì).
# Usage: python3 -I test-infobox.py <repo>
import json, os, sys, urllib.parse, urllib.request

src = open(os.path.join(sys.argv[1], "wiki", "Mô_đun", "Infobox.lua"), encoding="utf-8").read()
code = "local B = (function()\n" + src + "\nend)()\nlocal p = {} function p.f() local out = {}\n" + r"""
local function t(name, got, want) if got ~= want then table.insert(out, name .. ': ' .. tostring(got) .. ' ~= ' .. tostring(want)) end end
t('plain link', B.plain('[[Tập 1|tập đầu]] và [[Tập 2]]'), 'tập đầu và Tập 2')
t('plain html', B.plain("<small>(thể chất)</small> '''8'''"), '(thể chất) 8')
t('plain blank', B.plain('  '), nil)
t('number link', B.number('[[Tập 7]]'), 7)
t('number text', B.number('160 trang'), 160)
t('number none', B.number('chưa rõ'), nil)
t('file prefix', B.file('Tập tin:A b.png'), 'A b.png')
t('file link', B.file('[[File:A.png|200px]]'), 'A.png')
t('iso', B.isoDate('2014-06-01'), '2014-06-01')
t('iso bad', B.isoDate('mùa hè'), nil)
t('pick', B.pick({a='', b='x'}, 'a', 'b'), 'x')
local g = B.infoboxGallery({ getParent = function() return { args = { 'A lúc nhỏ.png', 'Lúc nhỏ\nA.png', 'Hiện tại' } } end })
local entries = mw.text.jsonDecode(g)
t('gallery tabs', #entries, 3)
t('gallery tab 2', entries[3].tabName .. '/' .. entries[3].file, 'Hiện tại/A.png')
local box = tostring(B('thu'):image{ image = g })
t('gallery tabber', box:find('infobox-tab', 1, true) ~= nil or box:find('\127', 1, true) ~= nil, true)
local meta = tostring(B('thu'):metadata({ ['tên'] = 'An', ['trống'] = '', [1] = 'x' }, { template = 'Hộp nhân vật' }))
local json = mw.text.jsonDecode(mw.text.decode(meta:match('display:none">(.-)</div>'), true))
t('meta template', json.template, 'Hộp nhân vật')
t('meta field', json.fields['tên'], 'An')
t('meta blank dropped', json.fields['trống'], nil)
t('meta schema', json.schema, 'infobox/1')
return #out == 0 and 'ALL OK' or table.concat(out, '\n') end return p"""
p = dict(action="expandtemplates", prop="wikitext", title="Thử", text="{{#invoke:Thử|f}}", templatesandboxtitle="Mô đun:Thử",
         templatesandboxtext=code, templatesandboxcontentmodel="Scribunto", format="json")
req = urllib.request.Request("https://hsck.lophocmatngu.wiki/w/api.php", urllib.parse.urlencode(p).encode(), {"User-Agent": os.environ["MIRAHEZE_UA"]})
result = json.load(urllib.request.urlopen(req))["expandtemplates"]["wikitext"]
print(result)
sys.exit(result != "ALL OK")
