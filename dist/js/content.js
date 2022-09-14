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

  // src/js/helpers/render.js
  function render_default(relEl, template) {
    if (!relEl)
      return;
    const range = document.createRange();
    range.selectNode(relEl);
    const child = range.createContextualFragment(template);
    return relEl.appendChild(child);
  }

  // src/js/content/nav.js
  function nav_default(div, zoom, getFontState2) {
    const navStyle = `
    display:flex;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 0 16px;
    border-bottom: 1px solid #E1E2EA;
  `;
    render_default(
      div,
      `
    <div style="${navStyle}" class="wavma-nav">
      <div style="margin:0">
        <svg width="79" height="22" viewBox="0 0 79 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.41555 0.280007L7.21565 10.7696L10.6619 0.280007H14.0221L17.4683 10.7696L20.2684 0.280007H24.684L19.8377 16.5206H15.5298L12.342 7.10795L9.15418 16.5206H4.84633L0 0.280007H4.41555Z" fill="#0018ED"/>
          <path d="M30.2196 15.2929L28.3241 9.88651L26.4287 15.2929H30.2196ZM31.3396 18.5022H25.3086L24.3394 21.3239H19.8377L26.0194 5.08326H30.6288L36.8106 21.3239H32.3089L31.3396 18.5022Z" fill="#0018ED"/>
          <path d="M35.2693 0L39.1895 9.88652L43.1312 0H47.719L40.8695 16.2406H37.5094L30.6815 0H35.2693Z" fill="#0018ED"/>
          <path d="M72.409 6.03099L70.5135 11.4373L68.6181 6.03099H72.409ZM73.529 2.82164H67.498L66.5288 1.14119e-06H62.0271L68.2088 16.2406H72.8182L79 1.14119e-06H74.4983L73.529 2.82164Z" fill="#0018ED"/>
          <path d="M46.8586 21.6733L49.6587 11.1837L53.105 21.6733H56.4652L59.9114 11.1837L62.7115 21.6733H67.1271L62.2808 5.43268H57.9729L54.7851 14.8453L51.5973 5.43268H47.2894L42.4431 21.6733H46.8586Z" fill="#0018ED"/>
        </svg>
      </div>
      <div style="margin-left:auto;display:flex">
        <div id="wavma-export" class="wavma-export" style="display:none">Export</div>
        <div class="wavma-help js-help">Help Docs</div>
        <label class="wavma-label" for="wavma-upload">
          <div>Upload SVG</div>
          <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 11V2" stroke="#0018ED" stroke-width="1.25"/>
            <path d="M1 5.5L5 1.5L9 5.5" stroke="#0018ED" stroke-width="1.25"/>
          </svg>
        </label>
        <input id="wavma-upload" class="js-image-input" type="file" accept="image/svg+xml" style="display:none">
      </div>
    </div>
  `
    );
    const triggerFile = (e) => {
      $(".js-alert")[0].style.display = "none";
      const file = e.target.files[0];
      loadFile(file);
    };
    const loadFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const html = e.target.result;
        const size = e.total;
        if (size >= 5e6) {
          showSizeAlert(size);
        } else {
          chrome.storage.local.set({ svg: html }, function(result) {
          });
        }
        const svg = document.getElementById("svg");
        svg.innerHTML = html;
        const texts = Array.from(svg.querySelectorAll("text"));
        if (texts.length === 0) {
          showTextAlert();
        } else {
          texts.forEach((text) => {
            const size2 = text.getAttribute("font-size");
            if (size2)
              text.style.fontSize = size2;
          });
        }
        const element = $("#svg svg")[0];
        zoom.element(element);
      };
      reader.readAsText(file);
    };
    const downloadFile = (e) => {
      const font = getFontState2();
      const parent = document.getElementById("svg");
      const svg = parent.querySelector("svg");
    };
    const goToHelp = (e) => {
      window.open("https://wavma.com/alpha", "_blank");
    };
    $("#wavma-upload")[0].on("change", triggerFile);
    $("#wavma-export")[0].on("click", downloadFile);
    $(".js-help")[0].on("click", goToHelp);
  }
  var showSizeAlert = (size) => {
    const alert = $(".js-alert")[0];
    alert.style.display = "block";
    const html = `
      <div class="wavma-alert__content">
        <h5>Warning</h5>
        <p style="margin:8px 0 0">SVG file uploaded but not saved</p>
      </div>
      <div class="wavma-alert__details">
        <div class="wavma-alert__detail" style="margin-right:1rem">
          <h5>Size Limit</h5>
          <p>5MB</p>
        </div>
        <div class="wavma-alert__detail">
          <h5>Uploaded Size</h5>
          <p style="color:#FF5B20">${formatBytes(size)}</p>
        </div>
      </div>
  `;
    alert.querySelector(".js-alert-inner").innerHTML = html;
  };
  var showTextAlert = () => {
    const alert = $(".js-alert")[0];
    alert.style.display = "block";
    const html = `
      <div class="wavma-alert__content">
        <h5>Warning</h5>
        <p style="margin:8px 0 0">No <span style="color:#FF5B20">text</span> elements found in the SVG file. Please export without outlining text.</p>
      </div>
  `;
    alert.querySelector(".js-alert-inner").innerHTML = html;
  };
  var formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  };

  // src/js/content/writing.js
  var writing = `
  <svg width="800" height="1000" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="1000" fill="white"/>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="16" letter-spacing="0em"><tspan x="100" y="703.484">One of the principles of durable typography is always legibility; another is something </tspan><tspan x="100" y="729.084">more than legibility: some earned or unearned interest that gives its living energy to </tspan><tspan x="100" y="754.684">the page. It takes various forms and goes by various names, including serenity, </tspan><tspan x="100" y="780.284">liveliness, laughter, grace and joy</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="20" letter-spacing="0em"><tspan x="100" y="663.105">Durable Typography</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="100" y="820.674">&#x2014; Legibility</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="43.9953" letter-spacing="-0.04em"><tspan x="100" y="172.828">Typography exists to honor </tspan><tspan x="100" y="221.223">content</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="18.5" letter-spacing="0em"><tspan x="100" y="270.748">Like oratory, music, dance, calligraphy - like anything that lends its grace </tspan><tspan x="100" y="296.648">to language - typography is an art that can be deliberately misused. It is </tspan><tspan x="100" y="322.548">a craft by which the meanings of a text (or its absence of meaning) can </tspan><tspan x="100" y="348.448">be clarified, honored and shared, or knowingly disguised. </tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="16" letter-spacing="0em"><tspan x="100" y="121.484">First Principles</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="16" letter-spacing="0em"><tspan x="100" y="396.484">In a world rife with unsolicited messages, typography must often draw attention to </tspan><tspan x="100" y="422.084">itself before it will be read. Yet in order to be read, it must relinquish the attention it </tspan><tspan x="100" y="447.684">has drawn. Typography with anything to say therefore aspires to a kind of </tspan><tspan x="100" y="473.284">statuesque transparency. Its other traditional goal is durability: not immunity to </tspan><tspan x="100" y="498.884">change, but a clear superiority to fashion.</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="22" font-style="italic" font-weight="bold" letter-spacing="0em"><tspan x="100" y="554.916">Typography at its best is a visual form of language </tspan><tspan x="100" y="585.716">linking timelessness and time. </tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="100" y="851.674">&#x2014;  Interest</tspan></text>
  <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Arial" font-size="14" letter-spacing="0em"><tspan x="100" y="882.674">&#x2014;  Liveliness</tspan></text>
  </svg>
`;

  // src/js/content/canvas.js
  function canvas_default(div, zoom) {
    renderSVG(div);
    chrome.storage.local.get(["svg"], function(result) {
      let vector = writing;
      if (result && result.svg) {
        vector = result.svg;
      }
      const svg = document.getElementById("svg");
      svg.innerHTML = vector;
      const element = $("#svg svg")[0];
      zoom.element(element);
    });
  }
  var renderAlert = () => {
    return `
    <div class="wavma-alert js-alert" style="display:none">
      <div class="js-alert-inner"></div>
      <div class="wavma-alert__close js-alert-close">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L9 9" stroke="#E5E5E5" stroke-width="1.25"/>
        <path d="M9 1L1 9" stroke="#E5E5E5" stroke-width="1.25"/>
        </svg>
      </div>
    </div>
  `;
  };
  var renderSVG = (div) => {
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
    width: 100%;
    height: 100%;
  `;
    render_default(
      div,
      `
    <div style="${canvasStyle}" class="wavma-canvas">
      ${renderAlert()}
      <div id="svg" style="${artboardStyle}">

      </div>
    </div>
  `
    );
    const svg = document.getElementById("svg");
    const texts = Array.from(svg.querySelectorAll("text"));
    texts.forEach((text) => {
      const size = text.getAttribute("font-size");
      if (size)
        text.style.fontSize = size;
    });
    $(".js-alert-close").on(
      "click",
      () => $(".js-alert")[0].style.display = "none"
    );
  };

  // src/js/content/options.js
  function options_default(div, setFontState2, zoom) {
    const renderWebsiteStyles = () => {
      const websiteStyle = `
      min-height: 100%;
    `;
      const reloadStyle = `
      background: #fff;
      font-family: sans-serif;
      color: #0018ED;
      border-bottom: 1px solid #EDEEF2;
      padding: 12px 8px;
    `;
      return `
      <div style="${websiteStyle}">
        <div style="${reloadStyle}">
          <div class="wavma-options__reload-button js-reload">Reset template <span class="wavma-options__reload-button-icon js-reload-icon">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 7.75C9.5 10.0972 7.59721 12 5.25 12C2.90279 12 1 10.0972 1 7.75C1 5.40279 2.90279 3.5 5.25 3.5" stroke="#0018ED" stroke-width="1.25"/>
            <path d="M5 0.5V6.5L8 3.5L5 0.5Z" fill="#0018ED"/>
            </svg>
          </span></div>
        </div>
        <div class="font-list">
          <h5>Font families</h5>
          <ul class="fonts js-fonts"></ul>
          <h5 style="display:none">Colors</h5>
          <ul class="colors js-colors"></ul>
        </div>
      </div>
    `;
    };
    render_default(
      div,
      `
    <div class="wavma-options">
        ${renderWebsiteStyles()}
      </div>
    </div>
  `
    );
    $(".js-search").on("click", searchStyles);
    $(".js-fonts").on("click", (e) => setFontFamily(e, setFontState2));
    $(".js-reload").on("click", (e) => {
      resetTemplate(zoom);
      animateReset();
    });
    const searchFonts = () => {
      searchFontFaces();
    };
    return { searchFonts };
  }
  var resetTemplate = (zoom) => {
    console.log("getting called?");
    const svg = document.getElementById("svg");
    svg.innerHTML = writing;
    const element = $("#svg svg")[0];
    zoom.element(element);
    chrome.storage.local.remove("svg");
  };
  var animateReset = () => {
    const reloadIcon = $(".js-reload-icon")[0];
    removeActive();
    reloadIcon.classList.add("rotate");
    setTimeout(() => reloadIcon.classList.remove("rotate"), 700);
  };
  var removeActive = (node) => {
    $(".wavma-font").forEach((item) => item.classList.remove("is-active"));
  };
  var setActive = (node) => {
    removeActive();
    node.classList.add("is-active");
  };
  var setFontFamily = (e, setFontState2) => {
    const target = e.target;
    const parent = target.parentNode;
    let node;
    if (target.classList.contains("wavma-font")) {
      node = target;
    } else if (parent.classList.contains("wavma-font")) {
      node = parent;
    }
    if (node) {
      setActive(node);
      const familyString = node.dataset.family;
      const family = hasNumber(familyString) ? `"${familyString}"` : familyString;
      const weight = node.dataset.weight;
      const svg = document.getElementById("svg");
      const texts = svg.getElementsByTagName("text");
      Array.from(texts).forEach((text) => {
        text.style.fontFamily = family;
        text.style.fontWeight = weight;
      });
      const textareas = svg.getElementsByTagName("textarea");
      Array.from(textareas).forEach((text) => text.style.fontFamily = family);
      setFontState2(family);
    }
  };
  var searchStyles = () => {
    searchFontFaces();
  };
  var capitalize = (s) => {
    if (typeof s !== "string")
      return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  var hasNumber = (myString) => {
    return /\d/.test(myString);
  };
  var renderFonts = (fonts) => {
    const fontsList = $(".js-fonts")[0];
    const fontsHTML = fonts.map((font) => {
      return `
      <li class="wavma-font" data-family="${font.family}" data-weight="${font.weight}">
        ${capitalize(font.family)} <span>${font.weight}</span>
      </li>
    `;
    }).join("");
    fontsList.innerHTML = fontsHTML;
  };
  var searchFontFaces = () => {
    document.fonts.ready.then((fonts) => {
      const fontFaces = Array.from(fonts);
      renderFonts(fontFaces);
    });
  };

  // node_modules/@wavma/enhance/dist/enhance.js
  var disableDefault = (e) => {
    (e.ctrlKey || e.metaKey) && e.preventDefault();
  };
  function drag_default(parent, state, render2) {
    let active = false;
    let pan = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    const start = (e) => {
      if (!pan)
        return;
      parent.style.cursor = "grabbing";
      initialX = e.clientX - state.xoff;
      initialY = e.clientY - state.yoff;
      active = true;
    };
    const end = (e) => {
      if (!pan)
        return;
      parent.style.cursor = "grab";
      initialX = currentX;
      initialY = currentY;
      active = false;
    };
    const move = (e) => {
      if (active && pan) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        state.xoff = currentX;
        state.yoff = currentY;
        render2();
      }
    };
    const setParentCursor = (panning) => {
      panning ? parent.style.cursor = "grab" : parent.style.cursor = "default";
    };
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
      }
      if (e.code === "Space" && !pan) {
        setParentCursor(true);
        pan = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "Space" && pan) {
        e.preventDefault();
        setParentCursor(false);
        pan = false;
      }
    });
    return { start, end, move };
  }
  function zoom_default(parent, state, render2, pbox) {
    let focus = false;
    const SVG = () => {
      let svg2;
      const init2 = () => {
        svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.style = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      `;
        parent.appendChild(svg2);
        addEventListeners2();
      };
      const svgPoint = (elem, x, y) => {
        let p = svg2.createSVGPoint();
        p.x = x;
        p.y = y;
        return p.matrixTransform(elem.getScreenCTM().inverse());
      };
      const handleMouseDown = (event) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const start = svgPoint(svg2, event.clientX, event.clientY);
        const color = "#0018ed";
        const drawRect = (e) => {
          let p = svgPoint(svg2, e.clientX, e.clientY);
          let w = Math.abs(p.x - start.x);
          let h = Math.abs(p.y - start.y);
          if (p.x > start.x) {
            p.x = start.x;
          }
          if (p.y > start.y) {
            p.y = start.y;
          }
          rect.setAttributeNS(null, "x", Math.round(p.x));
          rect.setAttributeNS(null, "y", Math.round(p.y));
          rect.setAttributeNS(null, "width", Math.round(w));
          rect.setAttributeNS(null, "height", Math.round(h));
          rect.setAttributeNS(null, "fill", color);
          rect.setAttributeNS(null, "fill-opacity", "0.2");
          rect.setAttributeNS(null, "stroke", color);
          rect.setAttributeNS(null, "stroke-width", "0.75");
          svg2.appendChild(rect);
        };
        const endDraw = (e) => {
          const check = rect.getAttribute("width") > 0 && rect.getAttribute("height") > 0;
          if (check)
            transformZoomWindow(rect);
          svg2.removeEventListener("mousemove", drawRect);
          svg2.removeEventListener("mouseup", endDraw);
          svg2.remove();
        };
        svg2.addEventListener("mousemove", drawRect);
        svg2.addEventListener("mouseup", endDraw);
      };
      const addEventListeners2 = () => {
        svg2.addEventListener("mousedown", handleMouseDown);
      };
      const destroy = () => {
        svg2.removeEventListener("mousedown", handleMouseDown);
        svg2.remove();
      };
      return { init: init2, destroy };
    };
    let svg = SVG();
    const transformZoomWindow = (element) => {
      const el = element.cloneNode();
      const pointX = parseFloat(element.getAttribute("x"));
      const pointY = parseFloat(element.getAttribute("y"));
      const newX = (pointX - state.xoff) / state.scale;
      const newY = (pointY - state.yoff) / state.scale;
      const newW = parseFloat(element.getAttribute("width")) / state.scale;
      const newH = parseFloat(element.getAttribute("height")) / state.scale;
      el.setAttribute("x", newX);
      el.setAttribute("y", newY);
      el.setAttribute("width", newW);
      el.setAttribute("height", newH);
      setZoom({
        x: newX,
        y: newY,
        width: newW,
        height: newH
      });
    };
    const setZoom = (box = {}) => {
      const deltaWidth = pbox.width / box.width;
      const deltaHeight = pbox.height / box.height;
      if (deltaWidth < deltaHeight) {
        state.scale = deltaWidth;
        state.xoff = pbox.width - (box.width + box.x) * state.scale;
        state.yoff = pbox.height / 2 - (box.height + box.y) * state.scale + box.height / 2 * state.scale;
      } else {
        state.scale = deltaHeight;
        state.xoff = pbox.width / 2 - (box.width + box.x) * state.scale + box.width / 2 * state.scale;
        state.yoff = pbox.height - (box.height + box.y) * state.scale;
      }
      render2();
    };
    const setParentCursor = (focusing) => {
      focusing ? parent.style.cursor = "zoom-in" : parent.style.cursor = "default";
    };
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyZ" && !focus) {
        setParentCursor(true);
        focus = true;
        svg.init();
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyZ" && focus) {
        setParentCursor(false);
        focus = false;
        svg.destroy();
      }
    });
  }
  var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
  function addEvent(object, event, method) {
    if (object.addEventListener) {
      object.addEventListener(event, method, false);
    } else if (object.attachEvent) {
      object.attachEvent("on".concat(event), function() {
        method(window.event);
      });
    }
  }
  function getMods(modifier, key) {
    var mods = key.slice(0, key.length - 1);
    for (var i = 0; i < mods.length; i++) {
      mods[i] = modifier[mods[i].toLowerCase()];
    }
    return mods;
  }
  function getKeys(key) {
    if (typeof key !== "string")
      key = "";
    key = key.replace(/\s/g, "");
    var keys = key.split(",");
    var index = keys.lastIndexOf("");
    for (; index >= 0; ) {
      keys[index - 1] += ",";
      keys.splice(index, 1);
      index = keys.lastIndexOf("");
    }
    return keys;
  }
  function compareArray(a1, a2) {
    var arr1 = a1.length >= a2.length ? a1 : a2;
    var arr2 = a1.length >= a2.length ? a2 : a1;
    var isIndex = true;
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1)
        isIndex = false;
    }
    return isIndex;
  }
  var _keyMap = {
    backspace: 8,
    tab: 9,
    clear: 12,
    enter: 13,
    return: 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    delete: 46,
    ins: 45,
    insert: 45,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    capslock: 20,
    "\u21EA": 20,
    ",": 188,
    ".": 190,
    "/": 191,
    "`": 192,
    "-": isff ? 173 : 189,
    "=": isff ? 61 : 187,
    ";": isff ? 59 : 186,
    "'": 222,
    "[": 219,
    "]": 221,
    "\\": 220
  };
  var _modifier = {
    "\u21E7": 16,
    shift: 16,
    "\u2325": 18,
    alt: 18,
    option: 18,
    "\u2303": 17,
    ctrl: 17,
    control: 17,
    "\u2318": 91,
    cmd: 91,
    command: 91
  };
  var modifierMap = {
    16: "shiftKey",
    18: "altKey",
    17: "ctrlKey",
    91: "metaKey",
    shiftKey: 16,
    ctrlKey: 17,
    altKey: 18,
    metaKey: 91
  };
  var _mods = {
    16: false,
    18: false,
    17: false,
    91: false
  };
  var _handlers = {};
  for (k = 1; k < 20; k++) {
    _keyMap["f".concat(k)] = 111 + k;
  }
  var k;
  var _downKeys = [];
  var _scope = "all";
  var elementHasBindEvent = [];
  var code = function code2(x) {
    return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
  };
  function setScope(scope) {
    _scope = scope || "all";
  }
  function getScope() {
    return _scope || "all";
  }
  function getPressedKeyCodes() {
    return _downKeys.slice(0);
  }
  function filter(event) {
    var target = event.target || event.srcElement;
    var tagName = target.tagName;
    var flag = true;
    if (target.isContentEditable || (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
      flag = false;
    }
    return flag;
  }
  function isPressed(keyCode) {
    if (typeof keyCode === "string") {
      keyCode = code(keyCode);
    }
    return _downKeys.indexOf(keyCode) !== -1;
  }
  function deleteScope(scope, newScope) {
    var handlers;
    var i;
    if (!scope)
      scope = getScope();
    for (var key in _handlers) {
      if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
        handlers = _handlers[key];
        for (i = 0; i < handlers.length; ) {
          if (handlers[i].scope === scope)
            handlers.splice(i, 1);
          else
            i++;
        }
      }
    }
    if (getScope() === scope)
      setScope(newScope || "all");
  }
  function clearModifier(event) {
    var key = event.keyCode || event.which || event.charCode;
    var i = _downKeys.indexOf(key);
    if (i >= 0) {
      _downKeys.splice(i, 1);
    }
    if (event.key && event.key.toLowerCase() === "meta") {
      _downKeys.splice(0, _downKeys.length);
    }
    if (key === 93 || key === 224)
      key = 91;
    if (key in _mods) {
      _mods[key] = false;
      for (var k2 in _modifier) {
        if (_modifier[k2] === key)
          hotkeys[k2] = false;
      }
    }
  }
  function unbind(keysInfo) {
    if (!keysInfo) {
      Object.keys(_handlers).forEach(function(key) {
        return delete _handlers[key];
      });
    } else if (Array.isArray(keysInfo)) {
      keysInfo.forEach(function(info) {
        if (info.key)
          eachUnbind(info);
      });
    } else if (typeof keysInfo === "object") {
      if (keysInfo.key)
        eachUnbind(keysInfo);
    } else if (typeof keysInfo === "string") {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var scope = args[0], method = args[1];
      if (typeof scope === "function") {
        method = scope;
        scope = "";
      }
      eachUnbind({
        key: keysInfo,
        scope,
        method,
        splitKey: "+"
      });
    }
  }
  var eachUnbind = function eachUnbind2(_ref) {
    var key = _ref.key, scope = _ref.scope, method = _ref.method, _ref$splitKey = _ref.splitKey, splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey;
    var multipleKeys = getKeys(key);
    multipleKeys.forEach(function(originKey) {
      var unbindKeys = originKey.split(splitKey);
      var len = unbindKeys.length;
      var lastKey = unbindKeys[len - 1];
      var keyCode = lastKey === "*" ? "*" : code(lastKey);
      if (!_handlers[keyCode])
        return;
      if (!scope)
        scope = getScope();
      var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
      _handlers[keyCode] = _handlers[keyCode].map(function(record) {
        var isMatchingMethod = method ? record.method === method : true;
        if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
          return {};
        }
        return record;
      });
    });
  };
  function eventHandler(event, handler, scope) {
    var modifiersMatch;
    if (handler.scope === scope || handler.scope === "all") {
      modifiersMatch = handler.mods.length > 0;
      for (var y in _mods) {
        if (Object.prototype.hasOwnProperty.call(_mods, y)) {
          if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
            modifiersMatch = false;
          }
        }
      }
      if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
        if (handler.method(event, handler) === false) {
          if (event.preventDefault)
            event.preventDefault();
          else
            event.returnValue = false;
          if (event.stopPropagation)
            event.stopPropagation();
          if (event.cancelBubble)
            event.cancelBubble = true;
        }
      }
    }
  }
  function dispatch(event) {
    var asterisk = _handlers["*"];
    var key = event.keyCode || event.which || event.charCode;
    if (!hotkeys.filter.call(this, event))
      return;
    if (key === 93 || key === 224)
      key = 91;
    if (_downKeys.indexOf(key) === -1 && key !== 229)
      _downKeys.push(key);
    ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(keyName) {
      var keyNum = modifierMap[keyName];
      if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
        _downKeys.push(keyNum);
      } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
        _downKeys.splice(_downKeys.indexOf(keyNum), 1);
      } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
        if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
          _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
        }
      }
    });
    if (key in _mods) {
      _mods[key] = true;
      for (var k2 in _modifier) {
        if (_modifier[k2] === key)
          hotkeys[k2] = true;
      }
      if (!asterisk)
        return;
    }
    for (var e in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, e)) {
        _mods[e] = event[modifierMap[e]];
      }
    }
    if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
      if (_downKeys.indexOf(17) === -1) {
        _downKeys.push(17);
      }
      if (_downKeys.indexOf(18) === -1) {
        _downKeys.push(18);
      }
      _mods[17] = true;
      _mods[18] = true;
    }
    var scope = getScope();
    if (asterisk) {
      for (var i = 0; i < asterisk.length; i++) {
        if (asterisk[i].scope === scope && (event.type === "keydown" && asterisk[i].keydown || event.type === "keyup" && asterisk[i].keyup)) {
          eventHandler(event, asterisk[i], scope);
        }
      }
    }
    if (!(key in _handlers))
      return;
    for (var _i = 0; _i < _handlers[key].length; _i++) {
      if (event.type === "keydown" && _handlers[key][_i].keydown || event.type === "keyup" && _handlers[key][_i].keyup) {
        if (_handlers[key][_i].key) {
          var record = _handlers[key][_i];
          var splitKey = record.splitKey;
          var keyShortcut = record.key.split(splitKey);
          var _downKeysCurrent = [];
          for (var a2 = 0; a2 < keyShortcut.length; a2++) {
            _downKeysCurrent.push(code(keyShortcut[a2]));
          }
          if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
            eventHandler(event, record, scope);
          }
        }
      }
    }
  }
  function isElementBind(element) {
    return elementHasBindEvent.indexOf(element) > -1;
  }
  function hotkeys(key, option, method) {
    _downKeys = [];
    var keys = getKeys(key);
    var mods = [];
    var scope = "all";
    var element = document;
    var i = 0;
    var keyup = false;
    var keydown = true;
    var splitKey = "+";
    if (method === void 0 && typeof option === "function") {
      method = option;
    }
    if (Object.prototype.toString.call(option) === "[object Object]") {
      if (option.scope)
        scope = option.scope;
      if (option.element)
        element = option.element;
      if (option.keyup)
        keyup = option.keyup;
      if (option.keydown !== void 0)
        keydown = option.keydown;
      if (typeof option.splitKey === "string")
        splitKey = option.splitKey;
    }
    if (typeof option === "string")
      scope = option;
    for (; i < keys.length; i++) {
      key = keys[i].split(splitKey);
      mods = [];
      if (key.length > 1)
        mods = getMods(_modifier, key);
      key = key[key.length - 1];
      key = key === "*" ? "*" : code(key);
      if (!(key in _handlers))
        _handlers[key] = [];
      _handlers[key].push({
        keyup,
        keydown,
        scope,
        mods,
        shortcut: keys[i],
        method,
        key: keys[i],
        splitKey
      });
    }
    if (typeof element !== "undefined" && !isElementBind(element) && window) {
      elementHasBindEvent.push(element);
      addEvent(element, "keydown", function(e) {
        dispatch(e);
      });
      addEvent(window, "focus", function() {
        _downKeys = [];
      });
      addEvent(element, "keyup", function(e) {
        dispatch(e);
        clearModifier(e);
      });
    }
  }
  var _api = {
    setScope,
    getScope,
    deleteScope,
    getPressedKeyCodes,
    isPressed,
    filter,
    unbind
  };
  for (a in _api) {
    if (Object.prototype.hasOwnProperty.call(_api, a)) {
      hotkeys[a] = _api[a];
    }
  }
  var a;
  if (typeof window !== "undefined") {
    _hotkeys = window.hotkeys;
    hotkeys.noConflict = function(deep) {
      if (deep && window.hotkeys === hotkeys) {
        window.hotkeys = _hotkeys;
      }
      return hotkeys;
    };
    window.hotkeys = hotkeys;
  }
  var _hotkeys;
  var hotkeys_esm_default = hotkeys;
  function keyboard_default(state, render2, pbox) {
    hotkeys_esm_default("command+=,command+-,command+0", (e, handler) => {
      e.preventDefault();
      const clientX = pbox.width / 2;
      const clientY = pbox.height / 2;
      const xs = (clientX - state.xoff) / state.scale;
      const ys = (clientY - state.yoff) / state.scale;
      switch (handler.key) {
        case "command+=":
          state.scale *= 1.25;
          break;
        case "command+-":
          state.scale /= 1.25;
          break;
        case "command+0":
          state.scale = 1;
          break;
      }
      if (handler.key === "command+0") {
        state.xoff = xPos;
        state.yoff = yPos;
      } else {
        state.xoff = clientX - xs * state.scale;
        state.yoff = clientY - ys * state.scale;
      }
      render2();
      return false;
    });
  }
  function src_default(options = {}) {
    let parent = null;
    let opts = {};
    let pbox = {};
    const state = {
      scale: 1,
      element: null,
      xoff: 0,
      yoff: 0
    };
    const setup = () => {
      const defaults = {
        scale: "contain",
        max: 50,
        min: 0.1,
        position: "50 50",
        offset: 0,
        keyboard: true,
        trackpad: true,
        pan: false,
        window: false
      };
      opts = Object.assign(defaults, options);
      if (options.parent)
        init2(options.parent);
      if (options.element)
        element();
    };
    const init2 = (newParent) => {
      parent = newParent;
      pbox = getBBox(newParent);
      if (options.element)
        element();
      addEventListeners2();
    };
    const scaleFactor = (scale2) => {
      return Math.sqrt(scale2) * 0.02;
    };
    const getBBox = (el) => {
      if (el instanceof SVGElement) {
        return {
          x: parseFloat(el.getAttribute("x")) || 0,
          y: parseFloat(el.getAttribute("y")) || 0,
          width: parseFloat(el.getAttribute("width")),
          height: parseFloat(el.getAttribute("height"))
        };
      }
      return el.getBoundingClientRect();
    };
    const setElementSize = (el) => {
      let x, y, width, height;
      ({ x, y, width, height } = getBBox(el));
      setSize({ x, y, width, height });
    };
    const setSize = (box = {}) => {
      const deltaWidth = (pbox.width - opts.offset * 2) / box.width;
      const deltaHeight = (pbox.height - options.offset * 2) / box.height;
      if (deltaWidth < deltaHeight) {
        state.scale = deltaWidth;
        state.xoff = pbox.width - (box.width - box.x) * state.scale - opts.offset;
        state.yoff = (pbox.height - box.height * state.scale) / 2;
      } else {
        state.scale = deltaHeight;
        state.xoff = (pbox.width - box.width * state.scale) / 2;
        state.yoff = pbox.height - box.height * state.scale - opts.offset;
      }
      render2();
    };
    const touchPanZoom = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const xs = (e.clientX - pbox.x - state.xoff) / state.scale;
        const ys = (e.clientY - pbox.y - state.yoff) / state.scale;
        state.scale -= e.deltaY * scaleFactor(state.scale);
        state.scale = Math.min(Math.max(state.scale, opts.min), opts.max);
        state.xoff = e.clientX - pbox.x - xs * state.scale;
        state.yoff = e.clientY - pbox.y - ys * state.scale;
      } else {
        state.xoff -= e.deltaX;
        state.yoff -= e.deltaY;
      }
      render2();
    };
    const addEventListeners2 = () => {
      window.addEventListener("wheel", disableDefault, { passive: false });
      parent.addEventListener("wheel", touchPanZoom, { passive: false });
      keyboard_default(state, render2, pbox);
      zoom_default(parent, state, render2, pbox);
      addDragListeners();
    };
    const addDragListeners = () => {
      const dragger = drag_default(parent, state, render2);
      parent.addEventListener("mousedown", dragger.start, false);
      parent.addEventListener("mousemove", dragger.move, false);
      parent.addEventListener("mouseup", dragger.end, false);
    };
    const render2 = () => {
      window.requestAnimationFrame(() => {
        state.element.style.transform = `translate3d(${state.xoff}px,${state.yoff}px,0px)
       scale(${state.scale})`;
      });
    };
    const element = (el, reset) => {
      if (!el)
        el = opts.element;
      state.element = el;
      if (!reset) {
        setElementSize(el);
      }
    };
    const scale = (factor) => {
    };
    setup();
    return {
      init: init2,
      element,
      scale
    };
  }

  // src/js/content.js
  bling_default();
  var started = false;
  var fontState = "";
  var init = () => {
  };
  var wavma = document.createElement("div");
  wavma.classList.add("wavma");
  var zm = src_default({ offset: 40 });
  var render = () => {
    document.body.appendChild(wavma);
    nav_default(wavma, zm, getFontState);
    const main = document.createElement("div");
    main.classList.add("wavma-main");
    wavma.appendChild(main);
    const opts = options_default(main, setFontState, zm);
    canvas_default(main, zm);
    opts.searchFonts();
    const parent = $(".wavma-canvas")[0];
    zm.init(parent);
  };
  var getFontState = () => fontState;
  var setFontState = (font) => {
    fontState = font;
  };
  var addEventListeners = () => {
    document.body.addEventListener("click", (e) => {
      const withinWavma = e.path.some((p) => {
        if (p.classList)
          return p.classList.contains("wavma");
      });
      if (!withinWavma)
        wavma.style.display = "none";
    });
  };
  init();
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender);
    let display = wavma.style.display;
    if (!started) {
      started = true;
      render();
      addEventListeners();
    } else if (display !== "none") {
      wavma.style.display = "none";
    } else {
      wavma.style.display = "block";
    }
  });
})();
/*!
 * hotkeys-js v3.8.1
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */
