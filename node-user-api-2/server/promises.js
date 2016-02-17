// Doe we allebeim, maar één voor één (chained)
Promise.all([
  myservice.getCustomer(1),
  myservice.getSupplier(3)
]).then(function (result) {
  var customer = result[0];
  var supplier = result[1];
});

// Doe we allebei, en eerst die klaar is,
Promise.race([
  myservice.timeout(5000),
  myservice.getSupplier(3)
]).then(function (result) {

});

promise.reject
promise.resolve
// -- PROMESE -------------------------

var obj2 = {
    calcP(a,b) {
        return new Promise ( (resolve,reject) => {
            setTimeout( () => {
                if (!a || !b ) {
                    reject('error');
                    return;
                }
                resolve( a + b);
            }, 1000);
        })
    },
};

function calculate() {
    return obj2.calcP(2,4)
        .then( result => {
            if( !result ){
                retun null;
                // of throw new CancelError();
            }
            console.log( 'result', result);
            return obj2.calcP(result,8); //restultaat hiervan komt in RESULT2
        })
        .then( result2 => {
            console.log( 'result', result2);
            // return obj2.calcP(result2, 20);
        })
        .catch( err => {
            // if( err instanceof CancelError){}
            console.log( 'error', err);
        });
};

calculate()
    .then(function (result2) {
        console.log( 'result2', result2);
    });
    .catch( err => {
        // if( err instanceof CancelError){}
        console.log( 'error2', err);
    });


  // -- CALLBACK -------------------------
  var obj1 = {
      calc: function(a,b, fn) {
          setTimeout( function(){
              if (!a || !b ) {
                  fn('error');
                  return
              }
              fn(null, a + b);
          }, 1000);
      }
  };

  obj1.calc( 2, 4, function(err,result){
      if (err){
          console.log(' err', err);
      }
      console.log('result', result);
  } );
