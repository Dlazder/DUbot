export default async function ping(msg) {
    const start = Date.now();
    await msg.edit({ text: "`!....`" });
    await new Promise((resolve) => setTimeout(resolve, 300));
    await msg.edit({ text: "`..!..`" });
    await new Promise((resolve) => setTimeout(resolve, 300));
    await msg.edit({ text: "`....!`" });
    const end = Date.now();
    const m_s = (end - start - 600) / 3;
    await msg.edit({ text: `**🏓 Average Pong!**\n\`${m_s.toFixed(3)} ms\`` });
}