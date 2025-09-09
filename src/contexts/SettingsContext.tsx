import React, { createContext, useState, useContext, ReactNode } from "react";

interface DisplaySettings {
  resolution: number; // 1: 640x480, 2: 800x600, 3: 1024x768
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
  // Add system settings as needed
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

const defaultSettings: SettingsContextType = {
  display: {
    resolution: 2, // Default to 800x600
    colorDepth: "16-bit",
  },
  sound: {
    volume: 75,
    selectedEvent: "Windows Startup",
  },
  mouse: {
    handedness: "right",
    speed: 2,
  },
  system: {},
  updateDisplaySettings: () => {},
  updateSoundSettings: () => {},
  updateMouseSettings: () => {},
  updateSystemSettings: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>(defaultSettings.display);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(defaultSettings.sound);
  const [mouseSettings, setMouseSettings] = useState<MouseSettings>(defaultSettings.mouse);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(defaultSettings.system);

  const updateDisplaySettings = (settings: Partial<DisplaySettings>) => {
    setDisplaySettings(prev => ({ ...prev, ...settings }));
  };

  const updateSoundSettings = (settings: Partial<SoundSettings>) => {
    setSoundSettings(prev => ({ ...prev, ...settings }));
  };

  const updateMouseSettings = (settings: Partial<MouseSettings>) => {
    setMouseSettings(prev => ({ ...prev, ...settings }));
  };

  const updateSystemSettings = (settings: Partial<SystemSettings>) => {
    setSystemSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <SettingsContext.Provider
      value={{
        display: displaySettings,
        sound: soundSettings,
        mouse: mouseSettings,
        system: systemSettings,
        updateDisplaySettings,
        updateSoundSettings,
        updateMouseSettings,
        updateSystemSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
