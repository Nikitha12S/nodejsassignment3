const request = require("supertest");
const app=require('../controller/employee.controller');

describe("POST /post", () => {
  it("should post employee data", async () => {
    const response = await request(app)
      .post("/post")
      .send({ fullName: "Test User",
       positiion: "Jr Developer",
       location:"Udupi",
       salary:"20000", 
       id: 123 });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Posted");
  });
});

describe("PUT /update/:id", () => {
  it("should update employee data", async () => {
    const response = await request(app)
      .put("/update/123")
      .send({ fullName: "Updated User", positiion: "Sr Developer" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated User");
    expect(response.body.positiion).toBe("Sr Developer");
  });

  it("should handle non-existent user update", async () => {
    const response = await request(app)
      .put("/update/999")
      .send({ name: "Updated User", positiion: "Sr Developer" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Nothing found");
  });
});

describe("GET /employees", () => {
  it("should retrieve users", async () => {
    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});