const qrcode = require('qrcode-terminal');
const axios = require('axios');

const {Client,LocalAuth,MessageMedia} = require('whatsapp-web.js');
const client= new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('message',async message=>{
   const content=message.body;
   if(content === "send meme"){
    const meme=await axios("https://meme-api.com/gimme")
    .then((res)=>res.data);
    client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url));
   }
   else if( content === "send joke"){
    const joke=await axios("http://v2.jokeapi.dev/joke/Any?safe-mode")
    .then((res)=> res.data);

    const jokeMsg = await client.sendMessage(message.from , joke.setup)
    if(joke.delivery) setTimeout(function(){ jokeMsg.reply(joke.delivery)},5000)
   }
   else if(content==="hello" || content==="Hello" || content === "HELLO"){
    message.reply("Hi this is sakiram, how can I help you.")
   }
   else if(content === "spam me"){
    const timeId=setInterval(()=>message.reply("Dont't hate me"),5000);
    setTimeout(()=> clearInterval(timeId),50000);
   }
   else{
    message.reply("Wrong phrase.")
   }
});


client.initialize();