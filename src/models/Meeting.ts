import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  manager_id: { type: String, required: true },
  staff_id: { type: String, required: true },
  team_member: { type: String, required: true },
  time_slot: { type: Date, required: true },
  duration: { type: Number, required: true }
});

export const Meeting = mongoose.model('Meeting', meetingSchema); 