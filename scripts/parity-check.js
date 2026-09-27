#!/usr/bin/env node
"use strict";
const path = require("path");
const data = require(path.join(__dirname, "..", "data", "countries.json"));
const by = {};
for (const c of data.countries) by[c.iso3] = c;

function isReliablePli(c) {
  return !!c
    && Number.isFinite(c.pli_us) && c.pli_us >= 0.05
    && Number.isFinite(c.ppp) && c.ppp > 0
    && Number.isFinite(c.fx) && c.fx > 0;
}

function compute(home, dest, incomeLocal) {
  const reliable = isReliablePli(home) && isReliablePli(dest);
  let equiv = null, fxLocal = null, costPct = null;
  if (reliable && incomeLocal > 0) {
    const yourPpp = incomeLocal / home.ppp;
    equiv = yourPpp * dest.ppp;
    fxLocal = incomeLocal * (dest.fx / home.fx);
    costPct = (dest.pli_us / home.pli_us - 1) * 100;
  }
  const pliDisplay = reliable ? Math.round(dest.pli_us * 100) : null;
  return {
    equiv: equiv != null && Number.isFinite(equiv) ? Math.round(equiv) : null,
    fx: fxLocal != null && Number.isFinite(fxLocal) ? Math.round(fxLocal) : null,
    costPct: costPct != null && Number.isFinite(costPct) ? Math.round(costPct) : null,
    pli: pliDisplay,
  };
}

const home = by.IND, dest = by.BGD;
if (!home || !dest) {
  console.error("FAIL: IND or BGD missing");
  process.exit(1);
}
const actual = compute(home, dest, 800000);
const expected = { equiv: 1408973, fx: 1119073, costPct: 26, pli: 29 };
const ok =
  actual.equiv === expected.equiv &&
  actual.fx === expected.fx &&
  actual.costPct === expected.costPct &&
  actual.pli === expected.pli;
console.log("IND ₹800,000 net → BGD");
console.log(" expected:", expected);
console.log(" actual:  ", actual);
if (!ok) {
  console.error("FAIL: parity mismatch");
  process.exit(1);
}
console.log("PASS");
