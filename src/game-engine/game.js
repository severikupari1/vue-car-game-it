var rpm, speed, gear, height, crashed, location, ticks;

function reset() {
  rpm = 100;
  speed = 0;
  gear = 0;
  crashed = false;
  ticks = 0;
  location = 0;
}

function getRpm() {
  return Math.floor(rpm);
}

function getGear() {
  return gear;
}

function getSpeed() {
  return speed;
}

function getCrashed() {
  return crashed;
}

function getHeight() {
  return height / 10;
}

function getLocation() {
  return (location);
}

function isFinished() {
  return location >= 8000 || crashed;
}

function getTicks() {
  return ticks;
}

function executeCode(code, rpm, gear) {
  "use strict";

  var newcode = "(" + code + ")(" + gear + "," + rpm + "," + changeGear + ")";
  var coderes = 0;

  try {
    coderes = parseInt(eval(newcode));
  } catch (err) {
    return -2;
  }

  if (isNaN(coderes)) {
    return -2;
  }
  if (coderes < 0 || coderes > 6){
    return -3
  }

  return coderes;
}

let ticksToChangeGear = -1;
const changeGear = (targetGear, currentRpm) => {
  if (currentRpm > 7000) {
    ticksToChangeGear = 10
  } else if (currentRpm > 4000) {
    ticksToChangeGear = 4
  } else {
    ticksToChangeGear = 0
  }
  gear = targetGear;
}

const gears = [0, 0.4, 0.7, 1.0, 1.3, 1.5, 1.68]
const transmitionRatio = 0.17;

let delta = 0.1;

const kmh2ms = (speed) => {	// Km/h to m/s
  return speed / 3.6;
}

function isChangingGears() {
  return ticksToChangeGear <= 0;
}
let
  cx = 0.28,
  rpmMax = 8000,
  torqueMin = 20, // in m.kg
  torqueMax = 45, // in m.kg
  torque = 0;
let torqueByRpm = function(rpm) {
  return torqueMin + (rpm / rpmMax) * (torqueMax - torqueMin);
};

function calculateSpeed(torqueValueOnAcceleration) {
  if (isChangingGears() && rpm < rpmMax) {	// Gas!
    torque = torqueValueOnAcceleration;
  } else {
    torque = -(rpm * rpm / 1000000);
  }

  const overallRatio = transmitionRatio * gears[gear];
  const wheelTorque = torque / overallRatio;


  const acceleration = 20 * wheelTorque / (0.5 * 1000 / 2);
  const resistance = 0.5 * 1.2 * cx * kmh2ms(speed) ^ 2;

  const newSpeed = (acceleration - resistance) * delta;
  return newSpeed;
}

const runSimulationLoop = torqueFunc => usercode => {

  const targetGear = executeCode(usercode, rpm, gear);

  if (targetGear < 1 || targetGear > 6){
    return targetGear
  }

  if (gear !== targetGear) {
    changeGear(targetGear, rpm)
  }

  if (ticksToChangeGear >= 1) {
    ticksToChangeGear -= 1;
  }

  const newSpeed = calculateSpeed(torqueFunc(rpm));

  speed += newSpeed
  rpm = speed / (60 * transmitionRatio * gears[gear] * (Math.PI * 0.5 / 1000));

  location += kmh2ms( speed );
  if(rpm > 8100){
    crashed = true;
    return -1
  }
  if (location >= 80000) {
    location = 80000;
    gear = 0;
    console.log({speed, location, gear})
    if( speed > 140){
      return 1
    }
    return 0;
  }
  return 0; // Something went wrong with parsing code
}

const game = {
  reset: reset,
  getRpm: getRpm,
  getGear: getGear,
  getSpeed: getSpeed,
  isChangingGears: () => ticksToChangeGear > 0,
  getHeight: getHeight,
  getCrashed: getCrashed,
  isFinished: isFinished,
  getLocation: getLocation,
  getTicks: getTicks,
  run: runSimulationLoop(torqueByRpm),
}
export default {
  ...game,
  initialize: code => {
    const number = executeCode(code, 0,0);
    switch (number) {
      case 4:
        return {...game,
          run: runSimulationLoop( () => 50)
        };
      case 1:
      case 2:
      case 3:
      case 5:
      case 6:
        return {...game};
      default:
        return number;
    }
  }

};
