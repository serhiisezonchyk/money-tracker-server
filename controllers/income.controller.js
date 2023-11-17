import prisma from './index.js';

export const getAll = async (req, res) => {
  const { limit, page } = req.query;
  console.log(limit, page)
  const user_id = req.user.id;
  try {
    const items = await prisma.income.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    res.status(200).send(items);
  } catch (error) {
    return res.status(400).json({ error: 'Something went wrong...' });
  }
};

export const create = async (req, res) => {
  const { title, amount, description, category } = req.body;
  const user_id = req.user.id;
  try {
    const item = await prisma.income.create({
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
