import {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
  voteService,
} from "../services/poll.service.js";

export const create = async (req, res) => {
  try {
    const { title, options } = req.body;

    if (!title || !options || !options.length) {
      res.status(400).send({ message: "Submit all fields for resitration" });
    }

    const formattedOptions = options.map((option) => ({
      option,
      votes: 0,
    }));

    const poll = await createService({
      title,
      options: formattedOptions,
      user: req.userId,
    });

    res.send(201).send(poll);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const polls = await findAllService();

    if (!polls || polls.length === 0) {
      return res
        .status(404)
        .send({ message: "There are no registered polls." });
    }

    return res.status(200).send(polls);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await findByIdService(id);

    if (!poll) {
      return res.status(404).send({ message: "Poll not found." });
    }

    return res.status(200).send({
        id: poll._id,
        title: poll.title,
        options: poll.options,
        name: poll.user.name,
    })
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, options } = req.body;

    if (!title && (!options || !options.length)) {
      return res.status(400).send({ message: "Submit at least one field for update." });
    }

    const updatedPoll = await updateService(id, title, options);

    if (!updatedPoll) {
      return res.status(404).send({ message: "Poll not found." });
    }

    res.send({ message: "Poll updated successfully.", updatedPoll });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPoll = await deleteService(id);

    if (!deletedPoll) {
      return res.status(404).send({ message: "Poll not found." });
    }

    res.send({ message: "Poll deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const vote = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;

    const poll = await voteService(id, optionId);

    if (!poll) {
      return res.status(404).send({ message: "Poll or Option not found." });
    }

    res.send({ message: "Vote registered successfully.", poll });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
