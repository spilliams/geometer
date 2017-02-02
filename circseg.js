"use strict";

var segmentStruct = function() {
  return {
    radius: undefined,
    chord: undefined,
    angle: undefined,
    arc: undefined,
    tangent: undefined,
    sagitta: undefined
  };
}

// -- Math Helpers --------------------------------------------------------

var deg2rad = function(deg) {
  return (Math.PI / 180.0) * deg;
};
var rad2deg = function(rad) {
  return (180.0 / Math.PI) * rad;
};

// -- Data Validation -----------------------------------------------------

var isSolved = function(segment) {
  if (typeof segment.error != "undefined") return true;
  for (var att in segment) {
    if (typeof segment[att] == "undefined") return false;
  }
  return true;
};

// -- Solvers -------------------------------------------------------------

var solveRadius = function(segment) {
  if (typeof segment.radius != "undefined") return segment;

  // from angle and chord
  if (typeof segment.angle != "undefined" && typeof segment.chord != "undefined") {
    segment.radius = segment.chord / (2 * Math.sin(deg2rad(segment.alpha / 2.0)));
  }

  // from chord and tangent
  if (typeof segment.chord != "undefined" && typeof segment.tangent != "undefined") {
    
  }

  return segment;
};
var solveChord = function(segment) {
  if (typeof segment.chord != "undefined") return segment;

  // from radius and angle
  if (typeof segment.radius != "undefined" && typeof segment.angle != "undefined") {
    segment.chord = 2 * segment.radius * Math.sin(deg2rad(segment.angle / 2.0));
  }

  return segment;
};
var solveAngle = function(segment) {
  if (typeof segment.angle != "undefined") return segment;

  // from radius and chord
  if (typeof segment.radius != "undefined" && typeof segment.chord != "undefined") {
    segment.angle = 2 * rad2deg(Math.asin(segment.chord / (2.0 * segment.radius)));
  }

  return segment;
};
var solveArc = function(segment) {
  if (typeof segment.arc != "undefined") return segment;

  // from angle and radius
  if (typeof segment.radius != "undefined" && typeof segment.angle != "undefined") {
    var circumference = Math.PI * 2 * segment.radius;
    segment.arc = (segment.angle / 360.0) * circumference;
  }
  
  return segment;
};
var solveTangent = function(segment) {
  if (typeof segment.tangent != "undefined") return segment;

  var alternateSegment = segmentStruct();

  // from radius and angle
  if (typeof segment.angle != "undefined" && typeof segment.radius != "undefined") {
    alternateSegment.angle = (360 - segment.angle) / 2.0;
    alternateSegment.radius = segment.radius;
    alternateSegment = solveChord(alternateSegment);
    // a right triangle of half-chord (short) and alternate-chord (hyp)
    // we are trying to solve the angle between hyp and long (this is equivalent to half the desired tangent angle)
    segment.tangent = 2 * rad2deg(Math.asin(segment.chord / (2.0 * alternateSegment.chord)));
  }

  return segment;
};
var solveSagitta = function(segment) {
  if (typeof segment.sagitta != "undefined") return segment;

  // from radius and chord
  if (typeof segment.radius != "undefined" && typeof segment.chord != "undefined") {
    // a right triangle of radius (hyp), and half chord (side)
    // invoke Pythagoras!
    var side = segment.chord / 2.0;
    var third = Math.sqrt((segment.radius * segment.radius) - (side * side));
    segment.sagitta = segment.radius - third;
  }

  return segment;
};

module.exports = {
  struct: function() {
    return segmentStruct();
  },
  solve: function(segment) {
    var it = 0;
    while (!isSolved(segment)) {
      segment = solveRadius(segment);
      segment = solveChord(segment);
      segment = solveAngle(segment);
      segment = solveArc(segment);
      segment = solveTangent(segment);
      segment = solveSagitta(segment);
      it++;
    }
    console.log("solved in "+it+" iteration"+(it > 1 ? "s":""));
    return segment;
  }
};
