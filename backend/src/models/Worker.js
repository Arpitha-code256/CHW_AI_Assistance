import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the worker name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide worker email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact number'],
    },
    role: {
      type: String,
      enum: ['CHW', 'Supervisor', 'Admin'],
      default: 'CHW',
    },
    assignedArea: {
      type: String,
      required: [true, 'Please provide assigned community/village area'],
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;
