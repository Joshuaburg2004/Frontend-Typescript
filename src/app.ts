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

const allEvenRange = (lower: number) => (upper: number) : string => {
    const internal = (i: number) : string => {
        if(upper < lower){
            if(i % 2 == 0){
                if(i == upper || i == upper + 1){
                    return `${i}`
                }
                return `${i} ${internal(i - 1)}`
            }
            return internal(i - 1)
        }
        if(lower < upper){
            if(i % 2 == 0){
                if(i == upper || i == upper - 1){
                    return `${i}`
                }
                return `${i} ${internal(i + 1)}`
            }
            return internal(i + 1)
        }

        if(lower % 2 == 0){
            return `${lower}`
        }
        return ""
        
    }
    return internal(lower)
}

console.log(allEvenRange(5)(25))
console.log(allEvenRange(25)(5))
console.log(allEvenRange(-5)(-25))
console.log(allEvenRange(-25)(-25))
console.log(allEvenRange(-26)(-26))


const drawLine = (length: number) : string => {
    const teller = (i: number) : string => {
        if(i < length){
            return `*${teller(i + 1)}`
        }
        return ""
    }
    return teller(0)
}

console.log(drawLine(13))