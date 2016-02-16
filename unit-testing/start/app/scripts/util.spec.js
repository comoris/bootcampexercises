//const expect = chai.expect;
import { expect } from 'chai';
import util from './util';

describe('util', () => {
        describe('plur', () => {
            it('should not pluralize when word is one', () => {
                const result = util.pluralize(1, 'word');
                expect(result).to.equal('word');
            });
            it('should pluralize when word is more than one', () => {
                const result = util.pluralize(2, 'word');
                expect(result).to.equal('words');
            });
        });

        describe('uuid', () => {
            it('it should return a 36-length string', () => {
                const result = util.uuid().length;
                expect(result).to.equal(36);
            });
        });
    }
);
