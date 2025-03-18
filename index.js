require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 8008;
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
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