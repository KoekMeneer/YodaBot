module.exports = () => {

    // Load our env
    if (process.env['TOKEN'] == null)
    {
        require('./util/env')();
    }

    // Get our token
    const token = process.env['TOKEN'];

    // Create a new client
    //
    const discord = require("discord.js");
    const client = new discord.Client({
        restTimeOffset: 0,
        restWsBridgetimeout: 100,
        intents: 32767,
        allowedMentions: {
            parse: ["users"],
            repliedUser: true
        },
        cacheWithLimits: {
            MessageManager: {
                sweepInterval: 300,
                sweepFilter: discord.Sweepers.filterByLifetime({
                    lifetime: 60,
                    getComparisonTimestamp: m => m.editedTimestamp ?? m.createdTimestamp,
                })
            }
        }
    });
    
    // Initialize client collections
    //
    client.commands = new discord.Collection();
    client.aliases = new discord.Collection();
    client.cooldowns = new discord.Collection();
    
    // Register events/commands
    //
    ["commands", "events"].forEach(handler => {
        require(`./handlers/${handler}`)(client);
    });
    
    // Add error handlers
    //
    client.on('error', error => console.error(error));
    client.on('warn', info => console.warn(info));
    process.on('unhandledRejection', error => console.error("UNHANDLED_REJECTION\n" + error));
    process.on('uncaughtException', error => {
        console.error("UNCAUGHT_EXCEPTION\n" + error,);
           console.error("Uncaught Exception is detected, restarting...");
        process.exit(1);
    });
    
    // Log our bot in
    client.login(token).catch((err) => { console.warn(err) });   
}