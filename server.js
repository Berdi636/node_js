const express = require('express');
const app = express();
const studentRoutes = require('./src/student/routes')
const cors = require('cors')

const port = 3000;

app.use(express.json())
app.use('/images', express.static('./src/static/books'))
app.use('/users', express.static('./src/static'))

app.use('/api/v1/students', studentRoutes);
app.use(cors())

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('Hello World!')
});
