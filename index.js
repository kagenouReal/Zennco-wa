require('./system/config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode } = require("@kagenoureal/zbail");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const readline = require("readline");
const { smsg } = require('./system/lib/myfunction');
//============
const question = (text) => new Promise(res => {
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question(text, ans => { rl.close(); res(ans) });
});
//============
async function StartZenn() {
const { state, saveCreds } = await useMultiFileAuthState('./session');
const zyn = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !global.usePairingCode,
auth: state,
browser: ["Ubuntu","Chrome","20.0.04"]
});
if (global.usePairingCode && !zyn.authState.creds.registered) {
const phone = await question("-📞 Enter Your Number Phone::\n");
const code = await zyn.requestPairingCode(phone.trim());
console.log(`-✅ Pairing Code: ${code}`);
}
//============
zyn.ev.on("connection.update", ({ connection, lastDisconnect }) => {
if (connection === "open") return console.log("-[ WhatsApp Terhubung! ]");
if (connection !== "close") return;
const code = new Boom(lastDisconnect?.error)?.output?.statusCode || 0;
const reason = {
401: "Bad Session!", 428: "Session digantikan!", 408: "Timeout!",
440: "Keluar, scan ulang!", 410: "Tertutup, retry...", 500: "Restart dibutuhkan!"
}[code] || `Unknown: ${code}`;
console.log(reason);
(code === 401 || code === 428) ? StartZenn() : StartZenn();
});
//============
zyn.ev.on("messages.upsert", async ({ messages, type }) => {
try {
const msg = messages[0] || messages[messages.length - 1];
if (type !== "notify" || !msg?.message || msg.key?.remoteJid == "status@broadcast") return;
const m = smsg(zyn, msg);
require('./system/whatsapp')(zyn, m, msg);
} catch (e) {
console.log(e);
}});
//============
zyn.decodeJid = jid => {
if (!jid) return jid
let clean = jid.split(':')[0]
if (/@s\.whatsapp\.net$|@g\.us$/.test(clean)) return clean
if (/^\d+$/.test(clean)) return clean + '@s.whatsapp.net'
return clean
}
//============
zyn.sendText = (jid, text, quoted = '', opts = {}) => zyn.sendMessage(jid, { text, ...opts }, { quoted });
zyn.ev.on('creds.update', saveCreds);
return zyn;
}
//============
console.log(
`███████╗███████╗███╗   ██╗ ██████╗ ██████╗ 
╚══███╔╝██╔════╝████╗  ██║██╔════╝██╔═══██╗
  ███╔╝ █████╗  ██╔██╗ ██║██║     ██║   ██║
 ███╔╝  ██╔══╝  ██║╚██╗██║██║     ██║   ██║
███████╗███████╗██║ ╚████║╚██████╗╚██████╔╝
╚══════╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝`
);
StartZenn();
