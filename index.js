require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 8008;
const cors = require('cors');
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandlingMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT} \n LINK: http://localhost:${PORT}`));
        
    } catch(e) {
        console.log(e);
    }
}

start();