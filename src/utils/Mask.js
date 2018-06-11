

class Mask {
    str2bin = (text) => {
        let bin = [];
        text.split('').map(char => {
            !!char && bin.push(Number(char.charCodeAt(0)).toString(2));
            return '';
        });
        return bin.join(' ');
    }

    bin2str = (bin) => {
        let text = [];
        bin.split(' ').map(char => {
            !!char && text.push(String.fromCharCode(parseInt(char, 2)));
            return '';
        });
        return text.join('');
    }

    bin2hidden = (str) => {
        str = str.replace(/ /g, '\u2060'); // Unicode Character 'WORD JOINER' (U+2060) 0xE2 0x81 0xA0
        str = str.replace(/0/g, '\u200B'); // Unicode Character 'ZERO WIDTH SPACE' (U+200B) 0xE2 0x80 0x8B
        str = str.replace(/1/g, '\u200C'); // Unicode Character 'ZERO WIDTH NON-JOINER' (U+200C) 0xE2 0x80 0x8C
        return str;
    }

    hidden2bin = (str) => {
        str = str.replace(/[^\u2060\u200B\u200C]/g, ''); // Strip all but hidden characters
        str = str.replace(/\u2060/g, ' '); // Unicode Character 'WORD JOINER' (U+2060) 0xE2 0x81 0xA0
        str = str.replace(/\u200B/g, '0'); // Unicode Character 'ZERO WIDTH SPACE' (U+200B) 0xE2 0x80 0x8B
        str = str.replace(/\u200C/g, '1'); // Unicode Character 'ZERO WIDTH NON-JOINER' (U+200C) 0xE2 0x80
        return str;
    }

    encrypt = (pub, priv) => {
        const privBin = this.str2bin(priv);

        const privHidden = this.bin2hidden(privBin);

        const encoded = `${pub}${privHidden}`;

        return encoded;
    }

    decrypt = (text) => {
        const decodedBin = this.hidden2bin(text);

        const decodedStr = this.bin2str(decodedBin);

        return decodedStr;
    }

    getOriginal = (str) => {
        let orig = str.slice(0);
        
        orig = orig.replace(/[\u2060\u200B\u200C]/g, ''); // Strip all hidden characters
        
        return orig;
    }

}

export default Mask;