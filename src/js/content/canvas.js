import render from "../helpers/render";
import zoom from "../helpers/zoom";

export default function(div) {
  const canvasStyle = `
    position: relative;
    height: 360px;
    background: #F4F4F5;
    border-bottom: 1px solid #E1E2EA;
    overflow: hidden;
    transform-origin: center;
  `;

  const artboardStyle = `
    position: relative;
    width: 500px;
    height: 300px;
    background: #fff;
  `;

  const textareaStyle = `
    position: relative;
    width: 100%;
    color: #000;
    background: transparent;
    padding: 2rem;
    font-size: 40px;
    line-height: 1.2;
    border: none;
    resize: none;
    z-index: 1;
  `;
  const svgStyle = `
    position: absolute;
    top: 0;
    left: 0;
  `;

  render(
    div,
    /*html*/ `
    <div style="${canvasStyle}" class="canvas">
    <div class="canvas-zoom">
      <div id="svg" style="${artboardStyle}">
        <textarea rows="4" style="${textareaStyle}" spellcheck="false" class="js-textarea">Copal
Dimensions
Dwellito
Mythopedia</textarea>
        <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="${svgStyle}">
          <rect width="500" height="300" fill="#A6FFDF"/>
          <path d="M83.9999 177.989H172.176L109.934 109.264H172.176L109.934 44.4286L172.176 44.4286L109.934 -23L320 -23" stroke="white" stroke-width="31.1209"/>
          <path d="M320 43.132L218.857 43.132" stroke="white" stroke-width="31.1209"/>
          <circle r="37.6044" transform="matrix(-1 0 0 1 269.429 137.792)" stroke="white" stroke-width="31.1209"/>
          <path d="M417.562 180C408.748 180 400.133 182.613 392.805 187.51C385.477 192.407 379.765 199.366 376.392 207.509C373.019 215.651 372.137 224.611 373.856 233.255C375.576 241.899 379.82 249.84 386.052 256.072C392.284 262.304 400.224 266.548 408.868 268.267C417.512 269.987 426.472 269.104 434.615 265.731C442.757 262.359 449.717 256.647 454.614 249.319C459.51 241.991 462.124 233.375 462.124 224.562" stroke="black" stroke-width="15"/>
          <path d="M417.562 202.006C421.805 202.006 425.953 203.264 429.482 205.622C433.01 207.979 435.76 211.33 437.384 215.251C439.008 219.171 439.433 223.485 438.605 227.647C437.777 231.809 435.734 235.632 432.733 238.633C429.732 241.633 425.909 243.677 421.747 244.505C417.585 245.333 413.271 244.908 409.351 243.284C405.43 241.66 402.079 238.91 399.722 235.382C397.364 231.853 396.106 227.705 396.106 223.461" stroke="black" stroke-width="15"/>
        </svg>
      </div>
    </div>
    </div>
  `
  );

  zoom();
}
