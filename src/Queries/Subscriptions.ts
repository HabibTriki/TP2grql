import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Subscription = {
   
    CVUpdates: {
        subscribe: (_parent, _args, { pubSub }) => pubSub.subscribe("CVUpdates"),
        resolve: (payload) => { return payload; },
    },
}