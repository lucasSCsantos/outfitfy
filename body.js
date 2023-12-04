const header = document.getElementsByTagName("header")[0];
const colorContainer = document.createElement("div");

colorContainer.setAttribute('ondragstart', 'drag(event)')
colorContainer.setAttribute('draggable', 'true')
colorContainer.setAttribute('class', 'colors')

const colors = ["white", "black", "#9AC0DC", "#000047", "blue", "#161616", "lightgray", "#6A2713", "#C3B091", "#6d6d6d"];
console.log(header.offsetWidth)
const width = (header.offsetWidth - ((colors.length + 1) * 16)) / colors.length;

for (const color of colors) {


	const c = colorContainer.cloneNode(true);
	c.style.width = `${width}px`

	if (typeof color === "string") {
		c.style.backgroundColor = color;
		header.appendChild(c)
	} else {
		c.style.backgroundImage = `url(${color.texture})`
		c.style.backgroundColor = color.color;
		header.appendChild(c)
	}
}

const clothContainer = document.createElement("img");
const clothesCard = document.getElementById("clothes-card");

clothContainer.setAttribute("ondragstart", "dragCloth(event)");
clothContainer.setAttribute("draggable", "true");

const clothes = [{type: "top", cloth: "polo"}, {type: "top", cloth: "tshirt"}, {type: "top", cloth: "sweater"}, {type: "top", cloth: "sweatshirt"},{type: "bottom", cloth: "pants"}, {type: "bottom", cloth: "shorts"}, {type: "shoe", cloth: "sneakers"}, {type: "shoe", cloth: "boot"}];

for (const cloth of clothes) {
	const cc = clothContainer.cloneNode(true);
	cc.setAttribute("src", `${cloth.cloth}.svg`)
	cc.classList.add(cloth.type);
	clothesCard.appendChild(cc);
}

const restyleClothAreas = () => {
	const clothAreas = document.getElementsByClassName("cloth-area");
	
	for (const clothArea of clothAreas) {
		clothArea.addEventListener("dragenter", (event) => {
			event.target.style.opacity = "0.4";
		})
		clothArea.addEventListener("dragleave", (event) => {
			event.target.style.opacity = "1";
		})
		clothArea.addEventListener("drop", (event) => {
			event.target.style.opacity = "1";
		})
	}
}

restyleClothAreas();


function addCard(ev) {
	const parent = ev.target.parentElement.parentElement;
	const actual = ev.target.parentElement;
	const newCard = document.getElementsByClassName("card")[0].cloneNode(true);

	for (child of newCard.children) {
		child.innerHTML = "";
	}

	const recreateElement = actual;

	parent.removeChild(actual);
	parent.appendChild(newCard);
	parent.appendChild(recreateElement);

	restyleClothAreas();
}