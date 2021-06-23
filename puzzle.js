var flag = 0;
var youWin = 0;
var colorTile = 0;
var Size = 4;
var usercount = 0;
selectlayout(4);

function pauseClick() {
	if (flag === 0) {
		flag = 1;
	} else if (flag === 1) {
		flag = 0;
	}
}

function displayPopup() {
	setTimeout(function () {
		window.location.animate = document.body.classList.add("display-popup");
	}, 400);
}

function selectlayout(Size) {
	var field = $('<div id="gamegrid"></div>');
	var size = Size;
	var width = 350;
	var height = width;
	var spacing = 10 - size;
	var count = 0;

	var data = [];

	function makeField() {
		field.addClass("my-field");
		field.width(width);
		field.height(height);
	}

	$("#the-real-game").append(field);

	function makeTilesBg() {
		var tilesN = size * size - 1;
		var tileW = (width - spacing * (size + 1)) / size;
		var tileH = (height - spacing * (size + 1)) / size;

		for (var i = 0; i <= tilesN; i++) {
			var tilebg = $("<div></div>");
			tilebg.addClass("my-tile-bg");
			field.append(tilebg);
			tilebg.width(tileW).height(tileH);
			var col = i % size;
			var row = Math.floor(i / size);

			positionTile(tilebg, col, row);
		}
	}

	function getInvCount(arr) {
		var inv_count = 0;
		for (var i = 0; i < size * size - 1; i++) {
			for (var j = i + 1; j < size * size; j++) {
				if (arr[j] && arr[i] && arr[i] > arr[j]) inv_count++;
			}
		}
		return inv_count;
	}

	function findXPosition(puzzle) {
		for (var i = size - 1; i >= 0; i--) {
			for (var j = size - 1; j >= 0; j--) {
				if (puzzle[i][j] == 0) {
					return Number(size - i);
				}
			}
		}
	}

	function isSolvable(puzzle, dData) {
		var invCount = getInvCount(dData);
		if (size & 1) {
			return Boolean(!(invCount & 1));
		} else {
			var pos = findXPosition(puzzle);
			if (pos & 1) {
				return Boolean(!(invCount & 1));
			} else {
				return Boolean(invCount & 1);
			}
		}
	}

	function makeTiles() {
		var tilesN = size * size - 1;
		var tileW = (width - spacing * (size + 1)) / size;
		var tileH = (height - spacing * (size + 1)) / size;

		for (var j = 0; j < size; j++) {
			data.push([]);
		}

		var dData = [];
		for (var i = 0; i <= tilesN; i++) {
			dData.push(i);
		}

		function randomize() {
			for (var i = tilesN; i > 0; i--) {
				const j = Math.floor(Math.random() * i);
				const temp = dData[i];
				dData[i] = dData[j];
				dData[j] = temp;
			}

			var m = 0;
			for (var i = 0; i < size; i++) {
				for (var j = 0; j < size; j++) {
					data[i][j] = dData[m++];
				}
			}

			if (Boolean(isSolvable(data, dData))) {
			} else if (!Boolean(isSolvable(data, dData))) {
				randomize();
			} else if (youWin === 1) {
				randomize();
			}
		}
		randomize();

		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				var tile = $("<div>" + data[i][j] + "</div>");
				tile.addClass("my-tile");
				tile.addClass("my-color-tile");
				disabletouch();
				field.append(tile);
				tile.width(tileW).height(tileH);
				tile.css("font-size", Math.floor((tileH * 2) / 3) + "px");
				tile.css("line-height", tileH + "px");
				if (data[i][j] === 0) {
					tile.removeClass("my-tile");
					tile.css("display", "none");
				}
				var col = j;
				var row = i;

				positionTile(tile, col, row);
			}
		}

		$(".my-tile").click(tileClicked);
		$(".my-tile").click(checkWin);
	}

	function positionTile(tile, col, row, smooth) {
		var x = col * (tile.width() + spacing) + spacing;
		var y = row * (tile.height() + spacing) + spacing;
		if (!smooth) {
			tile.css("left", x);
			tile.css("top", y);
		} else {
			tile.animate(
				{
					left: x,
					top: y,
				},
				200
			);
		}

		if (data[row][col] === (row * size + col + 1)) {
			tile.addClass("color-tile");
		} else {
			tile.removeClass("color-tile");
		}
	}

	function checkWin() {
		var m = 0;
		outeside: for (var i = 0; i < size; i++) {
			for (var j = 0; j < size && m <= size * size - 2; j++) {
				m++;
				if (data[i][j] == m) {
					youWin = 1;
				} else {
					youWin = 0;
					break outeside;
				}
			}
		}
		if (youWin === 1) {
			displayPopup();
			var str = sw.etime.innerHTML;
			var newStr = str.substring(0, str.length - 1);
			document.getElementById("final-moves-value").innerHTML = newStr;
			sw.stop();
			var table = document.getElementById("myTable");

			localStorage.setItem("serialNo", usercount);
			localStorage.setItem("username", "Yashwant Krishna");
			localStorage.setItem("time", newStr);
			localStorage.setItem("count", count);

			if (Number(localStorage.getItem("serialNo")) >= 0) {
				var row = table.insertRow(usercount + 1);
				var cell1 = row.insertCell(0);
				cell1.classList.add("user-serial-value");
				var cell2 = row.insertCell(1);
				cell2.classList.add("user-header-value");
				var cell3 = row.insertCell(2);
				cell3.classList.add("user-time-value");
				var cell4 = row.insertCell(3);
				cell4.classList.add("user-moves-value");
			}
			cell1.innerHTML = localStorage.getItem("serialNo");
			cell2.innerHTML = localStorage.getItem("username");
			cell3.innerHTML = localStorage.getItem("time");
			cell4.innerHTML = localStorage.getItem("count");
			usercount++;
		}
	}

	function tileClicked(event) {
		if (flag === 0) {
			var tile = $(event.currentTarget);
			var value = parseInt(tile.text());
			var x, y;

			outer: for (y = 0; y < size; y++) {
				for (x = 0; x < size; x++) {
					if (data[y][x] == value) {
						break outer;
					}
				}
			}
			moveTile(tile, x, y);
		}
	}

	function moveTile(tile, col, row) {
		var dx = 0;
		var dy = 0;
		if (col > 0 && data[row][col - 1] === 0) {
			count++;
			if (count == 1) {
				sw.start();
				document.getElementById("sw-go").disabled = false;
				var elements = document.getElementsByClassName("options-options");
				for (var i = 0; i < elements.length; i++) {
					elements[i].disabled = true;
				}
			}
			if (count < 10) document.getElementById("moves-value").innerHTML = "0" + count;
			else document.getElementById("moves-value").innerHTML = count;
			dx = -1;
		} else if (col < size - 1 && data[row][col + 1] === 0) {
			count++;
			if (count == 1) {
				sw.start();
				document.getElementById("sw-go").disabled = false;
				var elements = document.getElementsByClassName("options-options");
				for (var i = 0; i < elements.length; i++) {
					elements[i].disabled = true;
				}
			}
			if (count < 10) document.getElementById("moves-value").innerHTML = "0" + count;
			else document.getElementById("moves-value").innerHTML = count;
			dx = 1;
		} else if (row > 0 && data[row - 1][col] === 0) {
			count++;
			if (count == 1) {
				sw.start();
				document.getElementById("sw-go").disabled = false;
				var elements = document.getElementsByClassName("options-options");
				for (var i = 0; i < elements.length; i++) {
					elements[i].disabled = true;
				}
			}
			if (count < 10) document.getElementById("moves-value").innerHTML = "0" + count;
			else document.getElementById("moves-value").innerHTML = count;
			dy = -1;
		} else if (row < size - 1 && data[row + 1][col] === 0) {
			count++;
			if (count == 1) {
				sw.start();
				document.getElementById("sw-go").disabled = false;
				var elements = document.getElementsByClassName("options-options");
				for (var i = 0; i < elements.length; i++) {
					elements[i].disabled = true;
				}
			}
			if (count < 10) document.getElementById("moves-value").innerHTML = "0" + count;
			else document.getElementById("moves-value").innerHTML = count;
			dy = 1;
		} else {
			return;
		}
		var value = data[row][col];
		data[row + dy][col + dx] = value;
		data[row][col] = 0;
		positionTile(tile, col + dx, row + dy, true);
	}

	makeField();
	makeTiles();
	makeTilesBg();
}

function disabletouch() {
	$(document).ready(function () {
		$(".my-tile").disableSelection();
	});
	$.fn.extend({
		disableSelection: function () {
			this.each(function () {
				this.onselectstart = function () {
					return false;
				};
				this.unselectable = "on";
				$(this).css("-moz-user-select", "none");
				$(this).css("-webkit-user-select", "none");
			});
			return this;
		},
	});
}

document.getElementById("sw-rst").addEventListener("click", function () {
	removePrevious();
	selectlayout(Size);
	var elements = document.getElementsByClassName("options-options");
	for (var i = 0; i < elements.length; i++) {
		elements[i].disabled = false;
	}
	document.getElementById("sw-go").disabled = true;
	count = "00";
	document.getElementById("moves-value").innerHTML = count;
});

document.getElementById("popup-newgame").addEventListener("click", function () {
	removePrevious();
	selectlayout(Size);
	var elements = document.getElementsByClassName("options-options");
	for (var i = 0; i < elements.length; i++) {
		elements[i].disabled = false;
	}
	document.getElementById("sw-go").disabled = true;
	count = "00";
	document.getElementById("moves-value").innerHTML = count;
	document.body.classList.remove("display-popup");
	sw.reset();
});
