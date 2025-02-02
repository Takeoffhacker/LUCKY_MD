const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVB2SGFTaGdneE9nbzZEZW83OG9QOGFTZUYxNkVuK1Y4SmxSYmFIZm1uaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3hrL21HVWRaYnNOOWdCWkVtQTVhOUlMbHp5eUVQMDRVaFpMbEJxSkl4UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSW8zeCtCL1JRU2x3MEJzZUdvVzJUYUZKeVNtc2hXRUpSM2ZFcWZjVUVvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNOGRzQnE1ZGh5cW5JQ3pNalZ2amxOV1krN2xGY25tMXZCMng2a1ZWYUZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlQSUVhaCsraDNiNSt4NG5DdXFpNlluWStxNjlZelplZE9LRHE2NU1VWDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJyYW9rbFVGNm9TRjJCYlJIaFdUSjBvMFlSdnRJNGZ3NUVsY0RzbVl5UW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09oMnpINWo4aDNSTER1c2dtbFdSaTd2bi82dE5xNDRYZE90K3hNQllVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2MrbjkyZjJwcU92bGdBZUc3WUhMVVM5UkJ1Y0g1M3VCV2JtbUQzMDhFdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpVc2p6ekNvdHA1WjNnVVdSbWxQaithVnVrbkhTRjRNZFpnL0wyVFppNURXd3NONGllZjhYWTBhZWZqSFhTNGJqRHZMcEVzeWQ4TVpUSDBjS09yNkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6IjgrNldaNHJNZGEwcXZNS3JCTTNLc2hqUFBTK00wTzdQb3RjZER1S1dqenc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ild1TDFka2dQU3BxcWhYMVdzT1RLOHciLCJwaG9uZUlkIjoiMTczZmM0NDQtNTYyNS00ZGI2LWJjOWMtZTkxZmY2NzRjZjJkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilc3R2Z5YndOWmNMMHlKWVoxT0FIMFZZdjVMVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpZjdhQ3RvdEFkZjlHcmdCaDV1T2NZd2c2U0k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSjRWUjhOMTQiLCJtZSI6eyJpZCI6IjIzMjg4NDI5MjQ1OjU0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkJPwnZCa8J2QpPCdkJ7wnZCo8J2Qn/CdkJ9+KFRveGljKSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXpreGQwRUVNblorN3dHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSE91aU12a0RudnZheCtzdU50eWZycXBXazVwZGwrT1NNekluNGNDYTlHOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoia1RzcDcxbldoaVo2SFZHTGxaSUVaMGhMbzFGb3dyRWZRUlRkYzhrcDZjZFNES09TcGcraXgvQnA1SytqcGN5YVNaWWpRTU5FR3lUZk5FdEdPRk94QWc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5FYWZtSThZMXplcUVpSUZoYTRBNGNuaDlTZGpGc3lqd0ptTURTZythSjVPQ01sUW11YUxxR3lDR3B2ZHB1L0d1Vk1UN2J6WDdUWmxwUHlrTXZjbUJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMyODg0MjkyNDU6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUnpyb2pMNUE1Nzcyc2ZyTGpiY242NnFWcE9hWFpmamtqTXlKK0hBbXZSdiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczODQ2ODU2Nn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Takeoff",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 23288429245",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Takeoff_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'yes', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


                  
