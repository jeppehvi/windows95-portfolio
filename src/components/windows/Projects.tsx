import { useState } from "react";

interface Project {
  id: string;
  name: string;
  icon: string;
  description?: string;
  technologies?: string[];
  link?: string;
  demoLink?: string;
}

export const Projects = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showProperties, setShowProperties] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'ecommerce',
      name: 'E-Commerce Platform',
      type: 'folder',
      icon: '📁',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      link: 'https://github.com/yourname/ecommerce',
      demoLink: 'https://ecommerce-demo.com'
    },
    {
      id: 'portfolio',
      name: 'Windows 95 Portfolio',
      type: 'folder',
      icon: '📁',
      description: 'This very portfolio - a pixel-perfect Windows 95 recreation',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      link: 'https://github.com/yourname/win95-portfolio'
    },
    {
      id: 'chatapp',
      name: 'Real-time Chat App',
      type: 'folder',
      icon: '📁',
      description: 'WebSocket-based chat application with rooms and file sharing',
      technologies: ['Vue.js', 'Socket.io', 'Express', 'MongoDB'],
      link: 'https://github.com/yourname/chat-app',
      demoLink: 'https://chat-demo.com'
    },
    {
      id: 'ai-tool',
      name: 'AI Content Generator',
      type: 'file',
      icon: '📄',
      description: 'Tool for generating marketing content using AI APIs',
      technologies: ['Python', 'FastAPI', 'OpenAI API', 'React'],
      link: 'https://github.com/yourname/ai-content-tool'
    },
    {
      id: 'readme',
      name: 'README.TXT',
      type: 'file',
      icon: '📄',
      description: 'Project information and setup instructions'
    }
  ];

  const handleDoubleClick = (project: Project) => {
    setShowProperties(project);
  };

  const closeProperties = () => {
    setShowProperties(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Explorer Header */}
      <div className="flex items-center border-b-2 border-win95-white p-1">
        <div className="flex-1 win95-sunken-border p-1 text-xs h-6">
          Address: C:\Portfolio\Projects
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-2">
        <div className="grid grid-cols-1 gap-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center gap-2 p-1 text-xs cursor-pointer ${
                selectedItem === project.id ? 'bg-win95-blue text-win95-white' : 'hover:bg-win95-light-gray'
              }`}
              onClick={() => setSelectedItem(project.id)}
              onDoubleClick={() => handleDoubleClick(project)}
            >
              <span className="text-base">{project.icon}</span>
              <span>{project.name}</span>
              <span className="text-xs text-win95-dark-gray ml-auto">
                {project.type === 'folder' ? 'File Folder' : 'Text Document'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Dialog */}
      {showProperties && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="win95-window w-80">
            <div className="win95-title-bar">
              <div className="flex items-center gap-1">
                <span className="text-base">{showProperties.icon}</span>
                <span>{showProperties.name} Properties</span>
              </div>
              <button 
                className="win95-button p-0 w-4 h-4 flex items-center justify-center"
                onClick={closeProperties}
              >
                ×
              </button>
            </div>
            
            <div className="p-4 bg-win95-white">
              <div className="space-y-3 text-xs">
                <div>
                  <strong>Name:</strong> {showProperties.name}
                </div>
                <div>
                  <strong>Type:</strong> {showProperties.type === 'folder' ? 'File Folder' : 'Text Document'}
                </div>
                {showProperties.description && (
                  <div>
                    <strong>Description:</strong> {showProperties.description}
                  </div>
                )}
                {showProperties.technologies && (
                  <div>
                    <strong>Technologies:</strong> {showProperties.technologies.join(', ')}
                  </div>
                )}
                {showProperties.link && (
                  <div>
                    <strong>GitHub:</strong>{' '}
                    <a 
                      href={showProperties.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-win95-blue underline"
                    >
                      View Source Code
                    </a>
                  </div>
                )}
                {showProperties.demoLink && (
                  <div>
                    <strong>Live Demo:</strong>{' '}
                    <a 
                      href={showProperties.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-win95-blue underline"
                    >
                      View Demo
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button className="win95-button px-3 py-1" onClick={closeProperties}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};