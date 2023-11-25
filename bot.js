import fs from 'fs'
import ini from 'ini'
import createSession from './createSession.js'

  (async () => {

    console.log('Bot starting...');

    if (!fs.existsSync('./config.ini')) {
      console.log('config.ini not found');
      return;
    }

    const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

    if (config.USER.SESSION.length < 1) {
      console.log('Creating user session');
    } else {
      console.log('Starting bot');
    }
    
    createSession(config);
})();