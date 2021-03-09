import { Vector3 } from "three";

import { setup, render as renderScene } from "./scene";

import DeviceInfo from "./components/DeviceInfo";
import DeviceGroup from "./components/DeviceGroup";
import Asset from "./Asset";
import Orchestrator from "./components/Orchestrator";

import floppyModel from "../assets/floppy.glb";
import cdModel from "../assets/cdmain.glb";
import flashModel from "../assets/flash.glb";
import hddModel from "../assets/hdd.glb";

import yoshiro from "../assets/yoshiro.jpg";
import reynold from "../assets/reynold.jpg";
import james from "../assets/james.jpg";
import dov from "../assets/dov.jpg";

import "../style/index.css";

window.addEventListener("DOMContentLoaded", () => {
	setup();

	const floppyInfo = new DeviceInfo(
		"Floppy",
		"floppies",
		1000000,
		1976,
		"Yoshiro Nakamatsu",
		yoshiro
	);
	const cdInfo = new DeviceInfo(
		"Compact Disc - CD",
		"CDs",
		760000000,
		1982,
		"James Russell",
		james
	);
	const flashInfo = new DeviceInfo(
		"Flash Drive",
		"flash drives",
		64000000000,
		2000,
		"Dov Moran",
		dov
	);
	const hddInfo = new DeviceInfo(
		"Hard disk Drive",
		"hard disks",
		10000000000000,
		2000,
		"Reynold B. Johnson",
		reynold
	);

	const scaleFloppy = new Vector3(0.25, 0.25, 0.25);
	const scaleCd = new Vector3(2.2, 2.2, 2.2);
	const scaleFlash = new Vector3(0.25, 0.25, 0.25);
	const scaleHdd = new Vector3(0.65, 0.65, 0.65);

	const floppyAsset = new Asset(floppyModel);
	const cdAsset = new Asset(cdModel);
	const flashAsset = new Asset(flashModel);
	const hddAsset = new Asset(hddModel);

	const groups = [
		new DeviceGroup({
			scale: scaleFloppy,
			info: floppyInfo,
			nextInfo: cdInfo,

			asset: floppyAsset,
		}),
		new DeviceGroup({
			scale: scaleCd,
			info: cdInfo,
			nextInfo: flashInfo,
			prevInfo: floppyInfo,
			asset: cdAsset,
			scaleBy: 7,
		}),
		new DeviceGroup({
			scale: scaleFlash,
			info: flashInfo,
			nextInfo: hddInfo,
			prevInfo: cdInfo,
			asset: flashAsset,
			scaleBy: 5.8,
			exitable: false,
		}),
		new DeviceGroup({
			scale: scaleHdd,
			info: hddInfo,
			prevInfo: flashInfo,
			asset: hddAsset,
			scaleBy: 5.8,
		}),
	];

	const orchestrator = new Orchestrator(groups);

	const render = () => {
		renderScene();
		orchestrator.render();
		requestAnimationFrame(render);
	};

	requestAnimationFrame(render);
});
