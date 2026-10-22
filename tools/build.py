# Render demo pages through the live wiki API (read-only: parse/expandtemplates + TemplateSandbox).
# Usage: python3 -I build.py <repo> <outdir>
import json, os, re, sys, urllib.parse, urllib.request

API = "https://hsck.lophocmatngu.wiki/w/api.php"
UA = os.environ["MIRAHEZE_UA"]
repo, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
W = os.path.join(repo, "wiki")


def api(**p):
    p.update(format="json", formatversion="2")
    req = urllib.request.Request(API, urllib.parse.urlencode(p).encode(), {"User-Agent": UA})
    r = json.load(urllib.request.urlopen(req, timeout=60))
    if "error" in r:
        raise SystemExit(r["error"])
    return r


def read(*parts):
    return open(os.path.join(W, *parts), encoding="utf-8").read()


# Templates: name -> source file
TPL = {}
for f in os.listdir(os.path.join(W, "Bản_mẫu")):
    if f.endswith(".wikitext"):
        TPL[f[:-9].replace("_", " ")] = read("Bản_mẫu", f)

# TemplateStyles: sanitize each via sandbox, fail on sanitizer errors
css = []
for root, _, files in os.walk(os.path.join(W, "Bản_mẫu")):
    for f in files:
        if f != "styles.css":
            continue
        title = "Bản mẫu:" + os.path.relpath(root, os.path.join(W, "Bản_mẫu")).replace("_", " ") + "/styles.css"
        html = api(action="parse", prop="text", title="Thử", disablelimitreport=1,
                   templatesandboxtitle=title, templatesandboxcontentmodel="sanitized-css",
                   templatesandboxtext=open(os.path.join(root, f), encoding="utf-8").read(),
                   text=f'<templatestyles src="{title}" />')["parse"]["text"]
        style = re.search(r"<style[^>]*>(.*?)</style>", html, re.S).group(1)
        if "Xuất hiện lỗi" in style or "error" in style.lower():
            raise SystemExit(f"{title}:\n{style}")
        print("OK", title)
        css.append(style)


def calls(text):
    """Yield (start, end, name) of top-level {{Name...}} calls for known templates."""
    i = 0
    while (i := text.find("{{", i)) != -1:
        depth, j = 0, i
        while j < len(text):
            if text.startswith("{{", j):
                depth += 1; j += 2
            elif text.startswith("}}", j):
                depth -= 1; j += 2
                if depth == 0:
                    break
            else:
                j += 1
        name = re.split(r"[|}\n]", text[i + 2:j], 1)[0].strip()
        if name in TPL:
            yield i, j, name
        i = j


def expand(text, title):
    for s, e, name in reversed(list(calls(text))):
        r = api(action="expandtemplates", prop="wikitext", title=title, text=text[s:e],
                templatesandboxtitle="Bản mẫu:" + name, templatesandboxtext=TPL[name])
        text = text[:s] + r["expandtemplates"]["wikitext"] + text[e:]
    return re.sub(r"<templatestyles[^>]*/>", "", text)


PD = os.path.join(repo, "pages")
if os.path.isdir(PD):  # concept mode: every pages/<key>.wikitext renders as the main page
    pages = {f[:-9]: ("Trang Chính", open(os.path.join(PD, f), encoding="utf-8").read()) for f in sorted(os.listdir(PD)) if f.endswith(".wikitext")}
else:
    pages = {"trang-chinh": ("Trang Chính", read("Trang_Chính.wikitext")),
             "nhan-vat-mau": ("Nhân vật mẫu", open(os.path.join(repo, "demo", "Nhân_vật_mẫu.wikitext"), encoding="utf-8").read())}
for key, (title, text) in pages.items():
    p = api(action="parse", prop="text|categories|modules", title=title, disablelimitreport=1,
            text=expand(text, title))["parse"]
    json.dump({"title": title, "html": p["text"], "cats": [c["category"] for c in p["categories"]], "modulestyles": p.get("modulestyles", [])},
              open(os.path.join(out, key + ".json"), "w", encoding="utf-8"), ensure_ascii=False)
    print("OK", title, [c["category"] for c in p["categories"]])

site = read("MediaWiki", "Common.css") + "\n" + "\n".join(css)
json.dump({"common": site, "vector": read("MediaWiki", "Vector.css"), "minerva": read("MediaWiki", "Minerva.css")},
          open(os.path.join(out, "css.json"), "w", encoding="utf-8"), ensure_ascii=False)
