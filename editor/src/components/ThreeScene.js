"use client"
import { useEffect, useRef, useState, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneContext } from './SceneContext';


export default function ThreeScene() {
  const mountRef = useRef(null);
  const [width, setWidth] = useState(0); // Initial width set to 0
  const isResizing = useRef(false);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  const { scene } = useContext(SceneContext);

  useEffect(() => {
    // Set initial width to 90% of the window's inner width
    setWidth(window.innerWidth * 0.85);
  }, []);
  

  useEffect(() => {
    const mount = mountRef.current;

    // SETUP
    
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / mount.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
      LEFT: null,       // Disable left click panning
      RIGHT: null,      // Disable right click panning
      MIDDLE: THREE.MOUSE.ROTATE // Enable middle mouse for rotation
    };
    controls.rotateSpeed = 1;


    // change background color
    renderer.setClearColor('#3C3C3C');

    // Cube setup with white material interacting with light
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    // LIGHTS
    //const pointLight = new THREE.PointLight(0xffffff, 400);
    //pointLight.position.set(5, 5, 5);
    //scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, .8);
    scene.add(ambientLight);

    // add grid
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // add axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    






    // ANIMATION LOOP
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();






    // Cleanup function
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (rendererRef.current && cameraRef.current) {
      const mount = mountRef.current;
      rendererRef.current.setSize(width, mount.clientHeight);
      cameraRef.current.aspect = width / mount.clientHeight;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [width]); // Re-run effect when width changes

  const handleMouseDown = () => {
    isResizing.current = true;
  };
  const handleMouseUp = () => {
    isResizing.current = false;
  };
  const handleMouseMove = (event) => {
    if (isResizing.current) {
      const newWidth = event.clientX + 3;
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: '100vh' }}>
      
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      
      <div
        
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '6px',
          height: '100%',
          cursor: 'ew-resize',
          backgroundColor: 'rgba(0, 255, 0, 1)',
        }}

      />
    </div>
  );
}