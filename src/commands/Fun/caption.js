const baseUrl = 'https://apimeme.com/meme?meme=Advice-Yoda';

module.exports = {
    name: "caption",
    aliases: ['c'],
    description: "Returns a picture of yoda with the given caption",
    category: "Fun",
    cooldown: 5,
    run: async (client, message, args) => {
			if (args.length < 0 || args[0] == undefined)
			{
				message.reply('Given arguments you have not');
			}
			else
			{
				let url = baseUrl + '&top=' + encodeURIComponent(args[0]);
				if (args.length > 1)
				{
					url += '&bottom=' + encodeURIComponent(args[1]);
				}
				message.channel.send(url);
			}
		}
};