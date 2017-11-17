/*if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, particles, starField, materials = [], parameters, i, h, color, size;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//init();
//animate();

//function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );
	scene.background = new THREE.Color( 'black' ); 

	var light = new THREE.AmbientLight(0xffffff, 1.9)
	scene.add(light);

	var light2 = THREE.PointLight(0xffffff, 0.5)
	scene.add(light2);

	
	starField = new THREE.Geometry();
	// STARS
	for ( i = 0; i < 10000; i ++ ) {
		var stars = new THREE.Vector3();
		stars.x = Math.random() * 2000 - 1000;
		stars.y = Math.random() * 2000 - 1000;
		stars.z = Math.random() * 2000 - 1000;
		starField.vertices.push( stars );
	}

	parameters = [
		[ [1,    1, 0.5], 5 ],
		[ [0.95, 2, 0.5], 4 ],
		[ [0.90, 3, 0.5], 3 ],
		[ [0.85, 4, 0.5], 2 ],
		[ [0.80, 5, 0.5], 1 ]
	];

	for ( i = 0; i < parameters.length; i ++ ) {
		//color = 0;
		size  = parameters[i][0];

		materials[i] = new THREE.PointsMaterial( {
			size: size
		} );

		particles = new THREE.Points( starField, materials[i] );
 
		//particles.rotation.x = Math.random() * 2;
		//particles.rotation.y = Math.random() * 2;
		//particles.rotation.z = Math.random() * 2;

		particles.rotation.x = 2;
		particles.rotation.y = 2;
		particles.rotation.z = 2;

		scene.add( particles );
	}
	


	// SUN
	var geometry = new THREE.SphereGeometry(500, 2, 9);
	var material = new THREE.MeshNormalMaterial({
		color: 0xfffa00, 
		//roughness: 0.9,
		//metalness: 0.1,
		wireframe: true,
		//wireframeLinewidth: 1,
		//transparent: true, 
		//opacity: 1,
	});
	var mesh = new THREE.Mesh( geometry, material );
					 // x,   y,  z
	mesh.position.set(-10, -50, 200);

	scene.add( mesh );


	// var lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
	// var lineGeo = new THREE.Geometry();
	// lineGeo.vertices.push(new THREE.Vector3(-10, 0, 0));
	// lineGeo.vertices.push(new THREE.Vector3(0, 10, 0));
	// lineGeo.vertices.push(new THREE.Vector3(10, 0, 0));
	// var line = new THREE.Line(lineGeo, lineMat);

	// scene.add( line  );


	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
//}


function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}


function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}


function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}



// function animate() {
// 	requestAnimationFrame( animate );

// 	render();
// 	stats.update();
// }



requestAnimationFrame(render);

var delta = 0;
function render() {

	var time = Date.now() * 0.00005;
	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );

	for ( i = 0; i < scene.children.length; i ++ ) {
		var object = scene.children[ i ];
		if ( object instanceof THREE.Points ) {
			
			// Rotation
			//object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
		}
	}



	// for ( i = 0; i < materials.length; i ++ ) {
	// 	color = parameters[i][0];

	// 	h = ( 360 * ( color[0] + time ) % 360 ) / 360;
	// 	materials[i].color.setHSL( h, color[1], color[2] );
	// }

	
	mesh.rotation.x += 0.001;
	mesh.rotation.y += 0.01;

	delta += 0.1;

	for (i=0; i < geometry.vertices.length; i++ ){
		geometry.vertices[i].x = -25 + Math.sin(delta) * 300;
	}
	geometry.verticesNeedUpdate = true;


	renderer.render( scene, camera );
	requestAnimationFrame(render);
}
*/











/* adads *//* 
var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};




window.onload = function () {
  // connect to server *note the port number
 // var socket = io.connect('http://localhost:3002/node');
  
  // send mouse position updates of current user
  document.onmousemove = function (ev) {
      socket.emit("mouse movement", { pos: { x: ev.clientX, y: ev.clientY } });
  }
  
  // Draw mouse of other players immediatley after socket connection has been established
  socket.on('mouse setup', function (mouses) {
      for (var mouse_id in mouses) {
          virtualMouse.move(mouse_id, mouses.mouse_id);
      }
  });
  
  // update mouse position
  socket.on('mouse update', function (mouse) {
      virtualMouse.move(mouse.id, mouse.pos);
  });
  
  // remove disconnected mouse
  socket.on('mouse disconnect', function (mouse) {
      virtualMouse.remove(mouse.id);
  });
  
}

// virtual mouse module
var virtualMouse = {
  // moves a cursor with corresponding id to position pos
  // if cursor with that id doesn't exist we create one in position pos
  move: function (id, pos) {
  var cursor = document.getElementById('cursor-' + id);
  if (!cursor) {
      cursor = document.createElement('img');
      cursor.className = 'virtualMouse';
      cursor.id = 'cursor-' + id;
      cursor.src = 'cursor.png';
      cursor.style.position = 'absolute';
      document.body.appendChild(cursor);
  }
  cursor.style.left = pos.x + 'px';
  cursor.style.top = pos.y + 'px';
  },
  // remove cursor with corresponding id
  remove: function (id) {
      var cursor = document.getElementById('cursor-' + id);
      cursor.parentNode.removeChild(cursor);
  }
} 
*/