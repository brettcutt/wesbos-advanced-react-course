const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  users: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // Check if there is a current user Id
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if the user had the permissions to query all the users
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // 3.  if they do, query all the users!
    return ctx.db.query.users({}, info);
  }
  // async items(parent, args, ctx, info) {
  //     const items = await ctx.db.query.items();
  //     return items;
  // }
};

module.exports = Query;
