const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const mock = require("./mockConnection");

chai.use(chaiHttp);

const server = require("../src/api/app");

const {
  StatusCodes: { CREATED, BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED, NO_CONTENT, FORBIDDEN }
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
          title: "Best Facilitadora of the World",
          content: "This is Silvinha!",
        });
      expect(response).to.have.status(CREATED);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("NewTaskAdded");
      expect(response.body.NewTaskAdded).to.have.property("createdAt");
      expect(response.body.NewTaskAdded).includes({
        title: 'Best Facilitadora of the World',
        content: 'This is Silvinha!',
        createdBy: 'Silvinha Giannattasio',
      })
    });
    it("return an Object", async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Facilitadora of the World",
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

    it('User is not Authenticated', async () => {
      response = await chai.request(server).post("/tasks")
        .send({
          title: "Best Facilitadora of the World",
          content: "This is Silvinha!",
        });
        expect(response).to.have.status(FORBIDDEN);
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
      expect(response.body.message).to.be.equal("Title is required");
    });

    it('"Content" is missing', async () => {
      response = await chai.request(server).post("/tasks")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Facilitadora of the World",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Content is required");
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
      expect(response.body.message).to.be.equal("Title must not be empty");
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
      expect(response.body.message).to.be.equal("Content must not be empty");
    });
  })

  // ____________________________________________PUT_

  describe.only('Using the endPoint PUT /tasks => ', () => {
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
      response = await chai.request(server).put("/tasks/6184872172d1f1ce1f7a8c8f")
        .send({
          title: "Best Facilitadora of the World",
          content: "This is Silvinha!",
        });
        expect(response).to.have.status(FORBIDDEN);
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Unauthorized User");
      })

    it('is Not Possible edit a taks that doesnt exist', async () => {
      response = await chai.request(server).put("/tasks/5184872172d1f1ce1f7a8c8f")
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
      response = await chai.request(server).put("/tasks/5184872172d1f1ce1f7a8c8f")
        .set({
          "Authorization": Authorization
        })
        .send({
          content: "This is Silvinha!",
        });
      console.log('📓 ~ file: tasks.test.js ~ line 234 ~ it ~ response', response.body);
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Title is required");
    });
    
    it('"Content" is missing', async () => {
      response = await chai.request(server).put("/tasks/:id")
        .set({
          "Authorization": Authorization
        })
        .send({
          title: "Best Facilitadora of the World",
        });
      expect(response).to.have.status(BAD_REQUEST);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.equal("Content is required");
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
      expect(response.body.message).to.be.equal("Title must not be empty");
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
      expect(response.body.message).to.be.equal("Content must not be empty");
    });
  })

  // _________________GET ALL AND GET BY ID
  describe('Using the endPoint GET /tasks => ', () => {
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
          expect(response.body).to.be.an("object");
          expect(response.body).to.have.property("message");
          expect(response.body.message).to.be.equal("Unauthorized User");
      })

      it('Get All Tasks', async () => {
        response = await chai.request(server).get("/tasks/")
          .set({
            "Authorization": Authorization
          })
          expect(response).to.have.status(OK);
          expect(response.body).to.be.a("array");
          const tasks = response.body;
          tasks.forEach((task) => expect(task).to.be.an("object"))
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
    });
  });
});