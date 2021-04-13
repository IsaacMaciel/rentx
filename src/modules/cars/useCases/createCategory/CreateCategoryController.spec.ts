import { app } from "@shared/infra/http/app";
import request from "supertest";

import { v4 as uuidv4 } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()

    const id = uuidv4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
          `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })


  it("should be able to create a new category", async () => {
    const tokenResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    })
    const { refresh_token } = tokenResponse.body

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const tokenResponse = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    })
    const { refresh_token } = tokenResponse.body

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(400);
  });
});
