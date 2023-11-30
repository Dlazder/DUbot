import { sendMessage } from "telegram/client/messages.js";
import { evenWeek } from "./cabinetInfo.js";
import { getDay, isEvenWeek } from "./getData.js";
import { client } from "telegram";

export default async function cab(msg, isMe = false) {
    const todaysShedule = evenWeek[getDay()].join('\n')
    console.log(todaysShedule)
    console.log(isMe)

    if (!isMe) {
        await sendMessage(msg, {text: todaysShedule})
        return
    }

    await msg.edit({text: todaysShedule})
}