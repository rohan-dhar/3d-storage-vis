
class Overlay {
	overlay = null;
	controls = null;

	orchestrator = null;

	heading = null;
	year = null;
	desc = null;
	size = null;

	toggleBtn = null;

	_current = -1;
	groups = [];

	mountOverlay() {
		this.overlay.innerHTML = `
			<h1 class="sep-head"></h1>
			<p class="overlay-size"></p>
			<p class="overlay-year"></p>
            <p class="overlay-desc"></p>
		`;
		document.body.insertBefore(this.overlay, document.body.firstChild);

		// Caching elements
		this.heading = this.overlay.querySelector("h1");
		this.desc = this.overlay.querySelector(".overlay-desc");
		this.year = this.overlay.querySelector(".overlay-year");
		this.size = this.overlay.querySelector(".overlay-size");
	}

	mountControls() {
		this.controls.innerHTML = ;
		document.body.appendChild(this.controls);
		this.toggleBtn = this.controls.querySelector(".btn");
		this.toggleBtn.addEventListener("click", () => {
			this.orchestrator.play = !this.orchestrator.play;
			this.renderControls();
		});
	}

	renderControls() {
		this.toggleBtn.innerText = this.orchestrator.play ? "Pause" : "Play";
	}

	mount() {
		this.overlay = document.createElement("section");
		this.overlay.classList.add("overlay");
		this.controls = this.overlay.cloneNode(true);
		this.controls.classList.add("overlay-right");

		this.mountOverlay();
		this.mountControls();
	}

	get current() {
		return this._current;
	}

	set current(i) {
		if (this.current === i || !this.groups[i]) {
			return;
		}

		this._current = i;
		const curr = this.groups[i];
		const prev = this.groups?.[i - 1];

		this.heading.innerText = curr.info.name;
		this.year.innerText = `Released in ${curr.info.year}`;
		this.size.innerText = `~ ${curr.info.size}`;
		this.desc.innerHTML = prev ? curr.info.relativeText(prev.info) : "";
	}

	hide() {
		if (!this.overlay || this.overlay.style.display === "none") {
			return;
		}
		this.overlay.style.display = "none";
	}

	show() {
		if (!this.overlay || this.overlay.style.display === "flex") {
			return;
		}
		this.overlay.style.display = "flex";
	}

	constructor(groups, orchestrator, initial = 0) {
		this.groups = groups;
		this.mount();
		this.hide();
		this.current = initial;
		this.orchestrator = orchestrator;
	}
}

export default Overlay;
