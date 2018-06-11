let aes256 = require('aes256');

class AES256 {

    encrypt = (key, plaintext) => {
        let cipher = aes256.createCipher(key);
        return cipher.encrypt(plaintext);
    }

    decrypt = (key, text) =>{
        let cipher = aes256.createCipher(key);
        return cipher.decrypt(text);
    }

}

export default AES256;