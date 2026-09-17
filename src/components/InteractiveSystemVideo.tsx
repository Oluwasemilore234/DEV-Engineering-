import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, FastForward, Rewind, CheckCircle2, ShieldCheck, Terminal, Cpu, Database, Server, Activity } from 'lucide-react';

interface LogItem {
  id: number;
  time: string;
  type: 'info' | 'success' | 'cmd' | 'warn';
  text: string;
}

const EXECUTION_STEPS = [
  {
    step: 1,
    title: "Static Verification & AST Lint",
    command: "dev-eng check --strict --types=strict-null",
    metrics: { cpu: "8%", mem: "240MB", throughput: "12,400 lps", latency: "1.2ms" },
    logs: [
      { id: 1, time: "00:00.12", type: "cmd" as const, text: "$ dev-eng verify --config=enterprise.sop.json" },
      { id: 2, time: "00:00.24", type: "info" as const, text: "Scanning 184 TypeScript modules with strict AST validation..." },
      { id: 3, time: "00:00.68", type: "success" as const, text: "✓ 0 lint warnings • 0 type errors • 100% strict contracts verified" },
    ]
  },
  {
    step: 2,
    title: "Automated Test Pyramid & Mutation",
    command: "vitest run --coverage && playwright test --workers=8",
    metrics: { cpu: "38%", mem: "480MB", throughput: "148 suites", latency: "4.8ms" },
    logs: [
      { id: 4, time: "00:01.05", type: "cmd" as const, text: "$ vitest --coverage.threshold=90" },
      { id: 5, time: "00:01.42", type: "info" as const, text: "Running 148 unit test suites & 32 Playwright E2E browser flows..." },
      { id: 6, time: "00:02.10", type: "success" as const, text: "✓ 1,280/1,280 tests passed (95.4% branch coverage, 0 flakiness)" },
    ]
  },
  {
    step: 3,
    title: "Docker Multi-Stage Compilation",
    command: "docker buildx build --platform=linux/amd64 -t app:prod .",
    metrics: { cpu: "52%", mem: "820MB", throughput: "1.2GB img", latency: "12ms" },
    logs: [
      { id: 7, time: "00:02.50", type: "cmd" as const, text: "$ docker buildx bake --push --provenance=true" },
      { id: 8, time: "00:02.90", type: "info" as const, text: "Stripping build toolchain • Distroless Alpine container: 18.4MB" },
      { id: 9, time: "00:03.35", type: "success" as const, text: "✓ Snyk vulnerability scan: 0 CVEs • Image signed with Cosign" },
    ]
  },
  {
    step: 4,
    title: "Multi-Region Terraform Canary Deploy",
    command: "terraform apply -auto-approve -var-file=prod.tfvars",
    metrics: { cpu: "44%", mem: "640MB", throughput: "3 Regions", latency: "8.4ms" },
    logs: [
      { id: 10, time: "00:03.80", type: "cmd" as const, text: "$ aws ecs update-service --cluster=dev-prod --canary=10%" },
      { id: 11, time: "00:04.25", type: "info" as const, text: "Promoting traffic: us-east-1 (50%), eu-west-1 (30%), ap-southeast-1 (20%)" },
      { id: 12, time: "00:04.90", type: "success" as const, text: "✓ Zero-downtime blue/green health check: HTTP 200 on all edge nodes" },
    ]
  },
  {
    step: 5,
    title: "Production Telemetry & 99.99% SLA",
    command: "dev-eng monitor --sla=99.99 --p99=target",
    metrics: { cpu: "14%", mem: "512MB", throughput: "48,200 rps", latency: "18.2ms" },
    logs: [
      { id: 13, time: "00:05.20", type: "cmd" as const, text: "$ datadog-agent status --check=synthetic-heartbeat" },
      { id: 14, time: "00:05.70", type: "info" as const, text: "Ingesting 48,200 req/sec • p99 API Latency: 18.2ms • Error rate: 0.00%" },
      { id: 15, time: "00:06.10", type: "success" as const, text: "✓ System fully stabilized • Automatic failover & DB replicas synced" },
    ]
  }
];

export const InteractiveSystemVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'terminal' | 'topology'>('terminal');
  const [progress, setProgress] = useState<number>(0);
  const [stageCycle, setStageCycle] = useState<number>(0);

  // Auto-play timer: Sequentially advances Stages 1 through 5 with zero skipping
  useEffect(() => {
    if (!isPlaying) return;

    // Total execution duration per stage (4000ms / playback speed)
    const stageDuration = 4000 / speed;
    const intervalMs = 50;
    const increment = (intervalMs / stageDuration) * 100;

    let localProgress = progress;
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;

    const timer = setInterval(() => {
      localProgress += increment;

      if (localProgress >= 100) {
        clearInterval(timer);
        setProgress(100);

        // Allow 200ms at 100% completion before advancing strictly to the next sequential stage
        transitionTimer = setTimeout(() => {
          setCurrentStepIdx((prevIdx) => (prevIdx + 1) % EXECUTION_STEPS.length);
          setProgress(0);
        }, 200);
      } else {
        setProgress(Math.min(99.9, localProgress));
      }
    }, intervalMs);

    return () => {
      clearInterval(timer);
      if (transitionTimer) {
        clearTimeout(transitionTimer);
      }
    };
  }, [isPlaying, speed, currentStepIdx, stageCycle]);

  const currentStep = EXECUTION_STEPS[currentStepIdx];

  const goToStep = (stepIdx: number) => {
    setCurrentStepIdx(stepIdx);
    setProgress(0);
    setStageCycle((c) => c + 1);
  };

  const handleNextStep = () => {
    setCurrentStepIdx((prev) => (prev + 1) % EXECUTION_STEPS.length);
    setProgress(0);
    setStageCycle((c) => c + 1);
  };

  const handlePrevStep = () => {
    setCurrentStepIdx((prev) => (prev - 1 + EXECUTION_STEPS.length) % EXECUTION_STEPS.length);
    setProgress(0);
    setStageCycle((c) => c + 1);
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setProgress(0);
    setIsPlaying(true);
    setStageCycle((c) => c + 1);
  };

  return (
    <div className="relative rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl shadow-emerald-500/10 overflow-hidden text-slate-100 font-sans">
      {/* Video Window Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 gap-2">
        
        {/* Left: Window Dots & Recording Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Recording Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            LIVE REC • 4K 60FPS
          </div>

          <span className="text-xs font-mono text-slate-400 hidden md:inline">
            DevEng-Pipeline // Phase 0{currentStep.step} of 05
          </span>
        </div>

        {/* Center: View Switcher Tabs */}
        <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-md transition-colors font-mono flex items-center gap-1.5 ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3 h-3" />
            Terminal Stream
          </button>
          <button
            onClick={() => setActiveTab('topology')}
            className={`px-3 py-1 rounded-md transition-colors font-mono flex items-center gap-1.5 ${
              activeTab === 'topology'
                ? 'bg-slate-800 text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" />
            System Topology
          </button>
        </div>

        {/* Right: Telemetry Speed & Status */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 4 : 1)}
            className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px]"
            title="Toggle playback speed"
          >
            {speed}x SPEED
          </button>
          <div className="hidden sm:flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">Zero Downtime</span>
          </div>
        </div>
      </div>

      {/* Main Video Viewport Canvas */}
      <div className="relative p-6 sm:p-7 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 overflow-hidden">
        
        {/* Subtle scanline effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
        
        {/* Animated ambient background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

        {/* Content View 1: Terminal Execution Stream */}
        {activeTab === 'terminal' ? (
          <div className="relative z-10 space-y-4">
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    STAGE 0{currentStep.step}
                  </span>
                  <span className="text-white font-bold text-sm sm:text-base">
                    {currentStep.title}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">{currentStep.command}</span>
                </div>
              </div>

              {/* Real-time Telemetry Pills */}
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-slate-500 mr-1">CPU:</span>
                  <span className="text-emerald-400 font-bold">{currentStep.metrics.cpu}</span>
                </div>
                <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-slate-500 mr-1">RAM:</span>
                  <span className="text-cyan-400 font-bold">{currentStep.metrics.mem}</span>
                </div>
                <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-slate-500 mr-1">p99:</span>
                  <span className="text-teal-300 font-bold">{currentStep.metrics.latency}</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Terminal Output Lines */}
            <div className="font-mono text-xs sm:text-sm space-y-2 py-2 min-h-[135px]">
              <AnimatePresence mode="popLayout">
                {currentStep.logs.map((log, logIdx) => {
                  // Reveal logs progressively as the stage advances:
                  // Command executes immediately, execution progress appears at 25%, verification succeeds at 65%
                  const isVisible =
                    logIdx === 0
                      ? true
                      : logIdx === 1
                      ? progress >= 25
                      : progress >= 65;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={`${currentStep.step}-${log.id}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border leading-relaxed ${
                        log.type === 'cmd'
                          ? 'bg-slate-900/60 border-slate-800 text-slate-200 font-semibold'
                          : log.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium'
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 shrink-0 select-none pt-0.5">
                        [{log.time}]
                      </span>
                      <span className="break-all">{log.text}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Blinking Cursor & Execution Status */}
              <div className="flex items-center gap-2 text-emerald-400 pt-1">
                <span className="text-slate-500 select-none">&gt;</span>
                <span className="w-2.5 h-4 bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-slate-400 font-mono">
                  {progress < 100
                    ? `Stage 0${currentStep.step}/05 in progress • ${Math.round(progress)}% executed`
                    : `Stage 0${currentStep.step}/05 verified • transitioning to next stage...`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Content View 2: Live Distributed Architecture Topology */
          <div className="relative z-10 flex flex-col justify-center items-center py-6 space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                Distributed Cloud Topology (Multi-Region Active/Active)
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time data packets flowing through ingress mesh and PostgreSQL replica cluster
              </p>
            </div>

            {/* Topology Diagram Nodes */}
            <div className="w-full max-w-xl grid grid-cols-4 gap-3 text-center text-xs font-mono relative">
              {/* Node 1: Client Edge */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center space-y-1 relative">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="font-bold text-white text-[11px]">Client Edge</span>
                <span className="text-[9px] text-emerald-400">Next.js / CDN</span>
                {/* Connecting Pulse Line */}
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-emerald-500/40" />
              </div>

              {/* Node 2: API Gateway */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col items-center justify-center space-y-1 shadow-lg shadow-cyan-500/5 relative">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <span className="font-bold text-white text-[11px]">API Gateway</span>
                <span className="text-[9px] text-cyan-400">Envoy Mesh</span>
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-cyan-500/40" />
              </div>

              {/* Node 3: Microservices Pods */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-teal-500/40 flex flex-col items-center justify-center space-y-1 shadow-lg shadow-teal-500/5 relative">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-bold text-white text-[11px]">Service Mesh</span>
                <span className="text-[9px] text-teal-400">Node/Go Pods</span>
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-teal-500/40" />
              </div>

              {/* Node 4: PostgreSQL Shards */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex flex-col items-center justify-center space-y-1 shadow-lg shadow-emerald-500/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <span className="font-bold text-white text-[11px]">Data Tier</span>
                <span className="text-[9px] text-emerald-400">PostgreSQL ACID</span>
              </div>
            </div>

            {/* Live Metrics Row */}
            <div className="w-full max-w-xl grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Global Ingress</span>
                <span className="text-emerald-400 font-bold">48,200 req/s</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">p99 Latency</span>
                <span className="text-cyan-400 font-bold">18.2ms</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Cluster Uptime</span>
                <span className="text-teal-300 font-bold">99.994%</span>
              </div>
            </div>
          </div>
        )}

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 space-y-3">
          
          {/* Milestone Step Indicator Tabs */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {EXECUTION_STEPS.map((stepItem, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => goToStep(idx)}
                  className={`p-1.5 sm:p-2.5 rounded-lg text-left transition-all text-xs font-mono relative overflow-hidden cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-900 border border-emerald-500/80 text-white font-bold shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : isPast
                      ? 'bg-slate-950/60 border border-slate-800 text-emerald-400/80 hover:bg-slate-900/60'
                      : 'bg-slate-950/40 border border-slate-800/50 text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={isCurrent ? 'text-emerald-400 font-bold' : isPast ? 'text-emerald-500' : ''}>
                      STAGE 0{stepItem.step}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="truncate text-[10px] sm:text-[11px] mt-1 text-slate-300">
                    {stepItem.title}
                  </div>

                  {/* Active Scrubber Progress Fill for current step */}
                  {isCurrent ? (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-emerald-400 transition-all duration-75 ease-linear"
                      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    />
                  ) : isPast ? (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500/30" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Interactive Player Controls (Play, Pause, Restart, Previous, Next) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
                title={isPlaying ? 'Pause Pipeline Execution' : 'Resume Pipeline Execution'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Restart from Stage 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevStep}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Previous Stage"
              >
                <Rewind className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextStep}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Next Stage"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                {isPlaying ? `Executing Stage 0${currentStep.step} of 05` : 'Execution Paused'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="hidden md:inline text-emerald-400 font-medium">
                Deterministic 5-Stage Pipeline
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Stage {currentStepIdx + 1} of 5 ({Math.round(progress)}%)
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
