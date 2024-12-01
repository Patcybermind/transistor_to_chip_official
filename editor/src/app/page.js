"use client"
import React, { useState } from 'react';
import ThreeScene from '../components/ThreeScene';
import { AddDropdown } from '../components/AddDropdown';
import { FileDropdown } from '../components/FileDropdown';
import { SceneProvider } from '../components/SceneContext';
import Script from 'next/script';
import { Popup, PopupComponent } from '../components/UiComponents';

export default function Home() {


  return (
    <SceneProvider>
      <div id="root"></div>
      <div id="popup-container"></div>

      <div>
        <ThreeScene />
        <div className="absolute top-0 flex space-x-4 p-4">
          <FileDropdown />
          <AddDropdown />
          
        </div>
      </div>
      
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/utils/BufferGeometryUtils.js"
        strategy="beforeInteractive"
      />
    </SceneProvider>
  );
}