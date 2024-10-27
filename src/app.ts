type List<T> = { 
kind: "empty" 
}
| { 
kind: "list",
head: T,
tail: List<T>
}

export type ListElement<T> = {
  kind: "element",
  value: T
} | {
  kind: "nested list",
  nestedList: List<ListElement<T>>
}

const printList = <T>(list: List<T>): string => {
  if(list.kind == "empty"){
    return ""
  }
  if(list.tail.kind == "empty"){
    return `${list.head}`
  }

  return `${list.head} ${printList(list.tail)}`
  
};

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

console.log(printList(rev(List([5, 4, 3, 2, 1]))))

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

console.log(printList(append(List([1, 2, 3, 4, 5]))(List([6, 7, 8, 9, 0]))))

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

const Compress = <T> (l: List<T>): List<T> => {
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

console.log(printList(Compress(List([5, 5, 4, 4, 3, 3, 2, 2, 2, 1]))))