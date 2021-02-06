function foo() {
    let outer = 1;

    setTimeout(() => {
        outer = 2;
    }, 10);
    
    return boo;
    
    function boo() {
        return outer + 1;
    }
}


const result = foo();

setTimeout(() => {
    console.log(result());
}, 100);