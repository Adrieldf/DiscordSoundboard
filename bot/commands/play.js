const ytdl = require('ytdl-core');
var servers = {};

module.exports = {
    name: 'play',
    execute(message, args){
        if(!args[0]){
            message.channel.send('sem args');
            return;
        }
        
        if(!message.member.voice.channel)
        {
            message.channel.send('You must be on a voice channel to play music');
            return;
        }

        function play(connection, message){
            var server = servers[message.guild.id];
            server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly", quality: 'highestaudio'}));
            server.queue.shift();

            server.dispatcher.on("end", function (){
                if(server.queue[0])
                {
                    play(connection, message);
                }else{
                    connection.disconnect();
                }

            });

        }


        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        var server = servers[message.guild.id];

        server.queue.push(args[0]);


        if(!message.member.voice.connection ){
            message.member.voice.channel.join().then(function (connection){
                play(connection, message);
            });
        }
    }
}