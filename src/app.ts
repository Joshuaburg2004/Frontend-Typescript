type List<T> = { 
kind: "empty" 
}
| { 
kind: "list",
head: T,
tail: List<T>
}


type Option<T> = {
  kind : "none"
} | {
  kind: "some"
  value: T
}

type BasicFun<a, b> = (_:a) => b
type Fun<a, b> = BasicFun<a,b> & {
    then: <c>(g:BasicFun<b, c>) => Fun<a, c>
}
const Fun = <a, b>(f:BasicFun<a,b>) : Fun<a, b> => 
  Object.assign(
      f, 
      {
          then:function<c>(this:Fun<a,b>, g:BasicFun<b,c>): Fun<a,c> {
              return Fun(a => g(this(a)))
          }
      }
  )



const prettyprintList = <T>(l: List<T>) =>{
  if(l.kind == "empty"){console.log(""); return}
  else{
    process.stdout.write(String(l.head))
    prettyprintList(l.tail)
  }
}

export const List = <T>(array : T[]) : List<T> => {
let x : List<T> = { kind : "empty" }
for (let i = array.length - 1; i >= 0; i--) {
    x = {
    kind: "list",
    head: array[i],
    tail: x
    }
}
return x
}

const last = <T>(l: List<T>) : Option<T> => {
    if(l.kind == "empty"){ return {kind: "none"}}
    if(l.tail.kind == "empty") return {kind: "some", value: l.head}
    return last(l.tail)
}

console.log(last(List([5, 4, 3, 2, 1])))
console.log(last(List([1, 2, 3, 4, 5])))

const rev = <T>(l: List<T>): List<T> => {
  const inner = (liner: List<T>) => (emptyL: List<T>): List<T> => {
    if(liner.kind == "empty"){
        return emptyL
    }
    emptyL = {
      kind: "list",
      head: liner.head,
      tail: emptyL
    }
    return inner(liner.tail)(emptyL)
  }
  return inner(l)({kind: "empty"})
}

prettyprintList(rev(List([5, 4, 3, 2, 1])))

const append = <T>(l1: List<T>) => (l2: List<T>) : List<T> => {
  const appender = (list: List<T>) : List<T> => {
    if(list.kind == "empty")
      return l2
    if(list.tail.kind == "empty")
      return {...list, tail: l2}
    return {...list, tail: appender(list.tail)}
  }
  return appender(l1)
}

prettyprintList(append(List([1, 2, 3, 4, 5]))(List([6, 7, 8, 9, 0])))

const nth = <T>(n: bigint) => (l: List<T>): Option<T> => {
  const getter = (i: bigint) => (list: List<T>) : Option<T> => {
    if(list.kind == "empty") return {kind: "none"}
    if(i == n) return {kind: "some", value: list.head}
    return getter(i + 1n)(list.tail)
  }
  return getter(0n)(l)
} 

console.log(nth(5n)(List([5, 4, 3, 2, 1, 2])))
console.log(nth(7n)(List([5, 4, 3, 2, 1, 2])))

const palindrome = <T>(l: List<T>) : boolean => {
  const checker = (curr: List<T>) => (reved: List<T>) : boolean => {
    if(curr.kind == "empty" && reved.kind == "empty"){
      return true
    }
    if(curr.kind == "empty"){
      return false
    }
    if(reved.kind == "empty"){
      return false
    }
    if(curr.head == reved.head){
      return checker(curr.tail)(reved.tail)
    }
    return false
  }
  return checker(l)(rev(l))
}

console.log(palindrome(List([5, 4, 5])))
console.log(palindrome(List([6, 5, 3])))

const compress = <T> (l: List<T>): List<T> => {
  const inner = <T> (ler: List<T>) => (last: T | undefined): List<T> => {
    if(ler.kind == "empty"){ return ler; }
    if(ler.head == last){ return inner(ler.tail)(last)}
    return {
      kind: "list",
      head: ler.head,
      tail: inner(ler.tail)(ler.head)
    }
  }
  return inner(l)(undefined)
}

prettyprintList(compress(List([5, 5, 4, 4, 3, 3, 2, 2, 2, 1])))


const caesarCypher = (l: List<string>) => (shift: bigint) : List<string> =>
  {
    const caesar = (list: List<string>) : List<string> => {
      if(list.kind == "list" && list.head.charCodeAt(0) + Number(shift) <= 122){
        return ({
          kind: "list",
          head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift)),
          tail: caesar(list.tail)
        })
      }
      if(list.kind == "list" && list.head.charCodeAt(0) + Number(shift) >= 122){
        return ({
          kind: "list",
          head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift) + 96 - 122),
          tail: caesar(list.tail)
        }) 
      }
      
      return {kind: "empty"}
    }
    return caesar(l)
}

const caesarCypherWithUpper = (l: List<string>) => (shift: bigint) : List<string> =>
  {
    const caesar = (list: List<string>) : List<string> => {
      if(list.kind == "list" && list.head.charCodeAt(0) + Number(shift) <= 122){
        return ({
          kind: "list",
          head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift)),
          tail: caesar(list.tail)
        })
      }
      if(list.kind == "list" && list.head.charCodeAt(0) + Number(shift) >= 122){
        return ({
          kind: "list",
          head: String.fromCharCode(list.head.charCodeAt(0) + Number(shift) + 65 - 122),
          tail: caesar(list.tail)
        }) 
      }
      
      return {kind: "empty"}
    }
    return caesar(l)
}

prettyprintList(caesarCypherWithUpper(List(["h", "l", "y"]))(1n))

const splitAt = <T>(i: bigint) => (l: List<T>): [List<T>, List<T>] => {
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
  const [left, right] = splitAt<T>(i - 1n)(l.tail);
  return [
    {
      kind: "list",
      head: l.head,
      tail: left,
    },
    right,
  ];
};

prettyprintList(splitAt(2n)(List([5, 4, 3, 2, 1, 1, 2, 3,4 ,5 , 6, 7,8]))[0])
prettyprintList(splitAt(2n)(List([5, 4, 3, 2, 1, 1, 2, 3,4 ,5 , 6, 7,8]))[1])

const merge = <T>(l1 : List<T>) => (l2 : List<T>) : List<T> => {
  if(l1.kind == "empty"){
    return l2
  }
  return {
    kind: "list",
    head: l1.head,
    tail: merge(l1.tail)(l2)
  }
}

prettyprintList(merge(List([1, 2, 3, 4, 5]))(List([6, 7, 8, 9, 0])))
prettyprintList(merge(List([1, 2, 3, 4, 5]))({kind: "empty"}))
prettyprintList(merge({kind: "empty"})(List([1,2 ,3,4,5,6])))

const mergeSort = <T>(l: List<T>): List<T> => {
  const split = <T>(list: List<T>): [List<T>, List<T>] => {
    const splitHelper = (l: List<T>) => (i: bigint): [List<T>, List<T>] => {
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
  
    const length = (l: List<T>): bigint => {
      if (l.kind === "empty") {
        return 0n;
      }
      return 1n + length(l.tail);
    };
  
    const len = length(list);
    return splitHelper(list)(len / 2n);
  };
  const compare = (a: T, b: T) => a < b;
  if (l.kind === "empty" || l.tail.kind === "empty") {
    return l;
  }

  const merger = <T>(left: List<T>) => (right: List<T>) => (compare: (a: T, b: T) => boolean): List<T> => {
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
    } else {
      return {
        kind: "list",
        head: right.head,
        tail: merger(left)(right.tail)(compare),
      };
    }
  };
  const [left, right] = split(l);
  return merger(mergeSort(left))(mergeSort(right))(compare);
}

prettyprintList(mergeSort(List([5, 2, 3, 9, 3])))

type Atomic = {Value: number, kind: "atomic"}
type Expr = (
  Atomic | 
  {Add: [Expr, Expr], kind: "add"} |
  {Sub: [Expr, Expr], kind: "sub"} |
  {Mul: [Expr, Expr], kind: "mul"} |
  {Div: [Expr, Expr], kind: "div"} | 
  {Mod: [Expr, Expr], kind: "mod"}
)
const Eval = (e: Expr): Expr => {
  switch(e.kind){
    case "atomic": return e
    case "add":
      const left = Eval(e.Add[0])
      const right = Eval(e.Add[1])
      if(left.kind == "atomic" && right.kind == "atomic"){
        return {Value: left.Value + right.Value, kind: "atomic"}
      }
      break
    case "sub":
      const left1 = Eval(e.Sub[0])
      const right1 = Eval(e.Sub[1])
      if(left1.kind == "atomic" && right1.kind == "atomic"){
        return {Value: left1.Value - right1.Value, kind: "atomic"}
      }
      break
    case "mul":
      const left2 = Eval(e.Mul[0])
      const right2 = Eval(e.Mul[1])
      if(left2.kind == "atomic" && right2.kind == "atomic"){
        return {Value: left2.Value * right2.Value, kind: "atomic"}
      }
      break
    case "div":
      const left3 = Eval(e.Div[0])
      const right3 = Eval(e.Div[1])
      if(left3.kind == "atomic" && right3.kind == "atomic"){
        return {Value: left3.Value / right3.Value, kind: "atomic"}
      }
      break
    case "mod":
      const left4 = Eval(e.Mod[0])
      const right4 = Eval(e.Mod[1])
      if(left4.kind == "atomic" && right4.kind == "atomic"){
        return {Value: left4.Value % right4.Value, kind: "atomic"}
      }
      break
    default:
      return e
  }
  return e
}

const expr: Expr = {Add: [{Add: [{Value: 6, kind: "atomic"}, {Value: 4, kind: "atomic"}], kind: "add"}, {Value: 5, kind: "atomic"}], kind: "add"}
console.log(Eval(expr))
function Reduce<T, R>(fxy:(acc:R, curr:T)=>R, seed:R){
  return function(arr:T[]):R{
    if(arr.length<=0) throw new Error("Custom error message")
    let result = seed
    for(let i = 0;i<arr.length;i++){
      result = fxy(result, arr[i])
    }
    return result
  }
}

const reduce = <T, R>(fxy: (acc:R) => (curr:T) => R) => (seed: R) => {
  return (arr: T[]) : R => {
    const doer = (n: number) => (s: R): R => {
      if(n <= arr.length - 1){ return fxy(doer(n + 1)(s))(arr[n])}
      else{
        return seed
      }
    }
    return doer(0)(seed)
  }
}

console.log(Reduce(((acc: number, curr: number): number => acc * curr), 1)([5,6,7,8,9]))
console.log(reduce(((acc: number) => (curr: number): number => acc * curr))(1)([5,6,7,8,9]))

const addArray = (arr: number[]) : number => {
  return reduce((acc: number) => (curr: number): number => acc + curr)(0)(arr)
}

const subtractArray = (arr: number[]) : number => {
  return reduce((acc: number) => (curr: number): number => acc - curr)(arr[0])(arr.splice(1))
}

const productArray = (arr: number[]) : number => {
  return reduce((acc: number) => (curr: number): number => acc * curr)(1)(arr)
}

console.log(addArray([5, 4, 3, 2, 1]))
console.log(subtractArray([10, 5, 2, 1]))
console.log(productArray([5, 4, 3, 2, 1]))
