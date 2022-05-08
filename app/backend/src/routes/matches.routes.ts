import { Router } from 'express';
import express = require('express');
import MatchesController from '../controllers/match.controller';

const matchesRouter: Router = express.Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.get('/:id', matchesController.getById);

export default matchesRouter;
