import ThreeScene from '../components/ThreeScene';
//import './styles.css'; // Import the CSS file
import { AddDropdown } from '../components/AddDropdown';
import { FileDropdown } from '../components/FileDropdown'
import React from 'react';
import { SceneProvider } from '../components/SceneContext';

export default function Home() {
  return (
    <SceneProvider>
      <div>
        <ThreeScene />
        <div className="absolute top-0 flex space-x-4 p-4">
          <FileDropdown />
          <AddDropdown />
        </div>
      </div>
    </SceneProvider>
  );
}

