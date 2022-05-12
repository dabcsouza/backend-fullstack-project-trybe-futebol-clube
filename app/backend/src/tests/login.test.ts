import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const mockUsers = [
  {
    "id":1,
    "username":"Admin",
    "role":"admin",
    "email":"admin@admin.com",
    "password":"$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  },
  {
    "id":2,
    "username":"User",
    "role":"user",
    "email":"user@user.com",
    "password":"$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
  }
]

describe('Rota /login', () => {
  let chaiResponse: Response;

  beforeEach(async () => sinon
    .stub(Users, "findAll")
    .resolves(mockUsers as Users[]));

  afterEach(()=>{
    (Users.findAll as sinon.SinonStub).restore();
  })

  it('Ao enviar requisição com o body vazio retorna erro 400', async () => {
    chaiResponse = await chai
      .request(app).post('/login')
      .send({});
    expect(chaiResponse).to.have.status(StatusCodes.BAD_REQUEST);
  });

  it('Ao enviar requisição com os dados corretos retorna status 200', async () => {
    chaiResponse = await chai
      .request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
    expect(chaiResponse).to.have.status(StatusCodes.OK);
  });

  
});
