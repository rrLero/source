const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, './dist')});
});

const portHTTP = process.env.PORT || 8080;

app.listen(portHTTP, () => {
    console.log(`Listening on port ${portHTTP}!`);
});


