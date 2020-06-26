import "../css/content.css";
import bling from "./helpers/bling";
import zoom from "./helpers/zoom";
import nav from "./content/nav";
import canvas from "./content/canvas";
import options from "./content/options";
bling();

let started = false;
let fontState = "";
const zm = zoom();

const init = () => {
  console.log("wavma");
};

const wavma = document.createElement("div");
wavma.classList.add("wavma");

const render = () => {
  document.body.appendChild(wavma);

  // render plugin
  nav(wavma, zm, getFontState);

  const main = document.createElement("div");
  main.classList.add("wavma-main");
  wavma.appendChild(main);

  const opts = options(main, setFontState);
  canvas(main, zm);

  // start zoom
  opts.searchFonts();
  zm.init();
};

const getFontState = () => fontState;

const setFontState = (font) => {
  fontState = font;
};

init();

// Toggle Wavma
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let display = wavma.style.display;
  if (!started) {
    started = true;
    render();
  } else if (display !== "none") {
    wavma.style.display = "none";
  } else {
    wavma.style.display = "block";
  }
});
