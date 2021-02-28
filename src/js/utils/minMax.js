export const minMaxFactory = (min, max) => {
	return (num) => Math.max(Math.min(num, max), min);
};

const minMax = minMaxFactory(0, 1);

export default minMax;
