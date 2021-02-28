import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Asset {
	model = null;
	callbackQueue = [];

	constructor(path) {
		const loader = new GLTFLoader();
		loader.load(path, (model) => {
			this.model = model.scene;
			this.callbackQueue.forEach((callback) => {
				callback(this.model.clone());
			});
		});
	}

	getModel() {
		if (this.model) {
			return new Promise((resolve) => resolve(this.model.clone()));
		}
		return new Promise((resolve) => this.callbackQueue.push(resolve));
	}
}

export default Asset;
