import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);