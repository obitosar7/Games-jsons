import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
     if (!m.quoted || !m.quoted.fromMe || !m.text || !/استخدم.*تلميح/i.test(m.quoted.text) || /.*hhint/i.test(m.text))
        return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki))
        return this.reply(m.chat, '*⌫┇لـقـد تـم الاجـابـة عـلـيـه مـسـبـقـا اكـتـب الامـر لـي يـظـهـر سـؤال جـديـد┇〄*', m)
    if (m.quoted.id == this.tekateki[id][0].id) {
        let isSurrender = /^(انسحب|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
            return this.reply(m.chat, '*طلع فاشل و استسلم :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))

        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n\n*❐↞┇الـجـائـزة💰↞${this.tekateki[id][2]} نقطه*`, m)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold)
            m.reply(`*لقد كنت علي وشك النجاح*!`)
        else
            this.reply(m.chat, `❐┃اجـابـة خـاطـئـة┃❌ ❯`, m)
    }
    return !0
}
export const exp = 0
