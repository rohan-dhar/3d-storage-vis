import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	AmbientLight,
	Vector2,
	MathUtils,
	DirectionalLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const scene = new Scene();
export const camera = new PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
export const renderer = new WebGLRenderer({ antialias: true, alpha: true });

export const render = () => renderer.render(scene, camera);

// const redLight = new DirectionalLight(0xff0000, 0.65);
// redLight.position.set(-30, 0, 1);
// scene.add(redLight);

// const redLight2 = new DirectionalLight(0xff0000, 0.65);
// redLight2.position.set(30, 0, 1);
// scene.add(redLight2);

const redLight3 = new DirectionalLight(0xff1122, 1.7);
redLight3.position.set(30, 0, 6);
scene.add(redLight3);

const blueLight = new DirectionalLight(0x3311ff, 1.7);
blueLight.position.set(-30, 0, 10);
scene.add(blueLight);

const ambLight = new AmbientLight(0xadd8e6, 0.1);
scene.add(ambLight);

export const setup = () => {
	renderer.setClearColor("#000000", 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = false;
	controls.update();

	camera.position.z = 10;

	window.addEventListener("resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
};

const verticalView = MathUtils.degToRad(camera.fov);

export const getScreenSize = () => {
	const y = (2 * Math.tan(verticalView / 2) * window.innerHeight) / 240;
	return new Vector2(y * camera.aspect, y);
};
