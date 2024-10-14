import userService from "../services/user.service.js";

async function createUserController(req, res) {
  const { name, email, password } = req.body;

  try {
    const token = await userService.createUserService({
      name,
      email,
      password,
    });
    res.status(201).send(token);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function findAllUserController(req, res) {
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    return res.status(404).send(e.message);
  }
}

async function findUserByIdController(req, res) {
  try {
    const user = await userService.findUserByIdService(
      req.params.id,
      req.userId
    );
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    const { id: userId } = req.params;
    const userIdLogged = req.userId;

    const response = await userService.updateUserService(
      { name, email, password },
      userId,
      userIdLogged
    );

    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
};
