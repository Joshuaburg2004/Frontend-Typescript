"use strict";
const allNumber = (n) => {
    const internal = (i) => {
        if (i >= n) {
            return `${i}`;
        }
        return `${i}` + " " + internal(i + 1);
    };
    return internal(0);
};
console.log(allNumber(5));
console.log(allNumber(-1));
const allNumberRev = (n) => {
    const internal = (i) => {
        if (i <= 0) {
            return `${i}`;
        }
        return `${i}` + " " + internal(i - 1);
    };
    return internal(n);
};
console.log(allNumberRev(5));
console.log(allNumberRev(-1));
const allNumberRange = (lower) => (upper) => {
    const internal = (i) => {
        if (lower <= upper) {
            if (i >= upper) {
                return `${i}`;
            }
            return `${i}` + " " + internal(i + 1);
        }
        else {
            if (i <= upper) {
                return `${i}`;
            }
            return `${i}` + " " + internal(i - 1);
        }
    };
    return internal(lower);
};
console.log(allNumberRange(5)(10));
console.log(allNumberRange(10)(5));
console.log(allNumberRange(-5)(-10));
console.log(allNumberRange(-10)(-5));
console.log(allNumberRange(5)(5));
const allNumberRangeRev = (lower) => (higher) => {
    const internal = (i) => {
        return "";
    };
    return internal(higher);
};
