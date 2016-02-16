// ES6 MODULES
class Mycalculator {
    add(a,b) {

        if( !this.checktype(a) )
            throw new Error('a is not a number');
        if( !this.checktype(b) )
            throw new Error('b is not a number');
        return  a + b;
    }

    multiply(a,b) {
        if( !this.checktype(a)) throw new Error('a is not a number');
        if( !this.checktype(b)) throw new Error('b is not a number');
        return  a * b;
    }

    checktype(a) {
        return ( typeof a === 'number' ) ? true : false;
    };

}


export default new Mycalculator();
