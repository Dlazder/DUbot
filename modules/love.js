export default async function love(msg) {

  async function editMsg(text) {
    return await msg.edit({ text: text })
  }

  async function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  function r(s, c) {
    return s.repeat(c)
  }

  const arr = ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛️"]
  let h = "⬜️"
  let first = ''

  const firstArr = [r(h, 9), "\n", h, h, arr[0].repeat(2), h, arr[0].repeat(2), h, h, "\n", h, arr[0].repeat(7), h, "\n", h, arr[0].repeat(7), h, "\n", h, arr[0].repeat(7), h, "\n", h, h, arr[0].repeat(5), h, h, "\n", h, h, h, arr[0].repeat(3), h, h, h, "\n", h, h, h, h, arr[0], h, h, h, h].join("").split("\n")

  for (let i in firstArr) {
    first += firstArr[i] + "\n"
    editMsg(first)
    await sleep()
  }

}
