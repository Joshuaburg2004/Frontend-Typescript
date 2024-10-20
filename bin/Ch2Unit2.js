"use strict";
// const Random = (min: number) => (max : number) : number => Math.floor(Math.random() * (max - min + 1) + min) 
// interface Point2D {
//     readonly Position : [number, number]
//     GetX: (this: Point2D) => number
//     GetY: (this: Point2D) => number
//     Distance: (this: Point2D, that: Point2D) => number
// }
// const CreateRandomPoint = (min: number) => (max: number) : Point2D => ({
//     Position: [Random(min)(max), Random(min)(max)],
//     GetX: function(this: Point2D) : number {
//         return this.Position[0]
//     },
//     GetY: function(this: Point2D) : number {
//         return this.Position[1]
//     },
//     Distance: function(this: Point2D, that: Point2D): number {
//         return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2))
//     }
// })
// const CreateFixedPoint = (x: number) => (y: number): Point2D => ({
//     Position: [x, y],
//     GetX: function(this: Point2D) : number {
//         return this.Position[0]
//     },
//     GetY: function(this: Point2D) : number {
//         return this.Position[1]
//     },
//     Distance: function(this: Point2D, that: Point2D): number {
//         return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2))
//     }
// })
// console.log(CreateFixedPoint(4)(5).GetX())
// console.log(CreateFixedPoint(4)(5).Distance(CreateFixedPoint(5)(4)))
// interface Blobber {
//     Position: Point2D
//     Speed: number
//     Move: (this: Blobber) => void
// }
// const CreateBlob = () : Blobber => ({
//     Position: CreateRandomPoint(-50)(50),
//     Speed: Random(0)(5),
//     Move: function (this: Blobber) : void{
//         switch(Random(0)(3)){
//             case 0:
//                 this.Position.Position[1] += this.Speed
//                 if(this.Position.Position[1] > 50)
//                     this.Position.Position[1] = 50
//                 break
//             case 1:
//                 this.Position.Position[0] += this.Speed
//                 if(this.Position.Position[0] > 50)
//                     this.Position.Position[0] = 50
//                 break
//             case 2:
//                 this.Position.Position[1] -= this.Speed
//                 if(this.Position.Position[1] < -50)
//                     this.Position.Position[1] = -50
//                 break
//             case 3:
//                 this.Position.Position[0] -= this.Speed
//                 if(this.Position.Position[0] < -50)
//                     this.Position.Position[0] = -50
//                 break
//         }
//     }
// })
// interface World {
//     Blob1: Blobber
//     Blob2: Blobber
//     Ticks: number
//     Run: (this: World) => void
// }
// const CreateWorld = (ticks: number) : World => ({
//     Blob1: CreateBlob(),
//     Blob2: CreateBlob(),
//     Ticks: ticks,
//     Run: function(this: World) : void{
//         console.log(`Blob 1 is in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`)
//         console.log(`Blob 2 is in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`)
//         const runner = (tick: number) : void => {
//             if(tick < this.Ticks){
//                 this.Blob1.Move()
//                 this.Blob2.Move()
//                 console.log(`Blob 1 is now in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`)
//                 console.log(`Blob 2 is now in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`)
//                 runner(tick + 1)
//             }
//             else {console.log(`Blob 1 finished in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`)
//             console.log(`Blob 2 finished in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`)}
//         }
//         runner(0)
//     }
// })
// CreateWorld(5).Run()
