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

const allNumberRange = (lower: number) => (upper: number) : string => {
    const internal = (i: number) : string => {
        if(lower <= upper){
            if(i >= upper){
                return `${i}`;
            }
            return `${i}` + " " + internal(i+1);
        }
        else {
            if(i <= upper){
                return `${i}`;
            }
            return `${i}` + " " + internal(i-1);
        }
    }
    return internal(lower);
}

console.log(allNumberRange(5)(10));
console.log(allNumberRange(10)(5));
console.log(allNumberRange(-5)(-10));
console.log(allNumberRange(-10)(-5));
console.log(allNumberRange(5)(5))


const allNumberRangeRev = (lower: number) => (upper: number) : string => {
    const internal = (i: number) : string => {
        if(lower <= upper){
            if(i >= upper){
                return `${i}`
            }
            return `${internal(i+1)} ${i}`
        }
        else{
            if(i <= upper){
                return `${i}`
            }
            return `${internal(i-1)} ${i}`
        }
    }
    return internal(lower)
}

console.log(allNumberRangeRev(5)(10));
console.log(allNumberRangeRev(10)(5));
console.log(allNumberRangeRev(-5)(-10));
console.log(allNumberRangeRev(-10)(-5));
console.log(allNumberRangeRev(5)(5))