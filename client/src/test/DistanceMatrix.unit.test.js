import DistanceMatrix from "../stores/data/DistanceMatrix";

let distanceMatrix = new DistanceMatrix(),
	link = {sorce: "a", target: "b", value: 2},
	node = {id: "a", group: "z"};

test("add elements and get data", () => {
	distanceMatrix.pushNode(node);
	distanceMatrix.pushLink(link);
	expect(distanceMatrix.nodes).toStrictEqual([node]);
	expect(distanceMatrix.links).toStrictEqual([link]);
});
