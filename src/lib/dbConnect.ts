import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

//we are using async here because connecting database takes time and may fail

async function dbConnect(): Promise<void> {
    if (connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
        //study exactly how db looks like.
        console.log(db);

        connection.isConnected = db.connections[0].readyState
        //.readyState is supposed to be a number but we'll see

        console.log("DB Connected Successfully");
    }
    catch (error){
        console.log("Database connection failed",error);


        process.exit(1)

    }
}

export default dbConnect;