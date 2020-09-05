const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const prefix = '-';


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
console.log("ready");

});

client.on('message', msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if(command === 'ping')
    client.commands.get('ping').execute(msg, args);

});



client.login('NzUxOTE2MDcxODMyOTExODkz.X1QCaQ.BQtgyTaiJxCFuG7Gh1VftixDlfI');