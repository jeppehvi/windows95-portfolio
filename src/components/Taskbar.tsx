import { useState, useEffect } from "react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: Array<{
    id: string;
    title: string;
    isMinimized: boolean;
  }>;
  onWindowSelect: (windowId: string) => void;
  onOpenWindow: (iconId: string) => void;
}

export const Taskbar = ({ openWindows, onWindowSelect, onOpenWindow }: TaskbarProps) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <>
      {isStartMenuOpen && (
        <StartMenu 
          onClose={() => setIsStartMenuOpen(false)}
          onOpenWindow={onOpenWindow}
        />
      )}
      
      <div className="taskbar win95-taskbar">
        {/* Start Button */}
        <button
          className={`start-button ${isStartMenuOpen ? 'pressed' : ''}`}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        >
          <div className="flex items-center gap-1">
            <div className="windows-logo w-4 h-4 grid grid-cols-2 grid-rows-2">
              <div className="bg-win95-blue"></div>
              <div className="bg-win95-green"></div>
              <div className="bg-yellow-500"></div>
              <div className="bg-win95-red"></div>
            </div>
            <span>Start</span>
          </div>
        </button>

        {/* Window Buttons */}
        <div className="flex-1 flex items-center gap-1 ml-2">
          {openWindows.map((window) => (
            <button
              key={window.id}
              className={`win95-button px-2 py-1 text-xs max-w-32 truncate ${
                window.isMinimized ? '' : 'pressed'
              }`}
              onClick={() => onWindowSelect(window.id)}
            >
              {window.title}
            </button>
          ))}
        </div>

        {/* System Tray & Clock */}
        <div className="flex items-center gap-2">
          <div className="win95-button px-2 py-1 text-xs border border-win95-dark-gray">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </>
  );
};