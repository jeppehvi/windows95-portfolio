export const AboutMe = () => {
  return (
    <div className="p-4 font-system text-xs">
      {/* Notepad-style header */}
      <div className="border-b border-win95-dark-gray pb-2 mb-4">
        <h2 className="font-bold text-sm">about.txt</h2>
      </div>

      {/* Content in monospace font like Notepad */}
      <div className="font-mono text-xs leading-relaxed space-y-4">
        <div>
          <strong>System Information:</strong>
          <br />
          Name: [Your Name]
          <br />
          Title: Full Stack Developer
          <br />
          Operating System: Windows 95 Portfolio Edition
          <br />
          Location: [Your Location]
        </div>

        <div>
          <strong>Biography:</strong>
          <br />
          Welcome to my retro portfolio! I'm a passionate developer who loves 
          creating modern solutions with a touch of nostalgia. This Windows 95 
          interface represents my attention to detail and appreciation for 
          computing history.
        </div>

        <div>
          <strong>Technical Skills:</strong>
          <br />
          • Programming Languages: JavaScript, TypeScript, Python, Java
          <br />
          • Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS
          <br />
          • Backend: Node.js, Express, FastAPI, Django
          <br />
          • Databases: PostgreSQL, MongoDB, Redis
          <br />
          • Tools: Git, Docker, AWS, Figma
        </div>

        <div>
          <strong>Interests:</strong>
          <br />
          When I'm not coding, you can find me exploring retro computing, 
          playing classic video games, or contributing to open source projects. 
          I believe in writing clean, maintainable code and creating delightful 
          user experiences.
        </div>

        <div className="mt-6 p-2 border border-win95-dark-gray bg-win95-light-gray">
          <strong>Fun Fact:</strong> This entire portfolio was built using modern 
          React and TypeScript, but styled to perfectly recreate the Windows 95 
          experience. It's a testament to both my technical skills and attention 
          to detail! 💾
        </div>
      </div>
    </div>
  );
};