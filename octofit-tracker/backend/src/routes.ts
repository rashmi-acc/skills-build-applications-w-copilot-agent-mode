import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.get('/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

router.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

router.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});

router.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default router;
