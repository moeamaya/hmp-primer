import "../css/content.css";
import bling from "./helpers/bling";
import nav from "./content/nav";
import canvas from "./content/canvas";
import options from "./content/options";
bling();

const init = () => {
  console.log("init");
  render();
};

const wavma = document.createElement("div");
wavma.classList.add("wavma");

const render = () => {
  document.body.appendChild(wavma);

  // render plugin
  nav(wavma);
  canvas(wavma);
  options(wavma);
};

init();

// Toggle Wavma
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let display = wavma.style.display;
  if (display !== "none") {
    wavma.style.display = "none";
  } else {
    wavma.style.display = "block";
  }
});
