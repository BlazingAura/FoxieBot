// this is where all the standard game commands are put
'use strict';

exports.commands = {
    join: function(target, room, user) {
        if (!room || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "join");
    },
    "guess": "g",
    g: function(target, room, user) {
        if (!room || !room.game || room.game.answerCommand !== "standard") return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "guess " + target);
    },
    leave: function(target, room, user) {
        if (!room || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "leave");
    },
    players: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "players");
    },
    score: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "score");
    },
    start: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "start");
    },
    autostart: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        var time = target.replace(/[^0-9]/g, '');
        if (!time || parseInt(time) < 30) return this.send('Invalid time, choose a time above 30 seconds.');
        this.send('Starting the game of ' + gameId + ' in ' + time + ' seconds!')
        setTimeout(function() {
                this.parse("/" + gameId + "start");
        }.bind(this), time * 1000);
    },
    end: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "end");
    },
    skip: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "skip");
    },
    repost: function(target, room, user) {
        if (!room || !this.can("games") || !room.game) return false;
        let gameId = room.game.gameId;
        this.parse("/" + gameId + "repost");
    },
    signups: function(target, room, user) {
        if (!room || !this.can("games")) return false;
        if(!target) this.parse("/help signups");
        let games = {
            "ulc": "unownsletterchain",
            "unownsletterchain": "unownsletterchain",
            "bj": "blackjack",
            "blackjack": "blackjack",
            "kunc": "kunc",
        };
        let gameId = games[toId(target)];
        if (!gameId) return this.send("Invalid game.");
        this.parse("/" + gameId);
    },
};
