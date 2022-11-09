import bling from "./helpers/bling";

bling();
let plants = [];


const init = () => {
  const height = document.body.scrollHeight;
  const sticky = $('.sticky')[0];
  const stickyRect = sticky.getBoundingClientRect()
  const baseline = stickyRect.top - window.innerHeight + stickyRect.height;
  const delta = height - baseline;
  console.log(delta);

  setPlants(baseline, delta);

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

