import { userSocketIDs } from "../app.js";

const getOtherMembers = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));
  return sockets;
};

export { getOtherMembers, getSockets };
