const apiKey = process.env['TENOR_API_KEY'];
const axios = require('axios').default;

module.exports = {

    name: "gif",
    aliases: ['g'],
    description: "Returns a random gif of yoda",
    category: "Fun",
    cooldown: 5,
    run: async (client, message, args) => {
       axios.get('https://tenor.googleapis.com/v2/search?key=' + apiKey + '&client_key=my_test_app&q=yoda&random=true').then(res => {
            message.reply(res.data.results[Math.floor(Math.random() * res.data.results.length)].itemurl)
        }); 
	}
};