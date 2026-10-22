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
return #out == 0 and 'ALL OK' or table.concat(out, '\n') end return p"""
p = dict(action="expandtemplates", prop="wikitext", title="Thử", text="{{#invoke:Thử|f}}", templatesandboxtitle="Mô đun:Thử",
         templatesandboxtext=code, templatesandboxcontentmodel="Scribunto", format="json")
req = urllib.request.Request("https://hsck.lophocmatngu.wiki/w/api.php", urllib.parse.urlencode(p).encode(), {"User-Agent": os.environ["MIRAHEZE_UA"]})
result = json.load(urllib.request.urlopen(req))["expandtemplates"]["wikitext"]
print(result)
sys.exit(result != "ALL OK")
