import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

router.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

router.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

router.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

router.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().sort({ rank: 1 }).lean());
});

router.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default router;
