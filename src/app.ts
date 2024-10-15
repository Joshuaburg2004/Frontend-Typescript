const allNumber = (n: number) : string => {
    const internal = (i: number) : string => {
        if (i >= n){
            return `${i}`;
        }
        return `${i}` + " " + internal(i+1);
    }
    return internal(0);
}
console.log(allNumber(5));
console.log(allNumber(-1));

const allNumberRev = (n: number) : string => {
    const internal = (i: number) : string => {
        if (i <= 0){
            return `${i}`;
        }
        return `${i}` + " " + internal(i-1);
    }
    return internal(n);
}
console.log(allNumberRev(5));
console.log(allNumberRev(-1));

const allNumberRange = (n: number) => (m: number) : string => {
    const internal = (i: number) : string => {
        if(n <= m){
            if(i >= m){
                return `${i}`;
            }
            return `${i}` + " " + internal(i+1);
        }
        else {
            if(i <= m){
                return `${i}`;
            }
            return `${i}` + " " + internal(i-1);
        }
    }
    return internal(n);
}

console.log(allNumberRange(5)(10));
console.log(allNumberRange(10)(5));
console.log(allNumberRange(-5)(-10));
console.log(allNumberRange(-10)(-5));
console.log(allNumberRange(5)(5))