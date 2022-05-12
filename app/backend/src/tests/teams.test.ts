import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeams = [
  {
      "id": 1,
      "teamName": "Avaí/Kindermann"
  },
  {
      "id": 2,
      "teamName": "Bahia"
  },
  {
      "id": 3,
      "teamName": "Botafogo"
  },
  {
      "id": 4,
      "teamName": "Corinthians"
  },
  {
      "id": 5,
      "teamName": "Cruzeiro"
  },
  {
      "id": 6,
      "teamName": "Ferroviária"
  },
  {
      "id": 7,
      "teamName": "Flamengo"
  },
  {
      "id": 8,
      "teamName": "Grêmio"
  },
  {
      "id": 9,
      "teamName": "Internacional"
  },
  {
      "id": 10,
      "teamName": "Minas Brasília"
  },
  {
      "id": 11,
      "teamName": "Napoli-SC"
  },
  {
      "id": 12,
      "teamName": "Palmeiras"
  },
  {
      "id": 13,
      "teamName": "Real Brasília"
  },
  {
      "id": 14,
      "teamName": "Santos"
  },
  {
      "id": 15,
      "teamName": "São José-SP"
  },
  {
      "id": 16,
      "teamName": "São Paulo"
  }
]

describe('Rota /teams', () => {
  let chaiResponse: Response;

  beforeEach(async () => {
    sinon
    .stub(Teams, "findAll")
    .resolves(mockTeams as unknown as Teams[]);

    sinon
    .stub(Teams, "findByPk")
    .resolves(mockTeams[0] as unknown as Teams);

  })

  afterEach(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Ao fazer um GET em na rota /teams/:id , retorna o objeto correspondente', async () => {
    chaiResponse = await chai
      .request(app).get('/teams/1')
    expect(chaiResponse.body.id).to.be.equal(mockTeams[0].id);
  });  
});
