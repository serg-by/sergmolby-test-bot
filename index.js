const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const my_coconst = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

/* bot.start((ctx) => console.log(ctx.message)) */

bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(my_coconst.commands))

bot.command('course', async (ctx) => {

    try {
        await ctx.replyWithHTML('<b>Kursy</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Redaktor', 'btn_1'), Markup.button.callback('CodePen', 'btn_2'), Markup.button.callback('GitHub', 'btn_3')],
                [Markup.button.callback('Instagramm', 'btn_4')]
            ]
        ))
    } catch(e){
        console.error(e)
    }
})

function addActionBot(name, src_img, text) {

    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src_img !== false) {
                await ctx.replyWithPhoto({
                    source: src_img
                })
            }
            await ctx.replyWithHTML(text, { 
                disable_web_page_preview: true
            })

        } catch(e){
            console.error(e)
        }
    })
}

addActionBot('btn_1', './img/1.jpg', my_coconst.text1 )
addActionBot('btn_2', './img/2.jpg', my_coconst.text2 )
addActionBot('btn_3', false, my_coconst.text3 )

bot.launch()

console.log("Bot ON")


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))