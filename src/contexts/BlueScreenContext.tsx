import React, { createContext, useContext, useState } from 'react';
import { BlueScreen } from '@/components/BlueScreen';

interface BlueScreenContextType {
  showBlueScreen: boolean;
  setShowBlueScreen: (show: boolean) => void;
}

const BlueScreenContext = createContext<BlueScreenContextType | undefined>(undefined);

export const BlueScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBlueScreen, setShowBlueScreen] = useState(false);

  return (
    <BlueScreenContext.Provider value={{ showBlueScreen, setShowBlueScreen }}>
      {showBlueScreen && (
        <BlueScreen onClose={() => setShowBlueScreen(false)} />
      )}
      {children}
    </BlueScreenContext.Provider>
  );
};

export const useBlueScreen = (): BlueScreenContextType => {
  const context = useContext(BlueScreenContext);
  if (context === undefined) {
    throw new Error('useBlueScreen must be used within a BlueScreenProvider');
  }
  return context;
};
