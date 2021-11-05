const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const mock = require("./mockConnection");

chai.use(chaiHttp);

const server = require("../src/api/app");

const {
  StatusCodes: { CREATED, BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED, NO_CONTENT }
} = require("http-status-codes");

describe.only('3 - using the EndPoint POST /tasks', () => {
  describe('creating a new Task', () => {
    let response;
    let Authorization;

    before(async () => {
      const connectionMock = await mock();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      connectionMock.db("ToDoList_Ebytir")
      .collection("users")
      .insertOne({
        name: "Silvinha Giannattasio",
        email: "silvinha@trybe.com",
        password: "132456"
      });
      
      const { body :{ token }} = await chai
      .request(server)
      .post("/login")
      .send( { email: "silvinha@trybe.com", password: "123456" } )
      Authorization = token;
    });
    after(async() => MongoClient.connect.restore());

    it('', () => {

    });

    it('', () => {

    });
  })

  describe('', () => {
    let response = {};
    let Authorization;

    before(async () => {
      const connectionMock = await mock();
      sinon.stub(MongoClient, "connect").resolves(connectionMock);
      connectionMock
        .db("ToDoList_Ebytir")
        .collection("users")
        .insertOne({
          name: "Silvinha Giannattasio",
          email: "silvinha@trybe.com",
          password: "123456",
        });
      const {
        body: { token },
      } = await chai.request(server).post("/login").send({
        email: "silvinha@trybe.com",
        password: "123456",
      });
      Authorization = token;
    });
    
    after(async () => MongoClient.connect.restore());

    it('usuário autenticado para', () => {

    })

    it('', () => {

    })

    it('', () => {
      
    })

    it('', () => {
      
    })

  })
  
})