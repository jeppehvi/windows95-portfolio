import { useEffect, useRef, useState } from "react";
import { Minesweeper } from "./Minesweeper";
import { useBlueScreen } from "@/contexts/BlueScreenContext";
// Use emojis instead of image paths for better display
const programsIcon = "📁";  // Folder icon
const documentsIcon = "📄";  // Document icon
const aboutIcon = "📁";  // Folder icon
const projectsIcon = "💻";  // Computer icon
const resumeIcon = "📄";  // Document icon
const contactIcon = "📞";  // Contact icon

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (iconId: string) => void;
}

export const StartMenu = ({ onClose, onOpenWindow }: StartMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { showBlueScreen, setShowBlueScreen } = useBlueScreen();
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on Minesweeper or BlueScreen
      const target = event.target as HTMLElement;
      if (target.closest('.minesweeper-container') || target.closest('.bluescreen-container')) {
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        if (!showMinesweeper && !showShutdownDialog) {
          onClose();
          setActiveSubmenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, showMinesweeper, showShutdownDialog]);

  const menuItems = [
    { 
      id: "programs",
      label: "Programs", 
      icon: programsIcon,
      submenu: [
        { label: "about.txt", icon: aboutIcon, action: () => onOpenWindow("about") },
        { label: "Projects", icon: projectsIcon, action: () => onOpenWindow("projects") },
        { label: "Resume", icon: resumeIcon, action: () => onOpenWindow("resume") },
        { label: "Contact", icon: contactIcon, action: () => onOpenWindow("contact") },
        null, // Separator
        { label: "Minesweeper", icon: "💣", action: () => {
          setShowMinesweeper(true);
        }},
      ]
    },
    { label: "Documents", icon: documentsIcon, action: () => onOpenWindow("resume") },
    { 
      label: "Settings", 
      icon: "⚙️", 
      action: () => {
        setActiveSubmenu(null);
        onOpenWindow("settings");
      } 
    },
    { 
      label: "Find", 
      icon: "🔍", 
      action: () => {
        setActiveSubmenu(null);
        onOpenWindow("find");
      }
    },
    { 
      label: "Help", 
      icon: "❓", 
      action: () => {
        setActiveSubmenu(null);
        onOpenWindow("help");
      }
    },
    { 
      label: "Run...", 
      icon: "🏃", 
      action: () => {
        setActiveSubmenu(null);
        onOpenWindow("run");
      } 
    },
    null, // Separator
    { label: "Blue Screen Demo", icon: "💙", action: () => {
      setActiveSubmenu(null);
      // First close the menu
      onClose();
      // Use a longer timeout to ensure the menu is fully closed before showing blue screen
      console.log('Preparing to show Blue Screen Demo');
      setTimeout(() => {
        console.log('Showing Blue Screen Demo now');
        setShowBlueScreen(true);
      }, 500);
    }},
    { label: "Shut Down...", icon: "⏻", action: () => setShowShutdownDialog(true) },
  ];

  return (
    <>
      {showMinesweeper && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]" onClick={(e) => e.stopPropagation()}>
          <div className="win95-window shadow-win95 minesweeper-container" onClick={(e) => e.stopPropagation()}>
            <div className="win95-title-bar">
              <div className="flex items-center gap-1">
                <span>💣</span>
                <span>Minesweeper</span>
              </div>
              <button 
                className="win95-button p-0 w-4 h-4 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMinesweeper(false);
                }}
              >
                ×
              </button>
            </div>
            <div className="menu-bar flex bg-win95-gray border-b border-win95-dark-gray">
              <div className="px-2 py-0.5 text-xs hover:bg-win95-blue hover:text-white cursor-pointer">Game</div>
              <div className="px-2 py-0.5 text-xs hover:bg-win95-blue hover:text-white cursor-pointer">Help</div>
            </div>
            <div className="bg-win95-gray" onClick={(e) => e.stopPropagation()}>
              <Minesweeper />
            </div>
          </div>
        </div>
      )}
      
      {/* Shutdown Dialog */}
      {showShutdownDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="win95-window w-80">
            <div className="win95-title-bar">
              <div className="flex items-center gap-1">
                <span>⏻</span>
                <span>Shut Down Windows</span>
              </div>
            </div>
            <div className="bg-win95-gray p-4">
              <div className="flex gap-4 items-center">
                <div className="text-4xl">⏻</div>
                <div>
                  <p className="text-xs mb-2">Are you sure you want to shut down your computer?</p>
                  <p className="text-xs">Thanks for visiting my Windows 95 portfolio! This retro experience was built with modern React and TypeScript.</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  className="win95-button px-3 py-1" 
                  onClick={() => setShowShutdownDialog(false)}
                >
                  Cancel
                </button>
                <button 
                  className="win95-button px-3 py-1"
                  onClick={() => window.location.reload()}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        ref={menuRef}
        className="win95-window absolute bottom-7 left-1 w-48 z-50"
      >
        {/* Start Menu Banner */}
        <div className="win95-title-bar text-center">
          <span>Windows 95</span>
        </div>
        
        {/* Menu Items */}
        <div className="bg-win95-gray">
          {menuItems.map((item, index) => {
            if (item === null) {
              return (
                <div 
                  key={index} 
                  className="h-px bg-win95-dark-gray mx-1 my-1"
                />
              );
            }

            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-2 py-1 ${activeSubmenu === item.id ? 'bg-win95-blue text-win95-white' : 'hover:bg-win95-blue hover:text-win95-white'} cursor-pointer text-xs relative`}
                onClick={() => {
                  if (item.submenu) {
                    setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
                  } else if (item.action) {
                    item.action();
                    if (item.label !== "Blue Screen Demo" && item.label !== "Shut Down...") {
                      onClose();
                    }
                  }
                }}
                onMouseEnter={() => {
                  if (activeSubmenu && item.id) {
                    setActiveSubmenu(item.id);
                  }
                }}
              >
                <div className="w-4 h-4 text-center flex items-center justify-center">
                  <span>{item.icon}</span>
                </div>
                <span className="flex-1">{item.label}</span>
                {item.submenu && <span>▶</span>}
                
                {/* Submenu */}
                {item.submenu && activeSubmenu === item.id && (
                  <div className="absolute left-full top-0 win95-window w-48">
                    <div className="bg-win95-gray py-1">
                      {item.submenu.map((subItem, subIndex) => {
                        if (subItem === null) {
                          return (
                            <div 
                              key={subIndex} 
                              className="h-px bg-win95-dark-gray mx-1 my-1"
                            />
                          );
                        }

                        return (
                          <div
                            key={subIndex}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-win95-blue hover:text-win95-white cursor-pointer text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (subItem.action) {
                                subItem.action();
                                if (subItem.label !== "Minesweeper") {
                                  onClose();
                                }
                              }
                            }}
                          >
                            <div className="w-4 h-4 text-center flex items-center justify-center">
                              <span>{subItem.icon}</span>
                            </div>
                            <span className="flex-1">{subItem.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};