const Random = (min: number) => (max : number) : number => Math.floor(Math.random() * (max - min + 1) + min) 

interface Point2D {
    readonly Position : [number, number]
    GetX: (this: Point2D) => number
    GetY: (this: Point2D) => number
    Distance: (this: Point2D, that: Point2D) => number
}

const CreateRandomPoint = (min: number) => (max: number) : Point2D => ({
    Position: [Random(min)(max), Random(min)(max)],
    GetX: function(this: Point2D) : number {
        return this.Position[0]
    },
    GetY: function(this: Point2D) : number {
        return this.Position[1]
    },
    Distance: function(this: Point2D, that: Point2D): number {
        return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2))
    }
})

const CreateFixedPoint = (x: number) => (y: number): Point2D => ({
    Position: [x, y],
    GetX: function(this: Point2D) : number {
        return this.Position[0]
    },
    GetY: function(this: Point2D) : number {
        return this.Position[1]
    },
    Distance: function(this: Point2D, that: Point2D): number {
        return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2))
    }
})

console.log(CreateFixedPoint(4)(5).GetX())
console.log(CreateFixedPoint(4)(5).Distance(CreateFixedPoint(5)(4)))

interface Blobber {
    Position: Point2D
    Speed: number
    Move: (this: Blobber) => void
}

const CreateBlob = () : Blobber => ({
    Position: CreateRandomPoint(-50)(50),
    Speed: Random(0)(5),
    Move: function (this: Blobber) : void{
        switch(Random(0)(3)){
            case 0:
                console.log("up")
                this.Position.Position[1] += this.Speed
                break
            case 1:
                console.log("right")
                this.Position.Position[0] += this.Speed
                break
            case 2:
                console.log("down")
                this.Position.Position[1] -= this.Speed
                break
            case 3:
                console.log("left")
                this.Position.Position[0] -= this.Speed
                break
        }
    }
})

