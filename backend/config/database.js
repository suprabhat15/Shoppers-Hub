const mongoose = require('mongoose');

const connectDatabase = () => {
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true })
.then((data)=>{
  console.log(`MongoDB connected with server: ${data.connection.host}`);
})
.catch(error => {
  console.log(`DB connection failed`);
  console.log(error);
  process.exit(1);
})
}

module.exports = connectDatabase;