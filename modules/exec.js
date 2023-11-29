import { spawn, spawnSync } from 'child_process'
export default async function execute(msg) {
    const command = msg.message.replace(/\/exec /, '')
    /*
    // for windows
    const childProcess = spawnSync('cmd', ['/c', command], {shell: true, stdio: 'pipe'});
    const stdoutDecoded = iconv.decode(childProcess.stdout, 'cp866')
    const stderrDecoded = iconv.decode(childProcess.stderr, 'cp866')

    function sendCommandToTerminal() {
        childProcess.stdin.write(command + '\n')
    }
    console.log('stdout:', stdoutDecoded);
    console.error('stderr:', stderrDecoded);
    console.log('Exit code:', childProcess.status);
    
    let output = '''
    if (childProcess.stderr.toString() != '') {
        output += `\n>>>${command}\nstderr: ${stderrDecoded}\n\nExit code: ${childProcess.status}\n`
    } else {
        output += `\n>>>${command}\nstdout: ${stdoutDecoded}\nExit code: ${childProcess.status}\n`
    } 
*/
    let output = ''
    const childProcess = await spawn(command, { shell: true })
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
