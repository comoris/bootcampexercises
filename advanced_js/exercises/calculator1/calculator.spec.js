var expect =  chai.expect;

describe('calc', function(){

    describe('addition', function(){

        it('should return 3 for 1 + 2', function(){
            var result = calculator.add(1,2);
            expect(result).to.equal(3);
        })


        it('should return 3 for 1 + 2', function(){
            var result = calculator.add(10,20);
            expect(result).to.equal(30);
        })
        // negative
        it('should return 10 for -10 + 20', function(){
            var result = calculator.add(-10,20);
            expect(result).to.equal(10);
        })
        // string
        it('should throw error when string is passed', function(){
            expect(
                function(){
                    calculator.add('10','20');
            }).to.throw();
        })

    })


    describe('multiply', function(){

        it('should return 2 for 1 * 2', function(){
            var result = calculator.multiply(1,2);
            expect(result).to.equal(2);
        })

        // negative
        it('should return 10 for -10 * 20', function(){
            var result = calculator.add(-10,20);
            expect(result).to.equal(10);
        })

        // floating
        // it('should return 30.858 for 5.555 * 5.555', function(){
        //     var result = calculator.multiply(5.555,5.555);
        //     expect(result).toBe(30.858);
        // })

    })

});
