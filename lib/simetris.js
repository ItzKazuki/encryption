// buat function dimana param nya text dan key, dimana text adalah text yang mau di encrypt. key adalah kunci utamanya.
// functionnya 2, encrypt = +, decrypt = -

export function encrypt(text, key) {
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

export function decrypt(text, key) {
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