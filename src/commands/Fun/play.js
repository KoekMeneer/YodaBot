const { Message, Client } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const path = require('path');

module.exports = {
    name: "play",
    aliases: ['p'],
    description: "Plays a sound clip in vc",
    category: "Fun",
    cooldown: 3,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        let voiceChannel = message.member.voice.channel;

        // Check if the message sender joined a voice channel 
        if (!voiceChannel)
        {
            message.reply('Joined a voice channel, you have not');
            return;
        }

        // Check if the bot can join this channel
        if (!voiceChannel.joinable)
        {
            message.reply('Permission to join, I have not');
            return;
        }

        // Create an audio player for playing our sound
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        // Load our sound file
        const resource = createAudioResource(path.resolve('./Assets/lego_yoda_death.mp3'));

        // Get our voice channel
        client.channels.fetch(voiceChannel.id).then((channel) => {
            if (channel == null)
            {
                return;
            }
            
            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: channel.id, // the voice channel's id
                guildId: channel.guild.id, // the guild that the channel is in
                adapterCreator: channel.guild.voiceAdapterCreator // and setting the voice adapter creator
            });

            // Wait for audio source to finish playing
            player.on('stateChange', (oldState, newState) => {
                if (newState.status == 'idle')
                {
                    connection.destroy();
                }
            });

            // Play our audio source
            player.play(resource);
            connection.subscribe(player);
        });
    }
};