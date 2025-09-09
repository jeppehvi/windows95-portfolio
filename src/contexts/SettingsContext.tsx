import React, { createContext, useContext, ReactNode } from "react";

// Simplified settings context with default values only
interface DisplaySettings {
  resolution: number;
  colorDepth: string;
}

interface SoundSettings {
  volume: number;
  selectedEvent: string;
}

interface MouseSettings {
  handedness: string;
  speed: number;
}

interface SystemSettings {
  // Placeholder for any future system settings
}

interface SettingsContextType {
  display: DisplaySettings;
  sound: SoundSettings;
  mouse: MouseSettings;
  system: SystemSettings;
  updateDisplaySettings: (settings: Partial<DisplaySettings>) => void;
  updateSoundSettings: (settings: Partial<SoundSettings>) => void;
  updateMouseSettings: (settings: Partial<MouseSettings>) => void;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
}

// Default settings that won't change
const defaultSettings: SettingsContextType = {
  display: {
    resolution: 2, // 800x600
    colorDepth: "24-bit", // True Color
  },
  sound: {
    volume: 75,
    selectedEvent: "Windows Startup",
  },
  mouse: {
    handedness: "right",
    speed: 3,
  },
  system: {},
  updateDisplaySettings: () => {}, // No-op function
  updateSoundSettings: () => {},   // No-op function
  updateMouseSettings: () => {},   // No-op function
  updateSystemSettings: () => {},  // No-op function
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // Simply return the provider with default settings
  return (
    <SettingsContext.Provider value={defaultSettings}>
      {children}
    </SettingsContext.Provider>
  );
};
