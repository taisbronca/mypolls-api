import {
  createService,
  findAllService,
  findByIdService,
  updateService,
} from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }

    const user = await createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating User" });
    }

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        email,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no registered users" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await findByIdService(
      req.params.id,
      req.userId
    );
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).send({ message: "Submit at least one field for update" });
    }

    const { id, user } = req;

    await updateService(id, name, email, password);

    res.send({ message: "User successfully updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
