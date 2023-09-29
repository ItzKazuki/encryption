import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs';

const rl = readline.createInterface({ input, output });


async function main() {
    let coba = 0;

    while(coba != 3) {
        console.log("-------- Implement Cryptographi Simetric ---------")
        console.log("1. encrypt")
        console.log("2. decrypt")
        console.log("3. encrypt file")
        console.log("4. decrypt file")
        console.log("5. exit \n")
        
        coba = parseInt(await rl.question('pilih yang mana? '));

        switch(coba) {
            case 1: 
                const textEncrypt = await rl.question('masukan text yang mau di encrypt: ')
                const keyEncrypt = parseInt(await rl.question('masukan kunci nya (1 - 66): '));
                console.log('\n')
                console.log(encrypt(textEncrypt, keyEncrypt))
                break;
            case 2:
                const textDecrypt = await rl.question('masukan text yang sudah di encrypt: ')
                const keyDecrypt = parseInt(await rl.question('masukan kunci nya (1 - 50): '));
                console.log('\n')
                console.log(decrypt(textDecrypt, keyDecrypt))
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
    }
}



// buat function dimana param nya text dan key, dimana text adalah text yang mau di encrypt. key adalah kunci utamanya.
// functionnya 2, encrypt = +, decrypt = -

function encrypt(text, key) {
    let result = '';

    for (let i = 0; i <= text.length - 1; i++) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const char = text.charAt(i);
        const whereAplhabet = alphabet.indexOf(char); // dapet alphabet index nya, tinggal di ubah/ di tulis ulang
        let encryptIndex = whereAplhabet + key;

        // kondisi
        if(encryptIndex >= alphabet.length) {
            let resetToZero = encryptIndex - alphabet.length
            result += alphabet.charAt(resetToZero)
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
        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const char = text.charAt(i);
        const whereAplhabet = alphabet.indexOf(char); // dapet alphabet index nya, tinggal di ubah/ di tulis ulang
        let decryptIndex = whereAplhabet - key;

        // kondisi
        if(decryptIndex == -1) {
            result += ' ';
        } else if (decryptIndex < 0) {
            let addToAlphabetLegth = decryptIndex + alphabet.length;
            result += alphabet.charAt(addToAlphabetLegth)
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

// const resEncrypt = encrypt('Kazukikun245', 67);
// const resDecrypt = decrypt(resEncrypt.result, 67);

// console.log(resEncrypt)
// console.log(resDecrypt)

main();
