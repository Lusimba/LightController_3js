init=()=>{
    const scene = new THREE.Scene();
    //UI Controller
    var gui = new dat.GUI();
    //Geometry
    const box = getBox(1, 1, 1);
    const plane = getPlane(20);
    const pointLight = getPointLight(1);
    const sphere = getSphere(0.05);

    //Geometry Positioning
    box.position.z = box.geometry.parameters.height/2;
    plane.rotation.x = -Math.PI/2; 
    pointLight.position.y =1.5;
    pointLight.intensity = 1.8;

    //GUI Controller values
    gui.add(pointLight, 'intensity', 0, 10)

    //Scene Manager
    plane.add(box);
    scene.add(plane);
    scene.add (pointLight);
    pointLight.add(sphere);

    //Camera setup
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );

    //Camera positioning and focus
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(120, 120, 120)')
    document.getElementById('webgl').appendChild(renderer.domElement);
    const controls =  new THREE.OrbitControls(camera, renderer.domElement);
    update(renderer, scene, camera, controls);
    return scene;
}
//Geometry
getBox=(w, h, d)=>{
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
    });
    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

//Creating a Plane
getPlane=(size)=>{
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}
//Creating PointLight
getPointLight = (intensity) =>{
    const light = new THREE.PointLight(0xffffff, intensity);
    return light;
}
//Scene Update Function
update =  (renderer, scene, camera, controls) =>{
    renderer.render(
        scene,
        camera
    ); 
    controls.update();
    requestAnimationFrame(()=>{
        update(renderer, scene, camera, controls);
    });
}
getSphere=(size)=>{
    const geometry = new THREE.SphereGeometry(size, 24, 24);
    const material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 255)'
    });
    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}
init();