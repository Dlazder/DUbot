export default async function anim(msg) {
  let text = msg.message.replace(/\/anim\s?/, '')


  async function animOutput(text) {
    let currText = ''

    for (let i = 0; i < text.length; i++) {
      if ([' ', '\n'].includes(text[i])) {
        currText += text[i]
      } else {
        currText += text[i]
        await new Promise((resolve) => setTimeout(resolve, 100));
        await msg.edit({ text: currText })
      }
    }

  }
  await animOutput(text.trim())
}


