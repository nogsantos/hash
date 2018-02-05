/**!
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 *
 * Contributor: Fabricio Nogueira - 2018
 */
export class Sha1 {

    /**
     * Convert a raw string to a hex string
     *
     * @param {any} raw
     * @returns
     * @memberof Sha1
     */
    _rawToHex(raw) {
        var hex = "";
        var hexChars = "0123456789abcdef";
        for (var i = 0; i < raw.length; i++) {
            var c = raw.charCodeAt(i);
            hex += (
                hexChars.charAt((c >>> 4) & 0x0f) +
                hexChars.charAt(c & 0x0f));
        }
        return hex;
    }
    /**
     * Calculate the SHA1 of a raw string
     *
     * @param {any} raw
     * @returns
     * @memberof Sha1
     */
    _sha1Raw(raw) {
        return this._binaryToRaw(this._sha1Binary(this.rawToBinary(raw), raw.length * 8));
    }
    /**
     * Convert an array of big-endian words to a string
     *
     * @param {any} bin
     * @returns
     * @memberof Sha1
     */
    _binaryToRaw(bin) {
        var raw = "";
        for (var i = 0, il = bin.length * 32; i < il; i += 8) {
            raw += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & 0xff);
        }
        return raw;
    }
    /**
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     *
     * @param {any} bin
     * @param {any} len
     * @returns
     * @memberof Sha1
     */
    _sha1Binary(bin, len) {
        /*
         * append padding
         */
        bin[len >> 5] |= 0x80 << (24 - len % 32);
        bin[((len + 64 >> 9) << 4) + 15] = len;

        var w = new Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;

        for (var i = 0, il = bin.length; i < il; i += 16) {
            var _a = a;
            var _b = b;
            var _c = c;
            var _d = d;
            var _e = e;

            for (var j = 0; j < 80; j++) {
                if (j < 16) {
                    w[j] = bin[i + j];
                } else {
                    w[j] = this._rotateLeft(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                }
                var t = this._add(this._add(this._rotateLeft(a, 5), this._ft(j, b, c, d)),
                    this._add(this._add(e, w[j]), this._kt(j)));
                e = d;
                d = c;
                c = this._rotateLeft(b, 30);
                b = a;
                a = t;
            }

            a = this._add(a, _a);
            b = this._add(b, _b);
            c = this._add(c, _c);
            d = this._add(d, _d);
            e = this._add(e, _e);
        }
        return [a, b, c, d, e];
    }
    /**
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     *
     * @param {any} x
     * @param {any} y
     * @returns
     * @memberof Sha1
     */
    _add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    /**
     * Bitwise rotate a 32-bit number to the left.
     *
     * @param {any} n
     * @param {any} count
     * @returns
     * @memberof Sha1
     */
    _rotateLeft(n, count) {
        return (n << count) | (n >>> (32 - count));
    }
    /**
     * Perform the appropriate triplet combination function for the current
     * iteration
     *
     * @param {any} t
     * @param {any} b
     * @param {any} c
     * @param {any} d
     * @returns
     * @memberof Sha1
     */
    _ft(t, b, c, d) {
        if (t < 20) {
            return (b & c) | ((~b) & d);
        } else if (t < 40) {
            return b ^ c ^ d;
        } else if (t < 60) {
            return (b & c) | (b & d) | (c & d);
        } else {
            return b ^ c ^ d;
        }
    }
    /**
     * Determine the appropriate additive constant for the current iteration
     *
     * @param {any} t
     * @returns
     * @memberof Sha1
     */
    _kt(t) {
        if (t < 20) {
            return 1518500249;
        } else if (t < 40) {
            return 1859775393;
        } else if (t < 60) {
            return -1894007588;
        } else {
            return -899497514;
        }
    }
    /**
     * Convert a raw string to an array of big-endian words.
     * Characters >255 have their high-byte silently ignored.
     *
     * @param {any} raw
     * @returns
     * @memberof Sha1
     */
    rawToBinary(raw) {
        var binary = new Array(raw.length >> 2);
        for (var i = 0, il = binary.length; i < il; i++) {
            binary[i] = 0;
        }
        for (i = 0, il = raw.length * 8; i < il; i += 8) {
            binary[i >> 5] |= (raw.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
        }
        return binary;
    }
    /**
     * Encode a string as UTF-8.
     * For efficiency, this assumes the input is valid UTF-16.
     *
     * @param {any} string
     * @returns
     * @memberof Sha1
     */
    stringToRaw(string) {
        var raw = "",
            x, y;
        var i = -1;
        var il = string.length;
        while (++i < il) {
            /*
             * decode UTF-16 surrogate pairs
             */
            x = string.charCodeAt(i);
            y = i + 1 < il ? string.charCodeAt(i + 1) : 0;
            if (0xd800 <= x && x <= 0xdbff && 0xdc00 <= y && y <= 0xdfff) {
                x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff);
                ++i;
            }
            /*
             * encode output as UTF-8
             */
            if (x <= 0x7f) {
                raw += String.fromCharCode(x);
            } else if (x <= 0x7ff) {
                raw += String.fromCharCode(0xc0 | ((x >>> 6) & 0x1f),
                    0x80 | (x & 0x3f));
            } else if (x <= 0xffff) {
                raw += String.fromCharCode(0xe0 | ((x >>> 12) & 0x0f),
                    0x80 | ((x >>> 6) & 0x3f),
                    0x80 | (x & 0x3f));
            } else if (x <= 0x1fffff) {
                raw += String.fromCharCode(0xf0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3f),
                    0x80 | ((x >>> 6) & 0x3f),
                    0x80 | (x & 0x3f));
            }
        }
        return raw;
    }
    /**
     * Calculate the HMAC-SHA1 of a key and some data (raw strings)
     *
     * @param {any} key
     * @param {any} data
     * @returns
     * @memberof Sha1
     */
    hmacRaw(key, data) {
        var binaryKey = this.rawToBinary(key);
        if (binaryKey.length > 16) {
            binaryKey = this._sha1Binary(binaryKey, key.length * 8);
        }
        var ipad = new Array(16);
        var opad = new Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = binaryKey[i] ^ 0x36363636;
            opad[i] = binaryKey[i] ^ 0x5c5c5c5c;
        }
        var hash = this._sha1Binary(ipad.concat(this.rawToBinary(data)), 512 + data.length * 8);
        return this._binaryToRaw(this._sha1Binary(opad.concat(hash), 512 + 160));
    }
    /**
     * Encode to sha1
     *
     * @param {any} string
     * @returns
     * @memberof Sha1
     */
    encode(string) {
        if (!string) {
            return null;
        }
        return this._rawToHex(this._sha1Raw(this.stringToRaw(string)));
    }
    /**
     * Encode Hexadecimal to string
     *
     * @param {any} hex
     * @returns
     * @memberof Sha1
     */
    hexToString(hex) {
        if (!hex) {
            return null;
        }
        var str = '';
        for (var i = 0, il = hex.length; i < il; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    }
    /**
     * Encode Sha1 to hexadecimal
     *
     * @param {any} value
     * @returns
     * @memberof Sha1
     */
    sha1ToHex(value) {
        if (!value) {
            return null;
        }
        return this._rawToHex(this._sha1Raw(this.hexToString(value)));
    }
}
