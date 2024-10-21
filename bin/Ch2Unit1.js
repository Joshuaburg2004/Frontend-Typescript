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
const allNumberRangeRev = (lower) => (upper) => {
    const internal = (i) => {
        if (lower <= upper) {
            if (i >= upper) {
                return `${i}`;
            }
            return `${internal(i + 1)} ${i}`;
        }
        else {
            if (i <= upper) {
                return `${i}`;
            }
            return `${internal(i - 1)} ${i}`;
        }
    };
    return internal(lower);
};
console.log(allNumberRangeRev(5)(10));
console.log(allNumberRangeRev(10)(5));
console.log(allNumberRangeRev(-5)(-10));
console.log(allNumberRangeRev(-10)(-5));
console.log(allNumberRangeRev(5)(5));
const allEvenRange = (lower) => (upper) => {
    const internal = (i) => {
        if (upper < lower) {
            if (i % 2 == 0) {
                if (i == upper || i == upper + 1) {
                    return `${i}`;
                }
                return `${i} ${internal(i - 1)}`;
            }
            return internal(i - 1);
        }
        if (lower < upper) {
            if (i % 2 == 0) {
                if (i == upper || i == upper - 1) {
                    return `${i}`;
                }
                return `${i} ${internal(i + 1)}`;
            }
            return internal(i + 1);
        }
        if (lower % 2 == 0) {
            return `${lower}`;
        }
        return "";
    };
    return internal(lower);
};
console.log(allEvenRange(5)(25));
console.log(allEvenRange(25)(5));
console.log(allEvenRange(-5)(-25));
console.log(allEvenRange(-25)(-25));
console.log(allEvenRange(-26)(-26));
const drawLine = (length) => {
    const teller = (i) => {
        if (i < length) {
            return `*${teller(i + 1)}`;
        }
        return "";
    };
    return teller(0);
};
console.log(drawLine(13));
const drawSymbols = (symbol) => (length) => {
    const teller = (i) => {
        if (i < length) {
            return `${symbol}${teller(i + 1)}`;
        }
        return "";
    };
    return teller(0);
};
console.log(drawSymbols("%")(15));
const toBinary = (n) => {
    const internal = (i) => {
        if (i > 1)
            return `${internal(Math.trunc(i / 2))}${i % 2}`;
        return `${i % 2}`;
    };
    return internal(n).replace(/^0+/, "");
};
console.log(toBinary(5));
console.log(toBinary(17));
const toBase = (n) => (base) => {
    const internal = (i) => {
        if (i > 1)
            return `${internal(Math.trunc(i / base))}${i % base}`;
        return `${i % base}`;
    };
    return internal(n).replace(/^0+/, "");
};
console.log(toBase(5)(3));
console.log(toBase(17)(6));
