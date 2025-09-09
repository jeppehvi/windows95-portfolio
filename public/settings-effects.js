// Windows 95 Settings Effects

// Global settings object
window.win95Settings = {
  resolution: 2, // 1:640x480, 2:800x600, 3:1024x768
  colorDepth: '16-bit',
  mouseSpeed: 3,
  mouseHandedness: 'right',
  soundEffects: true,
  startupSound: true
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create cursor overlay with more visibility
  // First remove any existing overlay to prevent duplicates
  const existingOverlay = document.querySelector('.win95-cursor-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  const cursorOverlay = document.createElement('div');
  cursorOverlay.classList.add('win95-cursor-overlay');
  cursorOverlay.style.opacity = '0.8';  // Make it more visible
  document.body.appendChild(cursorOverlay);

  // Function to update cursor position with delay based on mouse speed
  function updateCursorPosition(e) {
    // Get actual mouse position accounting for resolution scaling
    cursorOverlay.style.display = 'block';
    
    // Set the cursor position
    cursorOverlay.style.left = `${e.clientX}px`;
    cursorOverlay.style.top = `${e.clientY}px`;
  }

  // Add event listeners
  document.removeEventListener('mousemove', updateCursorPosition); // Remove any existing listeners
  document.addEventListener('mousemove', updateCursorPosition);
  
  // Show/hide overlay based on mouse activity
  document.removeEventListener('mousemove', showOverlay); // Remove any existing listeners
  document.removeEventListener('mousedown', showOverlay);
  document.addEventListener('mousemove', showOverlay);
  document.addEventListener('mousedown', showOverlay);
  
  let hideTimeout;
  
  function showOverlay() {
    cursorOverlay.style.opacity = '0.8';
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      cursorOverlay.style.opacity = '0';
    }, 3000); // Hide after 3 seconds of inactivity
  }
  
  // Apply initial settings
  loadAndApplySettings();
});

// Function to load and apply settings from localStorage
function loadAndApplySettings() {
  // Default settings
  const defaultSettings = {
    resolution: 2, // 1:640x480, 2:800x600, 3:1024x768
    colorDepth: '16-bit',
    mouseSpeed: 3,
    mouseHandedness: 'right',
    soundEffects: true,
    startupSound: true
  };
  
  // Get settings from localStorage or use defaults
  try {
    const savedSettings = localStorage.getItem('win95Settings');
    if (savedSettings) {
      window.win95Settings = JSON.parse(savedSettings);
    } else {
      window.win95Settings = defaultSettings;
    }
  } catch (e) {
    console.error("Error loading settings:", e);
    window.win95Settings = defaultSettings;
  }
  
  // Apply all settings
  applyResolution(window.win95Settings.resolution);
  applyColorDepth(window.win95Settings.colorDepth);
  applyMouseSpeed(window.win95Settings.mouseSpeed);
  applyMouseHandedness(window.win95Settings.mouseHandedness);
}

// Function to apply resolution setting
function applyResolution(resolution) {
  document.documentElement.classList.remove('res-640x480', 'res-800x600', 'res-1024x768');
  
  const resolutions = ['640x480', '800x600', '1024x768'];
  const resolutionValue = resolutions[resolution - 1];
  
  document.documentElement.classList.add(`res-${resolutionValue}`);
  console.log("Applied resolution:", resolutionValue);
  
  // Ensure taskbar stays fixed at bottom
  const taskbar = document.querySelector('.taskbar');
  if (taskbar && !taskbar.classList.contains('win95-taskbar')) {
    taskbar.classList.add('win95-taskbar');
  }
  
  // Force repaint to fix any positioning issues
  document.body.style.opacity = '0.99';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
}

// Function to apply color depth setting
function applyColorDepth(colorDepth) {
  document.documentElement.classList.remove('color-16', 'color-256', 'color-16bit', 'color-24bit');
  
  const colorClass = colorDepth === '16 Colors' ? 'color-16' : 
                     colorDepth === '256 Colors' ? 'color-256' : 
                     colorDepth === '16-bit' ? 'color-16bit' : 'color-24bit';
  
  document.documentElement.classList.add(colorClass);
  console.log("Applied color depth:", colorDepth, "as class:", colorClass);
}

// Function to apply mouse speed setting
function applyMouseSpeed(speed) {
  document.documentElement.classList.remove('mouse-speed-1', 'mouse-speed-2', 'mouse-speed-3', 'mouse-speed-4', 'mouse-speed-5');
  document.documentElement.classList.add(`mouse-speed-${speed}`);
  console.log("Applied mouse speed:", speed);
  
  // Make the cursor overlay more visible when changing speed
  const overlay = document.querySelector('.win95-cursor-overlay');
  if (overlay) {
    overlay.style.opacity = '0.8';
    overlay.style.width = `${10 + speed * 3}px`; // Bigger size difference for visibility
    overlay.style.height = `${10 + speed * 3}px`;
    
    // Pulse the cursor overlay to make the change more noticeable
    overlay.style.animation = 'none';
    setTimeout(() => {
      overlay.style.animation = 'cursorPulse 0.5s 2';
    }, 10);
  }
  
  // Apply cursor speed to the actual cursor if supported
  try {
    if ('userAgent' in navigator && !navigator.userAgent.includes('Firefox')) {
      // Skip Firefox which doesn't support this feature
      const speedValue = Math.max(0, Math.min(10, speed * 2)); // Scale 1-5 to 2-10
      document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="8" fill="%23000"/></svg>') ${speedValue} ${speedValue}, auto`;
    }
  } catch (e) {
    console.warn("Custom cursor not supported", e);
  }
}

// Function to apply mouse handedness setting
function applyMouseHandedness(handedness) {
  document.documentElement.classList.remove('mouse-left-handed', 'mouse-right-handed');
  document.documentElement.classList.add(`mouse-${handedness}-handed`);
  console.log("Applied mouse handedness:", handedness);
}

// Function to apply sound settings
function applySoundSettings(settings) {
  window.win95Settings.soundEffects = settings.soundEffects;
  window.win95Settings.startupSound = settings.startupSound;
  
  // Play a sound if sound effects are enabled and volume > 0
  if (settings.soundEffects && settings.volume > 0) {
    const audio = new Audio("/windows-ding.mp3");
    audio.volume = settings.volume / 100;
    audio.play().catch(e => console.warn("Sound playback failed:", e));
  }
}

// Export a function to update settings that can be called from React
window.win95UpdateSettings = function(settings) {
  console.log("Updating settings:", settings);
  
  // Update our global settings object with the new values
  if (settings.resolution) window.win95Settings.resolution = settings.resolution;
  if (settings.colorDepth) window.win95Settings.colorDepth = settings.colorDepth;
  if (settings.mouseSpeed) window.win95Settings.mouseSpeed = settings.mouseSpeed;
  if (settings.mouseHandedness) window.win95Settings.mouseHandedness = settings.mouseHandedness;
  if (settings.soundEffects !== undefined) window.win95Settings.soundEffects = settings.soundEffects;
  if (settings.startupSound !== undefined) window.win95Settings.startupSound = settings.startupSound;
  if (settings.volume !== undefined) window.win95Settings.volume = settings.volume;
  if (settings.selectedEvent !== undefined) window.win95Settings.selectedEvent = settings.selectedEvent;
  
  // Apply the individual settings
  if (settings.resolution) applyResolution(settings.resolution);
  if (settings.colorDepth) applyColorDepth(settings.colorDepth);
  if (settings.mouseSpeed) applyMouseSpeed(settings.mouseSpeed);
  if (settings.mouseHandedness) applyMouseHandedness(settings.mouseHandedness);
  
  // Apply sound settings if any sound-related setting was changed
  if (settings.soundEffects !== undefined || 
      settings.startupSound !== undefined || 
      settings.volume !== undefined || 
      settings.selectedEvent !== undefined) {
    applySoundSettings(window.win95Settings);
  }
  
  // Store settings in localStorage for persistence
  localStorage.setItem('win95Settings', JSON.stringify(window.win95Settings));
  
  // Show feedback animation
  document.documentElement.classList.add('settings-updated');
  setTimeout(() => {
    document.documentElement.classList.remove('settings-updated');
  }, 1000);
  
  return true; // Indicate success
};
