import fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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
                const keyEncrypt = parseInt(await rl.question('masukan kunci nya (1 - 94): '));

                if(isNaN(keyEncrypt)) {
                    console.log('something error, are you sure the key is integer?');
                    break;
                }

                if(keyEncrypt >= 94) {
                    console.log('key must under 94, please try again later');
                    break;
                }

                console.log('\n')
                await sleep(1000);
                console.log(encrypt(textEncrypt, keyEncrypt))
                break;
            case 2:
                const textDecrypt = await rl.question('masukan text yang sudah di encrypt: ')
                const keyDecrypt = parseInt(await rl.question('masukan kunci nya (1 - 94): '));

                if(isNaN(keyDecrypt)) {
                    console.log('something error, are you sure the key is integer?');
                    break;
                }

                if(keyDecrypt >= 94) {
                    console.log('key must under 94, please try again later');
                    break;
                }

                console.log('\n');
                await sleep(1000);
                console.log(decrypt(textDecrypt, keyDecrypt))
                break;
            case 3:
                // pertama  file asli nya di buka, lalu di ambil isi nya, di encrypt terlebih dahulu lalu di buat file baru. baru di hapus file aslinya. file baru wajib menggunakan ekstensi .kze
                const nameFileEncrypt = await rl.question('masukan lokasi file: ')
                const keyFileEncrypt = parseInt(await rl.question('masukan kunci nya (1 - 94): '));

                if(isNaN(keyFileEncrypt)) {
                    console.log('something error, are you sure the key is integer?');
                    break;
                }

                if(keyFileEncrypt >= 94) {
                    console.log('key must under 94, please try again later');
                    break;
                }

                if(nameFileEncrypt.substring(nameFileEncrypt.lastIndexOf('.')+1) !== 'txt') {
                    console.log('error: file must be txt file\n');
                    break;
                }

                let contentEncrypt = fs.readFileSync(nameFileEncrypt, 'utf8')
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
                const keyFileDecrypt = parseInt(await rl.question('masukan kunci nya (1 - 94): '));

                if(isNaN(keyFileDecrypt)) {
                    console.log('something error, are you sure the key is integer?');
                    break;
                }

                if(keyFileDecrypt >= 94) {
                    console.log('key must under 94, please try again later');
                    break;
                }

                if(nameFileDecrypt.substring(nameFileDecrypt.lastIndexOf('.')+1) !== 'kze') {
                    console.log('error: file must be kze file\n');
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
                process.exit()
                break;
        }
    }
}

// buat function dimana param nya text dan key, dimana text adalah text yang mau di encrypt. key adalah kunci utamanya.
// functionnya 2, encrypt = +, decrypt = -

function encrypt(text, key) {
    let result = '';

    for (let i = 0; i <= text.length - 1; i++) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]:;\'"<,>./?~`\\|';
        const whereAplhabet = alphabet.indexOf(text.charAt(i)); // dapet alphabet index nya, tinggal di ubah/ di tulis ulang
        let encryptIndex = whereAplhabet + key;

        // kondisi
        if(encryptIndex >= alphabet.length) {
            result += alphabet.charAt(encryptIndex - alphabet.length)
        } else { 
            result += alphabet.charAt(encryptIndex)
        }

        // debug
        // console.log(alphabet.charAt(encryptIndex))
        // console.log(`${char} index ke-${whereAplhabet}`)
        // console.log(encryptIndex)
        
    }

    return {
        text: text,
        key: key,
        result: result
    }
}

function decrypt(text, key) {
    let result = '';

    for (let i = 0; i <= text.length - 1; i++) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]:;\'"<,>./?~`\\|';
        const whereAplhabet = alphabet.indexOf(text.charAt(i)); // dapet alphabet index nya, tinggal di ubah/ di tulis ulang
        let decryptIndex = whereAplhabet - key;

        // kondisi
        if(decryptIndex == -1) {
            result += ' ';
        } else if (decryptIndex < 0) {
            result += alphabet.charAt(decryptIndex + alphabet.length)
        } else {
            result += alphabet.charAt(decryptIndex)
        }

        // debug
        // console.log(`${char} index ke-${whereAplhabet}`)
        // console.log(decryptIndex)
        
    }

    return {
        text: text,
        key: key,
        result: result
    }
}


// const key = 95
// const resEncrypt = encrypt('Hallo, Ini private message. Salam kenal', key);
// const resDecrypt = decrypt(resEncrypt.result, key);

// console.log(resEncrypt)
// console.log(resDecrypt)

// process.exit();

main();