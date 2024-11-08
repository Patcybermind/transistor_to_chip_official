'use client'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [width, setWidth] = useState(0); // Initial width set to 0
  const isResizing = useRef(false);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Set initial width to 90% of the window's inner width
    setWidth(window.innerWidth * 0.85);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, mount.clientHeight);
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
  }, [width]); // Re-run effect when width changes

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