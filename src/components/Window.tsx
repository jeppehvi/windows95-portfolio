import { useState, useRef, useCallback, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";

interface WindowProps {
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (position: { x: number; y: number }) => void;
  onResize?: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

const MenuBar = ({ onClose }: { onClose: () => void }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems: Record<string, ({ label: string; action: () => void; disabled: boolean } | null)[]> = {
    File: [
      { label: 'New', action: () => {}, disabled: true },
      { label: 'Open...', action: () => {}, disabled: true },
      null,
      { label: 'Exit', action: onClose, disabled: false },
    ],
    Edit: [
      { label: 'Undo', action: () => {}, disabled: true },
      null,
      { label: 'Cut', action: () => {}, disabled: true },
      { label: 'Copy', action: () => {}, disabled: true },
      { label: 'Paste', action: () => {}, disabled: true },
    ],
    View: [
      { label: 'Toolbar', action: () => {}, disabled: true },
      { label: 'Status Bar', action: () => {}, disabled: true },
    ],
    Help: [
      { label: 'About...', action: () => alert('Windows 95 Portfolio by [Your Name]'), disabled: false },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  return (
    <div ref={menuRef} className="relative flex bg-win95-gray text-xs border-b-2 border-win95-white">
      {Object.keys(menuItems).map(menuName => (
        <div key={menuName} className="relative">
          <div
            className={`px-2 py-0.5 cursor-pointer ${activeMenu === menuName ? 'bg-win95-blue text-win95-white' : 'hover:bg-win95-blue hover:text-win95-white'}`}
            onClick={() => handleMenuClick(menuName)}
          >
            <span className="underline">{menuName[0]}</span>{menuName.substring(1)}
          </div>
          {activeMenu === menuName && (
            <div className="absolute left-0 top-full win95-window bg-win95-gray py-1 z-10 w-48 shadow-lg">
              {menuItems[menuName].map((item, index) =>
                item === null ? (
                  <div key={index} className="h-px bg-win95-dark-gray mx-1 my-1" />
                ) : (
                  <div
                    key={index}
                    onClick={() => {
                      if (!item.disabled) {
                        item.action();
                        setActiveMenu(null);
                      }
                    }}
                    className={`px-2 py-0.5 flex justify-between items-center ${
                      item.disabled
                        ? 'text-win95-dark-gray'
                        : 'cursor-pointer hover:bg-win95-blue hover:text-win95-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const Window = ({ 
  title, 
  position, 
  size, 
  zIndex, 
  onClose, 
  onMinimize, 
  onFocus, 
  onMove,
  onResize = () => {},
  children 
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [prevSize, setPrevSize] = useState({ width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls') || (e.target as HTMLElement).closest('.win95-button')) return;
    
    onFocus();
    const titleBar = (e.target as HTMLElement).closest('.win95-title-bar');
    if (titleBar && !isMaximized) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
      e.preventDefault();
    } else if (titleBar && isMaximized) {
      // Double click on title bar to restore
      const now = Date.now();
      if (now - (titleBar as any)._lastClickTime < 300) { // Double-click detected
        setIsMaximized(false);
        onMove(prevPosition);
      }
      (titleBar as any)._lastClickTime = now;
    }
  }, [onFocus, isMaximized, prevPosition, onMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    const maxX = window.innerWidth - (windowRef.current?.offsetWidth ?? size.width);
    const maxY = window.innerHeight - (windowRef.current?.offsetHeight ?? size.height) - 28;
    
    onMove({
      x: Math.max(0, Math.min(maxX, newX)),
      y: Math.max(0, Math.min(maxY, newY))
    });
  }, [isDragging, dragOffset, size.width, size.height, onMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className="win95-window absolute flex flex-col shadow-win95"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100% - 28px)' : size.height, // Subtract taskbar height
        zIndex
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="win95-title-bar cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-win95-white border border-win95-black flex items-center justify-center text-xs">
            📄
          </div>
          <span>{title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="window-controls flex items-center gap-0.5">
          <button 
            className="win95-button p-0 w-4 h-4 flex items-center justify-center"
            onClick={onMinimize}
            title="Minimize"
          >
            <Minus size={8} />
          </button>
          <button 
            className="win95-button p-0 w-4 h-4 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              if (isMaximized) {
                // Restore window
                onMove(prevPosition);
              } else {
                // Save current size and position
                setPrevPosition({ ...position });
                setPrevSize({ ...size });
                // Maximize window
                onMove({ x: 0, y: 0 });
              }
              setIsMaximized(!isMaximized);
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square size={8} />
          </button>
          <button 
            className="win95-button p-0 w-4 h-4 flex items-center justify-center"
            onClick={onClose}
            title="Close"
          >
            <X size={8} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <MenuBar onClose={onClose} />

      {/* Window Content */}
      <div className="flex-1 overflow-auto win95-scrollbar bg-win95-white p-2">
        {children}
      </div>
      
      {/* Status Bar */}
      <div className="h-5 bg-win95-gray border-t border-win95-dark-gray flex items-center px-2">
        <div className="text-xs flex-1">{isMaximized ? 'Maximized' : 'Ready'}</div>
      </div>
      
      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;
            
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = startWidth + (moveEvent.clientX - startX);
              const newHeight = startHeight + (moveEvent.clientY - startY);
              
              // Update size in parent component
              const finalWidth = Math.max(300, newWidth);
              const finalHeight = Math.max(200, newHeight);
              
              if (windowRef.current) {
                windowRef.current.style.width = `${finalWidth}px`;
                windowRef.current.style.height = `${finalHeight}px`;
              }
              
              // Inform parent about size change
              onResize({ width: finalWidth, height: finalHeight });
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        >
          <div className="w-0 h-0 border-b-[8px] border-r-[8px] border-win95-dark-gray"></div>
        </div>
      )}
    </div>
  );
};
