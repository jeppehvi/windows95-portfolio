export const Resume = () => {
  return (
    <div className="h-full flex flex-col">
      {/* WordPad Header */}
      <div className="border-b border-win95-dark-gray p-1">
        <div className="flex items-center gap-2 mt-1 text-xs">
          <button className="win95-button px-2 py-1">📄</button>
          <button className="win95-button px-2 py-1">📁</button>
          <button className="win95-button px-2 py-1">💾</button>
          <button className="win95-button px-2 py-1">🖨️</button>
          <div className="w-px h-4 bg-win95-dark-gray mx-1"></div>
          <button className="win95-button px-2 py-1"><strong>B</strong></button>
          <button className="win95-button px-2 py-1"><em>I</em></button>
          <button className="win95-button px-2 py-1"><u>U</u></button>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 p-4 bg-white overflow-auto win95-scrollbar">
        <div className="max-w-2xl mx-auto font-system text-xs leading-relaxed">
          
          {/* Header */}
          <div className="text-center border-b-2 border-win95-black pb-2 mb-4">
            <h1 className="text-lg font-bold">[Your Name]</h1>
            <div className="text-xs mt-1">
              Full Stack Developer | [Your Email] | [Your Phone] | [Your Location]
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-win95-dark-gray mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-xs">
              Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. 
              Proficient in modern JavaScript frameworks, cloud technologies, and database design. 
              Passionate about creating intuitive user experiences and writing clean, maintainable code.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-win95-dark-gray mb-2">PROFESSIONAL EXPERIENCE</h2>
            
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Senior Full Stack Developer</h3>
                  <div className="text-xs">Tech Company Inc.</div>
                </div>
                <div className="text-xs">2021 - Present</div>
              </div>
              <ul className="text-xs mt-1 ml-4 space-y-1">
                <li>• Developed and maintained 5+ React applications serving 100K+ users</li>
                <li>• Implemented CI/CD pipelines reducing deployment time by 60%</li>
                <li>• Led team of 4 developers in agile development practices</li>
                <li>• Optimized database queries improving application performance by 40%</li>
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Full Stack Developer</h3>
                  <div className="text-xs">Digital Solutions LLC</div>
                </div>
                <div className="text-xs">2019 - 2021</div>
              </div>
              <ul className="text-xs mt-1 ml-4 space-y-1">
                <li>• Built RESTful APIs using Node.js and Express serving 50K+ requests daily</li>
                <li>• Designed responsive web applications with React and Tailwind CSS</li>
                <li>• Integrated third-party APIs including payment gateways and analytics</li>
                <li>• Collaborated with UX designers to implement pixel-perfect designs</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-win95-dark-gray mb-2">TECHNICAL SKILLS</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <strong>Frontend:</strong>
                <br />React, Vue.js, TypeScript, HTML5, CSS3, Tailwind CSS
              </div>
              <div>
                <strong>Backend:</strong>
                <br />Node.js, Express, Python, FastAPI, Django
              </div>
              <div>
                <strong>Databases:</strong>
                <br />PostgreSQL, MongoDB, Redis, MySQL
              </div>
              <div>
                <strong>Tools & Cloud:</strong>
                <br />Git, Docker, AWS, Azure, Jenkins, Figma
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-win95-dark-gray mb-2">EDUCATION</h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                <div className="text-xs">University Name</div>
              </div>
              <div className="text-xs">2015 - 2019</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <h2 className="text-sm font-bold border-b border-win95-dark-gray mb-2">CERTIFICATIONS</h2>
            <ul className="text-xs space-y-1">
              <li>• AWS Certified Developer Associate (2023)</li>
              <li>• Google Cloud Professional Developer (2022)</li>
              <li>• MongoDB Certified Developer (2021)</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-win95-dark-gray mt-6 pt-2 border-t border-win95-dark-gray">
            References available upon request | Portfolio: yourwebsite.com
          </div>
        </div>
      </div>
    </div>
  );
};