import pollService from "../services/poll.service.js";

async function createPollController(req, res) {
  const { title, options } = req.body;
  const userId = req.userId;

  try {
    const formattedOptions = options.map((option) => ({
      option: option.option || option,
      votes: option.votes || 0,
    }));

    const poll = await pollService.createPollService(
      {
        title,
        options: formattedOptions,
      },
      userId
    );

    return res.status(201).send(poll);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function findAllPollController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const polls = await pollService.findAllPollService(
      limit,
      offset,
      currentUrl
    );

    return res.status(200).send(polls);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function findByIdPollController(req, res) {
  const { id } = req.params;
  try {
    const poll = await pollService.findPollByIdService(id);

    return res.status(200).send(poll);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function findPollByUserIdController(req, res) {
  const id = req.userId;
  try {
    const polls = await pollService.findPollByUserIdService(id);
    return res.send(polls);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updatePollController(req, res) {
  const { title, options } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    const formattedOptions = options.map((option) => ({
      option: option.option || option,
      votes: option.votes || 0,
    }));

    await pollService.updatePollService(id, title, formattedOptions, userId);

    return res.status(200).send({ message: "Poll updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function removePollController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await pollService.deletePollService(id, userId);
    return res.send({ message: "Poll deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

async function votePollController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await pollService.votePollService(id, userId);

    return res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export default {
  createPollController,
  findAllPollController,
  findByIdPollController,
  findPollByUserIdController,
  updatePollController,
  removePollController,
  votePollController,
};
