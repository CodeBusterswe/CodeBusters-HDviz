import TsneParameter from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/parameters/TsneParameter";
import TsneStrategy from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/alghorithms/TsneStrategy";
import DimReduction from "./../components/UI/burgerMenuUI/ModalContent/StrategyDimReduction/DimReduction";

let parameters = {DimensionsNumber: 3, Perplexity: 12, Epsilon: 18};

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