class DeviceInfo {
	static prefixes = ["", "K", "M", "G", "T"];
	name = "";
	pluralName = "";
	_size = 1;
	year = 2000;

	constructor(
		name,
		pluralName,
		size,
		year,
		inventorName = "",
		inventorImg = ""
	) {
		this.name = name;
		this.pluralName = pluralName;
		this._size = size;
		this.year = year;
		this.inventorName = inventorName;
		this.inventorImg = inventorImg;
	}

	get bytes() {
		return this._size;
	}

	get size() {
		let i = 0;
		let size = this._size;
		while (size > 1000) {
			size /= 1000;
			i++;
		}
		return `${size} ${DeviceInfo.prefixes[i]}B`;
	}

	relativeSize(next) {
		const relative = next.bytes / this.bytes;
		const rowSize = Math.floor(Math.sqrt(relative * 3.5));
		return [relative, rowSize];
	}

	relativeText(prev) {
		return `A ${this.name} can hold around <span>${Math.round(
			1 / this.relativeSize(prev)[0]
		)} ${prev.pluralName}</span> worths of information`;
	}
}

export default DeviceInfo;
