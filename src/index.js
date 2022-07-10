const discord = require("discord.js");

module.exports = {
    started: false,
    /**
     * @type {discord.Client}
     */
    client: null,
    start()
    {
        // Load our env
        if (process.env['TOKEN'] == null)
        {
            require('./util/env')();
        }

        // Get our token
        const token = process.env['TOKEN'];

        // Create a new client
        //
        this.client = new discord.Client({
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
        this.client.commands = new discord.Collection();
        this.client.aliases = new discord.Collection();
        this.client.cooldowns = new discord.Collection();
        
        // Register events/commands
        //
        ["commands", "events"].forEach(handler => {
            require(`./handlers/${handler}`)(this.client);
        });
        
        // Add error handlers
        //
        this.client.on('error', error => console.error(error));
        this.client.on('warn', info => console.warn(info));
        process.on('unhandledRejection', error => console.error("UNHANDLED_REJECTION\n" + error));
        process.on('uncaughtException', error => {
            console.error("UNCAUGHT_EXCEPTION\n" + error,);
            console.error("Uncaught Exception is detected, restarting...");
            process.exit(1);
        });
        
        // Log our bot in
        this.client.login(token).catch((err) => { console.warn(err) });

        this.started = true;
    }
}