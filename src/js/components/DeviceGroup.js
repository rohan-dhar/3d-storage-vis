import { MathUtils, Vector3 } from "three";
import Device from "./Device";
import { TimelineLite, Power2 } from "gsap";
import minMax from "../utils/minMax";

class DeviceGroup {
	static yPush = -20;
	static xPush = 50;
	static deviceGap = 0.1;
	static largeDeviceGap = 0.35;

	devices = [];
	hero = null;
	loaded = 0;
	rowSize = 0;
	number = 0;
	scroll = 0;
	scaleBy = 10.5;

	timelines = {
		hero: {
			enter: null,
			combine: null,
			exit: null,
		},
		rest: [],
		text: {
			enter: null,
			exit: null,
		},
	};

	setHeroTimelines() {
		const {
			timelines: { hero },
		} = this;

		const { x: width, y: height } = this.deviceSize;
		const deltaX =
			((this.rowSize - 1) * (width * (1 + DeviceGroup.deviceGap))) / 2;

		const deltaY =
			this.rowSize > 1
				? (this.number / this.rowSize - 1) *
						(width * (1 + DeviceGroup.deviceGap)) +
				  2
				: 0;

		hero.enter = new TimelineLite({ paused: true });

		hero.enter
			.to(this.hero.position, {
				y: (this.deviceSize.y * this.scaleBy) / 2,
				z: 1.5,
				ease: Power2.easeOut,
				duration: 0.5,
			})
			.to(
				this.hero.rotation,
				{
					y: 4 * Math.PI,
				},
				"-=0.5"
			);

		hero.combine = new TimelineLite({ paused: true });
		hero.combine
			.to(this.hero.position, {
				y:
					Math.floor((this.number - 1) / this.rowSize) *
						(height * (1 + DeviceGroup.deviceGap)) -
					deltaY,
				x: -deltaX,
				z: 0,
				ease: Power2.easeOut,
				duration: 2,
			})
			.to(
				this.hero.scale,
				{
					x: this.hero.scale.x / this.scaleBy,
					y: this.hero.scale.y / this.scaleBy,
					z: this.hero.scale.z / this.scaleBy,
					ease: Power2.easeOut,
					duration: 2,
				},
				"-=2"
			)
			.to(
				this.hero.rotation,
				{
					x: Math.PI / 4,
				},
				"-=2"
			);

		hero.exit = new TimelineLite({ paused: true });
		hero.exit.to(this.hero.position, {
			y:
				Math.floor((this.number - 1) / this.rowSize) *
					(height * (1 + DeviceGroup.deviceGap)) -
				deltaY,
			x: -deltaX + DeviceGroup.xPush,
			z: 1,
			ease: Power2.easeIn,
			duration: 1.4,
		});
	}

	setRestTimeline() {
		if (this.number === 1) {
			return;
		}
		const rest = this.timelines.rest;
		this.devices.map((device, i) => {
			if (!device.position) {
				return;
			}
			const { x: width, y: height } = this.deviceSize;
			const deltaX =
				((this.rowSize - 1) * (width * (1 + DeviceGroup.deviceGap))) /
				2;
			const deltaY =
				(this.number / this.rowSize - 1) *
					(width * (1 + DeviceGroup.deviceGap)) +
				2;

			const enter = new TimelineLite({ paused: true });
			enter
				.to(device.position, {
					x:
						(i % this.rowSize) *
							(width * (1 + DeviceGroup.deviceGap)) -
						deltaX +
						(Math.floor(i / this.rowSize) ==
						Math.floor((this.number - 1) / this.rowSize)
							? width * (1 + DeviceGroup.deviceGap)
							: 0),
					y:
						Math.floor(i / this.rowSize) *
							(height * (1 + DeviceGroup.deviceGap)) -
						deltaY,
					z: 0,
					ease: Power2.easeOut,
					duration: 1,
				})
				.to(
					device.rotation,
					{
						x: Math.PI / 4,
					},
					"-=2"
				);

			const exit = new TimelineLite({ paused: true });
			exit.to(device.position, {
				x:
					(i % this.rowSize) * (width * (1 + DeviceGroup.deviceGap)) -
					deltaX +
					DeviceGroup.xPush +
					(Math.floor(i / this.rowSize) ==
					Math.floor((this.number - 1) / this.rowSize)
						? width * (1 + DeviceGroup.deviceGap)
						: 0),
				z: 1,
				ease: Power2.easeIn,
				duration: 1.4,
			});

			rest.push({ enter, exit });
		});
	}

	setupPosition() {
		const { x: width, y: height } = this.deviceSize;

		const deltaX =
			((this.rowSize - 1) * (width * (1 + DeviceGroup.largeDeviceGap))) /
			2;
		const deltaY =
			this.rowSize > 0
				? (this.number / this.rowSize - 1) *
						(width * (1 + DeviceGroup.largeDeviceGap)) +
				  2
				: 0;

		this.hero.position.set(-0.65, -DeviceGroup.yPush, 0);

		this.devices.forEach((device, i) => {
			if (!device.position) {
				return;
			}
			device.position.set(
				(i % this.rowSize) *
					(width * (1 + DeviceGroup.largeDeviceGap)) -
					deltaX +
					(Math.floor(i / this.rowSize) ==
					Math.floor((this.number - 1) / this.rowSize)
						? width * (1 + DeviceGroup.largeDeviceGap)
						: 0),
				Math.floor(i / this.rowSize) *
					(height * (1 + DeviceGroup.largeDeviceGap)) +
					DeviceGroup.yPush -
					deltaY,
				-3
			);
		});
	}

	handleLoadComplete() {
		console.info(
			`%c [LOADED] %c ${this.info.name} loaded with ${this.number} instances`,
			"color: #2ecc91",
			"color: inherit"
		);

		this.setupPosition();
		this.setHeroTimelines();
		this.setRestTimeline();
	}

	handleLoad(i) {
		this.loaded++;
		if (!this.deviceSize) {
			if (i >= 0) {
				this.deviceSize = this.devices[i].size;
			} else {
				this.deviceSize = this.hero.size
					.clone()
					.divideScalar(this.scaleBy);
			}
		}
		if (this.loaded >= this.number - 1) {
			this.handleLoadComplete();
		}
	}

	constructor({
		scroll,
		scale,
		info,
		nextInfo = null,
		scaleBy = 10.5,
		...rest
	}) {
		if (nextInfo) {
			[this.number, this.rowSize] = info.relativeSize(nextInfo);
		} else {
			this.number = 1;
			this.rowCount = 1;
		}

		this.scroll = scroll ?? 0;
		this.info = info;
		this.scaleBy = scaleBy;
		this.hero = new Device({
			position: new Vector3(0, DeviceGroup.yPush, 0),
			onLoad: () => {
				this.loaded++;
				if (this.number === 1) {
					this.handleLoad(-1);
				}
			},
			scale: scale.clone(),
			...rest,
		});

		scale.divideScalar(this.scaleBy);

		for (let i = 0; i < this.number - 1; i++) {
			this.devices.push(
				new Device({
					...rest,
					position: new Vector3(0, DeviceGroup.yPush, 0),
					scale,
					onLoad: () => this.handleLoad(i),
				})
			);
		}
	}

	render() {
		if (this.loaded < this.number) {
			return;
		}
		const { scroll } = this;

		if (scroll <= 0) {
			return;
		}
		/****************

			STATES:

			scroll <= 0:
				Hero: Completely out of view
				Text: Completely out of view
				Rest: Completely out of view

			0 < scroll <= 0.35:
				Hero: Entering
				Text: Entering
				Rest: Completely out of view
			
			0.35 < scroll < 0.45
				Hero: Completely entered
				Text: Completely entered
				Rest: Completely out of view
			
			0.45 <= scroll < 0.75:
				Hero: Becoming part of rest
				Text: Fading away
				Rest: Entering
			
			0.75 <= scroll < 1:
				Hero: Exiting with rest
				Text: Completely exited
				Rest: Exiting

			scroll >= 1:
				Hero: Completely exited
				Text: Completely exited
				Rest: Completely exited

		****************/

		this.timelines.hero.enter.progress(minMax(scroll / 0.35));

		if (this.number <= 1) {
			return;
		}
		this.timelines.hero.combine.progress(minMax((scroll - 0.35) / 0.35));
		this.timelines.hero.exit.progress(minMax((scroll - 0.7) / 0.3));

		this.timelines.rest.forEach(({ enter, exit }) => {
			enter.progress(minMax((scroll - 0.35) / 0.35));
			exit.progress(minMax((scroll - 0.7) / 0.3));
		});
	}
}

export default DeviceGroup;
