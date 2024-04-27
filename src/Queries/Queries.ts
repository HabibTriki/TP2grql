import { GraphQLError } from "graphql";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CV = {
    user: ({ userId }, _, { db }) => {
      return prisma.user.findUnique({ where: { id: userId } });
    },
    skills: ({ id }, _, { db }) => {
      return prisma.skill.findMany({
        where: {
          cvs: {
            some: { id },
          },
        },
      });
    },
  };
  
    export const Query = {
    CVsFetch: async (_, __) => {
    return await prisma.cV.findMany({
        include: {
        user: true,
        skills: true,
        },
    });
    },
    CVByID: async (_, { id }) => {
    const foundCV = await prisma.cV.findUnique({
        where: { id },
        include: {
        user: true,
        skills: true,
        },
    });
    if (!foundCV) throw new GraphQLError("CV not found 404 error", {
        extensions: {
            http: {
                status: 404,
                headers: {
                    "x-custom-header": "some-value",
                },
            },
        },
        });
        return foundCV;
        },
        SkillsFetch: async (_, __) => {
            return await prisma.skill.findMany();
        },
        };
        
        export const Skill = {
            cvs: ({ id }) => {
                return prisma.cV.findMany({
                    where: {
                        skills: {
                            some: {
                                id: id,
                            },
                        },
                    },
                    include: {
                        user: true,
                        skills: true,
                    },
                });
            },
        };  