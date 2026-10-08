import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);