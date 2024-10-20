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

const rev = <T>(l: List<T>) : List<T> => {
  if (l.kind == "empty" || l.tail.kind == "empty"){
    return l
  }
  const revHead = rev(l.tail)
  l.tail.tail = l
  l.tail = {kind: "empty"}
  return revHead
}

console.log(rev(List([5, 4, 3, 2, 1])))