const token = require('../token.json');
const config = require('../config.json');
const superagent = require('superagent');
const chalk = require('chalk');

module.exports = async client => {
  client.user.setActivity("Booting...");
  
  let pluralnonpluralservers = (client.guilds.size > 1) ? 'Servers' : 'Server';
  let pluralnonpluralusers = (client.users.size > 1) ? 'Users' : 'User';

  console.log(`\n\n${client.user.username} is online.\nOperating on ${client.guilds.size} ${pluralnonpluralservers}.\nOperating for ${client.users.size} ${pluralnonpluralusers}.\n`);
  setActivity(); setInterval(setActivity, 60000);

  // Grabs a users Twitter followers and displays them
  // Use https://codeofaninja.com/tools/find-twitter-id to find your Twitter id

  if (config.guildid == '450938867034619914') {
    let {body} = await superagent
      .get('https://api.twittercounter.com/?twitter_id=' + config.twitterid + '&apikey=' + token.twittercounterapikey);
    client.channels.get(config.twitterchannel).setName(`${body.username} Followers: ${body.followers_current}`);
    console.log(chalk.green('[Console] ') + `Twitter Channel detected! Setting ammount of followers that @${body.username} has.`);
  }
  return;

  function setActivity() {
    // Sets Activity in a rotation
    const Gameinfo = ['Developer: 𝕯𝖗𝖆𝖌𝖔𝖓𝖇𝖔𝖞#6241', 'Discord: https://discord.gg/dwVpK8E', `Running on ${client.guilds.size} ${pluralnonpluralservers}`, `Running for ${client.users.size} ${pluralnonpluralusers}`, `Use ${config.prefix}help`];
    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];

    client.user.setActivity(info);
    console.log(chalk.green('[Console]') + ` Activity set to (${info})`);
  }
};
