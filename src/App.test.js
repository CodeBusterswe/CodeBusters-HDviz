import { render } from '@testing-library/react';
import ScatterPlotMatrix from "./components/SPM";
import App from './App';

test('app renderizzata correttamente', () => {
  render(<App />);
});

test('SPM renderizzato correttamente', () => {

  let DimColore = 'color',
      Data = [{sepallength: 5.1, sepalwidth: 3.5, petallength: 1.4, petalwidth: 0.2, class: "Iris-setosa"},
              {sepallength: 4.9, sepalwidth: 3, petallength: 1.4, petalwidth: 0.2, class: "Iris-setosa"}],
      Dims = ["sepallength", "sepalwidth", "petallength", "petalwidth"];


  render(<ScatterPlotMatrix dimColor={DimColore} data={Data} dims={Dims.filter((d) => d!="-")} />);
});
