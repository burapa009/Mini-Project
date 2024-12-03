import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  manager_id: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema); 