import mongoose from "mongoose";

export const connection = {}

async function DbConnect() {
    if(connection.isConnected === 1) {
        return;
    }

    const db = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gky6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })

    connection.isConnected = db.connections[0].readyState;
console.log(connection);
    }


    export default DbConnect;