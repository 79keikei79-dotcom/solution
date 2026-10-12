/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Play, RotateCcw, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import {
  Step1DistilleryScene,
  Step2BiogasScene,
  Step3CHPEngineScene,
  Step4MechanicalPowerScene,
} from './components/StepScenesOneToFour';
import {
  Step5SelfSufficientScene,
  Step6PelletPressScene,
  Step7GreenDistributionScene,
} from './components/StepScenesFiveToSeven';

interface StepConfig {
  id: number;
  title: string;
  accentColor: string;
  borderColor: string;
  Component: React.FC<{ isPlaying: boolean; playKey: number }>;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    title: '01. Distillery Plant',
    accentColor: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-400/35',
    Component: Step1DistilleryScene,
  },
  {
    id: 2,
    title: '02. Biogas Tank',
    accentColor: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-400/35',
    Component: Step2BiogasScene,
  },
  {
    id: 3,
    title: '03. CHP Engine Brawl',
    accentColor: 'from-rose-400 to-pink-600',
    borderColor: 'border-rose-400/35',
    Component: Step3CHPEngineScene,
  },
  {
    id: 4,
    title: '04. Mechanical Power & Electricity',
    accentColor: 'from-yellow-300 to-amber-500',
    borderColor: 'border-yellow-400/35',
    Component: Step4MechanicalPowerScene,
  },
  {
    id: 5,
    title: '05. 100% Self-Sufficient Loop',
    accentColor: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-400/35',
    Component: Step5SelfSufficientScene,
  },
  {
    id: 6,
    title: '06. Biomass Pellet Press',
    accentColor: 'from-orange-400 to-amber-600',
    borderColor: 'border-orange-400/35',
    Component: Step6PelletPressScene,
  },
  {
    id: 7,
    title: '07. Green Distribution',
    accentColor: 'from-emerald-400 to-lime-500',
    borderColor: 'border-emerald-400/35',
    Component: Step7GreenDistributionScene,
  },
];

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [playingMap, setPlayingMap] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });
  const [playKeyMap, setPlayKeyMap] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const stepRefs = useRef<Record<number, HTMLElement | null>>({});

  const scrollToStep = (stepId: number) => {
    const clamped = Math.max(1, Math.min(7, stepId));
    setActiveStep(clamped);
    setPlayingMap((prev) => ({ ...prev, [clamped]: true }));
    setPlayKeyMap((prev) => ({ ...prev, [clamped]: (prev[clamped] || 0) + 1 }));
    const target = stepRefs.current[clamped];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePlay = (stepId: number) => {
    setActiveStep(stepId);
    setPlayingMap((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const handleAgain = (stepId: number) => {
    setActiveStep(stepId);
    setPlayingMap((prev) => ({ ...prev, [stepId]: true }));
    setPlayKeyMap((prev) => ({ ...prev, [stepId]: (prev[stepId] || 0) + 1 }));
  };

  const handleResetAll = () => {
    setPlayingMap({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true });
    setPlayKeyMap((prev) => {
      const next: Record<number, number> = {};
      for (let i = 1; i <= 7; i++) {
        next[i] = (prev[i] || 0) + 1;
      }
      return next;
    });
    scrollToStep(1);
  };

  return (
    <div className="min-h-screen bg-[#0B1021] text-white">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#0B1021]/90 backdrop-blur-xl border-b border-white/10">
        <a
          href="#step-1"
          onClick={(e) => {
            e.preventDefault();
            scrollToStep(1);
          }}
          className="text-xl font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0"
        >
          Stillage to Energy
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-300">
          <a
            href="#step-1"
            onClick={(e) => {
              e.preventDefault();
              scrollToStep(1);
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            01. Distillery
          </a>
          <a
            href="#step-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToStep(2);
            }}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
          >
            02. Biogas Tank
          </a>
          <a
            href="#step-3"
            onClick={(e) => {
              e.preventDefault();
              scrollToStep(3);
            }}
            className="hover:text-rose-300 transition-colors whitespace-nowrap shrink-0"
          >
            03. CHP Engine
          </a>
          <a
            href="#step-5"
            onClick={(e) => {
              e.preventDefault();
              scrollToStep(5);
            }}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            05. Self-Sufficient
          </a>
          <a
            href="#step-7"
            onClick={(e) => {
              e.preventDefault();
              scrollToStep(7);
            }}
            className="hover:text-lime-300 transition-colors whitespace-nowrap shrink-0"
          >
            07. Distribution
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            onClick={handleResetAll}
            className="clay-btn px-4 py-2 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wide cursor-pointer whitespace-nowrap shrink-0"
          >
            Restart Show
          </button>
        </div>
      </header>

      {/* Visual Title Banner & 7-Step Quick Scannable Stepper */}
      <section className="max-w-6xl mx-auto pt-8 pb-4 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-5">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Turning Stillage Into Energy
          </h1>

          {/* Interactive 7-Step Visual Anchor Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-3xl bg-[#131C38] border border-white/10">
            {STEPS.map((st) => {
              const isCurrent = activeStep === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => scrollToStep(st.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold font-display transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? `bg-gradient-to-r ${st.accentColor} text-slate-950 shadow-lg scale-105`
                      : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {st.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main 7-Step Visual Story Presentation (Images & Controls Only — Zero Explanatory Text) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        {STEPS.map((step) => {
          const SceneComponent = step.Component;
          const isPlaying = playingMap[step.id] ?? true;
          const playKey = playKeyMap[step.id] ?? 0;

          return (
            <section
              key={step.id}
              id={`step-${step.id}`}
              ref={(el) => {
                stepRefs.current[step.id] = el;
              }}
              className={`rounded-[2.25rem] p-5 sm:p-7 bg-[#131C38] border-2 ${step.borderColor} clay-stage transition-all`}
            >
              {/* Step Visual Title Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br ${step.accentColor} text-slate-950 font-extrabold text-lg font-display shadow-md`}
                  >
                    {step.id}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                    {step.title}
                  </h2>
                </div>

                <span className="text-xs font-bold text-slate-400 font-mono tabular-nums">
                  STEP {step.id} / 7
                </span>
              </div>

              {/* 16:9 3D Claymation Animated Visual Stage */}
              <SceneComponent isPlaying={isPlaying} playKey={playKey} />

              {/* Mandatory 4-Button High-Contrast Rounded Control Deck */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {/* 1. Previous Step */}
                <button
                  onClick={() => scrollToStep(step.id - 1)}
                  disabled={step.id === 1}
                  className="clay-btn flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-base font-display border-2 border-slate-600 cursor-pointer whitespace-nowrap"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.75]" />
                  <span>Previous Step</span>
                </button>

                {/* 2. Play */}
                <button
                  onClick={() => handlePlay(step.id)}
                  className={`clay-btn flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl font-extrabold text-base font-display border-2 cursor-pointer whitespace-nowrap ${
                    isPlaying
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 border-emerald-200'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-200'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current stroke-[2.5]" />
                  <span>Play</span>
                </button>

                {/* 3. Again */}
                <button
                  onClick={() => handleAgain(step.id)}
                  className="clay-btn flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-base font-display border-2 border-cyan-200 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-5 h-5 stroke-[2.75]" />
                  <span>Again</span>
                </button>

                {/* 4. Next Step */}
                <button
                  onClick={() => scrollToStep(step.id + 1)}
                  disabled={step.id === 7}
                  className="clay-btn flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-rose-500 hover:bg-rose-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-base font-display border-2 border-rose-300 cursor-pointer whitespace-nowrap"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.75]" />
                </button>
              </div>
            </section>
          );
        })}
      </main>

      {/* Quiet Footer Action */}
      <footer className="max-w-6xl mx-auto px-6 py-10 text-center">
        <button
          onClick={() => scrollToStep(1)}
          className="clay-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-white/15 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Back to Step 1</span>
        </button>
      </footer>
    </div>
  );
}
