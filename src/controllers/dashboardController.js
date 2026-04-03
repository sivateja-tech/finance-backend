const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.summary = async (req, res) => {
  const records = await prisma.record.findMany({
    where: { userId: req.user.id }
  });

  let income = 0, expense = 0;

  records.forEach(r => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;
  });

  res.json({ income, expense, balance: income - expense });
};