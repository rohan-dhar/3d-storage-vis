import { nullLiteral } from "babel-types";
import { over } from "lodash";
import minMax, { minMaxFactory } from "../utils/minMax";
import Overlay from "./Overlay";

class Orchestrator {
	static sectionHeight = 1800;
	groups = [];
	scroll = 0;
	minMax = null;

	static overlayTill = 0.5;

	overlay = null;

	hero = null;

	mountHero() {
		this.hero = document.createElement("main");
		this.hero.id = "hero";
		this.hero.classList.add("cont");
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
		this.mountHero();
		this.overlay = new Overlay(this.groups, 0);
	}

	getActive() {
		const { scroll } = this;
		return Math.floor(
			scroll / (Orchestrator.sectionHeight * Orchestrator.overlayTill)
		);
	}

	attachListeners() {
		document.addEventListener("wheel", ({ deltaY }) => {
			this.scroll = this.minMax(this.scroll + deltaY);
			if (this.scroll < 120) {
				this.overlay.hide();
			} else {
				this.overlay.show();
			}

			this.overlay.current = this.getActive();
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
			let scroll = this.scroll - i * 0.35 * Orchestrator.sectionHeight;
			group.scroll = minMax(scroll / Orchestrator.sectionHeight);
			group.render();
		});
	}
}
export default Orchestrator;
