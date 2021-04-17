import {serverTest} from "../model/services/Services";

describe("Server is ready /", () => {
	test("It should respond with", async () => {
		serverTest();
		/* 	  const response = await request(server).get("/test-server");
	  //console.log(response.body)
	  expect(response.body.server).toEqual(`server running ${server.address().port}`);
	  expect(response.statusCode).toBe(200); */
	});
});