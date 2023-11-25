import fs from 'fs'
import ini from 'ini'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'
import { bot_start } from './bot_commands.js'
import input from 'input'
export default async function createSession (config) {

	const client = new TelegramClient(
		new StringSession(config.USER.SESSION),
		parseInt(config.USER.API_ID),
		config.USER.API_HASH,
		// {
		// connectionRetries: 5,
		// }
	);

	await client.start({
		phoneNumber: async () => await input.text('Please enter your number: '),
		password: async () => await input.text("Please enter your password"),
		phoneCode: async () => await input.text("Please enter the code you received: "),
		onError: (err) => console.error(err),
	});

	if (config.USER.SESSION.length < 1) {
		config.USER.SESSION = client.session.save();
		fs.writeFileSync("./config.ini", ini.stringify(config));
		await client.sendMessage("me", {
		message:
			"String session generated on this account for userbot your string session is \n\`\`\`" +
			client.session.save() +
			"\`\`\`",
		});
	}
	
	await bot_start(client);
};