const database = require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const agencyRoutes = require('./routes/agency');
const clientRoutes = require('./routes/client');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/agency', agencyRoutes);
app.use('/api/client', clientRoutes)

// Define your routes here, including authRoutes, agencyRoutes, and clientRoutes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});