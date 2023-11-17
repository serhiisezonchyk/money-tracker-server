import prisma from './index.js';
import { compareSync, hash, genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id, email, login, name) => {
  return jwt.sign({ id, email, login, name }, process.env.SECRET_KEY, {
    expiresIn: '3d',
  });
};

export const create = async (req, res) => {
  const data = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          login: data.login,
        },
      ],
    },
  });
  if (user) {
    return res
      .status(400)
      .json({ error: 'User with this email or login already exists.' });
  }

  try {
    const new_user = {
      email: data.email,
      password: data.password,
      login: data.login,
      name: data.name,
    };
    const salt = await genSalt(10);
    new_user.password = await hash(new_user.password, salt);

    const created_user = await prisma.user.create({ data: new_user });
    const token = createToken(
      created_user.id,
      created_user.email,
      created_user.login,
      created_user.name
    );
    return res.status(200).send({ token });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ error: 'Something went wrong while creating user.' });
  }
};

export const login = async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.login,
          },
          {
            login: data.login,
          },
        ],
      },
    });

    if (!user)
      return res.status(400).json({ error: 'Incorrect email or password...' });

    const isValidPassword = compareSync(data.password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ error: 'Incorrect email or password...' });

    const token = createToken(user.id, user.email, user.login, user.name);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).json({ error: 'Incorrect email or password...' });
  }
};

export const check = async (req, res) => {
  const token = createToken(
    req.user.id,
    req.user.email,
    req.user.login,
    req.user.name
  );
  return res.status(200).send({ token });
};
