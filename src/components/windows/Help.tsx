import { useState } from "react";

export const Help = () => {
  const [activeHelp, setActiveHelp] = useState("getting-started");

  const handleHelpClick = (topic: string) => {
    setActiveHelp(topic);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-2 border-b border-win95-dark-gray pb-1">
        <div className="text-xs px-2 py-1 cursor-pointer hover:bg-win95-light-gray">Contents</div>
        <div className="text-xs px-2 py-1 cursor-pointer hover:bg-win95-light-gray">Index</div>
        <div className="text-xs px-2 py-1 cursor-pointer hover:bg-win95-light-gray">Search</div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 overflow-auto border-r border-win95-dark-gray pr-2">
          <div className="text-xs font-bold mb-1">Windows Help</div>
          <div className="win95-sunken-border p-1 mb-2 h-64 overflow-auto">
            <ul className="text-xs">
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'introduction' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('introduction')}
              >
                Introduction to Windows
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'getting-started' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('getting-started')}
              >
                Getting Started
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray pl-4 ${activeHelp === 'mouse' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('mouse')}
              >
                Using the Mouse
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray pl-4 ${activeHelp === 'keyboard' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('keyboard')}
              >
                Using the Keyboard
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray pl-4 ${activeHelp === 'start-menu' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('start-menu')}
              >
                Using the Start Menu
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray pl-4 ${activeHelp === 'windows' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('windows')}
              >
                Using Windows
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'programs' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('programs')}
              >
                Using Programs
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'file-management' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('file-management')}
              >
                File Management
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'printing' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('printing')}
              >
                Printing
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'networking' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('networking')}
              >
                Networking
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'troubleshooting' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('troubleshooting')}
              >
                Troubleshooting
              </li>
              <li 
                className={`p-1 cursor-pointer hover:bg-win95-light-gray ${activeHelp === 'about' ? 'font-bold' : ''}`}
                onClick={() => handleHelpClick('about')}
              >
                About This Portfolio
              </li>
            </ul>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-2">
          <div className="text-xs font-bold mb-2">Getting Started with Windows 95</div>
          
          <div className="text-xs mb-4">
            <p className="mb-2">Windows 95 makes your computer easier to use by providing a graphical interface.</p>
            
            <p className="mb-2">With Windows 95, you can:</p>
            <ul className="list-disc pl-5 mb-2">
              <li>Run programs by clicking on icons</li>
              <li>Organize your files with folders</li>
              <li>Multitask with multiple windows</li>
              <li>Connect to networks and the Internet</li>
            </ul>
            
            <p className="mb-2">To get started, click the <strong>Start</strong> button in the lower left corner of the screen.</p>
          </div>
          
          <div className="win95-window inline-block p-2 mb-4">
            <div className="text-xs font-bold mb-1">Tip</div>
            <div className="text-xs flex gap-2">
              <span className="text-lg">💡</span>
              <p>Right-click on objects to see context menus with additional options.</p>
            </div>
          </div>
          
          <div className="win95-window inline-block p-2">
            <div className="text-xs font-bold mb-1">About This Portfolio</div>
            <div className="text-xs">
              <p className="mb-2">This Windows 95 themed portfolio was created using modern web technologies to showcase my skills and projects in a nostalgic and creative way.</p>
              <p>The interface was built with React and styled to recreate the authentic Windows 95 experience while delivering modern content.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-win95-dark-gray pt-1 mt-2">
        <div className="flex justify-between">
          <button className="win95-button px-3 py-1 text-xs">Back</button>
          <div>
            <button className="win95-button px-3 py-1 text-xs mr-2">Options</button>
            <button className="win95-button px-3 py-1 text-xs">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
