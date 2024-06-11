const app = require('./app');
const {connectDB} = require('./src/config/db')
const {ServerPort} = require("./secrets")

app.listen(ServerPort || 8000, ()=>{
    console.log(`Server is running on port ${ServerPort}`);
    connectDB(); // database connection
})

