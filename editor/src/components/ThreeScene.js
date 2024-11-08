'use client'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [height, setHeight] = useState(400); // Initial height
  const isResizing = useRef(false);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, height);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Cube setup
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []); // only run once on mount

  useEffect(() => {
    if (rendererRef.current && cameraRef.current) {
      const mount = mountRef.current;
      rendererRef.current.setSize(mount.clientWidth, height);
      cameraRef.current.aspect = mount.clientWidth / height;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [height]);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  const handleMouseMove = (event) => {
    if (isResizing.current) {
      const newHeight = event.clientY;
      setHeight(newHeight -20); // Subtract 10 to account for the height of the resize handle
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
    <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '10px',
          cursor: 'ns-resize',
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
      />
    </div>
  );
}