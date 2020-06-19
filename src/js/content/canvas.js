import render from "../helpers/render";
import { cny } from "./cny";

export default function(div) {
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

  const svgStyle = `
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
  `;

  const textArea = (text) => {
    return /*html*/ `
    <foreignObject class="fObject" width="367" height="1"
      style="font-family:Arial;overflow:visible
    ">
      <textarea spellcheck="false" style="
        font-size: inherit;
        font-family: inherit;
        border: none;
        padding: 0;
        margin: 0;
        background: transparent;
        width: 100%;
        outline: none !important;
        line-height: 1.4;
        resize: none;
      ">${text}</textarea>
    </foreignObject>
  `;
  };

  render(
    div,
    /*html*/ `
    <div style="${canvasStyle}" class="wavma-canvas">
    <div class="canvas-zoom">
      <div id="svg" style="${artboardStyle}">
        ${cny}
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

    if (text.classList.contains("replaceXXX")) {
      const width = text.getBoundingClientRect().width;
      // text.style.display = "none";

      text.insertAdjacentHTML("afterend", textArea(text.textContent.trim()));
      const fontSize = text.getAttribute("font-size");
      const fill = text.getAttribute("fill");

      const tspan = text.querySelector("tspan");
      const x = tspan.getAttribute("x");
      const y = parseFloat(tspan.getAttribute("y")) - fontSize + 1;

      const fObject = text.nextElementSibling;
      fObject.setAttribute("x", x);
      fObject.setAttribute("y", y);
      fObject.setAttribute("width", width);
      const textarea = fObject.querySelector("textarea");
      textarea.style.fontSize = fontSize;
      textarea.style.color = fill;
      textarea.setAttribute("rows", text.querySelectorAll("tspan").length);

      text.remove();
    }
  });
}
