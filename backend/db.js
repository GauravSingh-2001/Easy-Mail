import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path:'D:\\EasyMail\\EasyMail\\backend\\.env'
})


const mongoURI = process.env.URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectToMongo;
