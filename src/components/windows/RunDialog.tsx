import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface RunDialogProps {
  onOpenWindow?: (windowId: string) => void;
  onClose?: () => void;
}

export const RunDialog = ({ onOpenWindow, onClose }: RunDialogProps) => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([
    "notepad.exe", 
    "mspaint.exe", 
    "cmd.exe"
  ]);
  
  const handleRun = () => {
    if (!command.trim()) {
      toast({
        title: "Error",
        description: "Please enter a command to run.",
        variant: "destructive"
      });
      return;
    }
    
    const cmd = command.toLowerCase();
    
    // Add to history if not already there
    if (!history.includes(command)) {
      setHistory(prev => [command, ...prev].slice(0, 10)); // Keep last 10 commands
    }
    
    // Handle special commands
    if (cmd.includes("notepad")) {
      toast({
        title: "Running Command",
        description: "Opening Notepad...",
      });
      if (onOpenWindow) onOpenWindow("resume");
    } else if (cmd.includes("paint") || cmd.includes("mspaint")) {
      toast({
        title: "Running Command",
        description: "Opening Paint...",
      });
    } else if (cmd.includes("cmd") || cmd.includes("command")) {
      toast({
        title: "Running Command",
        description: "Opening Command Prompt...",
      });
    } else if (cmd.includes("explorer") || cmd.includes("file")) {
      toast({
        title: "Running Command",
        description: "Opening File Explorer...",
      });
      if (onOpenWindow) onOpenWindow("projects");
    } else if (cmd.includes("calc")) {
      toast({
        title: "Running Command",
        description: "Opening Calculator...",
      });
    } else if (cmd.includes("http") || cmd.includes("www")) {
      toast({
        title: "Running Command",
        description: `Opening web browser to ${command}...`,
      });
      window.open(command.startsWith("http") ? command : `http://${command}`, "_blank");
    } else if (cmd === "about" || cmd === "about.exe") {
      toast({
        title: "Running Command",
        description: "Opening About Me...",
      });
      if (onOpenWindow) onOpenWindow("about");
    } else if (cmd === "contact" || cmd === "contact.exe") {
      toast({
        title: "Running Command",
        description: "Opening Contact...",
      });
      if (onOpenWindow) onOpenWindow("contact");
    } else if (cmd === "settings" || cmd === "control" || cmd === "control.exe") {
      toast({
        title: "Running Command",
        description: "Opening Settings...",
      });
      if (onOpenWindow) onOpenWindow("settings");
    } else if (cmd === "find" || cmd === "find.exe") {
      toast({
        title: "Running Command",
        description: "Opening Find Dialog...",
      });
      if (onOpenWindow) onOpenWindow("find");
    } else if (cmd === "help" || cmd === "help.exe") {
      toast({
        title: "Running Command",
        description: "Opening Help...",
      });
      if (onOpenWindow) onOpenWindow("help");
    } else {
      toast({
        title: "Error",
        description: `Cannot find the program '${command}'. Make sure you typed the name correctly, and then try again.`,
        variant: "destructive"
      });
    }
    
    // Reset command
    setCommand("");
  };

  return (
    <div className="flex flex-col">
      <div className="win95-sunken-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏃</span>
          <span className="text-xs font-bold">Type the name of a program, folder, document, or internet resource, and Windows will open it for you.</span>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="text-xs w-12">Open:</div>
          <div className="flex-1 relative">
            <input 
              type="text" 
              className="win95-sunken-border text-xs w-full h-5" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRun();
                }
              }}
              list="command-history"
            />
            <datalist id="command-history">
              {history.map((cmd, index) => (
                <option key={index} value={cmd} />
              ))}
            </datalist>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={handleRun}
        >OK</button>
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={() => window.close()}
        >Cancel</button>
        <button 
          className="win95-button px-4 py-1 text-xs"
          onClick={() => alert("Browse feature coming soon...")}
        >Browse...</button>
      </div>
    </div>
  );
};
