
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllCVs() {
  return await prisma.cV.findMany({
    include: {
      user: true,
      skills: true,
    },
  });
}

async function getCVById(cvId) {
  return await prisma.cV.findUnique({
    where: { id: cvId },
    include: {
      user: true,
      skills: true,
    },
  });
}

async function createCV(data) {
  return await prisma.cV.create({
    data: {
      name: data.name,
      age: data.age,
      job: data.job,
      user: { connect: { id: data.userId } },
      skills: { connect: data.skillIds.map(id => ({ id })) },
    },
  });
}

async function updateCV(cvId, data) {
  return await prisma.cV.update({
    where: { id: cvId },
    data: {
      name: data.name,
      age: data.age,
      job: data.job,
      skills: {
        set: [],
        connect: data.skillIds.map(id => ({ id })),
      },
    },
  });
}

async function deleteCV(cvId) {
  return await prisma.cV.delete({
    where: { id: cvId },
  });
}

module.exports = {
  getAllCVs,
  getCVById,
  createCV,
  updateCV,
  deleteCV
};
