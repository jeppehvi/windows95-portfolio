import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";

interface DesktopIconProps {
  label: string;
  icon: string;
  onDoubleClick: () => void;
  style?: React.CSSProperties;
}

export const DesktopIcon = ({ label, icon, onDoubleClick, style }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  // Use fixed positions instead of random positions
  useEffect(() => {
    // Each icon gets a specific position based on its index in the desktop
    // This is handled via the style prop now, so we don't set position here
    setPosition({ x: 0, y: 0 }); // Default position if no style provided
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    
    // Deselect all other icons (would need global state in a real app)
    document.querySelectorAll('.desktop-icon').forEach(el => {
      if (el !== nodeRef.current) {
        el.classList.remove('selected');
      }
    });
    
    setIsSelected(true);
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    if (!isDragging) {
      onDoubleClick();
    }
  };

  const handleBlur = () => {
    setIsSelected(false);
  };

  const handleDragStop = (_e: any, data: { x: number, y: number }) => {
    setPosition({ x: data.x, y: data.y });
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleDesktopClick = (e: MouseEvent) => {
    // Only run if clicking directly on desktop (not on an icon)
    if ((e.target as Element)?.classList.contains('desktop-background')) {
      setIsSelected(false);
    }
  };

  // Add event listener to detect clicks on the desktop
  useEffect(() => {
    document.addEventListener('mousedown', handleDesktopClick);
    return () => {
      document.removeEventListener('mousedown', handleDesktopClick);
    };
  }, []);

  return (
    <Draggable 
      nodeRef={nodeRef}
      onStart={() => {
        if (!isSelected) setIsSelected(true);
      }}
      onDrag={() => setIsDragging(true)}
      onStop={handleDragStop}
      position={position}
      bounds="parent"
      grid={[5, 5]} // Snap to grid for more authentic Windows 95 feel
    >
      <div
        ref={nodeRef}
        className={`desktop-icon ${isSelected ? 'selected' : ''} absolute`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        style={style}
        tabIndex={0}
      >
        <img 
          src={icon} 
          alt={label} 
          className="w-8 h-8 mb-1 pointer-events-none object-contain"
          draggable={false}
        />
        <span className="text-xs text-center leading-tight max-w-full break-words">
          {label}
        </span>
      </div>
    </Draggable>
  );
};