interface Win95Settings {
  resolution?: number;
  colorDepth?: string;
  mouseSpeed?: number;
  mouseHandedness?: string;
  volume?: number;
  selectedEvent?: string;
  soundEffects?: boolean;
  startupSound?: boolean;
}

interface Window {
  win95Settings?: {
    resolution: number;
    colorDepth: string;
    mouseSpeed: number;
    mouseHandedness: string;
    soundEffects: boolean;
    startupSound: boolean;
    volume?: number;
    selectedEvent?: string;
  };
  win95UpdateSettings?: (settings: Win95Settings) => boolean;
}
