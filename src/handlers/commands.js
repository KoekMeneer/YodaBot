const fs = require("fs");

module.exports = (client) => {

    let folders = fs.readdirSync('./src/commands/');
    
    folders.forEach((dir) => {
        const commandFiles = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
                console.log(`> ➕ • Command ${command.name} from ${command.category} category is now loaded.`)
            } else {
                console.log(`${file} - ❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
            client.commands.set(command.name, command);
        }
    });
    console.log(`> ✅ • Loaded Successfully [COMMAND]`);
};