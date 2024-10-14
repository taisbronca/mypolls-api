import Poll from "../models/Poll.js";

function createPollRepository(title, options, userId) {
  return Poll.create({
    title,
    options,
    user: userId,
  });
}

function findAllPollsRepository(offset, limit) {
  return Poll.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function findPollByIdRepository(id) {
  return Poll.findById(id).populate("user");
}

function countPolls() {
  return Poll.countDocuments();
}

function findPollsByUserIdRepository(id) {
  return Poll.find({ user: id }).sort({ _id: 1 }).populate("user");
}

function updatePollRepository(id, title, options) {
  return Poll.findOneAndUpdate(
    { _id: id },
    { title, options },
    { rawResult: true }
  );
}

function deletePollRepository(id) {
  return Poll.findByIdAndDelete({ _id: id });
}

function incrementVoteRepository(id, userId) {
  return Poll.findOneAndUpdate(
    {
      _id: id,
      "votes.userId": { $nin: [userId] },
    },
    {
      $push: {
        votes: { userId, optionId },
      },
    },
    { rawResult: true }
  );
}

export default {
  createPollRepository,
  findAllPollsRepository,
  findPollByIdRepository,
  countPolls,
  findPollsByUserIdRepository,
  updatePollRepository,
  deletePollRepository,
  incrementVoteRepository,
};
