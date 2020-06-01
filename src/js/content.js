import "../css/content.css";
import bling from "./helpers/bling";
import nav from "./content/nav";
import canvas from "./content/canvas";
import options from "./content/options";
bling();

const style = `
  position: fixed;
  top: 0;
  right: 0;
  width: 560px;
  height: 100%;
  z-index: 9999999;
  background-color: #ffffff;
  box-shadow: 0 0 20px -5px rgba(0,0,0,0.1);
  transform: translateZ(0);
`;

const init = () => {
  console.log("init");
  render();
};

const render = () => {
  const div = document.createElement("div");
  div.style = style;
  div.classList.add("wavma");
  document.body.appendChild(div);

  // render plugin
  nav(div);
  canvas(div);
  options(div);
};

init();
