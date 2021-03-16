import Dimension from "./../model/Dimension";

let dimension = new Dimension("test");

test("getters and setters", () => {
	dimension.isChecked(true);
	dimension.isNumeric(true);
	dimension.isReduced(true);
	dimension.toReduce(true);

	expect(dimension.getChecked()).toBe(true);
	expect(dimension.getIsReduced()).toBe(true);
	expect(dimension.getToReduce()).toBe(true);
	expect(dimension.getNumeric()).toBe(true);
	expect(dimension.getValue()).toBe("test");
});
