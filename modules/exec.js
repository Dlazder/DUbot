import { spawnSync } from 'child_process'
import iconv from 'iconv-lite'
import xsh from 'xsh'
export default async function execute(msg) {
    const test = await xsh.exec('dir')
    console.log('test stdout', test.stdout)
    const command = msg.message.replace(/\?.[a-z]+\s/, '')

    // for windows
    const childProcess = spawnSync('cmd', ['/c', command], {shell: true, stdio: 'pipe'});
    const stdoutDecoded = iconv.decode(childProcess.stdout, 'cp866')
    const stderrDecoded = iconv.decode(childProcess.stderr, 'cp866')

    function sendCommandToTerminal() {
        childProcess.stdin.write(command + '\n')
    }
    // console.log('stdout:', stdoutDecoded);
    // console.error('stderr:', stderrDecoded);
    // console.log('Exit code:', childProcess.status);

    {
        // childProcess.stdout.on('data', (data) => {
        //     console.log(`stdout: ${data}`);
        // });
        // childProcess.stderr.on('data', (data) => {
        //     console.error(`stderr ${data}`);
        // })
        // childProcess.on('close', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // })
    }
    
    let output = ''
    if (childProcess.stderr.toString() != '') {
        output += `\n>>>${command}\nstderr: ${stderrDecoded}\n\nExit code: ${childProcess.status}\n`
    } else {
        output += `\n>>>${command}\nstdout: ${stdoutDecoded}\nExit code: ${childProcess.status}\n`
    }
    console.log(output)
    await msg.edit({ text: output });
}