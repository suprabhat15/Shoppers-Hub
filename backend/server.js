const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);

    process.exit(1);
})

// Config
dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=> {
        process.exit(1);
    })
})