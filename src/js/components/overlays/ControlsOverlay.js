import Overlay from "./Overlay";
import upIcon from "../../../assets/up-icon.svg";
import downIcon from "../../../assets/down-icon.svg";
import spaceIcon from "../../../assets/space-icon.svg";

class ControlsOverlay extends Overlay {
	orchestrator = null;
	btn = null;

	renderControls() {
		this.btn.innerText = this.orchestrator.play ? "Pause" : "Play";
	}

	attachEvents() {
		this.btn = this.el.querySelector(".btn");
		this.btn.addEventListener("click", () => {
			this.orchestrator.play = !this.orchestrator.play;
			this.renderControls();
		});
	}
	constructor(orchestrator) {
		super(
			"section",
			{
				className: "overlay overlay-right",
				innerHTML: `
			<section class="overlay-control">
				<h1 class="sep-head">Guide</h1>
				<section class="overlay-controls-view">
					<img src="${upIcon}" alt="Up Arrow Key" />
					<img src="${downIcon}" alt="Down Arrow Key" />
					<img src="${spaceIcon}" alt="Space Arrow Key" />
				</section>
				<h3>
					Use the <b>up or down arrow keys</b> or the <b>mouse's scroll wheel</b> to explore the demo
					<br /><br />
					<b>Click, hold and drag (pan)</b> to explore the scenes in three dimension
					<br /><br />
					Use the <b> space bar </b> or the <b>button below</b> to play / pause the demo					
				</h3>	
				<button class="btn">Play</btn>
			</section>
		`,
			},
			false
		);
		this.orchestrator = orchestrator;
		this.attachEvents();
	}
}
export default ControlsOverlay;
