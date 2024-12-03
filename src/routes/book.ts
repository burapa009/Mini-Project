import express from 'express';
import { Meeting } from '../models/Meeting';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all meetings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create meeting
router.post('/', authenticateToken, async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json({ message: 'created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update meeting
router.put('/:meeting_id', authenticateToken, async (req, res) => {
  try {
    await Meeting.findByIdAndUpdate(req.params.meeting_id, req.body);
    res.status(200).json({ message: 'updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete meeting
router.delete('/:meeting_id', authenticateToken, async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.meeting_id);
    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 