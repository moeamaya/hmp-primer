import bling from "./helpers/bling";
import interact from 'interactjs'

bling();
let plants = [];


const init = () => {
  const height = document.body.scrollHeight;
  const width = window.innerWidth;

  const sticky = $('.sticky')[0];
  const stickyRect = sticky.getBoundingClientRect()
  const baseline = stickyRect.top - window.innerHeight + stickyRect.height;
  const delta = height - baseline;
  const restriction = $('.plants')[0];

  setPlants(baseline, delta);
  setInteractables(width);
  setDrag(restriction);

  addEventListeners();
};

const setPlants = (baseline, delta) => {
  const plantNodes = $('.plant');

  plantNodes.forEach((node, index) => {
    const gate = delta / (plantNodes.length + 3);
    const obj = {
      target: baseline + (gate * index),
      node: node
    }
    plants.push(obj);
  });
};

const setInteractables = (width) => {
  const innerNodes = $('.inner');
  const gap = (width - (innerNodes.length * 200)) / (innerNodes.length - 1);

  innerNodes.forEach((node, index) => {
    const plantImageNode = $('.plant-image')[0].cloneNode(true);
    node.appendChild(plantImageNode);

    const space = (200 * index) + (gap * index);
    node.style.transform = 'translate(' + space + 'px, 0px)'
    node.setAttribute('data-x', space);
  });
}

const setDrag = (restriction) => {
  const plant = interact('.inner');

  plant.draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: restriction,
        endOnly: true
      })
    ],
    listeners: {
      move: dragMoveListener
    }
  })
}

const dragMoveListener = (event) => {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

const updateScroll = () => {
  target = window.scrollY || window.pageYOffset;

  const remove = [];
  plants.forEach((plant) => {
    if (target > plant.target) {
      plant.node.classList.add('animated');
      remove.push(plant);
    }
  });
  const newPlants = plants.filter((value) => {
    return !remove.includes(value)
  });
  

  plants = newPlants;
}

const addEventListeners = () => {
  window.addEventListener('scroll', updateScroll)
};


init();

