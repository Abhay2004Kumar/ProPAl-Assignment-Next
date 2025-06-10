// src/models/User.ts
import mongoose from 'mongoose';

// Interface for User document
export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  _id: mongoose.Types.ObjectId;
}

// Interface for User model (static methods if any)
interface IUserModel extends mongoose.Model<IUser> { findByEmail(email: string): Promise<IUser | null>;}

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String
});

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

export default mongoose.models.User || mongoose.model<IUser, IUserModel>('User', UserSchema);