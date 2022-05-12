import { Router } from 'express';
import express = require('express');
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter: Router = express.Router();
const matchesController = new LeaderboardController();

leaderboardRouter.get('/home', matchesController.getAll);
leaderboardRouter.get('/away', matchesController.getAll);
leaderboardRouter.get('/', matchesController.getAll);

export default leaderboardRouter;
