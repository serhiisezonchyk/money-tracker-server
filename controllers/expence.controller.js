import prisma from './index.js';

export const getAll = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  console.log("limit")
  const user_id = req.user.id;
  try {
    const items = await prisma.expence.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        created_at: 'desc',
      },
      // take: +limit,
      // skip: (+page - 1) * +limit,
    });
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Something went wrong...' });
  }
};

export const create = async (req, res) => {
  const { title, amount, description, category } = req.body;
  const user_id = req.user.id;
  try {
    const item = await prisma.expence.create({
      data: {
        title,
        amount,
        description,
        category,
        user: { connect: { id: user_id } },
      },
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error: 'Something went wrong...' });
  }
};
