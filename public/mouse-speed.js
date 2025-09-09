/* Add a small script to demonstrate mouse speed effect */
(function() {
  // Create a small div that follows the mouse cursor with varying speeds
  const mouseSpeedIndicator = document.createElement('div');
  mouseSpeedIndicator.style.cssText = `
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  `;
  document.body.appendChild(mouseSpeedIndicator);
  
  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  // Follow cursor with delay based on speed setting
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Animation loop
  function updatePosition() {
    // Get current mouse speed setting
    let speedClass = Array.from(document.documentElement.classList)
      .find(cls => cls.startsWith('mouse-speed-'));
    let speed = speedClass ? parseInt(speedClass.split('-')[2]) : 3;
    
    // Calculate lag factor based on speed (higher speed = less lag)
    const lagFactor = 0.1 * (6 - speed);
    
    // Get current position
    const rect = mouseSpeedIndicator.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;
    
    // Calculate new position with lag
    const newX = currentX + (mouseX - currentX) * lagFactor;
    const newY = currentY + (mouseY - currentY) * lagFactor;
    
    // Apply new position
    mouseSpeedIndicator.style.left = `${newX}px`;
    mouseSpeedIndicator.style.top = `${newY}px`;
    
    // Repeat
    requestAnimationFrame(updatePosition);
  }
  
  // Start the animation loop
  updatePosition();
})();
