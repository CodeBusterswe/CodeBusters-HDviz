const request =require("supertest");
const server = require("../server");

// start connection
beforeAll(async () => {
	server.address().port;	
});

describe("Server Running /", () => {
	test("It should respond with codeStatus 200", async () => {
	  const response = await request(server).get("/test-server");
	  expect(response.body.server).toEqual(`server running ${server.address().port}`);
	  expect(response.statusCode).toBe(200);
	});
});

// close connectione 
afterAll(async () => {
	await server.close();
});
