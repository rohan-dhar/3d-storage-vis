class DeviceInfo {
	static prefixes = ["", "K", "M", "G", "T"];
	name = "";
	pluralName = "";
	_size = 1;
	year = 2000;

	constructor(name, pluralName, size, year) {
		this.name = name;
		this.pluralName = pluralName;
		this._size = size;
		this.year = year;
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
		const rowSize = Math.floor(Math.sqrt(relative * 3.6));
		return [relative, rowSize];
	}

	relativeText(next) {
		return `${next.name} can hold around ${this.relativeSize(next)[0]} ${
			this.pluralName
		} worth's of information`;
	}
}

export default DeviceInfo;
