import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Maximize2, Minimize2, X, Sparkles, RefreshCw, Zap, Sliders } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface MatrixRainProps {
  opacity?: number;
  className?: string;
  isBackground?: boolean;
  speedMultiplier?: number;
  interactive?: boolean;
  forceFullscreen?: boolean;
  onClose?: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({
  opacity = 0.35,
  className = '',
  isBackground = true,
  speedMultiplier = 1,
  interactive = true,
  forceFullscreen = false,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isFullscreenState, setIsFullscreenState] = useState<boolean>(false);
  const isFullscreen = forceFullscreen || isFullscreenState;
  const [colorTheme, setColorTheme] = useState<'matrix-green' | 'cyber-cyan' | 'amber-gold'>('matrix-green');
  const [speedLevel, setSpeedLevel] = useState<'normal' | 'fast' | 'warp'>('normal');
  const [showControls, setShowControls] = useState<boolean>(false);

  const handleClose = () => {
    setIsFullscreenState(false);
    if (onClose) {
      onClose();
    }
  };

  // Mouse tracking for interactive ripples
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    // Characters array: authentic Katakana, Latin, Math, and programming tokens
    const characters = (
      'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ' +
      '0123456789' +
      'ABCDEFXYZ' +
      'λπΣΩ{}[];/*+=~<>$#&|!^%@:?'
    ).split('');

    const fontSize = 15;
    let columns = 0;
    // Primary drops
    let drops: number[] = [];
    let dropSpeeds: number[] = [];
    let dropChars: string[] = [];
    // Secondary interleaved drops for continuous unbroken cascading density
    let drops2: number[] = [];
    let dropSpeeds2: number[] = [];
    let dropChars2: string[] = [];

    const setupCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      columns = Math.floor(rect.width / fontSize);
      const totalRows = Math.max(Math.ceil(rect.height / fontSize), 20);

      drops = [];
      dropSpeeds = [];
      dropChars = [];
      drops2 = [];
      dropSpeeds2 = [];
      dropChars2 = [];

      for (let i = 0; i < columns; i++) {
        // Stagger drops across full vertical height immediately so rain is active with zero delay
        drops[i] = Math.floor(Math.random() * totalRows);
        dropSpeeds[i] = 0.55 + Math.random() * 0.75;
        dropChars[i] = characters[Math.floor(Math.random() * characters.length)];

        // Secondary staggered stream ensures no column ever becomes empty
        drops2[i] = (drops[i] + Math.floor(totalRows / 2)) % totalRows;
        dropSpeeds2[i] = 0.55 + Math.random() * 0.75;
        dropChars2[i] = characters[Math.floor(Math.random() * characters.length)];
      }
    };

    setupCanvas();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isRunning) return;

      // Delta time normalized to 60fps (16.67ms) to prevent stutter on any refresh rate
      const rawDelta = currentTime - lastTime;
      lastTime = currentTime;
      const dt = Math.min(Math.max(rawDelta / 16.667, 0.4), 2.5);

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Semi-transparent fade layer creates the iconic trailing glow
      if (isDark) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.12)';
      } else {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.16)';
      }
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace, "Courier New"`;

      const mouse = mousePosRef.current;
      const mouseCol = Math.floor(mouse.x / fontSize);

      const speedMult = (speedLevel === 'warp' ? 2.0 : speedLevel === 'fast' ? 1.4 : 1.0) * speedMultiplier;

      // Helper function to render an active drop stream
      const renderDropStream = (
        dropArray: number[],
        speedArray: number[],
        charArray: string[],
        isSecondary = false
      ) => {
        for (let i = 0; i < columns; i++) {
          const x = i * fontSize;
          const y = dropArray[i] * fontSize;

          // Shimmer: randomize glyph occasionally
          if (Math.random() > 0.82) {
            charArray[i] = characters[Math.floor(Math.random() * characters.length)];
          }
          const char = charArray[i];

          const isNearMouse = mouse.active && Math.abs(i - mouseCol) <= 2 && Math.abs(y - mouse.y) < 130;

          // Render only when within or just exiting canvas boundaries
          if (y >= -fontSize && y <= height + fontSize * 2) {
            if (isNearMouse) {
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#34d399';
              ctx.shadowBlur = 14;
            } else if (Math.random() > 0.94) {
              // Bright sparkling lead glyph
              ctx.fillStyle = '#f0fdf4';
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#10b981';
            } else {
              ctx.shadowBlur = 0;
              if (colorTheme === 'matrix-green') {
                ctx.fillStyle = isDark
                  ? (isSecondary ? '#059669' : '#10b981')
                  : (isSecondary ? '#065f46' : '#047857');
              } else if (colorTheme === 'cyber-cyan') {
                ctx.fillStyle = isDark
                  ? (isSecondary ? '#0891b2' : '#06b6d4')
                  : (isSecondary ? '#0e7490' : '#0284c7');
              } else {
                ctx.fillStyle = isDark
                  ? (isSecondary ? '#d97706' : '#f59e0b')
                  : (isSecondary ? '#92400e' : '#b45309');
              }
            }

            ctx.fillText(char, x, y);
          }

          // Advance position smoothly with delta time
          const extraMouseSpeed = isNearMouse ? 1.8 : 1.0;
          dropArray[i] += speedArray[i] * speedMult * extraMouseSpeed * dt;

          // CONTINUOUS LOOP: immediately recycle to top without delay
          if (dropArray[i] * fontSize > height) {
            dropArray[i] = -Math.floor(Math.random() * 4);
            speedArray[i] = 0.55 + Math.random() * 0.75;
          }
        }
      };

      // Render both interleaved streams for continuous, non-stop rain density
      renderDropStream(drops, dropSpeeds, dropChars, false);
      renderDropStream(drops2, dropSpeeds2, dropChars2, true);
    };

    animationFrameId = requestAnimationFrame(render);

    // Mouse event handlers for interactive ripples
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    if (interactive && canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isRunning, isDark, colorTheme, speedLevel, speedMultiplier, interactive]);

  // Keyboard shortcut to close fullscreen with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col'
          : isBackground
          ? `absolute inset-0 pointer-events-none overflow-hidden ${className}`
          : `relative w-full h-full min-h-[300px] overflow-hidden ${className}`
      }`}
      style={!isFullscreen && isBackground ? { opacity } : undefined}
    >
      <canvas
        ref={canvasRef}
        className={`block w-full h-full ${interactive && !isBackground ? 'cursor-crosshair' : ''}`}
      />

      {/* Fullscreen Overlay Header & Controls Bar */}
      {isFullscreen && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10 text-white animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono text-emerald-400 font-bold text-xs">
              01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-emerald-400 tracking-wide">
                  DEV_ENGINEERING_MATRIX_SIMULATOR
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  LIVE STREAM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Interactive Canvas • Move cursor to trigger electromagnetic wave disturbance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
              <button
                onClick={() => setColorTheme('matrix-green')}
                className={`px-2 py-1 rounded ${colorTheme === 'matrix-green' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Matrix Green
              </button>
              <button
                onClick={() => setColorTheme('cyber-cyan')}
                className={`px-2 py-1 rounded ${colorTheme === 'cyber-cyan' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Cyber Cyan
              </button>
              <button
                onClick={() => setColorTheme('amber-gold')}
                className={`px-2 py-1 rounded ${colorTheme === 'amber-gold' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Amber
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
              <button
                onClick={() => setSpeedLevel('normal')}
                className={`px-2 py-1 rounded ${speedLevel === 'normal' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeedLevel('fast')}
                className={`px-2 py-1 rounded ${speedLevel === 'fast' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
              >
                1.5x
              </button>
              <button
                onClick={() => setSpeedLevel('warp')}
                className={`px-2 py-1 rounded ${speedLevel === 'warp' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                2.2x
              </button>
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title={isRunning ? 'Pause' : 'Resume'}
            >
              {isRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Exit Fullscreen */}
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              title="Exit Fullscreen (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Pill (When in background mode) */}
      {isBackground && (
        <div className="pointer-events-auto absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-1.5">
          <button
            onClick={() => setIsFullscreenState(true)}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono shadow-lg hover:border-emerald-500/60 transition-all flex items-center gap-1.5 backdrop-blur-sm group cursor-pointer"
            title="Expand Fullscreen Matrix Digital Rain"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Matrix Rain Mode</span>
            <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
