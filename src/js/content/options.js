import render from "../helpers/render";
import { writing } from "./writing";

export default function(div, setFontState, zoom) {
  const renderWebsiteStyles = () => {
    const websiteStyle = `
      min-height: 100%;
    `;

    const reloadStyle = `
      background: #fff;
      font-family: sans-serif;
      color: #0018ED;
      border-bottom: 1px solid #EDEEF2;
      padding: 12px 8px;
    `;

    return /*html*/ `
      <div style="${websiteStyle}">
        <div style="${reloadStyle}">
          <div class="wavma-options__reload-button js-reload">Reset template <span class="wavma-options__reload-button-icon js-reload-icon">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 7.75C9.5 10.0972 7.59721 12 5.25 12C2.90279 12 1 10.0972 1 7.75C1 5.40279 2.90279 3.5 5.25 3.5" stroke="#0018ED" stroke-width="1.25"/>
            <path d="M5 0.5V6.5L8 3.5L5 0.5Z" fill="#0018ED"/>
            </svg>
          </span></div>
        </div>
        <div class="font-list">
          <h5>Font families</h5>
          <ul class="fonts js-fonts"></ul>
          <h5 style="display:none">Colors</h5>
          <ul class="colors js-colors"></ul>
        </div>
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

  const shadow = $('#ShadowWavma')[0].shadowRoot;
  // shadow.querySelector(".js-search").on("click", searchStyles);
  shadow.querySelector(".js-fonts").on("click", (e) => setFontFamily(e, setFontState));
  shadow.querySelector(".js-reload").on("click", (e) => {
    resetTemplate(zoom);
    animateReset();
  });

  const searchFonts = () => {
    searchFontFaces();
  };

  return { searchFonts };
}

const resetTemplate = (zoom) => {
  const shadow = $('#ShadowWavma')[0].shadowRoot;
  const svg = shadow.getElementById("svg");
  svg.innerHTML = writing;
  const element = shadow.querySelector("#svg svg");
  zoom.element(element);
  chrome.storage.local.remove("svg");
};

const animateReset = () => {
  const shadow = $('#ShadowWavma')[0].shadowRoot;
  const reloadIcon = shadow.querySelector(".js-reload-icon");
  removeActive();
  reloadIcon.classList.add("rotate");
  setTimeout(() => reloadIcon.classList.remove("rotate"), 700);
};

const removeActive = (node) => {
  const shadow = $('#ShadowWavma')[0].shadowRoot;
  shadow.querySelectorAll(".wavma-font").forEach((item) => item.classList.remove("is-active"));
};

const setActive = (node) => {
  removeActive();
  node.classList.add("is-active");
};

const setFontFamily = (e, setFontState) => {
  const target = e.target;
  const parent = target.parentNode;
  let node;

  // Captures click on link or span
  if (target.classList.contains("wavma-font")) {
    node = target;
  } else if (parent.classList.contains("wavma-font")) {
    node = parent;
  }

  if (node) {
    setActive(node);
    const familyString = node.dataset.family;
    const family = hasNumber(familyString) ? `"${familyString}"` : familyString;

    const weight = node.dataset.weight;
    const shadow = $('#ShadowWavma')[0].shadowRoot;
    const svg = shadow.getElementById("svg");

    const texts = svg.getElementsByTagName("text");
    Array.from(texts).forEach((text) => {
      text.style.fontFamily = family;
      text.style.fontWeight = weight;
    });

    const textareas = svg.getElementsByTagName("textarea");
    Array.from(textareas).forEach((text) => (text.style.fontFamily = family));
    setFontState(family);
  }
};

const searchStyles = () => {
  searchFontFaces();
  // searchAllColors();
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const hasNumber = (myString) => {
  return /\d/.test(myString);
};

const renderFonts = (fonts) => {
  const shadow = $('#ShadowWavma')[0].shadowRoot;
  const fontsList = shadow.querySelector(".js-fonts");
  const fontsHTML = fonts
    .map((font) => {
      return /*html*/ `
      <li class="wavma-font" data-family="${font.family}" data-weight="${
        font.weight
      }">
        ${capitalize(font.family)} <span>${font.weight}</span>
      </li>
    `;
    })
    .join("");

  fontsList.innerHTML = fontsHTML;
};

const searchFontFaces = () => {
  document.fonts.ready.then((fonts) => {
    const fontFaces = Array.from(fonts);
    renderFonts(fontFaces);
  });
};

const loadColors = (colors) => {
  const noLoad = [
    "rgba(0, 0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(255, 255, 255)",
    "rgba(255, 255, 255, 0)",
  ];

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
