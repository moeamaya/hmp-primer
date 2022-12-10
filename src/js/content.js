import bling from "./helpers/bling";
import interact from 'interactjs'


const hmpShelf = (images) => {
  console.log('lets ride');
  bling();
  let plants = [];

  const init = () => {
    const height = document.body.scrollHeight;
    // const width = window.innerWidth;

    const sticky = $('.sticky')[0];
    const stickyRect = sticky.getBoundingClientRect()
    const baseline = stickyRect.top - window.innerHeight + stickyRect.height;
    const delta = height - baseline;
    const restriction = $('.plants')[0];
    const width = restriction.getBoundingClientRect().width;

    setPlantPositions(restriction, baseline, delta);
    setInteractables(width);
    setDrag(restriction);

    addEventListeners();
  };

  const createPlantNode = (restriction) => {
    const node = document.createElement('div');
    node.classList.add('plant');
    const inner = document.createElement('div');
    inner.classList.add('inner');
    node.appendChild(inner);
    restriction.appendChild(node);

    return node;
  };

  const generateGates = () => {
    const base = [];

    images.forEach((image, index) => {base.push(index)});

    return base.sort(() => (Math.random() > 0.5) ? 1 : -1);
  }

  const setPlantPositions = (restriction, baseline, delta) => {
    const gates = generateGates();

    images.forEach((node, index) => {
      const gate = delta / (images.length + (images.length / 1.5));
      const obj = {
        target: baseline + (gate * gates[index]),
        node: createPlantNode(restriction)
      }
      plants.push({...node, ...obj});
    });
  };

  const setInteractables = (width) => {
    plants.forEach((plant, index) => {
      const inner = plant.node.querySelector('.inner');
      const image = $(`#${plant.image}`)[0];
      
      const plantImageNode = image.cloneNode(true);
      inner.appendChild(plantImageNode);
      plantImageNode.style.bottom = plant.bottom;

      plant.node.style.left = plant.left;
      plant.node.style.right = plant.right;
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
}

window.hmpShelf = hmpShelf;