class Overlay {
	el = null;
	display = "";

	mount(tagName, props = {}, before = true) {
		this.el = document.createElement(tagName);

		Object.entries(props).forEach(([prop, value]) => {
			this.el[prop] = value;
		});

		if (before) {
			document.body.insertBefore(this.el, document.body.firstChild);
		} else {
			document.body.appendChild(this.el);
		}

		this.display = this.el.style.display;
	}

	hide() {
		if (!this.el) {
			return;
		}
		this.el.style.display = "none";
	}

	show() {
		if (!this.el) {
			return;
		}
		this.el.style.display = this.display;
	}

	constructor(...args) {
		this.mount(...args);
	}
}

export default Overlay;
