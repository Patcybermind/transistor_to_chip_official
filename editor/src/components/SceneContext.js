"use client"
import React, { createContext, useState } from 'react';
import * as THREE from 'three';

// Create a context
export const SceneContext = createContext();

// Create a provider component
export const SceneProvider = ({ children }) => {
  const [scene, setScene] = useState(new THREE.Scene());

  return (
    <SceneContext.Provider value={{ scene, setScene }}>
      {children}
    </SceneContext.Provider>
  );
};