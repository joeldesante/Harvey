const Eris = require("eris");
const Settings = require("./settings.json");

var bot = new Eris(Settings.token);

bot.on("ready", () => {

  console.log("Setting up emojis...");
  Settings.roles.forEach((obj) => {

    bot.removeMessageReaction(Settings.channel, obj.message, Settings.emoji).catch(err => {
      console.log(err);
    });

    bot.addMessageReaction(Settings.channel, obj.message, Settings.emoji).catch(err => {
      console.log(err);
    });
  });

  console.log("Ready!");

});

// FIXME: This no work for some reason.
process.on('SIGINT', function() {
  console.log("\nCleaning up emojis...");
  Settings.roles.forEach((obj) => {
    bot.removeMessageReaction(Settings.channel, obj.message, Settings.emoji).catch(err => {
      console.log(err);
    });
  });

  console.log("Done. I'm gone thot.");
  process.exit();
});

const mid = "776971185530339379";

bot.on("messageReactionAdd", (msg, emoji, reactor) => {
  if(reactor.id === Settings.botId) { return; }
  const refrencedMessage = getRefMessage(msg);
  if(refrencedMessage === null) { return; }

  if(emoji.name === Settings.emoji) {
    bot.addGuildMemberRole(Settings.guild, reactor.id, refrencedMessage.role, `AUTOMATED: ${reactor.name} has been subscribed.`)
    .catch(err => {
      console.log(err);
    });
  } else {
    bot.removeMessageReactionEmoji(Settings.channel, refrencedMessage.message, emoji.name)
    .catch(err => {
      console.log(err);
    });;
  }
});

bot.on("messageReactionRemove", (msg, emoji, reactor) => {
  if(reactor.id === Settings.botId) { return; }
  const refrencedMessage = getRefMessage(msg);
  if(refrencedMessage === null) { return; }

  if(emoji.name === Settings.emoji) {
    bot.removeGuildMemberRole(Settings.guild, reactor, refrencedMessage.role, `AUTOMATED: ${reactor.name} has been subscribed.`)
    .catch(err => {
      console.log(err);
    });
  }
});

function getRefMessage(msg) {
  // Find the role/messageId object from the settings.
  const refrencedMessage = Settings.roles.find((obj) => {
    return obj.message == msg.id;
  });

  // Yeet away if the reacted message is not in the list.
  if(refrencedMessage === undefined) {
    return null;
  }

  return refrencedMessage;
}

bot.connect(); // Get the bot to connect to Discord