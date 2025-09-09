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
}
