const Mutation = {
    async createItem(parent,args, ctx, info) {
        // TODO check if they logged in
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    }
    // createDog(parent, args, ctx, info) {
    //     globalThis.dogs = global.dogs || [];

    //     const newDog = {name: args.name, age: args.age};
    //     global.dogs.push(newDog);
    //     console.log(args)
    //     return newDog;
    //     // create a  dog! 
    // }
};

module.exports = Mutation;
