import { TimelineLite, Expo } from "gsap";
import Overlay from "./Overlay";
class InfoOverlay extends Overlay {
	timeline = null;

	makeTimeline() {
		this.timeline = new TimelineLite({ paused: true });
		this.timeline
			.set(this.el, { opacity: 0, scale: 0.8, y: -150 })
			.to(this.el, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 1,
				ease: Expo.easeOut,
			})
			.to(this.el, {
				opacity: 0,
				scale: 0.8,
				y: 150,
				duration: 1,
				ease: Expo.easeOut,
			});
		this.timeline.progress(0.0001);
	}

	progress(to) {
		this.timeline.progress(to);
	}

	constructor(info, prevInfo) {
		super(
			"section",
			{
				className: "overlay",
				innerHTML: `
                    <h1 class="sep-head">${info.name}</h1>
                    <p class="overlay-size">${info.size}</p>
                    <p class="overlay-year">${info.year}</p>
					<img src=${info.inventorImg} alt=${info.inventorName} />
					<p class="overlay-inventor">Invented by ${info.inventorName}</p>
					<p class="overlay-desc">${prevInfo ? info.relativeText(prevInfo) : ""}</p>
                `,
			},
			false
		);

		this.makeTimeline();
	}
}
export default InfoOverlay;
