import Joi = require('joi');

const matchesSchema = Joi.object({
  homeTeam: Joi
    .number()
    .required(),

  homeTeamGoals: Joi
    .number()
    .required(),

  awayTeam: Joi
    .number()
    .required(),

  awayTeamGoals: Joi
    .number()
    .required(),
});

export default matchesSchema;
