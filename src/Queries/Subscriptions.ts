export const Subscription = {
   
    UpdateCVs: {
        subscribe: (_parent, _args, { pubSub }) => pubSub.subscribe("UpdateCVs"),
        resolve: (payload) => { return payload; },
    },
}