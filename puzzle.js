var flag = 0;
var youWin = 0;
var Size = 4;
var usercount = 0;
selectlayout(4);

function pauseClick() {
	if (flag === 0) {
		flag = 1;
		console.log("value of flag = 1");
	} else if (flag === 1) {
		flag = 0;
		console.log("value of flag = 0");
	}
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
		console.log(data);

		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				console.log("x: " + i + " y: " + j + ", value of data[i][j] is " + data[i][j]);
				var tile = $("<div>" + data[i][j] + "</div>");
				tile.addClass("my-tile");
				disabletouch();
				field.append(tile);
				tile.width(tileW).height(tileH);
				tile.css("font-size", Math.floor((tileH * 1.4) / 3) + "px");
				tile.css("line-height", tileH + "px");
				if (data[i][j] === 0) {
					tile.removeClass("my-tile");
					tile.css("display", "none");
				}
				console.log("appending at x = " + i + " and y = " + j);
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
	}

	function checkWin() {
		var m = 0;
		outeside: for (var i = 0; i < size; i++) {
			for (var j = 0; j < size && m <= size * size - 2; j++) {
				m++;
				console.log(m);
				if (data[i][j] == m) {
					youWin = 1;
				} else {
					youWin = 0;
					break outeside;
				}
			}
		}
		console.log(data);
		if (youWin === 1) {
			document.body.classList.add("display-popup");
			var str = sw.etime.innerHTML;
			var newStr = str.substring(0, str.length - 1);
			document.getElementById("final-moves-value").innerHTML = newStr;
			sw.stop();
			var table = document.getElementById("myTable");

			var row = table.insertRow(usercount + 1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);

			cell1.innerHTML = usercount;
			cell2.innerHTML = "Yashwant Krishna";
			cell3.innerHTML = newStr;
			cell4.innerHTML = count;
			usercount++;
		} else {
			console.log("Not yet win vro");
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
						console.log("value: " + data[y][x] + " matched");
						console.log("y: " + y + " x: " + x);
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
			console.log("it moves left");
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
			console.log("it moves right");
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
			console.log("it moves up");
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
			console.log("it moves down");
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

// document.getElementById("sw-go").addEventListener("click", function () {
// 	var tileElements = document.getElementsByClassName("my-tile");
// 	if (tileElements[0].disabled === true) {
// 		for (var i = 0; i < tileElements.length; i++) {
// 			tileElements[i].disabled = false;
// 		}
// 	}
// 	if (tileElements[0].disabled === false) {
// 		for (var i = 0; i < tileElements.length; i++) {
// 			tileElements[i].disabled = true;
// 		}
// 	}
// });
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
