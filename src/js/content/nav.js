import render from "../helpers/render";

export default function(div, zoom, getFontState) {
  const navStyle = `
    display:flex;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 0 16px;
    border-bottom: 1px solid #E1E2EA;
  `;

  render(
    div,
    /*html*/ `
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
      if (size >= 5000000) {
        showSizeAlert(size);
      } else {
        chrome.storage.local.set({ svg: html }, function(result) {});
      }

      const svg = document.getElementById("svg");

      svg.innerHTML = html;
      const texts = Array.from(svg.querySelectorAll("text"));
      if (texts.length === 0) {
        showTextAlert();
      } else {
        texts.forEach((text) => {
          const size = text.getAttribute("font-size");
          if (size) text.style.fontSize = size;
        });
      }

      const element = $("#svg svg")[0];
      zoom.element(element);
    };
    reader.readAsText(file);
  };

  const downloadFile = (e) => {
    const font = getFontState();
    const parent = document.getElementById("svg");
    const svg = parent.querySelector("svg");
    // saveSvgAsPng(svg, `${slugify(font)}.png`, {
    //   scale: 1.0,
    // });

    // const svg = parent.innerHTML;
    // let blob = new Blob([svg], {
    //   type: "application/octet-stream",
    // });
    // let url = URL.createObjectURL(blob);
    // // location.href = url;
    // let image = document.createElement("img");
    // console.log(image);

    // image.src = url;
    // image.addEventListener(
    //   "load",
    //   (result) => {
    //     console.log(result);
    //     URL.revokeObjectURL(url);
    //     // $(".wavma-options")[0].prepend(result.currentTarget);
    //   },
    //   {
    //     once: true,
    //   }
    // );
  };

  const goToHelp = (e) => {
    window.open("https://www.notion.so/covaya/Wavma-Alpha-fc7d4a6d9e3c42bba0bb3b06f23becd3", "_blank");
  };

  $("#wavma-upload")[0].on("change", triggerFile);
  $("#wavma-export")[0].on("click", downloadFile);
  $(".js-help")[0].on("click", goToHelp);
}

const showSizeAlert = (size) => {
  const alert = $(".js-alert")[0];
  alert.style.display = "block";

  const html = /*html*/ `
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

const showTextAlert = () => {
  const alert = $(".js-alert")[0];
  alert.style.display = "block";

  const html = /*html*/ `
      <div class="wavma-alert__content">
        <h5>Warning</h5>
        <p style="margin:8px 0 0">No <span style="color:#FF5B20">text</span> elements found in the SVG file. Please export without outlining text.</p>
      </div>
  `;
  alert.querySelector(".js-alert-inner").innerHTML = html;
};

const searchText = () => {};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

const slugify = (string) => {
  return string
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

function getFonts(obj) {
  var o = obj || {},
    sheet = document.styleSheets,
    rule = null,
    i = sheet.length,
    j;
  while (0 <= --i) {
    rule = sheet[i].rules || sheet[i].cssRules || [];
    j = rule.length;
    while (0 <= --j) {
      if (rule[j].constructor.name === "CSSFontFaceRule") {
        if (!(rule[j].style.fontFamily in o))
          o[rule[j].style.fontFamily] = Object.create(null);
        o[rule[j].style.fontFamily][
          rule[j].style.fontWeight + "-" + rule[j].style.fontStyle
        ] = rule[j].style.src;
      }
    }
  }
  return o;
}
