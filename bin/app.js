"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const List = (array) => {
    let x = { kind: "empty" };
    for (let i = array.length - 1; i >= 0; i--) {
        x = {
            kind: "list",
            head: array[i],
            tail: x
        };
    }
    return x;
};
exports.List = List;
const last = (l) => {
    if (l.kind == "empty") {
        return { kind: "none" };
    }
    if (l.tail.kind == "empty")
        return { kind: "some", value: l.head };
    return last(l.tail);
};
console.log(last((0, exports.List)([5, 4, 3, 2, 1])));
console.log(last((0, exports.List)([1, 2, 3, 4, 5])));
