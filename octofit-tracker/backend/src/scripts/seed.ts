import mongoose, { Types, type Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

type SeedRecord = { _id: Types.ObjectId } & object;

async function missingRecords(model: Model<any>, records: SeedRecord[]): Promise<SeedRecord[]> {
  const existingIds = new Set(
    (await model.distinct('_id', { _id: { $in: records.map(({ _id }) => _id) } })).map(
      (id: Types.ObjectId) => id.toString(),
    ),
  );

  return records.filter(({ _id }) => !existingIds.has(_id.toString()));
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const recentDate = (daysAgo: number): Date => {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() - daysAgo);
      return date;
    };
    const userIds = {
      maya: new Types.ObjectId('670000000000000000000001'),
      noah: new Types.ObjectId('670000000000000000000002'),
      aria: new Types.ObjectId('670000000000000000000003'),
    };
    const teamIds = {
      trailblazers: new Types.ObjectId('670000000000000000000011'),
      paceMakers: new Types.ObjectId('670000000000000000000012'),
    };

    const users = [
      { _id: userIds.maya, username: 'Maya Chen', email: 'maya.chen@example.com', team: teamIds.trailblazers, points: 1280 },
      { _id: userIds.noah, username: 'Noah Williams', email: 'noah.williams@example.com', team: teamIds.trailblazers, points: 1125 },
      { _id: userIds.aria, username: 'Aria Patel', email: 'aria.patel@example.com', team: teamIds.paceMakers, points: 970 },
    ];
    const teams = [
      { _id: teamIds.trailblazers, name: 'Trailblazers', members: [userIds.maya, userIds.noah] },
      { _id: teamIds.paceMakers, name: 'Pace Makers', members: [userIds.aria] },
    ];
    const activities = [
      { _id: new Types.ObjectId('670000000000000000000021'), user: userIds.maya, type: 'Running', duration: 35, distance: 5.2, date: recentDate(1) },
      { _id: new Types.ObjectId('670000000000000000000022'), user: userIds.maya, type: 'Strength Training', duration: 45, date: recentDate(3) },
      { _id: new Types.ObjectId('670000000000000000000023'), user: userIds.noah, type: 'Cycling', duration: 50, distance: 18.4, date: recentDate(1) },
      { _id: new Types.ObjectId('670000000000000000000024'), user: userIds.noah, type: 'Walking', duration: 30, distance: 2.6, date: recentDate(2) },
      { _id: new Types.ObjectId('670000000000000000000025'), user: userIds.aria, type: 'Yoga', duration: 40, date: recentDate(1) },
    ];
    const leaderboard = [
      { _id: new Types.ObjectId('670000000000000000000031'), user: userIds.maya, points: 1280, rank: 1, period: 'weekly' },
      { _id: new Types.ObjectId('670000000000000000000032'), user: userIds.noah, points: 1125, rank: 2, period: 'weekly' },
      { _id: new Types.ObjectId('670000000000000000000033'), user: userIds.aria, points: 970, rank: 3, period: 'weekly' },
    ];
    const workouts = [
      { _id: new Types.ObjectId('670000000000000000000041'), title: 'Quick Cardio Intervals', description: 'A short interval session to build cardiovascular fitness.', difficulty: 'Beginner', duration: 25, exercises: ['Brisk walk', 'Jogging intervals', 'Cool-down stretch'] },
      { _id: new Types.ObjectId('670000000000000000000042'), title: 'Full-Body Strength', description: 'A balanced strength workout using bodyweight exercises.', difficulty: 'Intermediate', duration: 40, exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'] },
      { _id: new Types.ObjectId('670000000000000000000043'), title: 'Recovery and Mobility', description: 'Gentle mobility work and stretching for recovery days.', difficulty: 'Beginner', duration: 20, exercises: ['Cat-cow stretch', 'Hip mobility', 'Hamstring stretch', 'Breathing'] },
    ];

    await User.create(await missingRecords(User, users));
    await Team.create(await missingRecords(Team, teams));
    await Activity.create(await missingRecords(Activity, activities));
    await Leaderboard.create(await missingRecords(Leaderboard, leaderboard));
    await Workout.create(await missingRecords(Workout, workouts));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
