const express = require('express');

module.exports = () => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Comming soon...');
    });

    app.listen(process.env.PORT || 5000, () => {
        console.log('Server started on port ' + process.env.PORT);
    });
}