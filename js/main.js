const container = document.querySelector("#grid-container");
const colorPicker = document.querySelector("#color-picker");
const rainbowCheckbox = document.querySelector("#rainbow");
const gridlinesCheckbox = document.querySelector("#gridlines");
const eraserCheckbox = document.querySelector("#eraser");
const clearButton = document.querySelector("#clear-btn");
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeDisplay = document.querySelector("#grid-size-value");

const dimensions = 16;
let penColor = "#000000";
let isMouseClicked = false;
let isEraserOn = false;
let isRainbowOn = false;

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

	if (isRainbowOn) {
		penColor = getRandomHexColor();
		e.target.style.backgroundColor = penColor;
	} else {
		e.target.style.backgroundColor = isEraserOn ? "transparent" : penColor;
	}
}

function handleDrawIfClicked(e) {
	if (isMouseClicked) {
		if (isRainbowOn) {
			penColor = getRandomHexColor();
			e.target.style.backgroundColor = penColor;
		} else {
			e.target.style.backgroundColor = isEraserOn ? "transparent" : penColor;
		}
	}
}

function setPenColor(color) {
	penColor = color;
}

function clear() {
	const pixels = document.querySelectorAll(".drawing-pixel");
	pixels.forEach(pixel => pixel.style.backgroundColor = "transparent");
}

function getRandomHexColor() {
	const hex = Math.floor(Math.random() * 0xffffff).toString(16);
	return `#${hex.padStart(6, "0")}`;
}

colorPicker.addEventListener("input", () => {
	const newColor = colorPicker.value;
	setPenColor(newColor);
})

rainbowCheckbox.addEventListener("change", () => {
	if (rainbowCheckbox.checked) {
		eraserCheckbox.checked = false;
		isEraserOn = false;
		isRainbowOn = true;
	} else {
		penColor = colorPicker.value;
		isRainbowOn = false;
	}
})

gridlinesCheckbox.addEventListener("change", () => {
	const pixels = document.querySelectorAll(".drawing-pixel");
	const border = gridlinesCheckbox.checked ? "1px solid #eee" : "1px solid transparent";

	pixels.forEach(pixel => {
		pixel.style.border = border;
	});
});

eraserCheckbox.addEventListener("change", () => {
	if (eraserCheckbox.checked) {
		rainbowCheckbox.checked = false;
		isRainbowOn = false;
		isEraserOn = true;
	} else {
		isEraserOn = false;
		penColor = colorPicker.value;
	}
});

clearButton.addEventListener("click", clear);

gridSizeSlider.addEventListener("input", () => {
	let trueValue = 2 ** Number(gridSizeSlider.value);
	gridSizeDisplay.textContent = trueValue;
	container.innerHTML = "";
	createDrawingArea(trueValue);

	const pixels = document.querySelectorAll(".drawing-pixel");
	const border = gridlinesCheckbox.checked ? "1px solid #eee" : "1px solid transparent";

	pixels.forEach(pixel => {
		pixel.style.border = border;
	});

	draw();
})

createDrawingArea(dimensions);
draw();
