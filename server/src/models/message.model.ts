import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: String,
  to: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('messages', messageSchema);