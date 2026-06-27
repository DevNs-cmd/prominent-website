import React, { useEffect, useRef } from "react";

export function GrowthEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      const newCtx = canvas.getContext("2d");
      if (newCtx) {
        newCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    window.addEventListener("resize", handleResize);

    // Particle system for upward growth flow
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      color: string;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 35;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height,
        size: Math.random() * 2 + 1.5,
        speedY: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#85bde2" : "#d4e6f4",
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Smooth mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw blueprint grid lines on background of the engine
      ctx.strokeStyle = "rgba(133, 189, 226, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw trajectory arc (glass ribbon)
      ctx.save();
      ctx.strokeStyle = "rgba(212, 230, 244, 0.2)";
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(133, 189, 226, 0.2)";
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      // Curved sweep reflecting the logo swoosh, responsive to mouse position
      const ctrlX = width * 0.3 + (mouse.x - width / 2) * 0.25;
      const ctrlY = height * 0.85 + (mouse.y - height / 2) * 0.25;
      ctx.moveTo(width * 0.1, height * 0.8);
      ctx.quadraticCurveTo(ctrlX, ctrlY, width * 0.9, height * 0.2);
      ctx.stroke();

      // Highlight line in the glass ribbon
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.8);
      ctx.quadraticCurveTo(ctrlX, ctrlY, width * 0.9, height * 0.2);
      ctx.stroke();
      ctx.restore();

      // Draw metallic structural pillars (rising growth pillars from logo)
      const pillars = [
        { x: width * 0.35, targetHeight: height * 0.45, w: 20 },
        { x: width * 0.5, targetHeight: height * 0.58, w: 24 },
        { x: width * 0.65, targetHeight: height * 0.7, w: 22 },
      ];

      pillars.forEach((p, idx) => {
        // Interactivity offset
        const dx = mouse.x - p.x;
        const dy = mouse.y - (height - p.targetHeight);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 150 - dist) / 150;
        const hOffset = Math.sin(time * 2 + idx) * 8 + force * 25;

        const currentHeight = p.targetHeight + hOffset;
        const topY = height - currentHeight;
        const bottomY = height - 20;

        // Pillar shading gradient (Metallic Silver to Graphite/Steel)
        const grad = ctx.createLinearGradient(p.x - p.w/2, 0, p.x + p.w/2, 0);
        grad.addColorStop(0, "#1c1c1e");
        grad.addColorStop(0.3, "#a1a1aa");
        grad.addColorStop(0.5, "#d4e6f4");
        grad.addColorStop(0.7, "#a1a1aa");
        grad.addColorStop(1, "#1c1c1e");

        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.w / 2, topY, p.w, bottomY - topY);

        // Pillar glass top cap
        ctx.fillStyle = "rgba(133, 189, 226, 0.4)";
        ctx.beginPath();
        ctx.ellipse(p.x, topY, p.w / 2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.stroke();
      });

      // Draw upward arrow representing strategy/momentum
      ctx.save();
      const arrowX = width * 0.8;
      const arrowY = height * 0.18 + Math.sin(time * 3) * 6;
      ctx.translate(arrowX, arrowY);
      ctx.rotate(-Math.PI / 6); // Slanted arrow pointing top-right

      // Shadow/Glow
      ctx.shadowColor = "rgba(133, 189, 226, 0.6)";
      ctx.shadowBlur = 20;

      // Draw stylized arrow
      ctx.fillStyle = "#85bde2";
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(14, 8);
      ctx.lineTo(5, 8);
      ctx.lineTo(5, 22);
      ctx.lineTo(-5, 22);
      ctx.lineTo(-5, 8);
      ctx.lineTo(-14, 8);
      ctx.closePath();
      ctx.fill();

      // Highlight stroke
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Update & Draw particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.wobble += p.wobbleSpeed;
        const currentX = p.x + Math.sin(p.wobble) * 12;

        // Reset particle if it goes off screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(currentX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Draw connection lines between nearby particles for a digital grid feel
      ctx.strokeStyle = "rgba(133, 189, 226, 0.07)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x + Math.sin(particles[i].wobble) * 12, particles[i].y);
            ctx.lineTo(particles[j].x + Math.sin(particles[j].wobble) * 12, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] bg-gradient-to-br from-[#0D0D0D]/40 to-transparent border border-white/[0.04] rounded-sm overflow-hidden flex items-center justify-center">
      {/* Blueprint grid frame overlay */}
      <div className="absolute top-4 left-4 text-[9px] tracking-widest text-[#85bde2]/30 uppercase font-mono">
        3D GROWTH ENGINE // PROPULSION SYSTEM
      </div>
      <div className="absolute bottom-4 right-4 text-[8px] tracking-widest text-[#717182]/50 font-mono">
        COORD_REF [22.7196_N, 75.8577_E] // SCALE 1:1.2
      </div>
      
      {/* Subtle mechanical ticks */}
      <div className="absolute inset-x-4 top-4 h-[1px] bg-white/[0.03] flex justify-between">
        <span className="w-1.5 h-1.5 bg-[#85bde2]/20 border border-[#85bde2]/30 -mt-[3px]"></span>
        <span className="w-1.5 h-1.5 bg-[#85bde2]/20 border border-[#85bde2]/30 -mt-[3px]"></span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
    </div>
  );
}
