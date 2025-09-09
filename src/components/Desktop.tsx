import { useState, useCallback } from "react";
import { Taskbar } from "./Taskbar";
import { Window } from "./Window";
import { DesktopIcon } from "./DesktopIcon";
import { AboutMe } from "./windows/AboutMe";
import { Projects } from "./windows/Projects";
import { Resume } from "./windows/Resume";
import { Contact } from "./windows/Contact";
import { Settings } from "./windows/Settings";
import { FindDialog } from "./windows/FindDialog";
import { Help } from "./windows/Help";
import { RunDialog } from "./windows/RunDialog";
import wallpaper from "@/assets/win95-wallpaper.jpg";
import folderIcon from "@/assets/folder-icon.png";
import computerIcon from "@/assets/computer-icon.png";
import notepadIcon from "@/assets/notepad-icon.png";
import contactIcon from "@/assets/contact-icon.png";

// Define component props for RunDialog
interface RunDialogProps {
  onOpenWindow?: (windowId: string) => void;
  onClose?: () => void;
}

interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType<any>; // Use any to allow different props
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  zIndex: number;
}

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const desktopIcons = [
    { id: "about", label: "about.txt", icon: folderIcon, component: AboutMe },
    { id: "projects", label: "Projects", icon: computerIcon, component: Projects },
    { id: "resume", label: "Resume", icon: notepadIcon, component: Resume },
    { id: "contact", label: "Contact", icon: contactIcon, component: Contact },
  ];
  
  const systemComponents = [
    { id: "settings", title: "Settings", component: Settings, size: { width: 600, height: 400 } },
    { id: "find", title: "Find: Files or Folders", component: FindDialog, size: { width: 500, height: 400 } },
    { id: "help", title: "Windows Help", component: Help, size: { width: 650, height: 450 } },
    { id: "run", title: "Run", component: RunDialog, size: { width: 400, height: 170 } },
  ];

  const openWindow = useCallback((iconId: string) => {
    // First check desktop icons
    const icon = desktopIcons.find(i => i.id === iconId);
    // Then check system components
    const systemComponent = systemComponents.find(s => s.id === iconId);
    
    // If neither found, return
    if (!icon && !systemComponent) return;

    // Check if window is already open
    const existingWindow = windows.find(w => w.id === iconId);
    if (existingWindow) {
      // Bring to front and unminimize
      setWindows(prev => prev.map(w => 
        w.id === iconId 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(prev => prev + 1);
      return;
    }

    // Create new window
    let newWindow: WindowState;
    
    if (icon) {
      newWindow = {
        id: iconId,
        title: icon.label,
        component: icon.component,
        position: { 
          x: Math.random() * 200 + 100, 
          y: Math.random() * 100 + 50 
        },
        size: { width: 600, height: 400 },
        isMinimized: false,
        zIndex: nextZIndex,
      };
    } else if (systemComponent) {
      newWindow = {
        id: iconId,
        title: systemComponent.title,
        component: systemComponent.component,
        position: { 
          x: (window.innerWidth - systemComponent.size.width) / 2, 
          y: (window.innerHeight - systemComponent.size.height) / 2 
        },
        size: systemComponent.size,
        isMinimized: false,
        zIndex: nextZIndex,
      };
    } else {
      return; // Shouldn't happen, but typescript wants this
    }

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex, desktopIcons]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);
  
  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden desktop">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-win95-gray desktop-background"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={() => {
          // Deselect all desktop icons when clicking on the desktop background
          document.querySelectorAll('.desktop-icon').forEach(el => {
            el.classList.remove('selected');
          });
        }}
      />
      
      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 w-full h-full">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            onDoubleClick={() => openWindow(icon.id)}
            style={{ 
              left: `${(index % 3) * 80 + 20}px`, // 3 columns with 80px spacing
              top: `${Math.floor(index / 3) * 90 + 20}px` // Row height of 90px
            }}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map(window => (
        <Window
          key={window.id}
          title={window.title}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onMove={(position) => updateWindowPosition(window.id, position)}
          onResize={(size) => updateWindowSize(window.id, size)}
        >
          {window.id === 'run' ? (
            <window.component onOpenWindow={openWindow} onClose={() => closeWindow(window.id)} />
          ) : (
            <window.component />
          )}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar 
        openWindows={windows}
        onWindowSelect={(windowId) => {
          const window = windows.find(w => w.id === windowId);
          if (window?.isMinimized) {
            setWindows(prev => prev.map(w => 
              w.id === windowId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
            ));
            setNextZIndex(prev => prev + 1);
          } else {
            focusWindow(windowId);
          }
        }}
        onOpenWindow={openWindow}
      />
    </div>
  );
};