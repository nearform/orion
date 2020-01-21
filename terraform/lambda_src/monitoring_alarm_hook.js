let https = require('https')
let util = require('util')
let { URL } = require('url')
let { host: slackAddress, pathname: slackPath } = new URL(process.env.SLACK_WEBHOOK)

let sendToSlack = (message)=>{
    let username = process.env.PROJECT_NAME
    let channel = "#aws"
    let icon_emoji = ":cloud:"
    let messages_array = Array.isArray(message) ? message : [message]
    let attachments = messages_array.map(({title, description: text, state: color, time})=>{
        return {
            color,
            title,
            text,
            ts: Math.round((new Date(time)).getTime()/1000)
        }
    })
    let postData = {
        channel,
        username,
        icon_emoji,
        attachments
    }
    let options = {
        method: 'POST',
        hostname: slackAddress,
        port: 443,
        path: slackPath
    }
    return new Promise((resolve, reject)=>{
        let req = https.request(options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            resolve()
          });
        });

        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
          reject(e)
        });

        req.write(util.format("%j", postData));
        req.end();
    })
}

let formatAlarmSlackMessage = (subject, message)=>{
    let { NewStateValue, AlarmDescription: description, StateChangeTime: time } = message
    return { 
        state:  NewStateValue === 'OK' ? 'good' : 'danger',
        title: ':rotating_light: '+ subject,
        description,
        time
    }
}
module.exports.handler = async function handler(event, context) {
    let messages = []
    for(const { Sns } of event.Records){
        let slackMessage = {
            color: 'danger',
            title: Sns.Subject,
            text: Sns.Message,
            time: new Date()
        }
        try{
            let parsed_message = JSON.parse(Sns.Message)
            if(parsed_message.AlarmName){
                slackMessage = formatAlarmSlackMessage(Sns.Subject, parsed_message)
            }
        }catch(e){
            //just ignore it, non-json message
        }
        messages.push(slackMessage)
    }
    return await sendToSlack(messages)
}