# Gộp một mô đun Lua với các mô đun trong repo mà nó require, để chạy qua TemplateSandbox
# (TemplateSandbox chỉ thay được một trang mỗi lần gọi API).
import os, re

REQUIRE = re.compile(r"""require\(['"](?:Module|Mô đun):([^'"]+)['"]\)""")


def bundle(mod_dir, name, _seen=()):
    """Mã của Mô đun:<name>; mỗi require('Module:X') tới mô đun có trong mod_dir được thay bằng mã của X.
    Bỏ qua dòng chú thích (--) và báo lỗi nếu hai mô đun require vòng tròn."""
    if name in _seen:
        raise SystemExit("require vòng tròn: " + " → ".join(_seen + (name,)))
    src = open(os.path.join(mod_dir, name.replace(" ", "_") + ".lua"), encoding="utf-8").read()

    def inline(m):
        dep = m.group(1)
        if not os.path.exists(os.path.join(mod_dir, dep.replace(" ", "_") + ".lua")):
            return m.group(0)
        return "(function()\n" + bundle(mod_dir, dep, _seen + (name,)) + "\nend)()"

    return "\n".join(line if line.lstrip().startswith("--") else REQUIRE.sub(inline, line) for line in src.split("\n"))
