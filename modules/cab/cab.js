import { sendMessage } from "telegram/client/messages.js";
import { getShedule} from "./getData.js";

export default async function cab(msg, isMe = true) {
    const todaysShedule = getShedule().join('\n').replace(/,/g, ', ')
    console.log(todaysShedule)

    if (!isMe) {
        await sendMessage(msg, {text: todaysShedule})
        return
    }

    await msg.edit({text: todaysShedule})
}