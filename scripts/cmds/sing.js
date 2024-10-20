const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const { getStreamFromURL, shortenURL, randomString } = global.utils;

const API_KEYS = [
    'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
        '719775e815msh65471c929a0203bp10fe44jsndcb70c04bc42',

        'a2743acb5amsh6ac9c5c61aada87p156ebcjsnd25f1ef87037',
        '8e938a48bdmshcf5ccdacbd62b60p1bffa7jsn23b2515c852d',
        'f9649271b8mshae610e65f24780cp1fff43jsn808620779631',
        '8e906ff706msh33ffb3d489a561ap108b70jsne55d8d497698',

        '4bd76967f9msh2ba46c8cf871b4ep1eab38jsn19c9067a90bb',
];

async function video(api, event, args, message) {
handleReply: async function ({ api, event, handleReply }) {
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/1.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('The file cannot be sent because the capacity is greater than 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
		body: `🎵 Title: ${data.title}\n🎶 Name Channel : ${data.author}\n⏱️ Time: ${this.convertHMS(data.dur)}\n👀 Views: ${data.viewCount}\n🥰 Likes: ${data.likes}\n⏱️Processing time: ${Math.floor((Date.now()- data.timestart)/1000)} second\n💿====DISME PROJECT====💿`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
            
    }
    catch (e) { return console.log(e) }
},
  
convertHMS: function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
},
  
  start: async function ({ nayan, events, args }) {
    if (args.length == 0 || !args) return nayan.reply('» উফফ আবাল কি গান শুনতে চাস তার ২/১ লাইন তো লেখবি নাকি 🥵 empty!', events.threadID, events.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/1.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return nayan.reply('Unable to send files because the capacity is greater than 25MB .', events.threadID, () => fs.unlinkSync(path), events.messageID);
            return nayan.reply({ 
                body: `🎵 Title: ${data.title}\n🎶 Name Channel: ${data.author}\n⏱️ Time: ${this.convertHMS(data.dur)}\n👀 Views: ${data.viewCount}\n👍 Likes: ${data.likes}\n⏱️ Processing time: ${Math.floor((Date.now()- data.timestart)/1000)} second\n💿====DISME PROJECT====💿`,
                attachment: fs.createReadStream(path)}, events.threadID, ()=> fs.unlinkSync(path), 
            events.messageID)

        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
            }
            var body = `»🔎 There's ${link.length} the result coincides with your search keyword:\n\n${msg}» Reply(feedback) select one of the searches above `
            return nayan.reply({
              body: body
            }, events.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: events.senderID,
              link
            }), events.messageID);
          } catch(e) {
            return nayan.reply('An error has occurred, please try again in a moment!!\n' + e, events.threadID, events.messageID);
        }
    }

}module.exports = {
    config: {
        name: "sing", 
        version: "1.0.0",
        author: "Vex_Kshitiz",
        countDown: 10,
        role: 0,
        shortDescription: "play audio from youtube",
        longDescription: "play audio from youtube support audio recognition.",
        category: "music",
        guide: "{p} audio videoname / reply to audio or video" 
    },
onStart: function ({ nayan, events, args }) {
        return video(nayan, events, args });
    }
};
