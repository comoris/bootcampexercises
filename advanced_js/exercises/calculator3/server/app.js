import calc from './service';

import { name } from './service';


try {
    console.log(calc.add(2,'test'));
}
catch(err){
    console.log(err.message);
};

console.log(calc.add(2,5));

console.log(name);
