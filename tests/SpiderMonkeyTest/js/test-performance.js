//
//
// Performance tests
//
//

// force garbage collect before running
__jsc__.garbageCollect();

// dump config info
cc.log('----------------');
cc.log('Config info:');
for( i in cc.config )
    cc.log( i + " = " + cc.config[i] );
cc.log('----------------');

//
// Testing creating Points in Native
//
var startMSec = Date.now();
var n=50000;
for( var i=0; i < n; i++ )
    var p = cc._native_p(i, i);

var endMSec = Date.now();
var elapsed = (endMSec - startMSec) / 1000;

cc.log("It took " + elapsed + " seconds to create " + n + " points in Native using cc._native_p(10,10)" );

//
// Testing creating Points in JS
//
var startMSec = Date.now();
var n=50000;
for( var i=0; i < n; i++ )
    var p = {x:i,y:i};

var endMSec = Date.now();
var elapsed = (endMSec - startMSec) / 1000;

cc.log("It took " + elapsed + " seconds to create " + n + " points in JS using {x:10, y:10}" );

//
// Testing creating Points in JS Using Typed Arrays
//
var startMSec = Date.now();
var n=50000;
for( var i=0; i < n; i++ ) {
	var p = new Float32Array(2);
	p[0] = i;
	p[1] = i;
}

var endMSec = Date.now();
var elapsed = (endMSec - startMSec) / 1000;

cc.log("It took " + elapsed + " seconds to create " + n + " points in JS using new Float32Array()" );

//
// Testing "getting" points
//
var node = cc.Node.create();
node.setPosition( cc.p(1,1) );

var startMSec = Date.now();
var n=50000;
for( var i=0; i < n; i++ )
    var p = node.getPosition();

var endMSec = Date.now();
var elapsed = (endMSec - startMSec) / 1000;

cc.log("It took " + elapsed + " seconds to 'node.getPosition()' " + n + " times" );


if( cc.config.usesTypedArrays ) {
    //
    // Testing querying properties
    // Valid only when using Typed Arrays for Point
    //
    var node = cc.Node.create();
    node.setPosition( cc.p(1,1) );

    var startMSec = Date.now();
    var n=50000;
    var p = node.getPosition();
    for( var i=0; i < n; i++ ) {
        var x = p[0];
        var y = p[1];
    }

    var endMSec = Date.now();
    var elapsed = (endMSec - startMSec) / 1000;

    cc.log("It took " + elapsed + " seconds to parse " + n + " points using p[0], p[1]" );

} else {

    //
    // Testing querying properties
    // Valid only when using Object for Point
    //
    var node = cc.Node.create();
    node.setPosition( cc.p(1,1) );

    var startMSec = Date.now();
    var n=50000;
    var p = node.getPosition();
    for( var i=0; i < n; i++ ) {
        var x = p.x;
        var y = p.y;
    }

    var endMSec = Date.now();
    var elapsed = (endMSec - startMSec) / 1000;

    cc.log("It took " + elapsed + " seconds to parse " + n + " points using p.x, p.y" );
}

//
// Testing native calls
//
var node = cc.Node.create();
node.setPosition( cc.p(1,1) );

var startMSec = Date.now();
var n=50000;
var p = node.getPosition();
for( var i=0; i < n; i++ ) {
    node.cleanup();
}

var endMSec = Date.now();
var elapsed = (endMSec - startMSec) / 1000;

cc.log("It took " + elapsed + " seconds to send " + n + " calls using node.cleanup()" );

cc.log('----------------');
