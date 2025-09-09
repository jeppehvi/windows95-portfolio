import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const FindDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("(C:)");
  const [searchSubfolders, setSearchSubfolders] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [includeSystem, setIncludeSystem] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([
    { name: "Resume.doc", type: "Document", icon: "📄" },
    { name: "Portfolio.pdf", type: "PDF Document", icon: "📄" },
    { name: "Projects", type: "File Folder", icon: "📁" }
  ]);
  const [resultsVisible, setResultsVisible] = useState(true);

  const handleSearch = () => {
    setIsSearching(true);
    setResultsVisible(true);
    
    // Simulate search delay
    setTimeout(() => {
      // Generate some "search results" based on the search term
      const term = searchTerm.toLowerCase();
      let results = [];
      
      if (term === "") {
        results = [
          { name: "Resume.doc", type: "Document", icon: "📄" },
          { name: "Portfolio.pdf", type: "PDF Document", icon: "📄" },
          { name: "Projects", type: "File Folder", icon: "📁" }
        ];
      } else if (term.includes("resume") || term.includes("cv")) {
        results = [
          { name: "Resume.doc", type: "Document", icon: "📄" },
          { name: "Resume_old.doc", type: "Document", icon: "📄" },
          { name: "CV_2023.pdf", type: "PDF Document", icon: "📄" }
        ];
      } else if (term.includes("project") || term.includes("work")) {
        results = [
          { name: "Projects", type: "File Folder", icon: "📁" },
          { name: "Project1.txt", type: "Text Document", icon: "📄" },
          { name: "Work_samples", type: "File Folder", icon: "📁" }
        ];
      } else if (term.includes("portfolio") || term.includes("web")) {
        results = [
          { name: "Portfolio.pdf", type: "PDF Document", icon: "📄" },
          { name: "Website_mockup.png", type: "PNG Image", icon: "🖼️" },
          { name: "portfolio_src", type: "File Folder", icon: "📁" }
        ];
      } else {
        results = [
          { name: `Search_${term}.txt`, type: "Text Document", icon: "📄" },
          { name: "No matches.txt", type: "Text Document", icon: "📄" }
        ];
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleStop = () => {
    setIsSearching(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="win95-sunken-border p-4 mb-4">
        <div className="text-xs font-bold mb-4">Find: Files or Folders</div>
        
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <div className="text-xs w-24">Named:</div>
            <input 
              type="text" 
              className="win95-sunken-border text-xs flex-1 h-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter file name..."
            />
          
          <div className="flex gap-2 items-center">
            <div className="text-xs w-24">Look in:</div>
            <select 
              className="win95-sunken-border text-xs flex-1 h-5"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            >
              <option>(C:)</option>
              <option>My Computer</option>
              <option>Desktop</option>
              <option>My Documents</option>
            </select>
          </div>
          
          <div className="flex gap-2 items-start mt-2">
            <div className="w-24"></div>
            <div className="flex-1">
              <div className="win95-window p-2">
                <div className="text-xs font-bold mb-2">Search options</div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-1" 
                      checked={searchSubfolders}
                      onChange={() => setSearchSubfolders(!searchSubfolders)}
                    />
                    <span className="text-xs">Search subfolders</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-1"
                      checked={caseSensitive}
                      onChange={() => setCaseSensitive(!caseSensitive)} 
                    />
                    <span className="text-xs">Case sensitive</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-1"
                      checked={includeSystem}
                      onChange={() => setIncludeSystem(!includeSystem)}
                    />
                    <span className="text-xs">Include system folders</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {resultsVisible && (
        <div className="win95-sunken-border p-4 mb-4 flex-1 overflow-auto">
          <div className="text-xs font-bold mb-2">
            {isSearching ? "Searching..." : "Search Results:"}
          </div>
          
          {isSearching ? (
            <div className="flex items-center gap-2 p-4 justify-center">
              <div className="text-base animate-spin">⏳</div>
              <div className="text-xs">Searching for "{searchTerm}" in {searchLocation}...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              {searchResults.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-1 text-xs hover:bg-win95-blue hover:text-win95-white cursor-pointer">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="text-xs text-win95-dark-gray ml-auto hover:text-win95-white">{item.type}</span>
                </div>
              ))}
              
              {searchResults.length === 0 && (
                <div className="text-xs text-center p-2">No items match your search.</div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={handleSearch}
          disabled={isSearching}
        >Find Now</button>
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={handleStop}
          disabled={!isSearching}
        >Stop</button>
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={() => window.close()}
        >Close</button>
      </div>
      </div>
    </div>
  );
};
