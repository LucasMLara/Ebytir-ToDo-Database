const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const mock = require('./mockConnection')

chai.use(chaiHttp);

const server = require("../src/api/app");

const {
  StatusCodes: { CREATED },
} = require("http-status-codes");

describe("1 - Using the endPoint /users", () => {
  describe("When a new user is created", () => {
    let response = {};

    before(async () => {
      const connectionMock = await mock();

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      response = await chai.request(server).post("/users").send({
        name: "Silvinha Gianattasio",
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
      expect(response.body.message).to.be.equal("Novo Usuário Cadastrado");
    });
  });

  describe('1.1 - Check new User Inputs', () => {
    let response = {};

    before(async () => {
      const connectionMock = await mock();

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      response = await chai.request(server).post("/users").send({
        name: "Silvinha Gianattasio",
        email: "silvinha@trybe.com",
        password: "123456",
      });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Name is Required!', () => {
    })
    it('Email is Required!', () => {
    })
    it('Password is Required!', () => {

    })
  })
});