let list = [
  05, 32, 12, 05, 01, 18, 14, 05, 04, 01, 12, 15, 20, 32, 09, 14, 32, 20, 08,
  09, 19, 32, 03, 12, 01, 19,
];

let res = [];

for (let i = 0; i < list.length; i++) {
  res.push(Math.pow(list[i], 7) % 33, 10);
}

console.log(res);
