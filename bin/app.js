"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const Fun = (f) => Object.assign(f, {
    then: function (g) {
        return Fun(a => g(this(a)));
    }
});
const prettyprintList = (l) => {
    if (l.kind == "empty") {
        console.log("");
        return;
    }
    else {
        process.stdout.write(String(l.head));
        prettyprintList(l.tail);
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
prettyprintList(rev((0, exports.List)([5, 4, 3, 2, 1])));
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
prettyprintList(append((0, exports.List)([1, 2, 3, 4, 5]))((0, exports.List)([6, 7, 8, 9, 0])));
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
prettyprintList(compress((0, exports.List)([5, 5, 4, 4, 3, 3, 2, 2, 2, 1])));
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
prettyprintList(caesarCypherWithUpper((0, exports.List)(["h", "l", "y"]))(1n));
const splitAt = (i) => (l) => {
    if (i < 0n || l.kind === "empty") {
        return [{ kind: "empty" }, l];
    }
    if (i === 0n) {
        return [
            {
                kind: "list",
                head: l.head,
                tail: { kind: "empty" },
            },
            l.tail,
        ];
    }
    const [left, right] = splitAt(i - 1n)(l.tail);
    return [
        {
            kind: "list",
            head: l.head,
            tail: left,
        },
        right,
    ];
};
prettyprintList(splitAt(2n)((0, exports.List)([5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]))[0]);
prettyprintList(splitAt(2n)((0, exports.List)([5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]))[1]);
const merge = (l1) => (l2) => {
    if (l1.kind == "empty") {
        return l2;
    }
    return {
        kind: "list",
        head: l1.head,
        tail: merge(l1.tail)(l2)
    };
};
prettyprintList(merge((0, exports.List)([1, 2, 3, 4, 5]))((0, exports.List)([6, 7, 8, 9, 0])));
prettyprintList(merge((0, exports.List)([1, 2, 3, 4, 5]))({ kind: "empty" }));
prettyprintList(merge({ kind: "empty" })((0, exports.List)([1, 2, 3, 4, 5, 6])));
const mergeSort = (l) => {
    const split = (list) => {
        const splitHelper = (l) => (i) => {
            if (i <= 0n || l.kind === "empty") {
                return [{ kind: "empty" }, l];
            }
            const [left, right] = splitHelper(l.tail)(i - 1n);
            return [
                {
                    kind: "list",
                    head: l.head,
                    tail: left,
                },
                right,
            ];
        };
        const length = (l) => {
            if (l.kind === "empty") {
                return 0n;
            }
            return 1n + length(l.tail);
        };
        const len = length(list);
        return splitHelper(list)(len / 2n);
    };
    const compare = (a, b) => a < b;
    if (l.kind === "empty" || l.tail.kind === "empty") {
        return l;
    }
    const merger = (left) => (right) => (compare) => {
        if (left.kind === "empty") {
            return right;
        }
        if (right.kind === "empty") {
            return left;
        }
        if (compare(left.head, right.head)) {
            return {
                kind: "list",
                head: left.head,
                tail: merger(left.tail)(right)(compare),
            };
        }
        else {
            return {
                kind: "list",
                head: right.head,
                tail: merger(left)(right.tail)(compare),
            };
        }
    };
    const [left, right] = split(l);
    return merger(mergeSort(left))(mergeSort(right))(compare);
};
prettyprintList(mergeSort((0, exports.List)([5, 2, 3, 9, 3])));
const Eval = (e) => {
    switch (e.kind) {
        case "atomic": return e;
        case "add":
            const left = Eval(e.Add[0]);
            const right = Eval(e.Add[1]);
            if (left.kind == "atomic" && right.kind == "atomic") {
                return { Value: left.Value + right.Value, kind: "atomic" };
            }
            break;
        case "sub":
            const left1 = Eval(e.Sub[0]);
            const right1 = Eval(e.Sub[1]);
            if (left1.kind == "atomic" && right1.kind == "atomic") {
                return { Value: left1.Value - right1.Value, kind: "atomic" };
            }
            break;
        case "mul":
            const left2 = Eval(e.Mul[0]);
            const right2 = Eval(e.Mul[1]);
            if (left2.kind == "atomic" && right2.kind == "atomic") {
                return { Value: left2.Value * right2.Value, kind: "atomic" };
            }
            break;
        case "div":
            const left3 = Eval(e.Div[0]);
            const right3 = Eval(e.Div[1]);
            if (left3.kind == "atomic" && right3.kind == "atomic") {
                return { Value: left3.Value / right3.Value, kind: "atomic" };
            }
            break;
        case "mod":
            const left4 = Eval(e.Mod[0]);
            const right4 = Eval(e.Mod[1]);
            if (left4.kind == "atomic" && right4.kind == "atomic") {
                return { Value: left4.Value % right4.Value, kind: "atomic" };
            }
            break;
        default:
            return e;
    }
    return e;
};
const expr = { Add: [{ Add: [{ Value: 6, kind: "atomic" }, { Value: 4, kind: "atomic" }], kind: "add" }, { Value: 5, kind: "atomic" }], kind: "add" };
console.log(Eval(expr));
function Reduce(fxy, seed) {
    return function (arr) {
        if (arr.length <= 0)
            throw new Error("Custom error message");
        let result = seed;
        for (let i = 0; i < arr.length; i++) {
            result = fxy(result, arr[i]);
        }
        return result;
    };
}
const reduce = (fxy) => (seed) => {
    return (arr) => {
        const doer = (n) => (s) => {
            if (n <= arr.length - 1) {
                return fxy(doer(n + 1)(s))(arr[n]);
            }
            else {
                return seed;
            }
        };
        return doer(0)(seed);
    };
};
console.log(Reduce(((acc, curr) => acc * curr), 1)([5, 6, 7, 8, 9]));
console.log(reduce(((acc) => (curr) => acc * curr))(1)([5, 6, 7, 8, 9]));
const addArray = (arr) => {
    return reduce((acc) => (curr) => acc + curr)(0)(arr);
};
const subtractArray = (arr) => {
    return reduce((acc) => (curr) => acc - curr)(arr[0])(arr.splice(1));
};
const productArray = (arr) => {
    return reduce((acc) => (curr) => acc * curr)(1)(arr);
};
console.log(addArray([5, 4, 3, 2, 1]));
console.log(subtractArray([10, 5, 2, 1]));
console.log(productArray([5, 4, 3, 2, 1]));
