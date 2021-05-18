import TsneParameter from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/parameters/TsneParameter";
import TsneStrategy from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/alghorithms/TsneStrategy";
import DimReduction from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/DimReduction";
import Parameter from "../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/Parameter";
import AlgorithmStrategy from "../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/AlgorithmStrategy";

let parameters = {DimensionsNumber: 3, Perplexity: 12, Epsilon: 18};

test("Check error if abstract parameter is initialized", () => {
	let parameter = new Parameter({DimensionsNumber: 2});
	const eps = () => parameter.getEpsilon();
	const per = () => parameter.getPerplexity();
	const dist = () => parameter.getMinDist();
	const nei = () => parameter.getNeighbors();
	const conn = () => parameter.getLocalConnection();
	expect(eps).toThrow("Method 'getEpsilon()' must be implemented.");
	expect(per).toThrow("Method 'getPerplexity()' must be implemented.");
	expect(dist).toThrow("Method 'getMinDist()' must be implemented.");
	expect(nei).toThrow("Method 'getNeighbours()' must be implemented.");
	expect(conn).toThrow("Method 'getLocalConnection()' must be implemented.");
});
test("Check error in initialized Algorithm Strategy", () => {
	const create = () => new AlgorithmStrategy();
	expect(create).toThrow("Abstract classes can't be instantiated.");
});
test("Check that the parameters of the algorithms are set correctly", () => {
	//set parameters
	let	tSneParams = new TsneParameter(parameters);
	//check parameters
	expect(tSneParams.getDimensionsNumber()).toStrictEqual(3);
	expect(tSneParams.getEpsilon()).toStrictEqual(18);
	expect(tSneParams.getPerplexity()).toStrictEqual(12);
});

test("Check that the algorithm is set correctly in the Strategy", () => {
	
	let drStrategy = new DimReduction(),
		strategy = new TsneStrategy(),
		parameter = new TsneParameter(parameters),
		red;
    
	drStrategy.setStrategy(strategy);
	expect(drStrategy.strategy).toBe(strategy);
	red = drStrategy.executeStrategy(parameter, [[1,2],[3,4]]);
	expect(red._cols).toBe(3);
});