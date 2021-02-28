import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	AmbientLight,
	Vector2,
	MathUtils,
	PointLight,
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

const redLight1 = new PointLight(0xff1122, 1);
redLight1.position.set(30, 30, 10);
scene.add(redLight1);

const redLight2 = new PointLight(0xff1122, 1);
redLight2.position.set(-30, -30, -10);
scene.add(redLight2);

const blueLight1 = new PointLight(0x3311ff, 1);
blueLight1.position.set(-30, 30, 10);
scene.add(blueLight1);

const blueLight2 = new PointLight(0x3311ff, 1);
blueLight2.position.set(30, -30, -10);
scene.add(blueLight2);

const ambLight = new AmbientLight(0xffffff, 0.05);
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
