********
Geometer
********

A node package providing some useful geometry.

Currently has a module providing some `circular segment <https://en.wikipedia.org/wiki/Circular_segment>`_ helpers.

circseg.js
==========

Definitions
-----------

terms:

R
	radius of the circle

A, B
	the endpoints of the chord

O
	the origin of the circle

c
	length of the chord

s
	length between the center of the chord and the circle

a
	the arclength of the segment's circumference

α
	∠AOB

T
	a point on a line that is tangent to the circle, and intersects A. T is "above" the circle

θ
	∠TAB

According to the `Alternate Segment Theorem <https://brilliant.org/wiki/alternate-segment-theorem-2/>`_, the angle θ is equivalent to the internal angle of the alternate segment. That is, any triangle formed by points A, B and some other point on the circle C, will have an angle ∠ACB = ∠TAB

Installation
------------

No further steps necessary

Usage
-----

::

	var circseg = require('./circseg')

	var mySegment = circseg.struct()
	mySegment.radius = 24
	mySegment.chord = 12
	circseg.solve(mySegment)
	console.log(mySegment.angle)

The main purpose of this package is to fill in values the user may not want to compute by hand. If not enough information is provided, the returned object will contain an ``error`` attribute saying as much. Likewise, if information is provided that leads to an invalid geometry.

Full API
^^^^^^^^

+------------+-----------+----------------------------------+
| Method     | Arguments | Return Value                     |
+============+===========+==================================+
| ``struct`` | None      | A skeleton of a segment object   |
+------------+-----------+----------------------------------+
| ``solve``  | partial   | A completed segment object, with |
|            | segment   | possible ``error`` attribute     |
+------------+-----------+----------------------------------+

Attributes of a segment object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``radius``
	The radius of the circle.

``chord``
	The length of the chord.

``angle``
	If the chord's endpoints are named A and B, and the circle's origin is O, this is the angle AOB (in degrees).

``arc``
	The length of the arc described by this segment.

``tangent``
	If there's a line tangent to the circle, and passing through an endpoint of the chord, this is the acute angle between the tangent line and the chord (in degrees).

``sagitta``
	If there's a line bisecting the chord perpendicularly, this is the distance between the point where that line crosses the chord, and where that line crosses the circle.
 
Currently, two of the three values of ``radius``, ``chord``, and ``angle`` are required in order to solve all values of the segment.

TODO
====

-  circseg.js

   +	check for conflicts between answers (within a tolerance?)
