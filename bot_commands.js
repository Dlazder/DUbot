import { NewMessage } from 'telegram/events/NewMessage.js'
import {settings} from './settings.js'
import commands from './modules/index.js'
import { betterConsoleLog } from 'telegram/Helpers.js';
const publicCommands = {
  [commands.cab]: [commands.cab]
}
let client;

async function listenMessageEvent({ message }) {
  const me = await client.getMe();
  const { text, senderId } = message;
  const isMe = senderId?.equals(me.id)
  const [cmd, ...args] = text.split(/\s/);
  
  if (isMe) {
    if (cmd.startsWith(settings.startSymbolInCommands) && cmd.slice(1) in commands) {
      await commands[cmd.slice(1)](message, isMe, args);
    }
  } else {
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