const d = (a, b) => {
        console.log(a, b);
        setTimeout(() => {
                console.log(a, b);
        }, 100);
};
console.log(d);
