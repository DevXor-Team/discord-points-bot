const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./events').forEach((folder) => {
        const commandFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            let event = require(`../events/${folder}/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        }
    })
}