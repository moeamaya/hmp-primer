import "../css/content.css";
import bling from "./helpers/bling";
import nav from "./content/nav";
import canvas from "./content/canvas";
import options from "./content/options";
import enhance from "@wavma/enhance";
// import enhance from "/Users/jamaya/Documents/node/enhance/dist/enhance.js";
// import enhance from "/Users/jamaya/Documents/node/enhance/src/index.js";
bling();

let started = false;
let fontState = "";

const init = () => {
  // console.log("wavma");
};

const wavma = document.createElement("div");
wavma.classList.add("wavma");
const zm = enhance({ offset: 40 });

const render = () => {
  document.body.appendChild(wavma);

  // render plugin
  nav(wavma, zm, getFontState);

  const main = document.createElement("div");
  main.classList.add("wavma-main");
  wavma.appendChild(main);

  const opts = options(main, setFontState, zm);
  canvas(main, zm);

  opts.searchFonts();

  // start zoom
  const parent = $(".wavma-canvas")[0];
  zm.init(parent);
};

const getFontState = () => fontState;

const setFontState = (font) => {
  fontState = font;
};

const addEventListeners = () => {
  document.body.addEventListener("click", (e) => {
    const withinWavma = e.path.some((p) => {
      if (p.classList) return p.classList.contains("wavma");
    });
    if (!withinWavma) wavma.style.display = "none";
  });
};

init();

// Toggle Wavma
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let display = wavma.style.display;
  if (!started) {
    started = true;
    render();
    addEventListeners();
  } else if (display !== "none") {
    wavma.style.display = "none";
  } else {
    wavma.style.display = "block";
  }
});
