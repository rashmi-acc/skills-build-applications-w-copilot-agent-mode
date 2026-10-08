import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    exercises: [{ type: String }],
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);