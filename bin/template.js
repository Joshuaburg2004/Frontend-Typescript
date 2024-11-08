"use strict";
// old teams for adv prog
var Q1;
(function (Q1) {
    /*
    ### Exercise 1: (2 points for a completely correct implementation / 0.5 points for just one subtask)
    Create a TypeScript function named `toZero` that accepts an integer number,\
    the input value might be positive, negative or zero.

    - If the input is zero, the function should return a string containing only the character `0`.
    - (subtask 1) If the input is negative, the function should return a string listing all numbers from the input up to zero included.
    - (subtask 2) If the input is positive, the function should return a string listing all numbers from zero to the input included.

    Signature:
    ```ts
    const toZero : (n : number) => string = n =>
    ```
    */
    const toZero = n => {
        if (n == 0)
            return "0";
        if (n < 0)
            return `${n}, ${toZero(n + 1)}`;
        return `${toZero(n - 1)}, ${n}`;
    };
    //Tests:
    console.log(toZero(5)); // '0, 1, 2, 3, 4, 5'
    console.log(toZero(-3)); // '-3, -2, -1, 0'
    console.log(toZero(0)); // '0'
    console.log();
})(Q1 || (Q1 = {}));
var Q2;
(function (Q2) {
    const newPoint3D = (maxX) => (maxY) => (maxZ) => ({
        Position: [Math.random() * maxX, Math.random() * maxY, Math.random() * maxZ]
    });
    //ToDo Q2...
    const move = (p1) => (x) => (y) => (z) => ({
        Position: [p1.Position[0] + x, p1.Position[1] + y, p1.Position[2] + z]
    });
    const distance = (point) => (p1) => {
        return Math.sqrt(Math.pow(point.Position[0] - p1.Position[0], 2) + Math.pow(point.Position[1] - p1.Position[1], 2) + Math.pow(point.Position[2] - p1.Position[2], 2));
    };
    // Use the test code after implementing the assignments
    const p1 = newPoint3D(3)(2)(9);
    const p2 = newPoint3D(3)(2)(9);
    console.log(`p1: ${JSON.stringify(p1)}`);
    console.log(`p2: ${JSON.stringify(p2)}`);
    const p1Moved = move(p1)(2)(-4)(-10);
    const distance_p1_p1Moved = distance(p1)(p1Moved);
    console.log(`p1Moved: ${JSON.stringify(p1Moved)}`);
    console.log(distance_p1_p1Moved);
})(Q2 || (Q2 = {}));
var Q3;
(function (Q3) {
    /*- b) Write a method `createTree` that accepts a number and recursively splits it into a tree structure, following these rules:
    - If the number can be split evenly into two equal parts, it creates only `one` branch with the split.
    - If the number cannot be split evenly into two parts, it creates two branches where `one` branch has the larger part (n / 2 - 0.5 + 1)
        and the `other` branch has the smaller part (n / 2 - 0.5) .
    - Continue splitting recursively until the number reaches `1`, it creates only `one` branch with value `1` and no sub-branches.\
    p1 method returns a record of type `Tree<number>`.\
    Immutability principle must be followed.\
    **HINT**: no need for an accumulator

    - Example `createTree(29)` should split 29 and create a `Tree<number>` as below (you are not required to draw it).
    ```ts
            29
        /   \
        /     \
        15       14
    /  \       |
    8    7      7
    |   / \    / \
    4  4   3  4   3
    |  |  / \ |  / \
    2  2  2 1 2  2  1
    |  |  |   |  |
    1  1  1   1  1
    ```
    */
    //ToDo Q3...
    const createTree = (i) => {
        if (i == 0 || i == 1) {
            return ({
                kind: "branch",
                value: i,
                one: { kind: "empty" },
                other: { kind: "empty" }
            });
        }
        if (i % 2 == 0) {
            return ({
                kind: "branch",
                value: i,
                one: createTree(i / 2),
                other: { kind: "empty" }
            });
        }
        return ({
            kind: "branch",
            value: i,
            one: createTree(i / 2 - 0.5 + 1),
            other: createTree(i / 2 - 0.5)
        });
    };
    //After having implemented function createTree, the following line can be used for testing:
    const node = createTree(29);
    console.log(JSON.stringify(node, (key, value) => key == 'kind' ||
        value.kind == "empty" ? undefined : value, 2));
    console.log();
})(Q3 || (Q3 = {}));
var Q4;
(function (Q4) {
    /*
    ### Exercise 4: (1 + 1 = 2 Points)
    Implement the **map** Function: Write a pure function `map` that takes a projection function as an argument.
    The function should return another function that takes a linked list as an argument,
    applies the projection function to each element in the linked list, and returns a new linked list containing the transformed values.\

    Signature:
    ```ts
    const map = <A, B>(projection: (value: A) => B) : (list: List<A>) => List<B> => list =>
    ```

    Implement the **filter** Function: Write a pure function `filter` that takes a predicate function as an argument.
    The function should return another function that takes a linked list as an argument
    and returns a new linked list containing only the elements that satisfy the predicate.\

    Signature:
    ```ts
    const filter = <A>(predicate: (value: A) => boolean) : (list: List<A>) => List<A> => list =>
    ```
    */
    const empty = () => ({ kind: "empty" });
    const full = (v) => l => ({ kind: "full", head: v, tail: l });
    const printList = (list) => list == undefined ? "UNDEFINED" :
        list.kind == "empty" ? "" :
            list.tail.kind == "empty" ?
                `(${list.head})` :
                `(${list.head}) ; ${printList(list.tail)}`;
    const map = (projection) => list => {
        //ToDo Q4 (map)...
        if (list.kind == "empty") {
            return empty();
        }
        return full(projection(list.head))(map(projection)(list.tail));
    };
    const filter = (predicate) => list => {
        empty(); //remove p1 line of code in order to complete the assignment
        //ToDo Q4 (filter)...
        if (list.kind == "empty") {
            return empty();
        }
        if (predicate(list.head)) {
            return full(list.head)(filter(predicate)(list.tail));
        }
        return filter(predicate)(list.tail);
    };
    //Tests:
    const numList = full(34)(full(45)(full(235)(full(124)(full(8)(full(71)(empty()))))));
    const listMapped_1 = map((_) => _ + 1)(numList);
    const listMapped_2 = map((_) => `[ ${_ * 2} ]`)(numList);
    const listMapped_3 = map((_) => _ % 2 == 0)(numList);
    const numListFiltered_1 = filter((_) => _ > 10)(numList);
    const numListFiltered_2 = filter((_) => _ % 2 == 0 && _ <= 120)(numList);
    const numListFiltered_3 = filter((_) => _ > 10 && _ % 2 != 0)(numList);
    console.log("\nInitial list:\n");
    console.log(printList(numList));
    console.log("\nMap:\n");
    console.log(printList(listMapped_1));
    console.log(printList(listMapped_2));
    console.log(printList(listMapped_3));
    console.log("\nFilter:\n");
    console.log(printList(numListFiltered_1));
    console.log(printList(numListFiltered_2));
    console.log(printList(numListFiltered_3));
    console.log();
})(Q4 || (Q4 = {}));
var Q5;
(function (Q5) {
    /*
    ### Exercise 5: (1 + 1 = 2 points)
    - a) Given the type signature defined as `BasicFun<A, B> = (arg: A) => B`.\
    Implement a curried function named `compose` that takes two functions, `f` of type `BasicFun<A, B>`\
    and `g` of type `BasicFun<B, C>`, as arguments, and returns a function of type `BasicFun<A, C>`.\
    Your `compose` function should return a new function that represents the composition of functions `f` and `g`.\
    The order of application is first f _then_ g.

    - b) Create the following basic transformer functions:
        - `Parser` (type: `BasicFun<string, number>`)
            A function that parses a string input into a number (here method `parseInt` is allowed/suggested).
        - `Doubler` (type: `BasicFun<number, number>`)
            A function that takes a number and doubles its value.
        - `PositiveChecker` (type: `BasicFun<number, boolean>`)
            A function that checks whether a given number is positive.
        
        - `composedFunction` (type: `BasicFun<string, boolean>`)
            which is a composition of Parser, Doubler and PositiveChecker in the given order.
            **HINT**: it might be necessary to explicitly indicate the involved types when calling
            the function `compose` (of point _a_)
    */
    //ToDo Q5...
    const compose = (f) => (g) => {
        return (arg) => g(f(arg));
    };
    const Parser = (arg) => {
        return parseInt(arg);
    };
    const Doubler = (arg) => {
        return 2 * arg;
    };
    const PositiveChecker = (arg) => {
        return arg >= 0;
    };
    const composedFunction = (arg) => {
        return compose(compose(Parser)(Doubler))(PositiveChecker)(arg);
    };
    //Template example composedFunction, 
    //following code can be uncommented after the function "composedFunction" is implemented: 
    const input = "5";
    const result = composedFunction(input);
    console.log(result); // Output: true (since (5 * 2) > 0)   
})(Q5 || (Q5 = {}));
