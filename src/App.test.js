import { render } from '@testing-library/react';
import ScatterPlotMatrix from "./components/SPM";
import App from './App';

const DimColore = 'color',
Data = [{sepallength: 5.1, sepalwidth: 3.5, petallength: 1.4, petalwidth: 0.2, class: "Iris-setosa"},
        {sepallength: 4.9, sepalwidth: 3, petallength: 1.4, petalwidth: 0.2, class: "Iris-setosa"}],
Dims = ["sepallength", "sepalwidth", "petallength", "petalwidth"];

//test App =====================================================================
test('app renderizzata correttamente', () => {
  render(<App />);
});

//test SPM =====================================================================

test('SPM renderizzato correttamente', () => {
  render(<ScatterPlotMatrix dimColor={DimColore} 
                            data={Data} 
                            dims={Dims.filter((d) => d!="-")} 
         />);
});

//snapshot test =================================================================
test("<SPM /> corrisponde allo snapshot", () => {
  //render ritorna un oggetto con diverse properties, una di queste è il container
  const component = render(<ScatterPlotMatrix dimColor={DimColore} 
                                              data={Data} 
                                              dims={Dims.filter((d) => d!="-")} 
                            />);
  //container contiene il "DOM node" dell'elemento renderizzato (div)
  expect(component.container).toMatchSnapshot();
});

//test =================================================================