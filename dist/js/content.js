(() => {
  // src/js/helpers/bling.js
  function bling_default() {
    window.$ = document.querySelectorAll.bind(document);
    Node.prototype.on = window.on = function(name, fn) {
      this.addEventListener(name, fn);
    };
    NodeList.prototype.__proto__ = Array.prototype;
    NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
      this.forEach(function(elem, i) {
        elem.on(name, fn);
      });
    };
  }

  // src/js/content.js
  bling_default();
  var plants = [];
  var init = () => {
    const height = document.body.scrollHeight;
    const sticky = $(".sticky")[0];
    const stickyRect = sticky.getBoundingClientRect();
    const baseline = stickyRect.top - window.innerHeight + stickyRect.height;
    const delta = height - baseline;
    console.log(delta);
    setPlants(baseline, delta);
    addEventListeners();
  };
  var setPlants = (baseline, delta) => {
    const plantNodes = $(".plant");
    plantNodes.forEach((node, index) => {
      const gate = delta / (plantNodes.length + 3);
      const obj = {
        target: baseline + gate * index,
        node
      };
      plants.push(obj);
    });
  };
  var updateScroll = () => {
    target = window.scrollY || window.pageYOffset;
    const remove = [];
    plants.forEach((plant) => {
      if (target > plant.target) {
        plant.node.classList.add("animated");
        remove.push(plant);
      }
    });
    const newPlants = plants.filter((value) => {
      return !remove.includes(value);
    });
    plants = newPlants;
  };
  var addEventListeners = () => {
    window.addEventListener("scroll", updateScroll);
  };
  init();
})();
