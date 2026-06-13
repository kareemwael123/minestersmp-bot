const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

const botOptions = {
  host: 'minestersmp.aternos.me', // تأكد أن هذا هو الـ IP الخاص بك
  port: 25565,
  username: 'Minester_Keeper', 
  version: false
};

let bot;

function createMinecraftBot() {
  console.log('جاري إطلاق البوت...');
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('البوت دخل السيرفر!');
    setInterval(() => {
      if (bot) bot.look(Math.random() * 360, 0);
    }, 20000);
  });

  bot.on('end', () => {
    console.log('فصل الاتصال. إعادة المحاولة...');
    setTimeout(createMinecraftBot, 10000);
  });

  bot.on('error', (err) => console.log('خطأ:', err.message));
}

createMinecraftBot();

app.get('/', (req, res) => {
  res.send('Active');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
