const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api', (req, res)=> {
    res.json({
        message: 'This is Api end point'
    })
})
//wild card, redirect to html
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})