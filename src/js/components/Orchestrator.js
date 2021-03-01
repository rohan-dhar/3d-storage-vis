import { scene } from "../scene";
import {
	BoxGeometry,
	CylinderGeometry,
	Mesh,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
} from "three";
import minMax, { minMaxFactory } from "../utils/minMax";
import Overlay from "./Overlay";
import { infinity } from "../conf";

class Orchestrator {
	static sectionHeight = 1800;
	static scrollSpeed = 2;
	static scrollBy = 3.5;
	static overlayTill = 0.5;

	groups = [];
	_scroll = 0;
	_play = false;

	minMax = null;
	walls = [];
	overlay = null;

	up = false;
	down = false;

	hero = null;

	get scroll() {
		return this._scroll;
	}

	set scroll(scroll) {
		if (scroll >= Orchestrator.sectionHeight * this.groups.length) {
			scroll = Orchestrator.sectionHeight * this.groups.length;
		} else if (scroll <= 0) {
			scroll = 0;
		}

		this._scroll = scroll;
		if (this.scroll < 120) {
			this.overlay.hide();
		} else {
			this.overlay.show();
		}

		this.overlay.current = this.getActive();
	}

	get play() {
		return this._play;
	}

	set play(play) {
		if (
			play &&
			this.scroll >= Orchestrator.sectionHeight * this.groups.length
		) {
			return;
		}
		this._play = play;
	}

	constructor(groups) {
		this.groups = groups;
		this.minMax = minMaxFactory(
			0,
			Orchestrator.sectionHeight * this.groups.length
		);
		this.attachListeners();
		this.mountHero();
		this.setupWalls();
		this.overlay = new Overlay(this.groups, this, 0);
	}

	setupWalls() {
		for (let i = 0; i < 2; i++) {
			const material = new MeshPhysicalMaterial({
				color: 0xffffff,
				metalness: 1,
				roughness: 0.65,
				clearcoat: 0.4,
			});
			const geometry = new CylinderGeometry(22, 22, 3, 64, 1);
			const wall = new Mesh(geometry, material);
			wall.position.set(0, i === 0 ? infinity - 2 : -infinity + 1, 0);
			scene.add(wall);
			this.walls.push(wall);
		}
	}

	mountHero() {
		this.hero = document.createElement("main");
		this.hero.id = "hero";
		this.hero.classList.add("cont");
		this.hero.innerHTML = `
			<h1 class="sep-head">Welcome to <b>storage visualization</b></h1>
			<p>This demo visualizes the storage capacities of various devices, in three dimensions. Begin scrolling to start the experience</p>
		`;
		document.body.insertBefore(this.hero, document.body.firstChild);
	}

	getActive() {
		const { scroll } = this;
		return Math.floor(
			scroll / (Orchestrator.sectionHeight * Orchestrator.overlayTill)
		);
	}

	attachListeners() {
		document.addEventListener("wheel", ({ deltaY }) => {
			if (this.play) {
				return;
			}
			this.scroll = this.minMax(this.scroll + deltaY);
		});

		document.addEventListener("keydown", ({ keyCode }) => {
			if (keyCode === 32) {
				this.play = !this.play;
			} else if (keyCode === 38) {
				this.up = true;
			} else if (keyCode === 40) {
				this.down = true;
			}
		});

		document.addEventListener("keyup", ({ keyCode }) => {
			if (keyCode === 32) {
				this.play = !this.play;
			} else if (keyCode === 38) {
				this.up = false;
			} else if (keyCode === 40) {
				this.down = false;
			}
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

	updateScoll() {
		if (this.up) {
			this.scroll -= Orchestrator.scrollBy;
		}
		if (this.down) {
			this.scroll += Orchestrator.scrollBy;
		}

		if (this.scroll >= Orchestrator.sectionHeight * this.groups.length) {
			this.scroll = Orchestrator.sectionHeight * this.groups.length;
			this.play = false;
			return;
		}
		if (this.play) {
			this.scroll += Orchestrator.scrollSpeed;
		}
	}

	render() {
		this.updateScoll();
		this.updateHero();
		this.groups.forEach((group, i) => {
			let scroll = this.scroll - i * 0.35 * Orchestrator.sectionHeight;
			group.scroll = minMax(scroll / Orchestrator.sectionHeight);
			group.render();
		});
	}
}
export default Orchestrator;
