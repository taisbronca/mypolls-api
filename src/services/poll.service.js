import Poll from "../models/Poll.js";

export const createService = (body) => Poll.create(body);

export const findAllService = () => Poll.find().populate("user");

export const findByIdService = (id) => Poll.findById(id).populate("user");

export const updateService = (id, title, options, createdAt, updatedAt) =>
  Poll.findOneAndUpdate({ _id: id }, { title, options }, { new: true });

export const deleteService = (id) => Poll.findByIdAndDelete(id);

export const voteService = async (id, optionId) => {
  const poll = await Poll.findById(id);
  if (!poll) return null;

  const option = poll.options.id(optionId);
  if (!option) return null;

  option.votes += 1;
  await poll.save();

  return poll;
};
