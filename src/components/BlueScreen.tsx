import { useEffect, useState } from "react";

interface BlueScreenProps {
  onClose: () => void;
}

export const BlueScreen = ({ onClose }: BlueScreenProps) => {
  useEffect(() => {
    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    // Debug log to confirm BlueScreen is rendering
    console.log('BlueScreen rendered');
    
    return () => {
      clearTimeout(timer);
      console.log('BlueScreen unmounted');
    };
  }, [onClose]);

  useEffect(() => {
    // Wait a short time before enabling key handling
    const keyTimer = setTimeout(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          console.log('Key pressed to close BlueScreen:', e.key);
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKey);
      
      return () => {
        document.removeEventListener('keydown', handleKey);
      };
    }, 1000);
    
    return () => {
      clearTimeout(keyTimer);
    };
  }, [onClose]);

  // Track whether clicks should be able to close the BlueScreen
  const [clicksEnabled, setClicksEnabled] = useState(false);
  
  useEffect(() => {
    // Wait 2 seconds before allowing clicks to close the BlueScreen
    // This prevents immediate closing from the same click that opened it
    const clickTimer = setTimeout(() => {
      console.log('Click closing enabled for BlueScreen');
      setClicksEnabled(true);
    }, 2000);
    
    return () => {
      clearTimeout(clickTimer);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only allow closing via click after the timer has passed
    if (clicksEnabled) {
      console.log('Click to close BlueScreen');
      onClose();
    } else {
      console.log('Click ignored, BlueScreen closing not yet enabled');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-blue-800 text-white font-mono text-sm p-8 cursor-pointer bluescreen-container"
      onClick={handleClick}>
      <div className="text-center space-y-4">
        <div className="text-2xl font-bold">Windows</div>
        
        <div className="space-y-2">
          <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +</p>
          <p>00010E36. The current application will be terminated.</p>
        </div>

        <div className="space-y-2 mt-8">
          <p>* Press any key to terminate the current application.</p>
          <p>* Press CTRL+ALT+DEL again to restart your computer. You will</p>
          <p>  lose any unsaved information in all open applications.</p>
        </div>

        <div className="mt-8">
          <p>Error: PORTFOLIO_OVERFLOW</p>
          <p>Press any key to continue _</p>
        </div>

        <div className="absolute bottom-8 left-8 text-xs">
          <p>Just kidding! This is a fake BSOD for authentic Windows 95 nostalgia 😄</p>
          <p>Click anywhere or press any key to return to the portfolio</p>
        </div>
      </div>
    </div>
  );
};