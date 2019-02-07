function random(n) {
  return Math.random() * n;
}

function randomD(n) {
  return random(n) + 1;
}

function randomRolls(n, s) {
  const ret = new Array(n);
  for (let i = 0; i < n; i += 1) {
    ret[i] = randomD(s);
  }
  return ret;
}

module.exports.random = random;
module.exports.randomD = randomD;
module.exports.randomRolls = randomRolls;
