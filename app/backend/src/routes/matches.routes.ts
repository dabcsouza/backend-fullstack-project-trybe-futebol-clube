import { Router } from 'express';
import express = require('express');
import validateJWT from '../middlewares/validateJWT';
import MatchesController from '../controllers/match.controller';
import validateMatchesFields from '../middlewares/validateMatchesFields';

const matchesRouter: Router = express.Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getByQuery);
matchesRouter.get('/:id', matchesController.getById);
matchesRouter.post('/', validateJWT, validateMatchesFields, matchesController.create);
matchesRouter.patch('/:id/finish', matchesController.finish);
matchesRouter.patch('/:id', matchesController.updateGoals);

export default matchesRouter;
