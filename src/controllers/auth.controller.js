import bcrypt from "bcrypt";
import { generateToken, loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);

    if (!user) {
      return res
        .send(404)
        .send({ message: "You have entered an invalid user or password" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .send(404)
        .send({ message: "You have entered an invalid user or password" });
    }

    const token = generateToken(user.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
