const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

chai.use(chaiHttp);

const server = require("../src/api/app");

const {
  StatusCodes: { CREATED },
} = require("http-status-codes");

describe("Using the endPoint /users", () => {
  describe("when a new user is created", () => {
    let response = {};
    const DBserver = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBserver.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      response = await chai.request(server).post("/users").send({
        name: "Maria Gabriela",
        password: "123456",
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBserver.stop();
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
});
