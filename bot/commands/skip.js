const ytdl = require('ytdl-core');
const play = require('./play.js');
var servers = {};

module.exports = {
    name: 'skip',
    execute(message, args){
        
        if(!message.member.voice.channel)
        {
            message.channel.send('You must be on a voice channel to skip music');
            return;
        }

        function skip(connection, message){
            var server = servers[message.guild.id];
            //server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly", quality: 'highestaudio'}));
            server.queue.shift();

         
                if(!server.queue[0])
                    connection.disconnect();
                
        }


        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        


        if(!message.member.voice.connection){
            message.member.voice.channel.join().then(function (connection){
                skip(connection, message);
            });
        }
    }
}