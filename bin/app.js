"use strict";
const Random = (min) => (max) => Math.floor(Math.random() * (max - min + 1) + min);
const CreateRandomPoint = (min) => (max) => ({
    Position: [Random(min)(max), Random(min)(max)],
    GetX: function () {
        return this.Position[0];
    },
    GetY: function () {
        return this.Position[1];
    }
});
const CreateFixedPoint = (x) => (y) => ({
    Position: [x, y],
    GetX: function () {
        return this.Position[0];
    },
    GetY: function () {
        return this.Position[1];
    }
});
let point = CreateFixedPoint(4)(5);
console.log(point.GetX());
