import interact from 'interactjs'


const hmpShelf = (images, sticky, restriction, className) => {
  console.log('lets ride');
  let plants = [];

  const init = () => {
    const height = document.body.scrollHeight;

    const stickyRect = sticky.getBoundingClientRect()
    const baseline = stickyRect.top - window.innerHeight + stickyRect.height;
    const delta = height - baseline;

    setPlantPositions(baseline, delta);
    setParentWidth();
    setDrag(restriction, className);

    addEventListeners();
  };

  const generateGates = () => {
    const base = [];

    images.forEach((image, index) => {base.push(index)});

    return base.sort(() => (Math.random() > 0.5) ? 1 : -1);
  }

  const setPlantPositions = (baseline, delta) => {
    const gates = generateGates();

    images.forEach((node, index) => {
      const gate = delta / (images.length + (images.length / 1.5));
      const obj = {
        target: baseline + (gate * gates[index]),
        node: document.querySelector(`#${node.image}`)
      }
      plants.push({...node, ...obj});
    });
  };

  const setParentWidth = () => {
    plants.forEach((plant) => {
      const parent = plant.node.parentNode;
      const width = plant.node.offsetWidth;

      parent.style.width = width + 'px';
    });
  };

  const setDrag = (restriction, className) => {
    const plant = interact(className).styleCursor(false);

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