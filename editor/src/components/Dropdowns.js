"use client"
import React, { useState } from 'react';

export function AddDropdown() {
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
                className="inline-flex justify-center w-full rounded-md  shadow-lg px-4 py-0.5 bg-3c3c3c text-sm font-medium text-white hover:bg-orange-500 focus:outline-none"
            >
                add
            </button>
        </div>

        {isOpen && (
            <div className="origin-top-right absolute left-0 mt-0  rounded-md w-40 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    
                        <a
                            
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            test
                        </a>
                    
                </div>
            </div>
        )}
    </div>
);
}

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
                  className="inline-flex justify-center w-full rounded-md  shadow-lg px-4 py-0.5 bg-3c3c3c text-sm font-medium text-white hover:bg-orange-500 focus:outline-none"
              >
                  file
              </button>
          </div>
  
          {isOpen && (
              <div className="origin-top-right absolute left-0 mt-0  rounded-md w-40 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      
                          <button
                              
                              onClick={TestLog}
                              className="text-left block px-4 py-.5 w-40 text-sm text-gray-700 hover:bg-gray-100"
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