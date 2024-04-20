import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import { mutation } from '../Queries/Mutations'
import { Subscription } from '../Queries/Subscriptions'
import {query,skill, cv } from '../Queries/Queries'
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname,"/schema.graphql"),"utf-8"),
  resolvers: {
    skill,
    cv,
    query,
    mutation,
    Subscription
  }
})
