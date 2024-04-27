import { GraphQLError } from "graphql";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const Mutation = {

  createCV: async (_, { input }, { pubSub }) => {
    const newCV = await prisma.cV.create({
      data: {
        name: input.name,
        age: input.age,
        job: input.job,
        userId: input.userId,
        skills: {
          connect: input.skillIds.map(id => ({ id })),
        },
      },
    });
    pubSub.publish('CVUpdates', newCV);
    return newCV;
  },
  
  updateCV: async (_, { id, input }, { pubSub }) => {
    const cv = await prisma.cV.findUnique({
      where: { id },
    });
  
    if (!cv) {
      throw new GraphQLError(`CV with ID ${id} not found`, {
        extensions: {
          http: {
            status: 404,
            headers: {
              "x-custom-header": "some-value",
            },
          },
        },
      });
    }
    const updatedCV = await prisma.cV.update({
      where: { id },
      data: {
        ...input,
        user: {
          connect: { id: input.userId },
        },
        skills: {
          set: [],
          connect: input.skillIds?.map(skillId => ({ id: skillId })),
        },
      },
      include: {
        user: true,
        skills: true,
      },
    });
    pubSub.publish('CVUpdates', updatedCV);
  
    return updatedCV;
  },
  
  deleteCV: async (_, { id }, { pubSub }) => {
    const cv = await prisma.cV.findUnique({
      where: { id },
    });
  
    if (!cv) {
      throw new GraphQLError(`CV with ID ${id} not found`, {
        extensions: {
          http: {
            status: 404,
            headers: {
              "x-custom-header": "some-value",
            },
          },
        },
      });
    }
    const deletedCV = await prisma.cV.delete({
      where: { id },
    });
    pubSub.publish('CVUpdates', deletedCV);
    return deletedCV;
  }
}


