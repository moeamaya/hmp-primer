export default function() {
  let canvas;
  let canvasRect;
  let canvasX;
  let canvasY;
  let svg;
  let node;

  let scale = 1;
  window.scale = scale;
  let xoff = 0;
  let yoff = 0;
  let start = {
    x: 0,
    y: 0,
  };

  const init = () => {
    canvas = $(".wavma-canvas")[0];
    canvasRect = canvas.getBoundingClientRect();
    canvasX = canvasRect.x;
    canvasY = canvasRect.y;

    node = document.querySelector(".canvas-zoom");

    addEventListeners();
  };

  const setZoom = () => {
    svg = canvas.querySelector("svg");
    const svgRect = {
      width: parseFloat(svg.getAttribute("width")),
      height: parseFloat(svg.getAttribute("height")),
    };

    const deltaWidth = (canvasRect.width - 40) / svgRect.width;
    const deltaHeight = (canvasRect.height - 100) / svgRect.height;

    console.log(canvasRect.height, svgRect.height);
    console.log(deltaHeight);

    scale = deltaWidth < deltaHeight ? deltaWidth : deltaHeight;

    xoff = Math.abs(canvasRect.width - svgRect.width * scale) / 2;
    yoff = Math.abs(canvasRect.height - svgRect.height * scale - 50) / 2;

    render();
  };

  function scaleFactor(scale) {
    return Math.sqrt(scale) * 0.02;
  }

  function render() {
    window.requestAnimationFrame(() => {
      node.style.transform = `translate3d(${xoff}px,${yoff}px,0px) scale(${scale})`;
    });
  }

  const addEventListeners = () => {
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();

        if (e.ctrlKey) {
          const xs = (e.clientX - canvasX - xoff) / scale;
          const ys = (e.clientY - canvasY - yoff) / scale;

          scale -= e.deltaY * scaleFactor(scale);

          scale = scale > 0.1 ? scale : 0.1;
          scale = scale < 50 ? scale : 50;
          window.scale = scale;

          xoff = e.clientX - canvasX - xs * scale;
          yoff = e.clientY - canvasY - ys * scale;
        } else {
          xoff -= e.deltaX - start.x * scale;
          yoff -= e.deltaY - start.y * scale;
        }

        window.scale = scale;
        render();
      },
      { passive: false }
    );

    window.addEventListener(
      "wheel",
      (e) => {
        (e.ctrlKey || e.metaKey) && e.preventDefault();
      },
      { passive: false }
    );

    canvas.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });

    canvas.addEventListener("gesturechange", function(e) {
      e.preventDefault();
    });

    canvas.addEventListener("gestureend", function(e) {
      e.preventDefault();
    });
  };

  return {
    init,
    setZoom,
  };
}
