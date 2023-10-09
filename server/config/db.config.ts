import mongoose from "mongoose";

export const dbConfig = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI || "", {
      autoIndex: true,
    });
    console.log(`database connected on ${res.connection.host}`);
  } catch (error: any) {
    console.log(`failed to connect to database connected ${error?.message}`);
  }
};
