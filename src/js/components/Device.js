import { Vector3, Box3 } from "three";
import { scene } from "../scene";

class Device {
	model = null;

	setVec(key, val) {
		this?.model[key]?.set(val?.x, val?.y, val?.z);
	}

	getVec(key) {
		return this.model?.[key];
	}

	get position() {
		return this.getVec("position");
	}
	set position(position) {
		return this.setVec("position", position);
	}

	get rotation() {
		return this.getVec("rotation");
	}
	set rotation(rotation) {
		return this.setVec("rotation", rotation);
	}

	get scale() {
		return this.getVec("scale");
	}
	set scale(scale) {
		return this.setVec("scale", scale);
	}

	get size() {
		if (!this.model) {
			return null;
		}
		const box = new Box3().setFromObject(this.model);
		const size = new Vector3();
		box.getSize(size);
		return size;
	}

	constructor({ position, rotation, scale, asset, onLoad }) {
		asset.getModel().then((model) => {
			this.model = model;
			this.init(position, rotation, scale);
			if (typeof onLoad === "function") {
				onLoad();
			}
		});
	}

	init(position, rotation, scale) {
		scene.add(this.model);
		this.position = position ?? new Vector3(0, 0, 0);
		this.rotation = rotation ?? new Vector3(0, 0, 0);
		this.scale = scale ?? new Vector3(1, 1, 1);
	}
}

export default Device;
