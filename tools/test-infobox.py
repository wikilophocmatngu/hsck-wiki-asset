# Kiểm tra Mô đun:Infobox, Mô đun:Yesno và hai mô đun hộp, chạy qua TemplateSandbox của wiki (không lưu gì).
# Usage: python3 -I test-infobox.py <repo>
import json, os, re, sys, urllib.parse, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import luabundle

M = os.path.join(sys.argv[1], "wiki", "Mô_đun")


def bundle(name):
    return luabundle.bundle(M, name)


def expand(module, text, title="Thử"):
    p = dict(action="expandtemplates", prop="wikitext", title=title, text=text, templatesandboxtitle="Mô đun:" + module,
             templatesandboxtext=bundle(module) if os.path.exists(os.path.join(M, module.replace(" ", "_") + ".lua")) else module_src[module],
             templatesandboxcontentmodel="Scribunto", format="json")
    req = urllib.request.Request("https://hsck.lophocmatngu.wiki/w/api.php", urllib.parse.urlencode(p).encode(), {"User-Agent": os.environ["MIRAHEZE_UA"]})
    return json.load(urllib.request.urlopen(req))["expandtemplates"]["wikitext"]


module_src = {"Thử": "local B = require('Module:Infobox')\nlocal yesno = require('Module:Yesno')\nlocal p = {} function p.f() local out = {}\n" + r"""
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
local meta = tostring(B('thu'):metadata({ ['tên'] = 'An', ['trống'] = '', [1] = 'x' }, { template = 'Hộp nhân vật' }))
local json = mw.text.jsonDecode(mw.text.decode(meta:match('display:none">(.-)</div>'), true))
t('meta template', json.template, 'Hộp nhân vật')
t('meta field', json.fields['tên'], 'An')
t('meta blank dropped', json.fields['trống'], nil)
t('yesno có', yesno(' Có '), true)
t('yesno không', yesno('không'), false)
t('yesno 0', yesno('0'), false)
t('yesno nil', yesno(nil), nil)
t('yesno default', yesno('gì đó', true), true)
t('store tắt', B.store('characters', {}, false), '')
return #out == 0 and 'ALL OK' or table.concat(out, '\n') end return p"""}
module_src["Thử"] = luabundle.REQUIRE.sub(lambda m: "(function()\n" + bundle(m.group(1)) + "\nend)()", module_src["Thử"])

failed = False
result = expand("Thử", "{{#invoke:Thử|f}}")
print("Hàm:", result); failed |= result != "ALL OK"
for module, call in (("Nhân vật", "|tên=An|lớp=8A|xuất hiện đầu=[[Tập 1]]|lưu=không"),
                     ("Tập truyện", "|tên=Muôn sự tại nhân|số trang=160")):
    w = expand(module, "{{#invoke:" + module + "|main" + call + "}}", title="Tập 7")
    ok = "scribunto-error" not in w and "infobox-json" not in w.split("infobox-root")[0] and "infobox-json" in w and "Bucket bị lỗi" not in w
    print(module + ":", "OK" if ok else "LỖI\n" + w[:800]); failed |= not ok
sys.exit(failed)
