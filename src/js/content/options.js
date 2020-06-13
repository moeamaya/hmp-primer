import render from "../helpers/render";

export default function(div) {
  const optionsStyle = `
    height: calc(100% - 408px);
    overflow: auto;
    margin: 0;
  `;

  const renderWebsiteStyles = () => {
    const websiteStyle = `
      flex: 0 50%;
      border-right: 1px solid #E1E2EA;
      padding: 24px;
    `;

    const buttonStyle = `
      display: inline-block;
      background: #fff;
      font-family: sans-serif;
      color: #4a4c5e;
      border: 1px solid #EDEEF2;
      margin: 16px 0 16px;
      height: 37px;
      padding: 0 16px;
      border-radius: 4px;
    `;

    return /*html*/ `
      <div style="${websiteStyle}">
        <div>Website Styles</div>
        <button style="${buttonStyle}" class="js-search">Load Styles</button>

        <h5>Font families</h5>
        <ul class="fonts js-fonts"></ul>
        <h5>Colors</h5>
        <ul class="colors js-colors"></ul>
      </div>
    `;
  };

  const renderDesignStyles = () => {
    const designStyle = `
      flex: 0 50%;
      padding: 24px;
      margin: 0;
    `;

    return /*html*/ `
      <div style="${designStyle}" class="wavma-options">
        Design
      </div>
    `;
  };

  render(
    div,
    /*html*/ `
    <div class="wavma-options" style="${optionsStyle}">
      <div style="display:flex">
        ${renderWebsiteStyles()}
        ${renderDesignStyles()}
      </div>
    </div>
  `
  );
  $(".js-search").on("click", searchStyles);
  $(".js-fonts").on("click", setFontFamily);
}

const searchStyles = () => {
  searchAllFonts();
  searchAllColors();
};

const setFontFamily = (e) => {
  if (e.target.classList.contains("font")) {
    const family = e.target.dataset.family;
    const svg = document.getElementById("svg");
    const texts = svg.getElementsByTagName("text");
    Array.from(texts).forEach((text) => (text.style.fontFamily = family));
  }
};

const firstFont = (font) => {
  return font.split(",")[0];
};

const loadFonts = (fonts) => {
  const fontsList = $(".js-fonts")[0];
  const fontsHTML = fonts
    .map((font) => {
      if (
        firstFont(font) === "-apple-system" ||
        firstFont(font) === "sans-serif"
      )
        return;
      return /*html*/ `
      <li class="font" data-family='${font}'>
        ${firstFont(font)}
      </li>
    `;
    })
    .join("");

  fontsList.innerHTML = fontsHTML;
};

// Fonts Ninja font search
const searchAllFonts = () => {
  const fonts = [];

  var e = [].slice
      .call(document.body.getElementsByTagName("*"))
      .filter(function(e) {
        return e.style && e.ownerDocument === document;
      }),
    t = {};
  e.forEach(function(e, r) {
    var n;
    if (
      "SCRIPT" !== e.tagName.toUpperCase() &&
      "STYLE" !== e.tagName.toUpperCase()
    ) {
      var i = Array.from(e.childNodes).filter(function(e) {
          return e.nodeType === e.TEXT_NODE;
        }),
        o =
          i
            .map(function(e) {
              return e.nodeValue;
            })
            .join("") || e.placeholder;
      if (o && !o.match(/^\s+$/)) {
        var s = window.getComputedStyle(e, "");
        if (s.fontFamily) {
          var l = s.fontWeight,
            u = s.fontStyle,
            c = unescape(s.fontFamily).replace(/^"(.*)"$/, "$1");
          fonts.indexOf(c) === -1 && fonts.push(c);
        }
      }
    }
  });

  loadFonts(fonts);
};

const loadColors = (colors) => {
  const noLoad = ["rgba(0, 0, 0, 0)", "rgb(0, 0, 0)", "rgb(255, 255, 255)"];

  const colorsList = $(".js-colors")[0];
  const colorsHTML = colors
    .map((color) => {
      if (noLoad.includes(color)) return;
      return /*html*/ `
      <li class="color" data-color='${color}'>
        <div>${color}</div>
        <div class="color__swatch" style="background:${color}"></div>
      </li>
    `;
    })
    .join("");

  colorsList.innerHTML = colorsHTML;
};

const searchAllColors = () => {
  // regex via http://stackoverflow.com/a/7543829/149636
  var rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

  var allColors = [];

  var elems = document.querySelectorAll("body > *:not(.wavma) *");
  var total = elems.length;

  var x, y, elemStyles, styleName, styleValue, rgbVal;

  for (x = 0; x < total; x++) {
    elemStyles = window.getComputedStyle(elems[x]);

    for (y = 0; y < elemStyles.length; y++) {
      styleName = elemStyles[y];
      styleValue = elemStyles[styleName];

      if (!styleValue) {
        continue;
      }

      // convert to string to avoid match exceptions
      styleValue += "";

      rgbVal = styleValue.match(rgbRegex);
      if (!rgbVal) {
        // property does not contain a color
        continue;
      }

      if (allColors.indexOf(rgbVal.input) == -1) {
        // avoid duplicate entries
        allColors.push(rgbVal.input);
      }
    }
  }

  loadColors(allColors);
};
