/**
 * @callback CallbackIsMatch
 * @param {string} message
 * @return {any} match result
 * 
 * @callback CallbackResponse
 * @param {any} args
 * @return {{content: string, reply: boolean}} Response to send
 * 
 * @type {Array.<{match: CallbackIsMatch, response: CallbackResponse, data: Object}>}
 */
module.exports = [
    {
        match: (message) => {
            let match = message.toLowerCase().match(/hm[m]*/);

            // Check if a match was found
            //
            if (match == null)
            {
                return false;
            }
            return match[0].length; // Else we return our 'hmmm' length
        },
        response: function(count) {
            let result = '';
            for (let i = 0; i < count; i++)
            {
                result += 'm'
            }
            return { content: "h" + result };
        }
    },
    {
        match: function(message)
        {
            return message.includes('child') || message.includes('children');
        },
        response: function()
        {
            return { content: 'Truly wonderful, the mind of a child is.', reply: false }
        }
    },
    {
        match: function(message)
        {
            return message.includes('bacon');
        },
        response: function()
        {
            return { content: 'Bacon I smell', reply: false }
        }
    },
    {
        data: [
            "{user} If stupid you are, speak you should not",
            "The stupid is strong in you {user}",
            "{user} Fallen to the dumb side, you have",
            "{user} https://giphy.com/gifs/moodman-ZbUOH7pbDiNSmU1x4o"
        ],
        match: function(message) {
            let match = message.toLowerCase().match(/\<@(.*)\>.*(stupid|dumb)/);

            // Check if a match was found
            //
            if (match == null)
            {
                return false;
            }
            return match[1]; // Return the user to mention as arguments
        },
        response: function(user)
        {
            return { content: this.data[Math.floor(Math.random() * this.data.length)].replace('{user}', '<@' + user + '>') };
        }
    }
];