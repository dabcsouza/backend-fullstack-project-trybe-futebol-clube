// import chaiHttp = require('chai-http');
// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import { app } from '../app';
// import { Response } from 'superagent';
// import { StatusCodes } from 'http-status-codes';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Rota /login', () => {
//   let response: Response;
//   describe('Testa se ao fazer uma requisição', () => {
//     before(async () => {
//       response = await chai
//         .request(app)
//         .post('/login')
//         .send({
//           password: 'qualquer coisa'
//         });
//     });

//     it('Sem o campo email a api retorna o erro 401', () => {
//       expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
//     });

//     before(async () => {
//       response = await chai
//         .request(app)
//         .post('/login')
//         .send({
//           email: 'teste@teste.com'
//         });
//     });

//     it('Sem o campo password a api retorna o erro 401', () => {
//       expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
//     });

//     before(async () => {
//       response = await chai
//         .request(app)
//         .post('/login')
//         .send({
//           email: 'teste@teste.com',
//           password: '123456768865',
//         });
//     });

//     it('Se o usuário ou senha estiver errado retorna o erro 401', () => {
//       expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
//     });
//   });
// });
