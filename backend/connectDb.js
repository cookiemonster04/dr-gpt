const mongoose = require("mongoose");

const uri =
  "mongodb+srv://cookie638:KxMgFxYa41OMG7Sz@dr-gpt.zmcdeye.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const conn = await mongoose.connect(uri, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};
export default connectDB;
