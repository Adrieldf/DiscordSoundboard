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

var text = fs.readFileSync('discordToken.txt','utf8');

client.login(text);

//ROUTE
const express = require('express');
const router = express.Router();
router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});
module.exports = router; 



