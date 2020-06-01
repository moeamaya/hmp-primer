export default function() {
  const canvas = $(".canvas")[0];
  const canvasRect = canvas.getBoundingClientRect();
  const canvasX = canvasRect.x;
  const canvasY = canvasRect.y;

  const svg = $("#svg")[0];
  const svgRect = svg.getBoundingClientRect();
  const xPos = (canvasRect.width - svgRect.width) / 2;
  const yPos = (canvasRect.height - svgRect.height) / 2;

  const node = document.querySelector(".canvas-zoom");
  let scale = 1;
  window.scale = scale;
  let xoff = xPos;
  let yoff = yPos;
  let start = {
    x: 0,
    y: 0,
  };

  function scaleFactor(scale) {
    return scale * 0.04;
  }

  function render() {
    window.requestAnimationFrame(() => {
      node.style.transform = `translate3d(${xoff}px,${yoff}px,0px) scale(${scale})`;
    });
  }

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (e.ctrlKey) {
        const xs = (e.clientX - canvasX - xoff) / scale;
        const ys = (e.clientY - canvasY - yoff) / scale;

        let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        delta > 0
          ? (scale += scaleFactor(scale))
          : (scale -= scaleFactor(scale));

        scale = scale > 0.1 ? scale : 0.1;
        scale = scale < 50 ? scale : 50;
        window.scale = scale;

        xoff = e.clientX - canvasX - xs * scale;
        yoff = e.clientY - canvasY - ys * scale;
      } else {
        xoff -= e.deltaX - start.x * scale;
        yoff -= e.deltaY - start.y * scale;
      }

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

  render();
}
