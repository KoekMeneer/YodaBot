const express = require('express');

module.exports = () => {
    const app = express();
    app.use(express.static('./web/public'))
    
    registerRoutes(app);

    app.listen(process.env.PORT || 5000, () => {
        console.log('Server started on port ' + process.env.PORT);
    });
}

/**
 * 
 * @param {express.Response} res 
 * @param {string} page 
 */
function view(res, page, exten = 'html')
{
    res.sendFile(__dirname + '/view/' + page + '.' + exten);
}

/**
 * 
 * @param {express.Application} app 
 */
function registerRoutes(app)
{
    app.get('/', (req, res) => {
        view(res, 'index');
    });
    app.get('/commands', (req, res) => {
        view(res, 'features');
    });
    app.get('/faq', (req, res) => {
        view(res, 'faq');
    });
}