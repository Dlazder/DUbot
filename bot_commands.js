import { NewMessage } from "telegram/events/NewMessage.js"
import ping from './modules/ping.js'
import exec from './modules/exec.js'
import anim from './modules/anim.js'
import love from "./modules/love.js"
const commands = {
  ping,
  exec,
  anim,
  love,
};
let client;

async function listenMessageEvent({ message }) {
  const me = await client.getMe();
  const { text, senderId } = message;

  if (senderId?.equals(me.id)) {
    const [cmd, ...args] = text.split(" ");

    if (cmd.startsWith("/") && cmd.slice(1) in commands) {
      await commands[cmd.slice(1)](message);
    }

  }
}

export const bot_start = async (mClient) => {
  console.log("Bot started successfully");
  client = mClient;
  client.addEventHandler(listenMessageEvent, new NewMessage({}));
};
