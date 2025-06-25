const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes= require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const cors = require('cors');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',protectedRoutes)


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
