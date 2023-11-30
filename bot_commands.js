import { NewMessage } from 'telegram/events/NewMessage.js'
import settings from './settings.json' assert {type: 'json'}
import ping from './modules/ping.js'
import exec from './modules/exec.js'
import anim from './modules/anim.js'
import love from './modules/love.js'
import cab from './modules/cab/cab.js'
const commands = {
  ping,
  exec,
  anim,
  love,
  cab,
};
const publicCommands = {
  cab
}
let client;

async function listenMessageEvent({ message }) {
  const me = await client.getMe();
  const { text, senderId } = message;
  const isMe = senderId?.equals(me.id)
  
  if (isMe) {
    const [cmd/*, ...args*/] = text.split(' ');

    if (cmd.startsWith(settings.startSymbolInCommands) && cmd.slice(1) in commands) {
      await commands[cmd.slice(1)](message);
    }
  } else {
    const [cmd] = text.split(' ')
    
    if (cmd.startsWith(settings.startSymbolInCommands) && cmd.slice(1) in publicCommands) {
      await publicCommands[cmd.slice(1)](message, isMe)
    }
  }
}

export const bot_start = async (mClient) => {
  console.log('Bot started successfully');
  client = mClient;
  client.addEventHandler(listenMessageEvent, new NewMessage({}));
};