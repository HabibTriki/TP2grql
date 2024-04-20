import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import { Mutation } from '../Queries/Mutations'
import { Subscription } from '../Queries/Subscriptions'
import {Query,skill, CV} from '../Queries/Queries'
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname,"/schema.graphql"),"utf-8"),
  resolvers: {
    skill,
    CV,
    Query,
    Mutation,
    Subscription
  }
})
