import render from "../helpers/render";
import { writing } from "./writing";

export default function(div, zoom) {
  renderSVG(div);

  chrome.storage.local.get(['svg'], function (result) {
    let vector = writing;
    if (result && result.svg) {
      vector = result.svg
    }
    const svg = document.getElementById("svg");

    svg.innerHTML = vector;
    zoom.setZoom();
  });
}

const renderSVG = (div) => {
  const canvasStyle = `
    position: relative;
    width: 100%;
    height: 100%;
    background: #F4F4F5;
    border-bottom: 1px solid #E1E2EA;
    margin: 0;
    overflow: hidden;
    transform-origin: center;
  `;

  const artboardStyle = `
    position: relative;
    margin: 0;
  `;

  render(
    div,
    /*html*/ `
    <div style="${canvasStyle}" class="wavma-canvas">
    <div class="canvas-zoom">
      <div id="svg" style="${artboardStyle}">

      </div>
    </div>
    </div>
  `
  );

  const svg = document.getElementById("svg");
  const texts = Array.from(svg.querySelectorAll("text"));
  texts.forEach((text) => {
    const size = text.getAttribute("font-size");
    if (size) text.style.fontSize = size;
  });
}



// if (text.classList.contains("replace")) {
//   const width = text.getBoundingClientRect().width;
//   // text.style.display = "none";

//   text.insertAdjacentHTML("afterend", textArea(text.textContent.trim()));
//   const fontSize = text.getAttribute("font-size");
//   const fill = text.getAttribute("fill");

//   const tspan = text.querySelector("tspan");
//   const x = tspan.getAttribute("x");
//   const y = parseFloat(tspan.getAttribute("y")) - fontSize + 1;

//   const fObject = text.nextElementSibling;
//   fObject.setAttribute("x", x);
//   fObject.setAttribute("y", y);
//   fObject.setAttribute("width", width);
//   const textarea = fObject.querySelector("textarea");
//   textarea.style.fontSize = fontSize;
//   textarea.style.color = fill;
//   textarea.setAttribute("rows", text.querySelectorAll("tspan").length);

//   text.remove();
// }
