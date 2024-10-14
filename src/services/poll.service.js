import pollRepositories from "../repositories/poll.repositories.js";

async function createPollService({ title, options }, userId) {
  if (!title || !options || options.length === 0) {
    throw new Error("Title and at least one option are required");
  }
  const { id } = await pollRepositories.createPollRepository(
    title,
    options,
    userId
  );

  return {
    message: "Poll created successfully",
    poll: { id, title, options },
  };
}

async function findAllPollService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const polls = await pollRepositories.findAllPollsRepository(offset, limit);
  const total = await pollRepositories.countPolls();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  polls.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,
    results: polls.map((poll) => ({
      id: poll._id,
      title: poll.title,
      options: Array.isArray(poll.options)
        ? poll.options.map((option) => ({
            option: option.option,
            votes: option.votes,
          }))
        : [],
      name: poll.user.name,
    })),
  };
}

async function findPollByIdService(id) {
  const poll = await pollRepositories.findPollByIdRepository(id);

  if (!poll) throw new Error("Poll not found");

  return {
    id: poll._id,
    title: poll.title,
    options: Array.isArray(poll.options)
      ? poll.options.map((option) => ({
          option: option.option,
          votes: option.votes,
        }))
      : [],
    name: poll.user.name,
  };
}

async function findPollByUserIdService(id) {
  const polls = await pollRepositories.findPollsByUserIdRepository(id);

  return {
    pollsByUser: polls.map((poll) => ({
      id: poll._id,
      title: poll.title,
      options: Array.isArray(poll.options)
        ? poll.options.map((option) => ({
            option: option.option,
            votes: option.votes,
          }))
        : [],
      name: poll.user?.name || "Anonymous",
    })),
  };
}

async function updatePollService(id, title, options, userId) {
  if (!title && !options)
    throw new Error("Submit at least one field to update the poll");

  const poll = await pollRepositories.findPollByIdRepository(id);

  if (!poll) throw new Error("Poll not found");

  if (poll.user._id != userId) throw new Error("You didn't create this poll");
  const formattedOptions = options.map((opt) => ({
    option: opt.option,
    votes: 0,
  }));

  await pollRepositories.updatePollRepository(id, title, formattedOptions);
}

async function deletePollService(id, userId) {
  const poll = await pollRepositories.findPollByIdRepository(id);

  if (poll.user._id != userId) throw new Error("You didn't create this poll");

  await pollRepositories.deletePollRepository(id);
}

async function votePollService(id, optionId, userId) {
  if (!optionId) throw new Error("Submit at least one option");

  const poll = await pollRepositories.findPollByIdRepository(optionId);

  if (!poll) throw new Error("Poll not found");

  await pollRepositories.incrementVoteRepository(id, optionId, userId);
}

export default {
  createPollService,
  findAllPollService,
  findPollByIdService,
  findPollByUserIdService,
  updatePollService,
  deletePollService,
  votePollService,
};
