import { toast } from "@/components/ui/use-toast";

export const Settings = () => {
  const handleShowMessage = () => {
    toast({
      title: "Settings Disabled",
      description: "Settings have been disabled in this version.",
    });
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center flex-1 flex flex-col items-center justify-center">
        <div className="win95-window p-6 max-w-md">
          <h2 className="text-lg mb-4 font-bold">Settings Disabled</h2>
          <p className="mb-4">Settings functionality has been disabled in this version of the application.</p>
          <p className="mb-4">If you need to adjust display or other settings, please use your system's native controls.</p>
          <div className="flex justify-center">
            <button 
              className="win95-button px-4 py-1"
              onClick={handleShowMessage}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1">
        {/* Left sidebar */}
        <div className="w-1/4 border-r border-win95-dark-gray pr-2">
          <div className="text-xs font-bold mb-2">Control Panel</div>
          <div className="grid grid-cols-1 gap-1">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 p-1 text-xs cursor-pointer ${
                  activeTab === tab.id ? 'bg-win95-blue text-win95-white' : 'hover:bg-win95-light-gray'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right content area */}
        <div className="flex-1 p-2">
          {activeTab === "display" && (
            <div className="flex flex-col h-full">
              <div className="text-xs font-bold mb-2">Display Properties</div>
              <div className="win95-sunken-border p-2 mb-2 flex-1">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">🖥️</div>
                    <div className="text-xs">Screen Resolution</div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs">640 x 480</div>
                    <input 
                      type="range" 
                      min="1" 
                      max="3" 
                      value={resolution} 
                      onChange={(e) => setResolution(Number(e.target.value))} 
                      className="win95-slider" 
                    />
                    <div className="text-xs">1024 x 768</div>
                  </div>
                  <div className="text-xs mt-1 text-center">
                    {resolution === 1 && "640 x 480"}
                    {resolution === 2 && "800 x 600"}
                    {resolution === 3 && "1024 x 768"}
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-xs">Color Palette:</div>
                    <select 
                      className="win95-sunken-border text-xs mt-1 w-full"
                      value={colorDepth}
                      onChange={(e) => setColorDepth(e.target.value)}
                    >
                      <option value="16 Colors">16 Colors</option>
                      <option value="256 Colors">256 Colors</option>
                      <option value="16-bit">High Color (16-bit)</option>
                      <option value="24-bit">True Color (24-bit)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >OK</button>
                <button className="win95-button px-3 py-1 text-xs">Cancel</button>
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >Apply</button>
              </div>
            </div>
          )}
          
          {activeTab === "sound" && (
            <div className="flex flex-col h-full">
              <div className="text-xs font-bold mb-2">Sound Properties</div>
              <div className="win95-sunken-border p-2 mb-2 flex-1">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-xs">Sound Events:</div>
                    <select 
                      size={8} 
                      className="win95-sunken-border text-xs mt-1 w-full"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      <option>Windows Startup</option>
                      <option>Windows Shutdown</option>
                      <option>Program Error</option>
                      <option>Default Beep</option>
                      <option>Critical Stop</option>
                      <option>Exclamation</option>
                      <option>Asterisk</option>
                      <option>Question</option>
                      <option>Menu Command</option>
                    </select>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-xs">Volume:</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">Low</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="flex-1" 
                      />
                      <span className="text-xs">High</span>
                      <span className="text-xs ml-2 w-8">{volume}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <button 
                      className="win95-button px-2 py-1 text-xs"
                      onClick={() => alert("Playing sound: " + selectedEvent)}
                    >Play Sound</button>
                    <button 
                      className="win95-button px-2 py-1 text-xs"
                      onClick={() => alert("Current volume: " + volume + "%")}
                    >Test Volume</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >OK</button>
                <button className="win95-button px-3 py-1 text-xs">Cancel</button>
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >Apply</button>
              </div>
            </div>
          )}
          
          {/* Network tab is removed */}
          
          {activeTab === "mouse" && (
            <div className="flex flex-col h-full">
              <div className="text-xs font-bold mb-2">Mouse Properties</div>
              <div className="win95-sunken-border p-2 mb-2 flex-1">
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-2xl">🖱️</div>
                      <div className="text-xs">Double-click Speed</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs">Slow</div>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={mouseSpeed}
                        onChange={(e) => setMouseSpeed(Number(e.target.value))}
                        className="win95-slider" 
                      />
                      <div className="text-xs">Fast</div>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <div className="text-xs mb-1">Button Configuration:</div>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="mouseButtons" 
                          checked={mouseHandedness === "right"}
                          onChange={() => setMouseHandedness("right")}
                          className="mr-1" 
                        />
                        <span className="text-xs">Right-handed</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="mouseButtons" 
                          checked={mouseHandedness === "left"}
                          onChange={() => setMouseHandedness("left")}
                          className="mr-1" 
                        />
                        <span className="text-xs">Left-handed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >OK</button>
                <button className="win95-button px-3 py-1 text-xs">Cancel</button>
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >Apply</button>
              </div>
            </div>
          )}
          
          {activeTab === "system" && (
            <div className="flex flex-col h-full">
              <div className="text-xs font-bold mb-2">System Properties</div>
              <div className="win95-sunken-border p-2 mb-2 flex-1">
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-xs font-bold">System:</div>
                    <div className="pl-4">
                      <div className="text-xs">Windows 95 Portfolio Experience</div>
                      <div className="text-xs">Version 4.00.950</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-bold">Computer:</div>
                    <div className="pl-4">
                      <div className="text-xs">Modern Browser on {navigator.platform || "Unknown Platform"}</div>
                      <div className="text-xs">RAM: Limited only by your browser</div>
                    </div>
                  </div>
                  
                  <div className="win95-window p-2">
                    <div className="text-xs font-bold mb-1">About This Portfolio</div>
                    <div className="text-xs">
                      <p>This Windows 95-style portfolio is built with React and TypeScript.</p>
                      <p className="mt-1">It demonstrates my creative approach to web development and attention to detail.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >OK</button>
                <button className="win95-button px-3 py-1 text-xs">Cancel</button>
                <button 
                  className="win95-button px-3 py-1 text-xs"
                  onClick={handleApplySettings}
                >Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
