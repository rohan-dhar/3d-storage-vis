import { Mesh, Vector3 } from "three";
import { scene, renderer } from "../scene";

class Form {
	position = null;
	size = null;
	geometry = null;
	material = null;
	mesh = null;
	constructor({
		x,
		y,
		z,
		height,
		width,
		depth,
		position,
		size,
		geometry,
		material,
	}) {
		if (typeof x === "number") {
			this.position = new Vector3(x, y, z);
		} else {
			this.position = position;
		}
		if (typeof width === "number") {
			this.size = new Vector3(height, width, depth);
		} else {
			this.size = size;
		}

		this.geometry = geometry;
		this.material = material;
		this.mesh = new Mesh(geometry, material);
	}

	init() {
		scene.add(this.mesh);
	}
}

export default Form;
