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
// ______________________________________________CREATE
describe("3 - Using the endPoint POST /tasks", () => {
  describe("When a new task is created with success", () => {
    let response;
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

    it('returns Status HTTP 201 - "Created"', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Faciliatora of the World",
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(CREATED);
    });
    it("return an Object", async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Faciliatora of the World",
          content: "This is Silvinha!",
        });
      expect(response.body).to.be.a("object");
    });
  });

  describe('Task will Not be Added if => ', () => {
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

    it('User is not Authenticated', () => {
      response = await chai.request(server).post("/tasks")
        .send({
          title: "Best Facilitadora of the World",
          content: "This is Silvinha!",
        });
        expect(response).to.have.status(UNAUTHORIZED);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Unauthorized User");

    })
    it('"Title" is missing', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"title\" is required");
    });

    it('"Content" is missing', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Faciliatora of the World",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"content\" is required");
    });
    it('"Title" is not Empty', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "",
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"title\" is empty");
    });
    
    it('"Content" is not Empty', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Facilitadora of the World",
          content: "",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"content\" is empty");
    });
  })

  // ____________________________________________PUT_

  describe('When a task is edited with success => ', () => {
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

    it('User is not Authenticated', () => {
      response = await chai.request(server).put("/tasks:id")
        .send({
          title: "Best Facilitadora of the World",
          content: "This is Silvinha!",
        });
        expect(response).to.have.status(UNAUTHORIZED);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Unauthorized User");
      })

    it('is Not Possible edit a taks that doesnt exist', async () => {
      response = await chai.request(server).put("/tasks/999999999999999999999")
      .set({
        "Authorization": Authorization
      })
      .send({
        title: "Best Facilitadora of the World",
        content: "This is Silvinha!",
      });
      expect(response).to.have.status(NOT_FOUND);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Task not found");
    });

    it('"Title" is missing', async () => {
      response = await chai.request(server).put("/tasks/:id")
        .set({
          "Authorization": Authorization
        })
        .send({
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"title\" is required");
    });
    
    it('"Content" is missing', async () => {
      response = await chai.request(server).put("/tasks/:id")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Faciliatora of the World",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"content\" is required");
    });
    it('"Title" is not Empty', async () => {
      response = await chai.request(server).put("/tasks/:id")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "",
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"title\" is empty");
    });
    
    it('"Content" is not Empty', async () => {
      response = await chai.request(server).put("/tasks/:id")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Facilitadora of the World",
          content: "",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"content\" is empty");
    });
  }
  

  // _________________GET ALL AND GET BY ID
  describe('Can get All Tasks and a single Task => ', () => {
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

      it('User is not Authenticated', async () => {
        response = await chai.request(server).get("/tasks")
          expect(response).to.have.status(UNAUTHORIZED);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("message");
          expect(response.body.message).to.be.equal("Unauthorized User");
      })

      it('Get All Tasks', async () => {
        response = await chai.request(server).get("/tasks/")
          .set({
            "Authorization": Authorization
          })
          expect(response).to.have.status(OK);
      });

      it('is Not Possible get a taks that doesnt exist', async () => {
        response = await chai.request(server).get("/tasks/999999999999999999999")
        set({
          "Authorization": Authorization
        })
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Task not found");
      })
});

  // // _______________________ DELETE TASK

  describe('When a task is deleted with success => ', () => {
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

    it('User is not Authenticated', async () => {
      response = await chai.request(server).delete("/tasks:id")
        expect(response).to.have.status(UNAUTHORIZED);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Unauthorized User");
    });

    it('"Check if Task exists', async () => {
      response = await chai.request(server).delete("/tasks/9999999999999999999999999999999")
        .set({"Authorization": Authorization})
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Task does not exist");
    });
  
    it('Task deleted successfuly', async () => {
      response = await chai.request(server).delete("/tasks/:id")
        .set({
          "Authorization": Authorization
        });
      expect(response).to.have.status(NO_CONTENT);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("\"content\" is required");
    });
  });
});