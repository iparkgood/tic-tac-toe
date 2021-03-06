const hashMap = "123456789".split("").reduce(function (obj, n, i) {
  const x = Math.floor(i / 3);
  const y = i % 3;
  obj[`cell-${n}`] = [x, y];
  return obj;
}, {});

/*
  {"cell-1": [0,0],
   "cell-2": [0, 1],
    ...
  }
  */
