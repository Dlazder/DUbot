import { sendMessage } from "telegram/client/messages.js";
import { getShedule} from "./getData.js";

export default async function cab(msg, isMe, param) {
    const todaysShedule = getShedule(param).join('\n').replace(/,/g, ', ')

    if (!isMe) {
        await sendMessage(msg, {text: todaysShedule})
        return
    }

    await msg.edit({text: todaysShedule})
}