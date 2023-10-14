import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id:String,
  username: String,
  email: String,
  password: String
});

export default mongoose.model('users', UserSchema);