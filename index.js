//BASE FEITA BY: ZYPHER2K! 
//[ ‼️ BÁSICA MAS FUNCIONANDO 100% ‼️ ]

//BY ZYPHER2K && PDR2K

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//JIMP QUOTEDGP ‼️
const Jimp = require('jimp');


async function toBase64(path, width, height) {
  const image = await Jimp.read(path);
  image.resize(width, height);
  const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  return buffer;
}


const settings = require('./config/settings.js')


//ATIVAÇÕES‼️
const { getBuffer, getFileBuffer, getRandom, getMembros } = require('./arquivos/func.js');


const {
makeWASocket,
emitGroupParticipantsUpdate,
emitGroupUpdate,
MediaType,
WAMessageStatus,
AuthenticationState,
GroupMetadata,
initInMemoryKeyStore,
MiscMessageGenerationOptions,
BufferJSON,
WAMessageProto,
MessageOptions,
PHONENUMBER_MCC,
WAFlag,
WANode,
WAMetric,
ChatModification,
MessageTypeProto,
WALocationMessage,
ReconnectMode,
WAContextInfo,
WAGroupMetadata,
ProxyAgent,
waChatKey,
MimetypeMap,
MediaPathMap,
WAContactMessage,
WAContactsArrayMessage,
WAGroupInviteMessage,
WATextMessage,
WAMessageContent,
WAMessage,
BaileysError,
WA_MESSAGE_STATUS_TYPE,
MediaConnInfo,
URL_EXCLUDE_REGEX,
Contact,
WAUrlInfo,
WAMediaUpload,
mentionedJid,
processTime,
Browser,
MessageType,
Presence,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
Browsers,
GroupSettingChange,
delay,
DisconnectReason,
WASocket,
getStream,
WAProto,
isBaileys,
AnyMessageContent,
processMessage,
downloadMediaMessage,
generateMessageIDV2,
generateMessageID,
WA_DEFAULT_EPHEMERAL,
getAggregateVotesInPollMessage,
generateWAMessageFromContent,
proto,
generateWAMessageContent,
generateWAMessage,
prepareWAMessageMedia,
areJidsSameUser,
getContentType,
useMultiFileAuthState,
fetchLatestBaileysVersion,
makeCacheableSignalKeyStore,
downloadContentFromMessage,
signalRepository,
} = require('@whiskeysockets/baileys');


const { getGroupAdmins, getExtension } = require('./arquivos/func.js')


const { fs, axios, Pino, pino, cheerio, colors, cfonts, fetch, FormData, speed, ffmpeg, exec, yts, ytdl, pipe, promisify, pipeline, PhoneNumber, readline, NodeCache, phoneNumber, pairingCode, useMobile, rl, question } = require('./arquivos/func.js')


const moment = require('moment-timezone')
const path = require('path')
const { jidNormalizedUser } = require("@whiskeysockets/baileys")


//CONFIGS ‼️
moment.locale('pt-br')
const agora = moment().tz('America/Sao_Paulo')

global.nomeBot = settings.nomeBot || global.nomeBot || 'Bot'
global.nomeDono = settings.nomeDono || global.nomeDono || 'Dono'
global.numeroBot = settings.numeroBot || global.numeroBot || []
global.numeroDono = settings.numeroDono || global.numeroDono || []
global.prefix = settings.prefix || global.prefix || []
global.ownerLid = settings.ownerLid || global.ownerLid || []


//LID/JID ABAIXO ‼️
function resolveFromKey(infoOrMsg) {
try {
return infoOrMsg?.key?.remoteLid || infoOrMsg?.key?.remoteJid ||
infoOrMsg?.message?.key?.remoteLid || infoOrMsg?.message?.key?.remoteJid || ''
} catch (e) {
return ''
}
}

async function resolveGroupJid(zypher, maybeLidOrJid) {
if (!maybeLidOrJid) return ''
if (typeof zypher?.lidToJid === 'function') {
try {
const j = await zypher.lidToJid(maybeLidOrJid)
return j || maybeLidOrJid
} catch (e) {
return maybeLidOrJid
}
}
return maybeLidOrJid
}


//BANNER ABAIXO ‼️
const colorOptions = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

const banner = cfonts.render(`${nomeBot}`, {
    font: 'block', 
    align: 'center',
    gradient: ['cyan', randomColor],
    space: false,
});

const banner2 = cfonts.render((`BY ZYPHER2K`), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta'],
});

console.clear();
console.log(banner.string);
console.log(banner2.string);


//FUNÇÃO PRINCIPAL DO BOT ‼️
async function startBot() {
process.removeAllListeners('warning');
const { state, saveCreds} = await useMultiFileAuthState('./Qr-zypher2k')
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`${colors.red("Versão do whatsApp web:")} ${version.join('.')} ${isLatest ? '(Atualizada)' : '(Desatualizada)'}`)
const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new NodeCache();
const logger = pino({
    level: 'silent'
});


//CONEXÃO DO BOT ‼️
const zypher = makeWASocket({
            version,
            emitOwnEvents: true,
            fireInitQueries: true,
            generateHighQualityLinkPreview: true,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            connectTimeoutMs: 120000,
            retryRequestDelayMs: 5000,
            qrTimeout: 180000,
            keepAliveIntervalMs: 30_000,
            defaultQueryTimeoutMs: undefined,
            browser: ['Windows', 'Edge', '143.0.3650.66'],
            msgRetryCounterCache,
            auth: state,
            signalRepository,
            logger
        });
        
var client = zypher


//PAREAMENTO ‼️
if (!zypher.authState.creds.registered) {
let phoneNumber = await question(
`${colors.gray("• Exemplo do número para conectar: +55 99 9999-9999.")}
${colors.magenta("• Digite o número de telefone: ")}`
)
phoneNumber = phoneNumber.replace(/[^0-9]/g, "")
if (!phoneNumber) {
throw new Error(colors.red("Número de telefone inválido!"))
}
const pCodzin = path.resolve("./config/pairing.json")
let pairingCode
if (fs.existsSync(pCodzin)) {
const pairingConfig = JSON.parse(fs.readFileSync(pCodzin))
pairingCode = pairingConfig.pairingCode
}
const code = await zypher.requestPairingCode(
phoneNumber,
pairingCode || undefined
)
console.log(`
${colors.bgMagenta("Código de pareamento:")}
${colors.white(code)}
`)
}


//EVENTOS DA CONEXÃO ‼️
const chalk = require('chalk')
const { DisconnectReason } = require('@whiskeysockets/baileys')

zypher.ev.on('creds.update', saveCreds)

zypher.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update

if (connection === 'connecting') {
    console.log(colors.cyan('[ 🌐 ] conectando ao whatsApp ↻'));
}

if (connection === 'open') {
    console.log(colors.cyan('[ ✔️ ] conectado com sucesso!'));
}

if (connection === 'close') {
const reason = lastDisconnect?.error?.output?.statusCode
    console.log(colors.red('[ ‼️ ] conexão fechada. motivo:', reason));

if (reason === DisconnectReason.loggedOut) {
      console.log(colors.yellow('[ 📵 ] sessão perdida. Apague a pasta "Qr-zypher2k" e reconecte.'));
    } else {
      console.log(colors.gray('[ ❕ ] tentando reconectar ↻'));
      setTimeout(() => startBot(), 3000)
}
}
})  


//EVENTOS DE MENSAGEM ‼️
const { versaoBot } = require('./config/settings.js');

zypher.ev.on('messages.upsert', async ({ messages }) => {
const info = messages[0]
if (!info.message) return

moment.locale('pt-br')

const agora = moment().tz('America/Sao_Paulo');

global.hora = agora.format('HH:mm');
global.date = agora.format('DD/MM/YYYY');
global.dia = agora.format('dddd');
global.semana = agora.format('wo');
global.ano = agora.format('YYYY');
global.dataCompleta = agora.format('LLLL');

const h = agora.hour();
if (h>= 5 && h < 12) global.saudacao = 'Bom dia ☀️';
else if (h>= 12 && h < 18) global.saudacao = 'Boa tarde 🌤️';
else if (h>= 18 && h < 24) global.saudacao = 'Boa noite 🌙';
else global.saudacao = 'Boa madrugada 🌌';

const latensi = ((Date.now() - info.messageTimestamp * 1000) / 1000).toFixed(4)
    

const m = info
const key = {
lremoteJid: info.key.remoteJid,
id: info.key.id,
participant: info.key.participant
}

if (info.key && info.key.remoteJid == 'status@broadcast') return

const altpdf = Object.keys(info.message);


//NORMALIZAÇÃO DE LID/JID NA FROM ‼️
const from = resolveFromKey(info)
const type = altpdf[0] == 'senderKeyDistributionMessage'
? altpdf[1] == 'messageContextInfo'
? altpdf[2]
: altpdf[1]
: altpdf[0]

const body =
(type === "conversation" && info.message.conversation) ? info.message.conversation :
(type === "extendedTextMessage" && info.message.extendedTextMessage.text) ? info.message.extendedTextMessage.text :
(type === "imageMessage" && info.message.imageMessage.caption) ? info.message.imageMessage.caption :
(type === "videoMessage" && info.message.videoMessage.caption) ? info.message.videoMessage.caption :
(type === "buttonsResponseMessage" && info.message.buttonsResponseMessage.selectedButtonId) ? info.message.buttonsResponseMessage.selectedButtonId :
(type === "listResponseMessage" && info.message.listResponseMessage.singleSelectReply.selectedRowId) ? info.message.listResponseMessage.singleSelectReply.selectedRowId :
(type === "templateButtonReplyMessage" && info.message.templateButtonReplyMessage.selectedId) ? info.message.templateButtonReplyMessage.selectedId :
(type === "interactiveResponseMessage" && info.message.interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson) ? JSON.parse(info.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id :
""

const isCmd = body.startsWith(prefix)
const comando = isCmd ? body.slice(prefix.length).split(" ")[0].toLowerCase() : ""
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : []
const q = args.join(' ')
const pushname = info.pushName ? info.pushName : ""
const content = JSON.stringify(info.message)


// CONST PRINCIPAIS ‼️
const criador = `${numeroDono}@s.whatsapp.net`
const isBot = info.key.fromMe ? true : false
const isGroup = from.endsWith('@g.us')
const sender = jidNormalizedUser(
  isGroup
    ? (info?.key?.participant || info?.participant || info?.key?.remoteJid)
    : (info?.key?.remoteJid)
)
const OldOwner = [].concat(settings.ownerLid || [], settings.numeroDono || []);
const isDono = OldOwner.some(d => sender?.startsWith(d))
var text = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

const texto = text.slice(0).trim().split(/ +/).shift().toLowerCase()

const groupMetadata = isGroup ? await zypher.groupMetadata(from) : ''

const groupMembers = isGroup ? groupMetadata.participants : ''

const somembros = isGroup ? getMembros(groupMembers) : ''

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

const isGroupAdmins = groupAdmins.includes(sender) || false

const groupDesc = isGroup ? groupMetadata.desc : ''

const groupName = isGroup ? groupMetadata.subject : ''

const isBotAdmins = groupAdmins.includes(sender) || false

const isBotGroupAdmins = groupAdmins.includes(phoneNumber) || true

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? zypher.sendMessage(from, {text: teks.trim(), mentions: memberr}) : zypher.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
const isAdm = groupAdmins.includes(sender) || false

const nmrdn = String(numeroDono[0]).replace(/[^0-9]/g, "") + "@s.whatsapp.net";


//GLOBAL LINK‼️
global.fotoclient = ("https://files.catbox.moe/9pq3j8.jpg") 
global.fakelink = "https://whatsapp.com/channel/0029Vb1w4C7HQbS9h1tDge3j" 


// CONST QUOTED-SELOS ‼️
const numeroContato = typeof sender === 'string' ? sender.split('@')[0] : '0000000000';

const contato = {
  key: { fromMe: false, participant: `0@s.whatsapp.net` },
  message: {
    contactMessage: {
      displayName: zypher,
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname}\nitem1.TEL;waid=${numeroContato}:${numeroContato}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
    },
  },
};


const selo = {
key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
message: {
extendedTextMessage: {
text: 'by zypher2k',
title: null,
jpegThumbnail: null,
},
},
participant: '0@s.whatsapp.net',
verifiedName: 'https://wa.me/nexus',
};


const force = {
            key: {
                participant: `0@s.whatsapp.net`,
                ...(info.chat ? { remoteJid: "status@broadcast" } : {})
            },
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: false
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "review_and_pay",
                                buttonParamsJson: JSON.stringify({
                                    currency: "INR",
                                    total_amount: { value: 9999900, offset: 100 },
                                    reference_id: "4OON4PX3FFJ",
                                    type: "physical-goods",
                                    order: {
                                        status: "payment_requested",
                                        subtotal: { value: 9999900, offset: 100 },
                                        tax: { value: 9999900, offset: 100 },
                                        discount: { value: 9999900, offset: 100 },
                                        shipping: { value: 9999900, offset: 100 },
                                        order_type: "ORDER",
                                        items: [
                                            {
                                                retailer_id: "7842674605763435",
                                                product_id: "7842674605763435",
                                                name: "�? zypher Dev",
                                                amount: { value: 9999900, offset: 100 },
                                                quantity: 7
                                            },
                                            {
                                                retailer_id: "custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8",
                                                name: "",
                                                amount: { value: 9999900, offset: 100 },
                                                quantity: 780
                                            }
                                        ]
                                    },
                                    native_payment_methods: []
                                })
                            }
                        ]
                    }
                }
            }
};


const quotedGp = {
key: {
fromMe: false,
remoteJid: "status@broadcast",
participant: "0@s.whatsapp.net"
},
message: {
groupInviteMessage: {
groupJid: "120363401673714464@g.us",
inviteCode: "HPuSVYnFl2d3GoocCi6Oy3",
inviteExpiration: Math.floor(Date.now() / 1000) + 86400,
groupName: "🔥𝐅𝐎𝐑 𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊🔥",
caption: "[ 🐉 ] 𝐁𝐘 𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊 [ 🐉 ]               زامبوم",
jpegThumbnail: await toBase64('./arquivos/imagem/cart.jpg', 300, 300), // sua imagem local
}
}
}


const seloMeta = {key: {fromMe: false,participant: '13135550002@s.whatsapp.net',},message: {contactMessage: {displayName: '🔥𝐅𝐎𝐑 𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊🔥',vcard:
'BEGIN:VCARD\n' + 
'VERSION:3.0\n' +
`FN:Meta IA\n` + 
`ORG:Meta IA;\n` + 
`TEL;type=MSG;type=CELL;type=VOICE;waid=13135550002:+13135550002\n` + 'END:VCARD'},},};


const selo2 = {
key: { remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net' },
message: { listResponseMessage: { title: nomeBot } },
};


const selogrupo = { key : { fromMe: false, participant: "0@s.whatsapp.net", ...{}}, message: { "groupInviteMessage": { "text": "https://chat.whatsapp.com/BEUp1cnO3clLOoiQxBZpI5", "sourceUrl": "https://chat.whatsapp.com/BEUp1cnO3clLOoiQxBZpI5", "matchedText": "https://chat.whatsapp.com/BEUp1cnO3clLOoiQxBZpI5", "description": "Convite para grupo do WhatsApp", "title": "Dragon-Bot", "previewType": "NONE",	"jpegThumbnail": null }}}



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const quoted = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage || null

const isQuoted = quoted !== null && quoted !== undefined

const x = args.join(' ')



//SIMULA ESTAR ESCREVENDO ‼️
async function escrever (texto) {
await zypher.sendPresenceUpdate('composing', from) 
await esperar(1000) 
zypher.sendMessage(from, { text: texto }, {quoted: info})
}


// CONST ENVIAR/REPLY - MODIFICADAS ‼️
const reply = (texto) => {
    zypher.sendMessage(from, { 
        text: texto, 
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            "externalAdReply": {
                "title": nomeBot,
                "body": `𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊 𝐃𝐄𝐕`,
                "mediaType": 10,
                "thumbnailUrl": `https://files.catbox.moe/oqelyo.jpg`,
                "sourceUrl": `https://wa.me//5515996832387`
            }
        }
    }, { quoted: info });
};

const enviar = (texto) => {
    zypher.sendMessage(from, { 
        text: texto, 
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            "externalAdReply": {
                "title": nomeBot,
                "body": `𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊 𝐃𝐄𝐕`,
                "mediaType": 10,
                "thumbnailUrl": `https://files.catbox.moe/oqelyo.jpg`,
                "sourceUrl": `https://wa.me//5515996832387`
            }
        }
    }, { quoted: info });
};



//budy 1/2 ‼️
const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
var budy2 = budy.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");


let dadosgpp
try {
dadosgpp =  JSON.parse(fs.readFileSync(`./database/grupos/${from}.json`, 'utf-8')) 
} catch(e) {
dadosgpp = {}
}



//━━━━━━━━━━━━━━━━━━━━━━━[ 🐉 ]━━━━━━━━━━━━━━━━━━━━━━━━━\\




//SIMULA ESTAR ESCREVENDO ‼️
async function upload(buffer, originalFileName) {
  return new Promise(async (resolve, reject) => {
      try {
          const repoOwner = 'floxcloud';
          const repoName = 'uploadsFlox';
          const token = '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'; // Token diretamente no código
          const { ext, mime } = getFileTypeFromBuffer(buffer);
          if (!ext || ext === 'unknown') {
              throw new Error('Tipo de arquivo não suportado.');
          }
          const randomFileName = `${Date.now()}.${ext}`;
          let filePath;
          if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
              filePath = `fotos/${randomFileName}`;
          } else if (['mp4', 'avi', 'mkv', 'mov'].includes(ext)) {
              filePath = `videos/${randomFileName}`;
          } else if (['mp3', 'wav', 'ogg'].includes(ext)) {
              filePath = `audios/${randomFileName}`;
          } else if (['pdf', 'doc', 'docx', 'xlsx', 'pptx', 'zip', 'rar', '7z', 'iso', 'apk'].includes(ext)) {
              filePath = `documentos/${randomFileName}`;
          } else {
              filePath = `outros/${randomFileName}`; // Para tipos não especificados
          }
          const base64Content = buffer.toString('base64');
          const response = await axios.put(
              `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
              {
                  message: `Uploading ${randomFileName}`,
                  content: base64Content
              },
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Accept': 'application/vnd.github.v3+json',
                      'Content-Type': 'application/json'
                  }
              }
          );
          resolve(response.data.content.download_url);
      } catch (error) {
          reject(error);
      }
  });
}

async function escrever (texto) {
await zypher.sendPresenceUpdate('composing', from) 
await esperar(1000)   
zypher.sendMessage(from, { text: texto }, {quoted: info})
}



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

function isUrl(url) {
    if (!url || typeof url !== 'string') return false;
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
  }

var text = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//ESPERAR - SLEEP ‼️
const esperar = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}

const sleep = async (tempo) => {
return new Promise(funcao => setTimeout(funcao, tempo));
}

//INFOsYSTEM ‼️
const infoSystem = require('os')


//REAGIR ‼️
const reagir = (reassao) => {
zypher.sendMessage(from, {react: {text: reassao, key: info.key}})}


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const mencionarIMG = async(teks = '', FileN, thisQuoted = info) => {
  memberr = []
  vy = teks.includes('\n') ? teks.split('\n') : [teks]
  for(vz of vy) { 
  for(zn of vz.split(' ')) {
  if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net');
  }
  }
  await zypher.sendMessage(from, {image: {url: FileN}, caption: teks.trim(), mentions: memberr}, {quoted: thisQuoted}).catch(async(error) => {
  await zypher.sendMessage(from, {text: 'Ocorreu um erro ao encaminhar a imagem e o texto pré-definidos na função.'}, {quoted: info});
  });
  }
  

//ASYNC ABAIXO ‼️
async function fetchJson (url, options) {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}


//FUNÇÃO DE EXCLUIR ARQUIVO ‼️
function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
}
}


//IS JID DONO ‼️
const donoJid = "256244627866746";

function isJidDono(jid) {
  return jid === donoJid;
}



//CONST ISQUOTED‼️
const isImage = type === "imageMessage";

const isVideo = type === "videoMessage";

const isAudio = type === "audioMessage";

const isVisu = type === "viewOnceMessageV2";

const isSticker = type === "stickerMessage";

const isContact = type === "contactMessage";

const isLocation = type === "locationMessage";

const isProduct = type === "productMessage";

const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")

let typeMessage = body.substr(0, 50).replace(/6/g, "");

if (isImage) typeMessage = "Image";

else if (isVideo) typeMessage = "Video";

else if (isAudio) typeMessage = "Audio";

else if (isSticker) typeMessage = "Sticker";

else if (isContact) typeMessage = "Contact";

else if (isLocation) typeMessage = "Location";

else if (isProduct) typeMessage = "Product";


//VERIFICAÇÃO DE MENSAGEM CITADA (QUOTED) ‼️
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage");

const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");

const isQuotedVisuU = type === "extendedTextMessage" && content.includes("viewOnceMessage");

const isQuotedVisuU2 = type === "extendedTextMessage" && content.includes("viewOnceMessageV2");

const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage");

const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage");

const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage");

const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage");

const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage");

const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage");

const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage");

const isQuotedDocW = type === "extendedTextMessage" && content.includes("documentWithCaptionMessage");


//MENC_ ‼️
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant

const menc_jid = args?.join(" ").replace("@", "") + "@s.whatsapp.net"

const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || []

const menc_os2 = q.includes("@") ? menc_jid : menc_prt || sender;

const sender_ou_n = q.includes("@") 
  ? (info.message.extendedTextMessage?.contextInfo?.mentionedJid || [sender]) 
  : (menc_prt || [sender])



// CONSOLE - LOG ‼️
const isGroupMessage = from.includes('@g.us');
const dispositivo = '' + (info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IOS' : 'WhatsApp web');

const TipoMensagem = comando ? "Comando" : type === "audioMessage" ? "Áudio" : type === "stickerMessage" ? "Figurinha" : type === "imageMessage" ? "Imagem" : type === "videoMessage" ? "Vídeo" : type === "documentMessage" ? "Documento" : type === "contactMessage" ? "Contato" : type === "locationMessage" ? "Localização" : type === "pollMessage" ? "Enquete" : type === "pollCreationMessage" ? "Criação de enquete" : "Mensagem";


if (m.message && isGroup) {
  console.log(`
╭─────────────────────────────────────────────
│${'🐉 BOT'.green} : ${nomeBot.green}
│${'🌐 GRUPO'.cyan} : ${groupName.red}
│${'🕹 NiCK'.cyan} : ${pushname.red}
│${'💬 MENSAGEM'.cyan} : ${body.length > 300 ? "" : body}
│${'📱 DISPOSITIVO'.cyan} : ${dispositivo.red}
│${'🕛 HORA'.cyan} : ${hora.red}
│${'🗓️ DATA'.cyan} : ${date.red}
╰─────────────────────────────────────────────`)
} else {
  console.log(`
╭─────────────────────────────────────────────
│${'🐉 BOT'.green} : ${nomeBot.green}
│${'🕹 NiCK'.cyan} : ${pushname.red}
│${'💬 MENSAGEM'.cyan} : ${body.length > 300 ? "" : body}
│${'📱 DISPOSITIVO'.cyan} : ${dispositivo.red}
│${'🕛 HORA'.cyan} : ${hora.red}
│${'🗓️ DATA'.cyan} : ${date.red}
╰─────────────────────────────────────────────
`)
}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

//COMANDOS(CASE) ABAIXO ‼️
switch (comando) {


case 'menu':
reagir("⏱️")
await esperar(1000)
reagir("🐉")
const menuCaption = `
╭──「 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐀𝐎 」───╮
│╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
│┆➤𝙪𝙨𝙪𝙖𝙧𝙞𝙤: ${pushname}
│┆➤𝙥𝙧𝙚𝙛𝙞𝙭𝙤: ${prefix}
│┆➤𝙗𝙤𝙩: ${nomeBot}
│┆➤𝙘𝙧𝙞𝙖𝙙𝙤𝙧: ${nomeDono}
│╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
╰──────────────────╮
╭──「 𝐃𝐀𝐓𝐀/𝐇𝐎𝐑𝐀 」
│╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
│┆🗓${date}
│┆🕰${hora}
│╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
╰──────────────────╮
╭──「 𝐌𝐄𝐍𝐔 」
│╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
│┆➤${prefix}ping
│╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
│✆ zypher2k
╰──────────────────╯
`
zypher.sendMessage(from, {
    image: fs.readFileSync('./arquivos/imagem/menu.png'),
    caption: menuCaption,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      showAdAttribution: false,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363144038483540@newsletter',
        newsletterName: '𝐙𝐘𝐏𝐇𝐄𝐑𝟐𝐊',
        serverMessageId: 2
}
}
}, { quoted: quotedGp })
break



case'ping': {
//PING-CARROSSEL 
var getGroups = await zypher.groupFetchAllParticipating()
var groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
var ingfoo = groups.map(v => v)
ingfoo.sort((a, b) => (a[0] < b.length))
  const runtime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

let responseTime = (Date.now() - (info.messageTimestamp * 1000)) / 1000;
        let uptime = process.uptime();
        let systemInfo = {
            osType: infoSystem.type(),
            osRelease: infoSystem.release(),
            totalMemory: (infoSystem.totalmem() / 1024 ** 3).toFixed(2),
            freeMemory: (infoSystem.freemem() / 1024 ** 3).toFixed(2),
        };
        
        const pingString = String(responseTime.toFixed(3)).replaceAll('.', '');

  try {

    const fotoprincipal = './arquivos/imagem/ping.png';
    const hiro = fs.readFileSync(fotoprincipal);
    const fotocarrosel = await prepareWAMessageMedia({ image: hiro }, { upload: zypher.waUploadToServer });

    zypher.relayMessage(from, {
      "interactiveMessage": {
        footer: { text: 'pong🏓' },
        "carouselMessage": {
          title: 'by zypher2k',
          "cards": [
            {
              "header": {
                title: ``,
                "hasMediaAttachment": true,
                "imageMessage": fotocarrosel.imageMessage
              },
              "footer": {
                "text": `╭──「 𝐕𝐄𝐋𝐎𝐂𝐈𝐃𝐀𝐃𝐄 」
│⏱️➤${responseTime.toFixed(3)} seg
╰──────────────────╮
╭──「 𝐆𝐑𝐔𝐏𝐎𝐒 」
│🌐➤${ingfoo.length}
╰──────────────────╯`
              },
              "nativeFlowMessage": {
                "buttons": []
              }
            },
            {
              "header": {
                "hasMediaAttachment": true,
                "imageMessage": fotocarrosel.imageMessage
              },
              "headerType": 'IMAGE',
              "footer": {
                "text": `╭──「 𝐕𝐄𝐑𝐒𝐀𝐎 𝐒𝐎 」
│📂➤${systemInfo.osRelease}
╰──────────────────╮
╭──「 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 」
│⚙️➤${systemInfo.osType}
╰──────────────────╯`
              },
              "nativeFlowMessage": {
                "buttons": []
              }
            },
            {
              "header": {
                "hasMediaAttachment": true,
                "imageMessage": fotocarrosel.imageMessage
              },
              "headerType": 'IMAGE',
              "footer": {
                "text": `╭──「 𝐑𝐀𝐌 𝐓𝐎𝐓𝐀𝐋 」
│💾➤${systemInfo.totalMemory} GB
╰──────────────────╮
╭──「 𝐑𝐀𝐌 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐕𝐄𝐋 」
│💽➤${systemInfo.freeMemory} GB
╰──────────────────╯`
              },
              "nativeFlowMessage": {
                "buttons": []
              }
            },
          ]
        }
      }
    }, {});
  } catch (error) {
    console.log(error);
  }
}
{ quoted: info }
//ZYPHER2K ESPANCA XOTA
break 









//FIM DO SWTICH‼️

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


default:
if (body.startsWith('§')) {
try {
if (!isDono) return
result = eval(body.slice(2))
let response = typeof result === 'object' ? JSON.stringify(result) : String(result);
if (response === '{}') return
return zypher.sendMessage(from, {text: response }).catch(e => {
enviar(String(e))})
} catch (e) {
enviar(String(e))}}

if (budy === prefix) {
reply(`[ ‼️ ] 𝚘𝚙𝚊  𝚊𝚖𝚒𝚐𝚊𝚘: • 𝚍𝚒𝚐𝚒𝚝𝚎 *${prefix}menu* 𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎!`)
} else if (budy.startsWith(prefix)) {
reply(`[ ‼️ ] 𝚎𝚒𝚝𝚊 𝚊𝚖𝚒𝚐𝚊𝚘: *[ este comando não existe ]* _ • 𝚍𝚒𝚐𝚒𝚝𝚎 *${prefix}menu* 𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎!`)
}
}


if (budy.startsWith('$')) {
if (!isDono && !isBot) return;
const cmd = budy.slice(2).trim();
exec(cmd, { cwd: __dirname}, (err, stdout, stderr) => {
if (err) return enviar(`Erro:\n${stderr || err.message}`);
if (!stdout.trim()) return enviar('*feito papai [ 😖 ]*');
enviar(`${stdout}`)
})
}


//IF ABAIXO ‼️ 



if ((budy.includes("Dragon") || budy.includes("dragon")) && !info.key.fromMe) {
    const stickerBuffer = fs.readFileSync('./arquivos/stickers/zypher.webp');
    zypher.sendMessage(from, { sticker: stickerBuffer }, { quoted: info });
}



//FIM DOS IF ‼️


})
}
const main = path.resolve(__dirname)
fs.readdirSync(main).forEach(arquivo => {
if (arquivo.endsWith('.js')) {
const sendArquivo = path.join(main, arquivo)
fs.watchFile(sendArquivo, () => {
fs.unwatchFile(sendArquivo)
console.log(`${arquivo.cyan} [ 𝐅𝐎𝐈 𝐄𝐃𝐈𝐓𝐀𝐃𝐎, 𝐑𝐄𝐈𝐍𝐈𝐂𝐈𝐀𝐍𝐃𝐎 𝐎 𝐁𝐎𝐓🌐 ]`)
process.exit()
})
}
})
startBot()


//CABOU OLQUEI‼️
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

//BY ZYPHER2K && PDR2K 