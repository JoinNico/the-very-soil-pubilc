from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import urlopen

try:
    from fontTools.subset import Options, Subsetter, load_font, save_font
except ImportError as error:
    raise SystemExit(
        "Install the font tools first: python -m pip install fonttools brotli"
    ) from error


ROOT = Path(__file__).resolve().parent.parent
SOURCE_EXTENSIONS = {".astro", ".css", ".ts"}
GOOGLE_FONTS_REVISION = "6a003b5eb672dc8bf5bff5937cf5863f8b175445"
FONTS = {
    f"https://raw.githubusercontent.com/google/fonts/{GOOGLE_FONTS_REVISION}/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf": ROOT
    / "public/fonts/noto/noto-sans-sc-site.woff2",
    f"https://raw.githubusercontent.com/google/fonts/{GOOGLE_FONTS_REVISION}/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf": ROOT
    / "public/fonts/noto/noto-serif-sc-site.woff2",
}


def site_code_points() -> set[int]:
    source_text = "".join(
        path.read_text(encoding="utf-8")
        for path in (ROOT / "src").rglob("*")
        if path.suffix in SOURCE_EXTENSIONS
    )
    return {ord(character) for character in source_text}


def subset_font(source: Path, output: Path, code_points: set[int]) -> None:
    options = Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.name_legacy = True
    options.notdef_glyph = True
    options.recommended_glyphs = True
    options.recalc_average_width = True
    options.recalc_max_context = True

    font = load_font(str(source), options)
    try:
        subsetter = Subsetter(options=options)
        subsetter.populate(unicodes=code_points)
        subsetter.subset(font)
        save_font(font, str(output), options)
    finally:
        font.close()


def main() -> None:
    code_points = site_code_points()

    with TemporaryDirectory(prefix="the-very-soil-fonts-") as temporary_directory:
        for index, (url, output) in enumerate(FONTS.items()):
            source = Path(temporary_directory) / f"source-{index}.ttf"
            source.write_bytes(urlopen(url).read())
            subset_font(source, output, code_points)
            print(f"Updated {output.relative_to(ROOT)} ({output.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
