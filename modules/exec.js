import { spawn, spawnSync } from 'child_process'
import {settings} from '../settings.js'

export default async function execute(msg) {
    const regex = RegExp(`${settings.startSymbolInCommands}exec\s?`)
    const command = msg.message.replace(regex, '')
    /*
    // fix charset problems in windows
    const childProcess = spawnSync('cmd', ['/c', command], {shell: true, stdio: 'pipe'});
    const stdoutDecoded = iconv.decode(childProcess.stdout, 'cp866')
    const stderrDecoded = iconv.decode(childProcess.stderr, 'cp866')
    */
    let output = ''
    const childProcess = spawn(command, { shell: true })
    childProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        output += `>>>${command}\n\nstdout: ${data}`
        msg.edit({ text: output });
    });
    childProcess.stderr.on('data', (data) => {
        console.error(`stderr ${data}`);
        output += `>>>${command}\n\nstderr: ${data}`
        msg.edit({ text: output });
    })
    childProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    })

}
