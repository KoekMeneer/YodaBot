const fs = require("fs");

module.exports = (client) => {

    const eventFiles = fs.readdirSync(`./src/events/`).filter((file) => file.endsWith(".js"));

    for (let file of eventFiles) {
        try {
            const Event = require(`../events/${file}`);
            Event.event = Event.event || file.replace(".js", "")
            client.on(file.split(".")[0], (...args) => Event(client, ...args));
            console.log(`> ➕ • Events on listener ${file} has been added.`);
        } catch (err) {
            console.log("Error While loading")
            console.log(err, "error");
        }
    }
    console.log(`> ✅ • Loaded Successfully [EVENT]`);
};