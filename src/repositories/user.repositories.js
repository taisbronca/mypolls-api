import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({ email: email });

const createUserRepository = ({ name, email, password }) =>
  User.create({
    name,
    email,
    password,
  });

const findAllUserRepository = () => User.find();

const findByIdUserRepository = (idUser) => User.findById(idUser);

const updateUserRepository = (id, name, email, password) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
      password,
    },
    {
      rawResult: true,
    }
  );

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
};
