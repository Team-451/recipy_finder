import mongoose from "mongoose";

const connectToDB = (url, callback) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongodb successfully connected!!");
      callback();
    })
    .catch((error) => {
      console.log("Some error happened!!", error);
    });
};

export default connectToDB;