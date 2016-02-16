var calculator = (function () {
        function add(a,b) {      // mark private notation
            if( checktype(a)) throw new Error('a is not a number');
            if( checktype(b)) throw new Error('b is not a number');

            return a + b;
        };

        function multiply(a,b) {
            if( checktype(a)) throw new Error('a is not a number');
            if( checktype(b)) throw new Error('b is not a number');

            return a * b;
        };

        function checktype(a) {
            return ( typeof a != 'number' ) ? true : false;
        };

        return {
            add: add,
            multiply: multiply,
            checktype: checktype
        };
})();
