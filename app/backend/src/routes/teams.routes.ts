import { Router } from 'express';
import express = require('express');
import TeamsController from '../controllers/teams.controller';

const teamsRouter: Router = express.Router();
const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getById);

export default teamsRouter;
