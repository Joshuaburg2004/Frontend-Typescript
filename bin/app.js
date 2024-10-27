"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const Fun = (f) => Object.assign(f, {
    then: function (g) {
        return Fun(a => g(this(a)));
    }
});
const prettyprintList = (l, cont) => {
    if (l.kind == "empty") {
        return;
    }
    else {
        cont(l.head);
        prettyprintList(l.tail, cont);
    }
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
prettyprintList(rev((0, exports.List)([5, 4, 3, 2, 1])), console.log);
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
prettyprintList(append((0, exports.List)([1, 2, 3, 4, 5]))((0, exports.List)([6, 7, 8, 9, 0])), console.log);
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
const compress = (l) => {
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
prettyprintList(compress((0, exports.List)([5, 5, 4, 4, 3, 3, 2, 2, 2, 1])), console.log);
const caesarCypher = (l) => (shift) => {
    const caesar = (list) => {
        if (list.kind == "list" && list.head.charCodeAt(0) + Number(shift) <= 122) {
            return ({
                kind: "list",
                head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift)),
                tail: caesar(list.tail)
            });
        }
        if (list.kind == "list" && list.head.charCodeAt(0) + Number(shift) >= 122) {
            return ({
                kind: "list",
                head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift) + 96 - 122),
                tail: caesar(list.tail)
            });
        }
        return { kind: "empty" };
    };
    return caesar(l);
};
const caesarCypherWithUpper = (l) => (shift) => {
    const caesar = (list) => {
        if (list.kind == "list" && list.head.charCodeAt(0) + Number(shift) <= 122) {
            return ({
                kind: "list",
                head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift)),
                tail: caesar(list.tail)
            });
        }
        if (list.kind == "list" && list.head.charCodeAt(0) + Number(shift) >= 122) {
            return ({
                kind: "list",
                head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift) + 65 - 122),
                tail: caesar(list.tail)
            });
        }
        return { kind: "empty" };
    };
    return caesar(l);
};
console.log();
