/**
 * Javascript implementation of Md5 Algorithm
 *
 *
 * Contributor: Fabricio Nogueira - 2018
 *
 * @export
 * @class Md5
 */
export class Md5 {
    /**
     *
     *
     * @param {any} lValue
     * @param {any} iShiftBits
     * @returns
     *
     * @memberof Md5
     */
    _rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    /**
     *
     *
     * @param {any} lX
     * @param {any} lY
     * @returns
     *
     * @memberof Md5
     */
    _addUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    /**
     *
     *
     * @param {any} x
     * @param {any} y
     * @param {any} z
     * @returns
     *
     * @memberof Md5
     */
    _f(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    /**
     *
     *
     * @param {any} x
     * @param {any} y
     * @param {any} z
     * @returns
     *
     * @memberof Md5
     */
    _g(x, y, z) {
        return (x & z) | (y & (~z));
    }
    /**
     *
     *
     * @param {any} x
     * @param {any} y
     * @param {any} z
     * @returns
     *
     * @memberof Md5
     */
    _h(x, y, z) {
        return (x ^ y ^ z);
    }
    /**
     *
     *
     * @param {any} x
     * @param {any} y
     * @param {any} z
     * @returns
     *
     * @memberof Md5
     */
    _i(x, y, z) {
        return (y ^ (x | (~z)));
    }
    /**
     *
     *
     * @param {any} a
     * @param {any} b
     * @param {any} c
     * @param {any} d
     * @param {any} x
     * @param {any} s
     * @param {any} ac
     * @returns
     *
     * @memberof Md5
     */
    _ff(a, b, c, d, x, s, ac) {
        a = this._addUnsigned(a, this._addUnsigned(this._addUnsigned(this._f(b, c, d), x), ac));
        return this._addUnsigned(this._rotateLeft(a, s), b);
    }
    /**
     *
     *
     * @param {any} a
     * @param {any} b
     * @param {any} c
     * @param {any} d
     * @param {any} x
     * @param {any} s
     * @param {any} ac
     * @returns
     *
     * @memberof Md5
     */
    _gg(a, b, c, d, x, s, ac) {
        a = this._addUnsigned(a, this._addUnsigned(this._addUnsigned(this._g(b, c, d), x), ac));
        return this._addUnsigned(this._rotateLeft(a, s), b);
    }
    /**
     *
     *
     * @param {any} a
     * @param {any} b
     * @param {any} c
     * @param {any} d
     * @param {any} x
     * @param {any} s
     * @param {any} ac
     * @returns
     *
     * @memberof Md5
     */
    _hh(a, b, c, d, x, s, ac) {
        a = this._addUnsigned(a, this._addUnsigned(this._addUnsigned(this._h(b, c, d), x), ac));
        return this._addUnsigned(this._rotateLeft(a, s), b);
    }
    /**
     *
     *
     * @param {any} a
     * @param {any} b
     * @param {any} c
     * @param {any} d
     * @param {any} x
     * @param {any} s
     * @param {any} ac
     * @returns
     *
     * @memberof Md5
     */
    _ii(a, b, c, d, x, s, ac) {
        a = this._addUnsigned(a, this._addUnsigned(this._addUnsigned(this._i(b, c, d), x), ac));
        return this._addUnsigned(this._rotateLeft(a, s), b);
    }
    /**
     *
     *
     * @param {any} string
     * @returns
     *
     * @memberof Md5
     */
    _convertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    /**
     *
     *
     * @param {any} lValue
     * @returns
     *
     * @memberof Md5
     */
    _wordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    /**
     *
     *
     * @param {any} string
     * @returns
     *
     * @memberof Md5
     */
    _utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) & (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
    /**
     *
     *
     * @param {any} string
     * @returns
     *
     * @memberof Md5
     */
    encode(string) {
        if (!string) {
            return null;
        }
        let x = Array();
        let k, AA, BB, CC, DD, a, b, c, d;
        let S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        let S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        let S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        let S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        string = this._utf8Encode(string);
        x = this._convertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = this._ff(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = this._ff(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = this._ff(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = this._ff(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = this._ff(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = this._ff(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = this._ff(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = this._ff(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = this._ff(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = this._ff(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = this._ff(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = this._ff(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = this._ff(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = this._ff(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = this._ff(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = this._ff(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = this._gg(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = this._gg(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = this._gg(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = this._gg(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = this._gg(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = this._gg(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = this._gg(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = this._gg(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = this._gg(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = this._gg(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = this._gg(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = this._gg(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = this._gg(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = this._gg(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = this._gg(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = this._gg(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = this._hh(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = this._hh(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = this._hh(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = this._hh(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = this._hh(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = this._hh(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = this._hh(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = this._hh(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = this._hh(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = this._hh(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = this._hh(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = this._hh(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = this._hh(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = this._hh(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = this._hh(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = this._hh(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = this._ii(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = this._ii(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = this._ii(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = this._ii(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = this._ii(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = this._ii(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = this._ii(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = this._ii(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = this._ii(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = this._ii(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = this._ii(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = this._ii(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = this._ii(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = this._ii(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = this._ii(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = this._ii(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = this._addUnsigned(a, AA);
            b = this._addUnsigned(b, BB);
            c = this._addUnsigned(c, CC);
            d = this._addUnsigned(d, DD);
        }
        let temp = this._wordToHex(a) + this._wordToHex(b) + this._wordToHex(c) + this._wordToHex(d);
        return temp.toLowerCase();
    }
}
