function drop(e) {
	e.preventDefault();

	if (e.target.className.includes("cloth-area")) return;


	const color = e.dataTransfer.getData("color");
	const svg = e.target.getSVGDocument();

	changeBackgroundColor(svg, color);

	changeStrokeColor(svg, color);

	return;
}

function changeBackgroundColor(svg, color) {
	const list = svg.querySelectorAll('[fill="gray"]');

	for (const background of list) {
		background.style.fill = color;
	}
}

function changeStrokeColor(svg, color) {
	const list = svg.querySelectorAll('[fill="black"]');

	for (const stroke of list) {
		if (color === "black") {
			stroke.style.fill = "gray";
		} else {
			stroke.style.fill = "black";
		}
	}
}


function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("color", ev.target.style.backgroundColor);
}

function dragCloth(ev) {
	ev.dataTransfer.setData("src", ev.target.src); 
	ev.dataTransfer.setData("type", ev.target.className); 
}

function dropCloth(e) {
	e.preventDefault();
	
	const src = e.dataTransfer.getData("src");
	const type = e.dataTransfer.getData("type");
	
	if (!src) return;

	if (!e.target.className.includes(type)) return;

	const actualNode = e.target.tagName === "OBJECT" ? e.target.parentNode : e.target;

	if (actualNode.children.item(0)) {
		actualNode.innerHTML = "";
	}

	const object = document.createElement("object");

	object.setAttribute("data", src);
	object.setAttribute("type", "image/svg+xml");
	object.setAttribute("ondragover", "allowDrop(event)");
	object.setAttribute("ondrop", "drop(event)");
	object.style.height = "80%";
	object.style.width = "80%";

	if (actualNode.tagName === "DIV") actualNode.appendChild(object);
	if (actualNode.tagName === "OBJECT") actualNode.parentNode.appendChild(object);
}