import minMax, { minMaxFactory } from "../utils/minMax";

class Orchestrator {
	static sectionHeight = 1800;
	groups = [];
	scroll = 0;
	minMax = null;

	hero = null;

	createHero() {
		this.hero = document.createElement("main");
		this.hero.id = "hero";
		this.hero.innerHTML = `
			<h1>Welcome to <b>storage visualization</b></h1>
			<p>This demo visualizes the storage capacities of various devices, in three dimensions. Begin scrolling to start the experience</p>
		`;
		document.body.insertBefore(this.hero, document.body.firstChild);
	}

	constructor(groups) {
		this.groups = groups;
		this.minMax = minMaxFactory(
			0,
			Orchestrator.sectionHeight * this.groups.length
		);
		this.attachListeners();
		this.createHero();
	}

	attachListeners() {
		document.addEventListener("wheel", ({ deltaY }) => {
			this.scroll = this.minMax(this.scroll + deltaY);
		});
	}

	updateHero() {
		if (!this.hero) {
			return;
		}

		this.hero.style.opacity = 1 - minMax(this.scroll / 100);
		if (
			this.hero.style.opacity === 0 &&
			this.hero.style.display !== "none"
		) {
			this.hero.style.display = "none";
		} else if (this.hero.style.display !== "flex") {
			this.hero.style.display = "flex";
		}
	}

	render() {
		this.updateHero();
		this.groups.forEach((group, i) => {
			let scroll = this.scroll - i * 0.45 * Orchestrator.sectionHeight;

			group.scroll = minMax(scroll / Orchestrator.sectionHeight);
			group.render();
		});
	}
}
export default Orchestrator;
