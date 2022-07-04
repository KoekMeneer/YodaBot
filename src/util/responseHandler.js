const { Message, Client } = require("discord.js");
const responses = require('../data/responses');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
    for (let i = 0; i < responses.length; i++)
    {
        let res = responses[i];
        // Check if we have a match
        //
        match = res.match(message.content);
        if (match !== false)
        {
            console.log('match found: ', match);
            handleResponse(res.response(match), message);
            return; // Stop our loop
        }
    }
};

/**
 *
 * @param {{content: string, reply: boolean}} response
 * @param {Message} message 
 */
function handleResponse(response, message)
{
    // Check if we should send the message in the channel instead of replying
    //
    if (response.reply === null || !response.reply)
    {
        message.channel.send(response.content);
    }
    else
    {
        message.reply(response.content);
    }
}