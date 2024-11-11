"use client"
import React, { useState } from 'react';
import '../app/globals.css';

export function FileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
  
  return (
      <div
          className="relative inline-block text-left"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
      >
          <div>
              <button
                  type="button"
                  className="@apply dropdownmenubutton"
              >
                  file
              </button>
          </div>
  
          {isOpen && (
              <div className="@apply dropdownmenubox">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      
                          <button
                              
                              onClick={TestLog}
                              className="@apply dropdownmenuitems"
                              role="menuitem"
                          >
                              test
                          </button>
                      
                  </div>
              </div>
          )}
      </div>
  );
}

function TestLog () {
    console.log("Test log worked!")
}