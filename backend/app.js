const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes= require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const eventRoute  = require('./routes/eventRoute')
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require('cors');


dotenv.config();
const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());

//app.use((req, res, next) => {
  //console.log("➡️ Incoming:", req.method, req.url, req.headers.authorization);
  //next();
//});

app.use('/api',authRoutes);
app.use('/api',protectedRoutes)
app.use('/event'  , eventRoute);
app.use("/api", dashboardRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running...');
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});
