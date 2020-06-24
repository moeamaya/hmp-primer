import render from "../helpers/render";

export default function(div, setFontState) {
  const renderWebsiteStyles = () => {
    const websiteStyle = `
      min-height: 100%;
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
    <div class="wavma-options">
        ${renderWebsiteStyles()}
      </div>
    </div>
  `
  );
  $(".js-search").on("click", searchStyles);
  $(".js-fonts").on("click", (e) => setFontFamily(e, setFontState));
}

const setFontFamily = (e, setFontState) => {
  if (e.target.classList.contains("font")) {
    const family = e.target.dataset.family;
    const weight = e.target.dataset.weight;
    const svg = document.getElementById("svg");

    const texts = svg.getElementsByTagName("text");
    Array.from(texts).forEach((text) => {
      text.style.fontFamily = family;
      text.style.fontWeight = weight;
    });

    const textareas = svg.getElementsByTagName("textarea");
    Array.from(textareas).forEach((text) => text.style.fontFamily = family);
    setFontState(family);
  }
};

const searchStyles = () => {
  searchFontFaces();
  searchAllColors();
};

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const renderFonts = (fonts) => {
  const fontsList = $(".js-fonts")[0];
  const fontsHTML = fonts
  .map((font) => {
    return /*html*/ `
      <li class="font" data-family="${font.family}" data-weight="${font.weight}">
        ${capitalize(font.family)} <span>${font.weight}</span>
      </li>
    `;
  })
  .join("");

  fontsList.innerHTML = fontsHTML;
}

const searchFontFaces = () => {
  document.fonts.ready.then((fonts) => {
    const fontFaces = Array.from(fonts);
    renderFonts(fontFaces);
  });
}

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
