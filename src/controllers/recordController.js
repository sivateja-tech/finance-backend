const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE
exports.create = async (req, res) => {
  const { amount, type, category, date } = req.body;

  const record = await prisma.record.create({
    data: {
      amount,
      type,
      category,
      date: new Date(date),
      userId: req.user.id
    }
  });

  res.json(record);
};

// GET + FILTER
exports.getAll = async (req, res) => {
  const { type, category } = req.query;

  const records = await prisma.record.findMany({
    where: {
      userId: req.user.id,
      type,
      category
    }
  });

  res.json(records);
};

// UPDATE
exports.update = async (req, res) => {
  const record = await prisma.record.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });

  res.json(record);
};

// DELETE
exports.delete = async (req, res) => {
  await prisma.record.delete({
    where: { id: Number(req.params.id) }
  });

  res.json({ message: "Deleted" });
};