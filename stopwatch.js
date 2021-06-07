var sw = {
	// (A) INITIALIZE
	etime: null, // HTML time display
	erst: null, // HTML reset button
	ego: null, // HTML start/stop button
	init: function () {
		// (A1) GET HTML ELEMENTS
		sw.etime = document.getElementById("sw-time");
		sw.erst = document.getElementById("sw-rst");
		sw.ego = document.getElementById("sw-go");

		// (A2) ENABLE BUTTON CONTROLS
		sw.erst.addEventListener("click", sw.reset);
		sw.erst.disabled = false;
		sw.ego.addEventListener("click", sw.start);
		sw.ego.disabled = false;
	},

	// (B) TIMER ACTION
	timer: null, // timer object
	now: 0, // current elapsed time
	tick: function () {
		// (B1) CALCULATE HOURS, MINS, SECONDS
		sw.now++;
		var remain = sw.now;
		var secs = remain;

		// (B2) UPDATE THE DISPLAY TIMER
		if (secs < 10) {
			secs = "0" + secs;
		}
		sw.etime.innerHTML = secs + "s";
	},

	// (C) START!
	start: function () {
		sw.timer = setInterval(sw.tick, 1000);
		sw.ego.value = "Stop";
		sw.ego.removeEventListener("click", sw.start);
		sw.ego.addEventListener("click", sw.stop);
	},

	// (D) STOP
	stop: function () {
		clearInterval(sw.timer);
		sw.timer = null;
		sw.ego.value = "Start";
		sw.ego.removeEventListener("click", sw.stop);
		sw.ego.addEventListener("click", sw.start);
	},

	// (E) RESET
	reset: function () {
		if (sw.timer != null) {
			sw.stop();
		}
		sw.now = -1;
		sw.tick();
	},
};
window.addEventListener("load", sw.init);
