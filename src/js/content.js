import "../css/content.css";
import bling from "./helpers/bling";
import zoom from "./helpers/zoom";
import nav from "./content/nav";
import canvas from "./content/canvas";
import options from "./content/options";
bling();

let started = false;
const zm = zoom();

const init = () => {
  console.log("not init");
};

const wavma = document.createElement("div");
wavma.classList.add("wavma");

const render = () => {
  document.body.appendChild(wavma);

  // render plugin
  nav(wavma, zm);
  canvas(wavma);
  options(wavma);

  // start zoom
  zm.init();
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
