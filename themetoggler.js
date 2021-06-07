//theme toggler
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
	document.getElementById("spin").classList.toggle("spin-animation");
}

document.getElementById("toggle-light").addEventListener("click", function () {
	document.body.classList.remove("theme-dark");
	document.body.classList.remove("theme-special");
	document.body.classList.remove("theme-dark2");
	document.body.classList.remove("theme-purple");
});

document.getElementById("toggle-dark").addEventListener("click", function () {
	document.body.classList.add("theme-dark");
	if (document.body.classList.contains("theme-special")) {
		document.body.classList.remove("theme-special");
	}
	if (document.body.classList.contains("theme-dark2")) {
		document.body.classList.remove("theme-dark2");
	}
	if (document.body.classList.contains("theme-purple")) {
		document.body.classList.remove("theme-purple");
	}
});
document.getElementById("toggle-dark2").addEventListener("click", function () {
	document.body.classList.add("theme-dark2");
	if (document.body.classList.contains("theme-dark")) {
		document.body.classList.remove("theme-dark");
	}
	if (document.body.classList.contains("theme-special")) {
		document.body.classList.remove("theme-special");
	}
	if (document.body.classList.contains("theme-purple")) {
		document.body.classList.remove("theme-purple");
	}
});
document.getElementById("toggle-purple").addEventListener("click", function () {
	document.body.classList.add("theme-purple");
	if (document.body.classList.contains("theme-dark")) {
		document.body.classList.remove("theme-dark");
	}
	if (document.body.classList.contains("theme-special")) {
		document.body.classList.remove("theme-special");
	}
	if (document.body.classList.contains("theme-dark2")) {
		document.body.classList.remove("theme-dark2");
	}
});
document.getElementById("toggle-special").addEventListener("click", function () {
	document.body.classList.add("theme-special");
	if (document.body.classList.contains("theme-dark")) {
		document.body.classList.remove("theme-dark");
	}
	if (document.body.classList.contains("theme-dark2")) {
		document.body.classList.remove("theme-dark2");
	}
	if (document.body.classList.contains("theme-purple")) {
		document.body.classList.remove("theme-purple");
	}
});

//layout toggler
function myFunctionLayout() {
	document.getElementById("myDropdownLayout").classList.toggle("show");
	document.getElementById("spin-layout").classList.toggle("spin-animation-layout");
}

//type toggler
function myFunctionType() {
	document.getElementById("myDropdownType").classList.toggle("show");
	document.getElementById("spin-type").classList.toggle("spin-animation-type");
}

//mode toggler
function myFunctionMode() {
	document.getElementById("myDropdownMode").classList.toggle("show");
	document.getElementById("spin-mode").classList.toggle("spin-animation-mode");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches(".toggler")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}

		var rotateback = document.getElementsByClassName("fa-chevron-down")[0];
		if (rotateback.classList.contains("spin-animation")) {
			rotateback.classList.remove("spin-animation");
		}
		var rotateback1 = document.getElementsByClassName("fa-chevron-down")[1];
		if (rotateback1.classList.contains("spin-animation-layout")) {
			rotateback1.classList.remove("spin-animation-layout");
		}
		var rotateback3 = document.getElementsByClassName("fa-chevron-down")[2];
		if (rotateback3.classList.contains("spin-animation-type")) {
			rotateback3.classList.remove("spin-animation-type");
		}
		var rotateback2 = document.getElementsByClassName("fa-chevron-down")[3];
		if (rotateback2.classList.contains("spin-animation-mode")) {
			rotateback2.classList.remove("spin-animation-mode");
		}
	}
};
