import render from "../helpers/render";
import { writing } from "./writing";

export default function(div, zoom) {
  renderSVG(div);

  chrome.storage.local.get(["svg"], function(result) {
    let vector = writing;
    if (result && result.svg) {
      vector = result.svg;
    }
    const shadow = $('#ShadowWavma')[0].shadowRoot;
    const svg = shadow.getElementById("svg");
    svg.innerHTML = vector;

    const element = shadow.querySelector("#svg svg");
    zoom.element(element);
  });
}

const renderAlert = () => {
  return /*html*/ `
    <div class="wavma-alert js-alert" style="display:none">
      <div class="js-alert-inner"></div>
      <div class="wavma-alert__close js-alert-close">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L9 9" stroke="#E5E5E5" stroke-width="1.25"/>
        <path d="M9 1L1 9" stroke="#E5E5E5" stroke-width="1.25"/>
        </svg>
      </div>
    </div>
  `;
};

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
    width: 100%;
    height: 100%;
  `;

  render(
    div,
    /*html*/ `
    <div style="${canvasStyle}" class="wavma-canvas">
      ${renderAlert()}
      <div id="svg" style="${artboardStyle}">

      </div>
    </div>
  `
  );

  const shadow = $('#ShadowWavma')[0].shadowRoot;
  const svg = shadow.getElementById("svg");
  const texts = Array.from(svg.querySelectorAll("text"));
  texts.forEach((text) => {
    const size = text.getAttribute("font-size");
    if (size) text.style.fontSize = size;
  });

  $(".js-alert-close").on(
    "click",
    () => ($(".js-alert")[0].style.display = "none")
  );
};

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
