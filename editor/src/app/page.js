import ThreeScene from '../components/ThreeScene';
//import './styles.css'; // Import the CSS file
import { AddDropdown } from '../components/Dropdowns';
import { FileDropdown } from '../components/Dropdowns'
import React from 'react';

export default function Home() {
  return (
    <div>
      <ThreeScene />
      <div className="absolute top-0  flex space-x-4 p-4">
        <FileDropdown />
        <AddDropdown />
      </div>
      </div>
  );
}

function TopBar() {

}