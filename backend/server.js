require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);


app.get('/', (req, res) => {
  res.send("Russophile Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
