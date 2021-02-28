class Overlay {
	overlay = null;

	heading = null;
	year = null;
	desc = null;
	size = null;

	_current = -1;
	groups = [];

	mount() {
		this.overlay = document.createElement("section");
		this.overlay.id = "overlay";
		this.overlay.classList.add("cont");
		this.overlay.innerHTML = `
			<h1></h1>
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
		this.desc.innerText = prev ? curr.info.relativeText(prev.info) : "";
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

	constructor(groups, initial = 0) {
		this.groups = groups;
		this.mount();
		this.hide();
		this.current = initial;
	}
}

export default Overlay;
