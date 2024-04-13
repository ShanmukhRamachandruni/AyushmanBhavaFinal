import mongoose from 'mongoose';
import colors from 'colors';
const connectDB = async () =>
{ const MONGO_URL = 'mongodb+srv://shanmukh:Mongodb2023@cluster1.zzvny7m.mongodb.net/ecommerce';
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);

    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
};
export default connectDB;