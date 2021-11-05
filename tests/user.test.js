const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const mock = require("./mockConnection");

chai.use(chaiHttp);

const server = require("../src/api/app");

const {
  StatusCodes: { CREATED, BAD_REQUEST, OK, UNAUTHORIZED },
} = require("http-status-codes");

describe("1 - Using the endPoint /users", () => {
  describe("When a new user is created", () => {
    let response = {};

    before(async () => {
      const connectionMock = await mock();

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      response = await chai.request(server).post("/users").send({
        name: "Silvinha Giannattasio",
        email: "silvinha@trybe.com",
        password: "123456",
      });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('returns Status HTTP 201 - "Created"', () => {
      expect(response).to.have.status(CREATED);
    });

    it("return an Object", () => {
      expect(response.body).to.be.a("object");
    });

    it('with a "message" property', () => {
      expect(response.body).to.have.property("message");
    });
    it('and the message is: "Novo Usuário Cadastrado"', () => {
      expect(response.body.message).to.be.equal("New User Created");
    });
  });

  describe("1.1 - Check new User Inputs", () => {
    let response;

    before(async () => {
      const connectionMock = await mock();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it("Name is Required!", async () => {
      response = await chai.request(server).post("/users").send({
        email: "silvinha@trybe.com",
        password: "123456",
      });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "Algum dos campos está faltoso ou inválido"
      );
    });
    it("Email is Required!", async () => {
      response = await chai.request(server).post("/users").send({
        name: "Silvinha Giannattasio",
        password: "123456",
      });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "Algum dos campos está faltoso ou inválido"
      );
    });
    it("Password is Required!", async () => {
      response = await chai.request(server).post("/users").send({
        name: "Silvinha Giannattasio",
        email: "silvinha@trybe.com",
      });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal(
        "Algum dos campos está faltoso ou inválido"
      );
    });
  });
});

describe("2 - Using the endPoint /login", () => {
  describe("When the user try to log in on Application", () => {
    before(async () => {
      const connectionMock = await mock();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      connectionMock.db('ToDoList_Ebytir').collection('users').insertOne({ name: "Silvinha Giannattasio",  email: "silvinha@trybe.com", password: "123456" });
    });

    after(async () => {
      MongoClient.connect.restore();
    });
  });

  it("Successfuly Login", async () => {
    let response = await chai.request(server).post("/login").send({
      email: "silvinha@trybe.com",
      password: "123456",
    });
    expect(response).to.have.status(OK);
    expect(response.body.token).not.to.be.null
  });

  it("When the email is missing", async () => {
    let response = await chai.request(server).post("/login").send({
      password: "123456",
    });
    expect(response).to.have.status(BAD_REQUEST);
    expect(response.body).to.be.a("object");
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("\"email\" is required");
  });
  
  
  it("When the password is missing ", async () => {
    let response = await chai.request(server).post("/login").send({
      email: "silvinha@trybe.com",
    });
    expect(response).to.have.status(BAD_REQUEST);
    expect(response.body).to.be.a("object");
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("\"password\" is required");
  });
  
  it("With invalid email", async () => {
    let response = await chai.request(server).post("/login").send({
      email: "silvinha@8.com",
      password: "123456",
    });
    expect(response).to.have.status(UNAUTHORIZED);
    expect(response.body).to.be.a("object");
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Incorrect username or password");
  });
  
  it("With invalid password", async () => {
    let response = await chai.request(server).post("/login").send({
      email: "silvinha@trybe.com",
      password: "123",
    });
    expect(response).to.have.status(UNAUTHORIZED);
    expect(response.body).to.be.a("object");
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Incorrect username or password");
  });
});
