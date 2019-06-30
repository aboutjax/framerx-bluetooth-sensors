import { setGlobal, useGlobal } from "reactn";
import * as React from "react";
import * as _ from "lodash";

let heartRateArrayInit = [];
let powerArrayInit = [];

// Initialise with dummy data
let numberOfData = _.range(50);

numberOfData.map(() => {
  heartRateArrayInit = [...heartRateArrayInit, _.random(90, 100)];
  powerArrayInit = [...powerArrayInit, _.random(50, 300)];
});

setGlobal({
  heartRateArray: heartRateArrayInit,
  powerArray: powerArrayInit,
  heartRateIsConnected: true,
  powerIsConnected: true
});

// setGlobal({
//   heartRateArray: [],
//   heartRateIsConnected: false,
//   powerIsConnected: false,
//   powerArray: []
// });
