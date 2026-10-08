import mongoose, { Types } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userIds = {
      maya: new Types.ObjectId('670000000000000000000001'),
      noah: new Types.ObjectId('670000000000000000000002'),
      aria: new Types.ObjectId('670000000000000000000003'),
    };
    const teamIds = {
      trailblazers: new Types.ObjectId('670000000000000000000011'),
      paceMakers: new Types.ObjectId('670000000000000000000012'),
    };

    await User.bulkWrite([
      {
        updateOne: {
          filter: { _id: userIds.maya },
          update: {
            $set: { username: 'Maya Chen', email: 'maya.chen@example.com', team: teamIds.trailblazers, points: 1280 },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: userIds.noah },
          update: {
            $set: { username: 'Noah Williams', email: 'noah.williams@example.com', team: teamIds.trailblazers, points: 1125 },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: userIds.aria },
          update: {
            $set: { username: 'Aria Patel', email: 'aria.patel@example.com', team: teamIds.paceMakers, points: 970 },
          },
          upsert: true,
        },
      },
    ]);

    await Team.bulkWrite([
      {
        updateOne: {
          filter: { _id: teamIds.trailblazers },
          update: {
            $set: { name: 'Trailblazers', members: [userIds.maya, userIds.noah] },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: teamIds.paceMakers },
          update: {
            $set: { name: 'Pace Makers', members: [userIds.aria] },
          },
          upsert: true,
        },
      },
    ]);

    const recentDate = (daysAgo: number): Date => {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() - daysAgo);
      return date;
    };
    await Activity.bulkWrite([
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000021') },
          update: {
            $set: { user: userIds.maya, type: 'Running', duration: 35, distance: 5.2, date: recentDate(1) },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000022') },
          update: {
            $set: { user: userIds.maya, type: 'Strength Training', duration: 45, date: recentDate(3) },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000023') },
          update: {
            $set: { user: userIds.noah, type: 'Cycling', duration: 50, distance: 18.4, date: recentDate(1) },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000024') },
          update: {
            $set: { user: userIds.noah, type: 'Walking', duration: 30, distance: 2.6, date: recentDate(2) },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000025') },
          update: {
            $set: { user: userIds.aria, type: 'Yoga', duration: 40, date: recentDate(1) },
          },
          upsert: true,
        },
      },
    ]);

    await Leaderboard.bulkWrite([
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000031') },
          update: { $set: { user: userIds.maya, points: 1280, rank: 1, period: 'weekly' } },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000032') },
          update: { $set: { user: userIds.noah, points: 1125, rank: 2, period: 'weekly' } },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000033') },
          update: { $set: { user: userIds.aria, points: 970, rank: 3, period: 'weekly' } },
          upsert: true,
        },
      },
    ]);

    await Workout.bulkWrite([
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000041') },
          update: {
            $set: {
              title: 'Quick Cardio Intervals',
              description: 'A short interval session to build cardiovascular fitness.',
              difficulty: 'Beginner',
              duration: 25,
              exercises: ['Brisk walk', 'Jogging intervals', 'Cool-down stretch'],
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000042') },
          update: {
            $set: {
              title: 'Full-Body Strength',
              description: 'A balanced strength workout using bodyweight exercises.',
              difficulty: 'Intermediate',
              duration: 40,
              exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { _id: new Types.ObjectId('670000000000000000000043') },
          update: {
            $set: {
              title: 'Recovery and Mobility',
              description: 'Gentle mobility work and stretching for recovery days.',
              difficulty: 'Beginner',
              duration: 20,
              exercises: ['Cat-cow stretch', 'Hip mobility', 'Hamstring stretch', 'Breathing'],
            },
          },
          upsert: true,
        },
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
