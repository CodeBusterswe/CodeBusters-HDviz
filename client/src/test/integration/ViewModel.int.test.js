import ViewModel from "./../../ViewModel";
const {Client}=require("pg");
const express=require("express");
const router=express.Router();
var DB_NAME= require("../../../../server/config/default");
const db = require("../../../../server/config/db");

let viewModel;

beforeEach(() => {
	viewModel = new ViewModel();
});

describe("tests for getters/setters", () => {

	test("viewModel should update model and get data", () => {
		expect(viewModel.getAllDataset()).toBe(null);
	});

});