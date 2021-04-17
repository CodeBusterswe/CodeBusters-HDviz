import Dimension from "../../stores/data/Dimension";

let dimension = new Dimension("test");

test("getters and setters", () => {
	dimension.isChecked = true;
	dimension.isNumeric = true;
	dimension.isReduced = true;
	dimension.toReduce = true;

	expect(dimension.isChecked).toBe(true);
	expect(dimension.isReduced).toBe(true);
	expect(dimension.toReduce).toBe(true);
	expect(dimension.isNumeric).toBe(true);
	expect(dimension.value).toBe("test");
});
