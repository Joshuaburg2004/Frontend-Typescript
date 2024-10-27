"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const printList = (list) => {
    if (list.kind == "empty") {
        return "";
    }
    if (list.tail.kind == "empty") {
        return `${list.head}`;
    }
    return `${list.head} ${printList(list.tail)}`;
};
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
const rev = (l) => {
    const inner = (liner) => (emptyL) => {
        if (liner.kind == "empty") {
            return emptyL;
        }
        emptyL = {
            kind: "list",
            head: liner.head,
            tail: emptyL
        };
        return inner(liner.tail)(emptyL);
    };
    return inner(l)({ kind: "empty" });
};
console.log(printList(rev((0, exports.List)([5, 4, 3, 2, 1]))));
const append = (l1) => (l2) => {
    const appender = (list) => {
        if (list.kind == "empty")
            return l2;
        if (list.tail.kind == "empty")
            return { ...list, tail: l2 };
        return { ...list, tail: appender(list.tail) };
    };
    return appender(l1);
};
console.log(printList(append((0, exports.List)([1, 2, 3, 4, 5]))((0, exports.List)([6, 7, 8, 9, 0]))));
const nth = (n) => (l) => {
    const getter = (i) => (list) => {
        if (list.kind == "empty")
            return { kind: "none" };
        if (i == n)
            return { kind: "some", value: list.head };
        return getter(i + 1n)(list.tail);
    };
    return getter(0n)(l);
};
console.log(nth(5n)((0, exports.List)([5, 4, 3, 2, 1, 2])));
console.log(nth(7n)((0, exports.List)([5, 4, 3, 2, 1, 2])));
const palindrome = (l) => {
    const checker = (curr) => (reved) => {
        if (curr.kind == "empty" && reved.kind == "empty") {
            return true;
        }
        if (curr.kind == "empty") {
            return false;
        }
        if (reved.kind == "empty") {
            return false;
        }
        if (curr.head == reved.head) {
            return checker(curr.tail)(reved.tail);
        }
        return false;
    };
    return checker(l)(rev(l));
};
console.log(palindrome((0, exports.List)([5, 4, 5])));
console.log(palindrome((0, exports.List)([6, 5, 3])));
const Compress = (l) => {
    const inner = (ler) => (last) => {
        if (ler.kind == "empty") {
            return ler;
        }
        if (ler.head == last) {
            return inner(ler.tail)(last);
        }
        return {
            kind: "list",
            head: ler.head,
            tail: inner(ler.tail)(ler.head)
        };
    };
    return inner(l)(undefined);
};
console.log(printList(Compress((0, exports.List)([5, 5, 4, 4, 3, 3, 2, 2, 2, 1]))));
