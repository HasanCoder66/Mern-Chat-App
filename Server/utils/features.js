import mongoose from "mongoose";

const connectDb = (uri) => {
  mongoose
    .connect(uri,{dbName:"Chat App"})
    .then((data) => console.log(`Connect Db ${data.connection.host}`))
    .catch((err) => {
      console.log(`Database Connection Error: ${err}`);
      throw err;
    });
};

export { connectDb };
