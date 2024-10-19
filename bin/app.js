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
        return Math.sqrt(Math.floor(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2)));
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
        return Math.sqrt(Math.floor(Math.pow(this.GetX() - that.GetX(), 2) + Math.pow(this.GetY() - that.GetY(), 2)));
    }
});
console.log(CreateFixedPoint(4)(5).GetX());
console.log(CreateFixedPoint(4)(5).Distance(CreateFixedPoint(5)(4)));
