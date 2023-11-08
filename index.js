import fs from 'fs';
import sleep from './lib/sleep.js';
import checkKey from './lib/checkKey.js';
import * as readline from 'node:readline/promises';
import { encrypt, decrypt } from './lib/simetris.js';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function main() {
    let coba = 0;

    console.log('Starting Application...')
    await sleep(1500);

    while(coba != 5) {

        console.log("-------- Kriptografi Simetris ---------")
        console.log("1. encrypt")
        console.log("2. decrypt")
        console.log("3. encrypt file")
        console.log("4. decrypt file")
        console.log("5. exit \n")
        
        coba = parseInt(await rl.question('pilih yang mana? '));

        switch(coba) {
            case 1: 
                const textEncrypt = await rl.question('masukan text yang mau di encrypt: ')
                const keyEncrypt = parseInt(await rl.question('masukan kunci nya (1 - 93): '));

                if(checkKey(keyEncrypt)) break;

                console.log('\n')
                await sleep(1000);
                console.log(encrypt(textEncrypt, keyEncrypt))
                break;
            case 2:
                const textDecrypt = await rl.question('masukan text yang sudah di encrypt: ')
                const keyDecrypt = parseInt(await rl.question('masukan kunci nya (1 - 93): '));

                if(checkKey(keyDecrypt)) break;

                console.log('\n');
                await sleep(1000);
                console.log(decrypt(textDecrypt, keyDecrypt))
                break;
            case 3:
                // pertama  file asli nya di buka, lalu di ambil isi nya, di encrypt terlebih dahulu lalu di buat file baru. baru di hapus file aslinya. file baru wajib menggunakan ekstensi .kze
                const nameFileEncrypt = await rl.question('masukan lokasi file: ')
                const keyFileEncrypt = parseInt(await rl.question('masukan kunci nya (1 - 93): '));

                if(checkKey(keyFileEncrypt)) break;

                if(nameFileEncrypt.substring(nameFileEncrypt.lastIndexOf('.')+1) !== 'txt') {
                    console.log('error: file must be txt file\n');
                    break;
                }

                let contentEncrypt = fs.readFileSync(nameFileEncrypt, 'utf8');
                console.log('\ngetting file...');
                await sleep(1000);

                const fileEncrypt = encrypt(contentEncrypt, keyFileEncrypt);
                console.log('trying encrypt file...');
                await sleep(1000);

                const newFileEncrypt = `encrypt_${nameFileEncrypt.substring(0,nameFileEncrypt.lastIndexOf('.'))}.kze`

                fs.renameSync(nameFileEncrypt, newFileEncrypt);
                console.log('renaming file...');
                await sleep(1000);
                fs.writeFileSync(newFileEncrypt, fileEncrypt.result);
                
                console.log('Success\n')
                break;
            case 4:
                // pertama  file asli nya di buka, lalu di ambil isi nya, di encrypt terlebih dahulu lalu di buat file baru. baru di hapus file aslinya. file baru wajib menggunakan ekstensi .kze
                const nameFileDecrypt = await rl.question('masukan lokasi file: ')
                const keyFileDecrypt = parseInt(await rl.question('masukan kunci nya (1 - 93): '));

                if(checkKey(keyFileDecrypt)) break;

                if(nameFileDecrypt.substring(nameFileDecrypt.lastIndexOf('.')+1) !== 'kze') {
                    console.log('error: file must be .kze file\n');
                    break;
                }

                let contentDecrypt = fs.readFileSync(nameFileDecrypt, 'utf8')
                console.log('\ngetting file...');
                await sleep(1000);

                const fileDecrypt = decrypt(contentDecrypt, keyFileDecrypt);
                console.log('trying decrypt file...');
                await sleep(1000);

                const newFileDecrypt = `${nameFileDecrypt.substring(nameFileDecrypt.lastIndexOf('_')+1,nameFileDecrypt.lastIndexOf('.'))}.txt`

                fs.renameSync(nameFileDecrypt, newFileDecrypt);
                console.log('renaming file...');
                await sleep(1000);
                fs.writeFileSync(newFileDecrypt, fileDecrypt.result);
                
                console.log('Success\n');
                break;
            case 5:
                console.log('Bye....');
                await sleep(1000);
                process.exit();
        }
    }
}

// const key = 95
// const resEncrypt = encrypt('Hallo, Ini private message. Salam kenal', key);
// const resDecrypt = decrypt(resEncrypt.result, key);

// console.log(resEncrypt)
// console.log(resDecrypt)

// process.exit();

main();