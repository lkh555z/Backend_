const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
require('dotenv').config();
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/matchings', matchingRoutes);


mongoose.connect(process.env.DB_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
});

app.listen(3000, () => {
        console.log('Server is running on port 3000');
});
