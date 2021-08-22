class Commands {
    constructor() {
        this.cmd = [
            {"ping": this.ping},
            {"bizou": this.bizou},
            {"move": this.move}
        ];
    };

    ping(msg, client) {
        msg.channel.send(`Pong! 🏓 Latency is ${Date.now() - msg.createdTimestamp}ms.`);
    }

    bizou(msg, client) {
        msg.reply(":heart:")
    }

    move(msg, client) {
        var dest = msg.mentions.channels.first();

        if (msg.guild.me.hasPermission("MOVE_MEMBERS", { checkAdmin: true, checkOwner: false }) == false)
            msg.reply(":warning: Bot missing permissions to move");
        else if (msg.member.hasPermission("MOVE_MEMBERS", { checkAdmin: true, checkOwner: false }) == false) {
            msg.reply(":warning: You are missing permissions, action has been reported.");
            console.log("Unauthorized move attempt from :", msg.member);
        } else
            msg.mentions.members.forEach(member => member.voice.setChannel(dest).catch(err => console.error(err)));
    }
}

module.exports = { Commands };