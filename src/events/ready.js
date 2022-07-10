const settings = require('../settings.json');
module.exports = async (client) => {
    client.user.setPresence({
        status: "online"
    });
    function randomstatus() {
        let status = [
            `${settings.prefix}help | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members 👥`,
            `${settings.prefix}help | ${client.guilds.cache.size} Server 🌐`,
            `${settings.prefix}help | In development I am ⚙️`,
            // `${settings.prefix}help | 24/7 ONLINE...!`
        ];
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {
            type: "PLAYING"
        });
    };
    setInterval(randomstatus, 15000);
    
    console.log(`> 🔍 • Check All Server is ${client.guilds.cache.size} Server 🌐`);
    console.log(`> ✅ • Successfully logged on as ${client.user.username}\n\n======================================`);
};