import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model("Poll", PollSchema);

export default Poll;