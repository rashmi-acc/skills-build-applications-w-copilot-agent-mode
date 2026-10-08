import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);