import DistanceMatrix from "./../model/DistanceMatrix";

let distanceMatrix = new DistanceMatrix(),
	link = {sorce: "a", target: "b", value: 2},
	node = {id: "a", group: "z"};

test("add elements and get data", () => {
	distanceMatrix.pushNode(node);
	distanceMatrix.pushLink(link);
	expect(distanceMatrix.getNodes()).toStrictEqual([node]);
	expect(distanceMatrix.getLinks()).toStrictEqual([link]);
});
