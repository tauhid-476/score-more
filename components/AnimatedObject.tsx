
import { useEffect, useRef } from 'react';

export default function AnimatedObject() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 500;
    canvas.height = 500;
    
    const particles: Particle[] = [];
    const particleCount = 40;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100)}, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw main circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, 110
      );
      
      gradient.addColorStop(0, 'rgba(40, 200, 100, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 80, 40, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off the edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Calculate distance from center
        const dx = canvas.width / 2 - particle.x;
        const dy = canvas.height / 2 - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connection lines if close to center
        if (distance < 170) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.strokeStyle = `rgba(40, 200, 100, ${0.1 - distance / 1700})`;
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      // Cancel animation if component unmounts
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full max-w-[500px] h-[500px] mx-auto opacity-80 animate-float"
    />
  );
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}




