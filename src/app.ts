import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/book';
import oauthRoutes from './routes/oauth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/meeting-scheduler')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/book', bookRoutes);
app.use('/api/oauth', oauthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 