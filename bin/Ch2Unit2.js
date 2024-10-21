"use strict";
const Random = (min) => (max) => Math.floor(Math.random() * (max - min + 1) + min);
const CreateRandomPoint = (min) => (max) => ({
    Position: [Random(min)(max), Random(min)(max)],
    GetX: function () {
        return this.Position[0];
    },
    GetY: function () {
        return this.Position[1];
    },
    Distance: function (that) {
        return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2));
    }
});
const CreateFixedPoint = (x) => (y) => ({
    Position: [x, y],
    GetX: function () {
        return this.Position[0];
    },
    GetY: function () {
        return this.Position[1];
    },
    Distance: function (that) {
        return Math.sqrt(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2));
    }
});
console.log(CreateFixedPoint(4)(5).GetX());
console.log(CreateFixedPoint(4)(5).Distance(CreateFixedPoint(5)(4)));
const CreateBlob = () => ({
    Position: CreateRandomPoint(-50)(50),
    Speed: Random(0)(5),
    Move: function () {
        switch (Random(0)(3)) {
            case 0:
                this.Position.Position[1] += this.Speed;
                if (this.Position.Position[1] > 50)
                    this.Position.Position[1] = 50;
                break;
            case 1:
                this.Position.Position[0] += this.Speed;
                if (this.Position.Position[0] > 50)
                    this.Position.Position[0] = 50;
                break;
            case 2:
                this.Position.Position[1] -= this.Speed;
                if (this.Position.Position[1] < -50)
                    this.Position.Position[1] = -50;
                break;
            case 3:
                this.Position.Position[0] -= this.Speed;
                if (this.Position.Position[0] < -50)
                    this.Position.Position[0] = -50;
                break;
        }
    }
});
const CreateWorld = (ticks) => ({
    Blob1: CreateBlob(),
    Blob2: CreateBlob(),
    Ticks: ticks,
    Run: function () {
        console.log(`Blob 1 is in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`);
        console.log(`Blob 2 is in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`);
        const runner = (tick) => {
            if (tick < this.Ticks) {
                this.Blob1.Move();
                this.Blob2.Move();
                console.log(`Blob 1 is now in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`);
                console.log(`Blob 2 is now in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`);
                runner(tick + 1);
            }
            else {
                console.log(`Blob 1 finished in position ${this.Blob1.Position.GetX()}, ${this.Blob1.Position.GetY()}`);
                console.log(`Blob 2 finished in position ${this.Blob2.Position.GetX()}, ${this.Blob2.Position.GetY()}`);
            }
        };
        runner(0);
    }
});
CreateWorld(5).Run();
