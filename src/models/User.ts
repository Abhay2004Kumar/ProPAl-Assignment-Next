import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
