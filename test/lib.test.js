import { expect } from 'chai';
import { Md5 } from '../src/lib/_md5';
import { Sha1 } from '../src/lib/_sha1';

describe('Libs', () => {

    describe('_md5', () => {
        let md5;
        before(() => {
            md5 = new Md5();
        });

        it('should encode an string', () => {
            expect(md5.encode('test')).to.have.string('098f6bcd4621d373cade4e832627b4f6');
        });

        it('should not encode an empty string', () => {
            expect(md5.encode()).to.be.null;
        });
    });

    describe('_sha1', () => {
        let sha1;
        before(() => {
            sha1 = new Sha1();
        });

        it('should encode an string to sha1', () => {
            expect(sha1.encode('test')).to.have.string('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
        });

        it('should encode an exadecimal value to string', () => {
            expect(sha1.hexToString('68656c6c6f206a617661736372697074')).to.have.string('hello javascript');
        });

        it('should not encode an empty string', () => {
            expect(sha1.encode()).to.be.null;
            expect(sha1.hexToString()).to.be.null;
            expect(sha1.sha1ToHex()).to.be.null;
        });
    });
});
