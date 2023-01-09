const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.listen(3000, console.log('SERVIDOR ENCENDIDO'));
app.use('/posts', require('./routes/postRoutes'));
