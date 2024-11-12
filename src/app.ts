namespace adder{
    type R = number | string
    const add = (a: R, b: R): R => {
        if(typeof a == typeof b && typeof b == 'number'){
            return Number(a) + Number(b)
        }
        if(typeof a == typeof b && typeof b == 'string'){
            return String(a) + String(b)
        }
        return ""
    }
}