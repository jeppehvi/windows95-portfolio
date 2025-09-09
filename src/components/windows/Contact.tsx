import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="h-full p-4 bg-win95-white overflow-auto win95-scrollbar">
      {/* Dialog Header */}
      <div className="mb-4">
        <h2 className="text-sm font-bold">Contact Information</h2>
        <div className="text-xs text-win95-dark-gray">Send me a message or find me online</div>
      </div>

      {/* Contact Info Section */}
      <div className="win95-window mb-4 max-w-lg">
        <div className="win95-title-bar">
          <span>📧 Contact Details</span>
        </div>
        <div className="p-3 bg-win95-white">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <strong>Email:</strong> your.email@example.com
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <strong>LinkedIn:</strong> linkedin.com/in/yourprofile
            </div>
            <div className="flex items-center gap-2">
              <span>💻</span>
              <strong>GitHub:</strong> github.com/yourusername
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <strong>Location:</strong> Your City, Country
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="win95-window max-w-lg">
        <div className="win95-title-bar">
          <span>📝 Send Message</span>
        </div>
        <div className="p-3 bg-win95-white">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-1 text-xs win95-sunken-border"
                style={{
                  borderTopColor: 'hsl(var(--win95-dark-gray))',
                  borderLeftColor: 'hsl(var(--win95-dark-gray))',
                  borderRightColor: 'hsl(var(--win95-light-gray))',
                  borderBottomColor: 'hsl(var(--win95-light-gray))'
                }}
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-1 text-xs win95-sunken-border"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold mb-1">Subject:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-1 text-xs win95-sunken-border"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold mb-1">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-1 text-xs win95-sunken-border resize-none"
                required
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button type="submit" className="win95-button px-4 py-1">
                Send
              </button>
              <button 
                type="button" 
                className="win95-button px-4 py-1"
                onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="win95-window w-80">
            <div className="win95-title-bar">
              <span>📧 Message Sent</span>
            </div>
            <div className="p-4 bg-win95-white text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-xs">
                  <strong>Thank you for your message!</strong>
                  <br />
                  I'll get back to you as soon as possible.
                </div>
              </div>
              <button 
                className="win95-button px-4 py-1"
                onClick={closeConfirmation}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};