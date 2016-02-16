// for (var i = 1; i<= 5 ; i++){
//     counter(i);
// }

// function counter(i){
//     setTimeout(function(){
//         console.log('i: ' + i);
//     }, 1000);
// }

// MET IIFE
// for (var i = 1; i<= 5 ; i++){
//     (function(counter){
//         setTimeout(function(){
//             console.log('i: ' + counter);
//         }, 1000);
//     })(i);
// }

'use strict'
// ZET ELKE ITERATIE EEN NIEUWE I via lET // blockscoping
for (let i = 1; i<= 5 ; i++){
    setTimeout(function(){
        console.log('i: ' + i);
    }, 1000);
}


