const container = document.querySelector("#grid-container");
const gridlinesCheckbox = document.querySelector("#gridlines");

const dimensions = 16;
let penColor = "#000000";
let isMouseClicked = false;

function createDrawingArea(side) {
  for (let i = 0; i < side; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < side; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("drawing-pixel");
      row.appendChild(pixel);
    }

    container.appendChild(row);
  }
}

function draw() {
  const pixels = document.querySelectorAll(".drawing-pixel");

  pixels.forEach(pixel => {
    pixel.addEventListener("pointerdown", handleDraw);
    pixel.addEventListener("pointerover", handleDrawIfClicked);
  });

  window.addEventListener("pointerup", () => {
    isMouseClicked = false;
  });
}

function handleDraw(e) {
  isMouseClicked = true;
  e.target.style.backgroundColor = penColor;
}

function handleDrawIfClicked(e) {
  if (isMouseClicked) {
    e.target.style.backgroundColor = penColor;
  }
}

function setPenColor(color) {
  penColor = color;
}

gridlinesCheckbox.addEventListener("change", () => {
  const pixels = document.querySelectorAll(".drawing-pixel");
  const border = gridlinesCheckbox.checked ? "1px solid #eee" : "1px solid transparent";

  pixels.forEach(pixel => {
    pixel.style.border = border;
  });
});

createDrawingArea(dimensions);
draw();
