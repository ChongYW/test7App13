const mongooes = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongooes.connect(process.env.CONNECTION_STRING);

        console.log("DB conected: ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;