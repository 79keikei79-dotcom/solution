import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClayDefs,
  BottleCharacter,
  StillageCharacter,
  PopBurst,
  MicrobeCharacter,
  CH4Character,
  O2Character,
  CO2Character,
  H2OCharacter,
  ThermalEnergyBadge,
  ElectricalEnergyBadge,
  BrawlCloud,
} from './ClayFiltersAndCharacters';

export interface SceneProps {
  isPlaying: boolean;
  playKey: number;
}

/* ============================================================================
   STEP 1: DISTILLERY PLANT
   - Camera zooms into the factory interior
   - As soon as the FIRST bottle appears at the start of the conveyor belt
     (right out of the distillation still), "Stillage" immediately pops out
     with a "POP!" effect while the bottle then travels down the conveyor belt!
   ============================================================================ */
export const Step1DistilleryScene: React.FC<SceneProps> = ({ isPlaying, playKey }) => {
  const [phase, setPhase] = useState<number>(0); // 0: Wide Factory, 1: Zoom In Interior
  const [cycle, setCycle] = useState<number>(0);

  useEffect(() => {
    setPhase(0);
    setCycle(0);
  }, [playKey]);

  useEffect(() => {
    if (!isPlaying) return;
    const zoomTimer = setTimeout(() => {
      setPhase(1);
    }, 1600);
    const cycleInterval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 2400);
    return () => {
      clearTimeout(zoomTimer);
      clearInterval(cycleInterval);
    };
  }, [isPlaying, playKey]);

  const cameraScale = phase === 0 ? 1 : 1.32;
  const cameraX = phase === 0 ? 0 : 25;
  const cameraY = phase === 0 ? 0 : -40;

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* Animated Camera Group */}
        <motion.g
          animate={{
            scale: cameraScale,
            x: cameraX,
            y: cameraY,
          }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '500px 300px' }}
        >
          {/* Night Sky Hills & Stars */}
          <circle cx="150" cy="95" r="4" fill="#FDE047" opacity="0.7" />
          <circle cx="840" cy="80" r="5" fill="#38BDF8" opacity="0.7" />
          <path d="M0,440 Q250,390 520,440 T1000,430 L1000,560 L0,560 Z" fill="#131C3E" />
          <rect x="0" y="465" width="1000" height="95" fill="#0F172A" />

          {/* 3D Clay Distillery Building */}
          <g filter="url(#clay-shadow)">
            {/* Chimneys with Puffy Steam */}
            <rect x="330" y="75" width="44" height="110" rx="10" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="3" />
            <rect x="400" y="95" width="40" height="90" rx="10" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="3" />

            {isPlaying && (
              <>
                <motion.circle
                  cx="352"
                  cy="55"
                  r="18"
                  fill="#E2E8F0"
                  opacity="0.6"
                  animate={{ y: [-5, -35], opacity: [0.65, 0], scale: [0.8, 1.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                  cx="420"
                  cy="70"
                  r="14"
                  fill="#E2E8F0"
                  opacity="0.5"
                  animate={{ y: [-5, -30], opacity: [0.6, 0], scale: [0.8, 1.3] }}
                  transition={{ duration: 2.3, repeat: Infinity, delay: 0.6 }}
                />
              </>
            )}

            {/* Main Factory Body */}
            <rect
              x="250"
              y="155"
              width="620"
              height="320"
              rx="36"
              fill="#1E293B"
              stroke="#38BDF8"
              strokeWidth="5"
            />

            {/* Roof Sign */}
            <rect x="420" y="128" width="280" height="48" rx="18" fill="url(#copper-grad)" stroke="#FEF08A" strokeWidth="3" />
            <text
              x="560"
              y="159"
              textAnchor="middle"
              fill="#FEF9C3"
              fontSize="24"
              fontWeight="900"
              fontFamily="Bricolage Grotesque, sans-serif"
            >
              DISTILLERY
            </text>

            {/* Interior Cutaway Room Window */}
            <rect
              x="285"
              y="195"
              width="550"
              height="245"
              rx="24"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="4"
            />

            {/* Left Side Byproduct Chute (right next to the Still where the first bottle appears) */}
            <path
              d="M320,340 L210,320 L210,385 L320,375 Z"
              fill="url(#steel-grad)"
              stroke="#94A3B8"
              strokeWidth="3"
            />

            {/* Copper Distillation Still at the Start of the Conveyor Belt */}
            <g transform="translate(365, 315)">
              <rect x="-42" y="45" width="84" height="40" rx="10" fill="#334155" />
              <circle cx="0" cy="10" r="46" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="3" />
              <path d="M-22,-28 L0,-75 L22,-28 Z" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="2.5" />
              <path d="M8,-65 Q55,-85 75,-30" stroke="#FDBA74" strokeWidth="10" fill="none" strokeLinecap="round" />
              {/* Cute Still Face */}
              <circle cx="-14" cy="6" r="4.5" fill="#431407" />
              <circle cx="14" cy="6" r="4.5" fill="#431407" />
              <path d="M-7,18 Q0,25 7,18" stroke="#431407" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Conveyor Belt System */}
            <g transform="translate(435, 365)">
              {/* Belt Track */}
              <rect x="0" y="0" width="320" height="32" rx="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
              {/* Spinning Rollers */}
              {[30, 95, 160, 225, 290].map((rx, idx) => (
                <g key={idx} transform={`translate(${rx}, 16)`}>
                  <motion.g
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="0" cy="0" r="11" fill="#94A3B8" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#1E293B" strokeWidth="3" />
                    <line x1="0" y1="-8" x2="0" y2="8" stroke="#1E293B" strokeWidth="3" />
                  </motion.g>
                </g>
              ))}

              {/* First Bottle Emerging at the Start of the Conveyor + Subsequent Bottles Moving Along */}
              <motion.g
                key={`first-bottle-${cycle}`}
                initial={{ x: 18, scale: 0.2, opacity: 0 }}
                animate={
                  isPlaying
                    ? { x: [18, 18, 96], scale: [0.2, 1.05, 0.95], opacity: [0, 1, 1] }
                    : { x: 18, scale: 0.95, opacity: 1 }
                }
                transition={{ duration: 2.4, times: [0, 0.15, 1], ease: 'linear' }}
              >
                <BottleCharacter x={0} y={-18} scale={0.95} />
              </motion.g>

              {[1, 2, 3].map((bIdx) => (
                <motion.g
                  key={`${cycle}-${bIdx}`}
                  initial={{ x: bIdx * 78 + 18 }}
                  animate={isPlaying ? { x: (bIdx + 1) * 78 + 18 } : { x: bIdx * 78 + 18 }}
                  transition={{ duration: 2.4, ease: 'linear' }}
                >
                  <BottleCharacter x={0} y={-18} scale={0.95} />
                </motion.g>
              ))}
            </g>
          </g>

          {/* Finished Bottle Collection Crate on Right */}
          <g transform="translate(790, 420)" filter="url(#clay-soft)">
            <rect x="-35" y="-25" width="70" height="45" rx="10" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2.5" />
            <text x="0" y="2" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="800">
              SPIRITS
            </text>
          </g>

          {/* STILLAGE POPS OUT IMMEDIATELY WHEN THE FIRST BOTTLE APPEARS AT THE START OF THE BELT! */}
          <AnimatePresence mode="popLayout">
            <motion.g
              key={`stillage-spawn-${cycle}`}
              initial={{ x: 340, y: 335, scale: 0.2, opacity: 0 }}
              animate={{
                x: [340, 225, 145],
                y: [335, 240, 395],
                scale: [0.3, 1.2, 1.05],
                opacity: [1, 1, 1],
              }}
              transition={{ duration: 1.15, times: [0, 0.4, 1], ease: 'easeOut' }}
            >
              <StillageCharacter x={0} y={0} scale={1.15} showLabel={true} />
            </motion.g>
          </AnimatePresence>

          {/* Comic "POP!" Burst right when the first bottle & Stillage appear */}
          <AnimatePresence>
            <motion.g
              key={`pop-burst-${cycle}`}
              initial={{ x: 255, y: 265, scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.35, 1, 0],
                opacity: [0, 1, 1, 0],
                rotate: [-12, 8, -5, 0],
              }}
              transition={{ duration: 0.95, times: [0, 0.25, 0.7, 1] }}
            >
              <PopBurst x={0} y={0} scale={1.18} />
            </motion.g>
          </AnimatePresence>

          {/* Accumulated Stillage Pile on the Left Ground */}
          <g transform="translate(140, 435)">
            <StillageCharacter x={-35} y={10} scale={0.85} showLabel={false} />
            <StillageCharacter x={28} y={12} scale={0.8} showLabel={false} />
            <StillageCharacter x={0} y={0} scale={1.1} showLabel={true} />
          </g>
        </motion.g>
      </svg>
    </div>
  );
};

/* ============================================================================
   STEP 2: BIOGAS DIGESTER TANK
   - No zoom in / zoom out effects: full clear view at all times
   - Inlet pipe is positioned LOW, horizontally aligned with the bottom Fibrous Residue layer
   - Sub-stage 0: Stillage enters through low pipe into bottom of tank in its original Stillage shape
   - Sub-stage 1: Microbes gather around and voraciously chomp/chew the Stillage
   - Sub-stage 2: After being chewed by microbes, Stillage transforms into settled "Fibrous Residue"
                  at the bottom while green gas bubbles & "CH₄" float up to the top dome
   ============================================================================ */
export const Step2BiogasScene: React.FC<SceneProps> = ({ isPlaying, playKey }) => {
  const [subStage, setSubStage] = useState<number>(0); // 0: Stillage enters low pipe, 1: Microbes chomp Stillage, 2: Turns into Fibrous Residue + CH4 rises

  useEffect(() => {
    setSubStage(0);
  }, [playKey]);

  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => setSubStage(1), 2200);
    const t2 = setTimeout(() => setSubStage(2), 5200);
    const loop = setTimeout(() => setSubStage(0), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(loop);
    };
  }, [isPlaying, subStage === 0 ? playKey : undefined]);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* Ground Floor */}
        <rect x="0" y="485" width="1000" height="75" fill="#090D1E" />

        {/* LOW Transparent Pipe Aligned Horizontally with the Bottom Fibrous Residue Zone (y = 415) */}
        <g>
          <path
            d="M 40,415 L 365,415"
            stroke="url(#glass-pipe)"
            strokeWidth="56"
            strokeLinecap="round"
          />
          <path
            d="M 40,389 L 365,389"
            stroke="#7DD3FC"
            strokeWidth="3"
            strokeOpacity="0.65"
          />
          <path
            d="M 40,441 L 365,441"
            stroke="#0284C7"
            strokeWidth="3"
            strokeOpacity="0.65"
          />

          {/* SubStage 0: Stillage Blobs sliding through the low pipe into the bottom of the tank */}
          {subStage === 0 && (
            <>
              <motion.g
                initial={{ x: 65, y: 415 }}
                animate={isPlaying ? { x: [65, 390] } : { x: 200 }}
                transition={{ duration: 2.0, ease: 'easeInOut' }}
              >
                <StillageCharacter x={0} y={0} scale={0.82} showLabel={true} />
              </motion.g>
              <motion.g
                initial={{ x: -20, y: 415 }}
                animate={isPlaying ? { x: [45, 320] } : { x: 110 }}
                transition={{ duration: 2.0, ease: 'easeInOut', delay: 0.25 }}
              >
                <StillageCharacter x={0} y={0} scale={0.75} showLabel={false} />
              </motion.g>
            </>
          )}
        </g>

        {/* Sealed Anaerobic Biogas Tank (Static Full View — No Zoom In / Out) */}
        <g transform="translate(565, 275)" filter="url(#clay-shadow)">
          {/* Outer Dome & Tank Shell */}
          <path
            d="M-215,-40 C-215,-165 215,-165 215,-40 L215,145 C215,190 120,215 0,215 C-120,215 -215,190 -215,145 Z"
            fill="#1E293B"
            stroke="#10B981"
            strokeWidth="6"
          />

          {/* Cutaway Tank Interior */}
          <path
            d="M-196,-35 C-196,-145 196,-145 196,-35 L196,135 C196,175 110,198 0,198 C-110,198 -196,175 -196,135 Z"
            fill="#0B132B"
          />

          {/* Low Pipe Entry Flange on Left Bottom Wall of Tank */}
          <ellipse cx="-196" cy="140" rx="8" ry="26" fill="#38BDF8" opacity="0.6" />

          {/* Top Trapped Biogas Cloud Layer (Green Glow when CH4 rises in SubStage 2) */}
          <motion.path
            d="M-192,-35 C-192,-142 192,-142 192,-35 L192,10 L-192,10 Z"
            fill="#059669"
            animate={{ opacity: subStage === 2 ? 0.6 : 0.18 }}
            transition={{ duration: 0.6 }}
          />

          {/* Middle Liquid Slurry Layer */}
          <rect x="-194" y="10" width="388" height="175" rx="20" fill="#1E293B" opacity="0.45" />

          {/* =================================================================
              BOTTOM ZONE OF TANK:
              - SubStage 0 & 1: Stillage is in its ORIGINAL StillageCharacter shape!
              - SubStage 1: Microbes swarm and chomp Stillage voraciously!
              - SubStage 2: Stillage transforms into settled "Fibrous Residue"!
             ================================================================= */}
          {subStage < 2 && (
            <g transform="translate(0, 140)">
              {/* Original Stillage Blobs sitting at the bottom of the tank */}
              <motion.g
                animate={
                  subStage === 1
                    ? {
                        scale: [1, 0.92, 0.82, 0.65, 0.45],
                        rotate: [-3, 4, -4, 3, 0],
                      }
                    : { scale: 1 }
                }
                transition={{ duration: 2.8, ease: 'easeInOut' }}
              >
                <StillageCharacter x={-65} y={8} scale={0.92} showLabel={false} />
                <StillageCharacter x={65} y={8} scale={0.92} showLabel={false} />
                <StillageCharacter x={0} y={0} scale={1.08} showLabel={true} />
              </motion.g>

              {/* Flying Chew Crumbs when Microbes are Chomping in SubStage 1 */}
              {subStage === 1 &&
                [-55, -20, 20, 55].map((cx, i) => (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={-10}
                    r="5"
                    fill="#FBBF24"
                    animate={{
                      y: [-5, -35, -10],
                      x: [cx, cx + (i % 2 === 0 ? -18 : 18)],
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
            </g>
          )}

          {/* SubStage 2: Settled "Fibrous Residue" Layer formed AFTER Microbes chew the Stillage */}
          {subStage === 2 && (
            <motion.g
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.65, ease: 'backOut' }}
              style={{ transformOrigin: '0px 175px' }}
            >
              <path
                d="M-192,122 Q0,108 192,122 L192,145 C192,175 110,198 0,198 C-110,198 -192,175 -192,145 Z"
                fill="#78350F"
                stroke="#D97706"
                strokeWidth="3"
              />
              {/* Fibrous Strands Texture */}
              <path
                d="M-135,145 Q-80,135 -30,150 M20,144 Q80,134 135,148 M-75,168 Q0,158 75,170"
                stroke="#FBBF24"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
              <g transform="translate(0, 162)">
                <rect x="-82" y="-14" width="164" height="28" rx="9" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#FEF3C7"
                  fontSize="14"
                  fontWeight="800"
                  fontFamily="Bricolage Grotesque, sans-serif"
                >
                  Fibrous Residue
                </text>
              </g>
            </motion.g>
          )}

          {/* Microbes:
              - SubStage 0: Waiting in middle layer
              - SubStage 1: Swarming tightly onto the Stillage at the bottom & chomping rapidly!
              - SubStage 2: Floating happily above the newly formed Fibrous Residue */}
          <motion.g
            animate={
              subStage === 0
                ? { x: -120, y: 65, rotate: 0, scale: 1 }
                : subStage === 1
                ? {
                    x: [-65, -48, -65],
                    y: [118, 128, 118],
                    rotate: [12, -14, 12],
                    scale: [1.05, 1.22, 1.05],
                  }
                : { x: -105, y: 82, rotate: [-4, 4, -4], scale: 1.05 }
            }
            transition={
              subStage === 1
                ? { duration: 0.35, repeat: Infinity }
                : { duration: 1.2, repeat: Infinity }
            }
          >
            <MicrobeCharacter x={0} y={0} scale={1.05} variant="purple" />
          </motion.g>

          <motion.g
            animate={
              subStage === 0
                ? { x: 0, y: 55, rotate: 0, scale: 1.05 }
                : subStage === 1
                ? {
                    x: [0, 8, -8, 0],
                    y: [110, 125, 110],
                    rotate: [-12, 12, -12],
                    scale: [1.1, 1.28, 1.1],
                  }
                : { x: 0, y: 78, rotate: [4, -4, 4], scale: 1.1 }
            }
            transition={
              subStage === 1
                ? { duration: 0.32, repeat: Infinity }
                : { duration: 1.4, repeat: Infinity }
            }
          >
            <MicrobeCharacter x={0} y={0} scale={1.08} variant="pink" />
          </motion.g>

          <motion.g
            animate={
              subStage === 0
                ? { x: 120, y: 65, rotate: 0, scale: 1 }
                : subStage === 1
                ? {
                    x: [65, 48, 65],
                    y: [118, 128, 118],
                    rotate: [-14, 12, -14],
                    scale: [1.05, 1.22, 1.05],
                  }
                : { x: 105, y: 82, rotate: [-3, 5, -3], scale: 1.05 }
            }
            transition={
              subStage === 1
                ? { duration: 0.36, repeat: Infinity }
                : { duration: 1.3, repeat: Infinity }
            }
          >
            <MicrobeCharacter x={0} y={0} scale={1.05} variant="purple" />
          </motion.g>

          {/* Rising Green Gas Bubbles & CH₄ Characters (Active during Chomping & Residue Formation) */}
          {subStage >= 1 &&
            [-115, -40, 40, 115].map((bx, i) => (
              <React.Fragment key={i}>
                <motion.circle
                  cx={bx + 20}
                  cy={85}
                  r={11 + (i % 2) * 4}
                  fill="#34D399"
                  fillOpacity="0.5"
                  stroke="#A7F3D0"
                  strokeWidth="2"
                  initial={{ y: 35, opacity: 0 }}
                  animate={{ y: [35, -145], scale: [0.5, 1.15], opacity: [0.9, 0.2] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: 'easeOut',
                  }}
                />
                <motion.g
                  initial={{ x: bx, y: 75, opacity: 0 }}
                  animate={{
                    y: [75, -95],
                    x: [bx, bx + (i % 2 === 0 ? 12 : -12)],
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeInOut',
                  }}
                >
                  <CH4Character x={0} y={0} scale={0.85} />
                </motion.g>
              </React.Fragment>
            ))}

          {/* Accumulated Trapped CH₄ Characters at Top Dome of Tank */}
          {subStage === 2 && (
            <motion.g
              initial={{ opacity: 0, y: -45 }}
              animate={{ opacity: 1, y: -82 }}
              transition={{ duration: 0.6 }}
            >
              <CH4Character x={-95} y={14} scale={0.84} />
              <CH4Character x={-32} y={-8} scale={0.92} />
              <CH4Character x={35} y={-6} scale={0.92} />
              <CH4Character x={98} y={14} scale={0.84} />
            </motion.g>
          )}

          {/* Tank Header Sign: "Biogas Tank" */}
          <g transform="translate(0, -162)">
            <rect x="-95" y="-22" width="190" height="44" rx="16" fill="#065F46" stroke="#34D399" strokeWidth="3.5" />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill="#ECFDF5"
              fontSize="22"
              fontWeight="900"
              fontFamily="Bricolage Grotesque, sans-serif"
            >
              Biogas Tank
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

/* ============================================================================
   STEP 3: CHP ENGINE COMBUSTION BRAWL
   - Shows the Step 2 "Biogas Tank" on the left connected via a top CH₄ gas pipeline
     directly into the "CHP Engine" combustion chamber on the right!
   - Proper subscript chemical formulas: CH₄ + 2O₂ → CO₂ + 2H₂O + Thermal Energy
   ============================================================================ */
export const Step3CHPEngineScene: React.FC<SceneProps> = ({ isPlaying, playKey }) => {
  const [phase, setPhase] = useState<number>(0); // 0: CH4 flows from Biogas Tank to CHP Engine, 1: O2 vs CH4 Brawl, 2: Spark BOOM!, 3: CO2 + H2O + Thermal Energy

  useEffect(() => {
    setPhase(0);
  }, [playKey]);

  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => setPhase(1), 2400);
    const t2 = setTimeout(() => setPhase(2), 5400);
    const t3 = setTimeout(() => setPhase(3), 7400);
    const loop = setTimeout(() => setPhase(0), 12500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(loop);
    };
  }, [isPlaying, phase === 0 ? playKey : undefined]);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* 1. LEFT: Step 2 Biogas Tank Feeding CH₄ from its Top Dome */}
        <g transform="translate(155, 290)" filter="url(#clay-shadow)">
          <path
            d="M-115,-30 C-115,-115 115,-115 115,-30 L115,105 C115,135 65,152 0,152 C-65,152 -115,135 -115,105 Z"
            fill="#1E293B"
            stroke="#10B981"
            strokeWidth="5"
          />
          <path
            d="M-102,-25 C-102,-100 102,-100 102,-25 L102,98 C102,124 58,138 0,138 C-58,138 -102,124 -102,98 Z"
            fill="#0B132B"
          />
          {/* Top Green Biogas Dome */}
          <path
            d="M-100,-25 C-100,-98 100,-98 100,-25 L100,10 L-100,10 Z"
            fill="#059669"
            opacity="0.55"
          />
          <CH4Character x={-42} y={-28} scale={0.72} />
          <CH4Character x={42} y={-28} scale={0.72} />

          {/* Bottom Fibrous Residue inside Biogas Tank */}
          <path
            d="M-100,85 Q0,75 100,85 L100,98 C100,124 58,138 0,138 C-58,138 -100,124 -100,98 Z"
            fill="#78350F"
            stroke="#D97706"
            strokeWidth="2"
          />
          <text x="0" y="116" textAnchor="middle" fill="#FEF3C7" fontSize="11" fontWeight="800">
            Fibrous Residue
          </text>

          {/* Biogas Tank Label */}
          <rect x="-78" y="-122" width="156" height="36" rx="12" fill="#065F46" stroke="#34D399" strokeWidth="2.5" />
          <text
            x="0"
            y="-99"
            textAnchor="middle"
            fill="#ECFDF5"
            fontSize="16"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Biogas Tank
          </text>
        </g>

        {/* 2. CONNECTING GAS PIPELINE FROM BIOGAS TANK TOP DOME TO CHP ENGINE */}
        <g>
          <path
            d="M 155,165 L 155,82 L 420,82 L 420,210"
            fill="none"
            stroke="url(#glass-pipe)"
            strokeWidth="44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 135,165 L 135,62 L 440,62 L 440,210"
            fill="none"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeOpacity="0.65"
            strokeLinejoin="round"
          />
          {/* Traveling CH₄ Characters inside Pipeline from Biogas Tank to CHP Engine */}
          {[0, 1].map((idx) => (
            <motion.g
              key={idx}
              animate={
                isPlaying
                  ? {
                      x: [155, 155, 420, 420],
                      y: [185, 82, 82, 210],
                    }
                  : { x: 285, y: 82 }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: idx * 1.2,
                ease: 'linear',
              }}
            >
              <CH4Character x={0} y={0} scale={0.72} />
            </motion.g>
          ))}
        </g>

        {/* Right O₂ Intake Pipe */}
        <path d="M 880,235 L 985,235" stroke="url(#glass-pipe)" strokeWidth="44" strokeLinecap="round" />
        <O2Character x={945} y={235} scale={0.74} />

        {/* 3. RIGHT: CHP Engine Building & Combustion Chamber */}
        <g transform="translate(640, 265)" filter="url(#clay-shadow)">
          <rect
            x="-255"
            y="-165"
            width="510"
            height="320"
            rx="40"
            fill="#1E293B"
            stroke="#F43F5E"
            strokeWidth="6"
          />
          {/* Engine Header Sign */}
          <rect x="-105" y="-192" width="210" height="40" rx="14" fill="#881337" stroke="#FDA4AF" strokeWidth="3" />
          <text
            x="0"
            y="-166"
            textAnchor="middle"
            fill="#FFE4E6"
            fontSize="20"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            CHP Engine
          </text>

          {/* Inner Combustion Chamber */}
          <rect
            x="-225"
            y="-125"
            width="450"
            height="250"
            rx="26"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="4"
          />

          {/* Stylized Overhead Spark Plug */}
          <g transform="translate(0, -125)">
            <rect x="-20" y="-30" width="40" height="34" rx="8" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
            <rect x="-13" y="4" width="26" height="20" rx="5" fill="#475569" />
            <path d="M-7,24 L-7,38 L4,38" stroke="#FACC15" strokeWidth="4" fill="none" strokeLinecap="round" />
            {(phase === 1 || phase === 2) && (
              <motion.g
                animate={{ scale: [0.8, 1.4, 0.9], opacity: [0.6, 1, 0.7] }}
                transition={{ duration: 0.35, repeat: Infinity }}
              >
                <circle cx="0" cy="40" r="24" fill="#FACC15" opacity="0.45" filter="url(#neon-glow)" />
                <polygon points="0,22 -16,48 -2,46 -10,70 16,40 2,42" fill="#FEF08A" />
              </motion.g>
            )}
          </g>

          {/* PHASE 0: CH₄ and Aggressive O₂ Charging In */}
          {phase === 0 && (
            <g>
              <motion.g
                initial={{ x: -165, y: 5 }}
                animate={{ x: -75, y: 10 }}
                transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse' }}
              >
                <CH4Character x={0} y={0} scale={1.1} />
              </motion.g>
              <motion.g
                initial={{ x: 165, y: -15 }}
                animate={{ x: 75, y: -5 }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
              >
                <O2Character x={0} y={0} scale={1.05} />
              </motion.g>
              <motion.g
                initial={{ x: 165, y: 45 }}
                animate={{ x: 85, y: 35 }}
                transition={{ duration: 0.75, repeat: Infinity, repeatType: 'reverse' }}
              >
                <O2Character x={0} y={0} scale={1.05} />
              </motion.g>
            </g>
          )}

          {/* PHASE 1: Chaotic Comic-Book Dust Cloud Brawl with Sparks */}
          {phase === 1 && (
            <g>
              <BrawlCloud x={0} y={15} scale={1.38} label="BRAWL!" />
              <motion.g
                animate={{ x: [-100, -70, -100], y: [-18, 14, -18], rotate: [-15, 15, -15] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <CH4Character x={0} y={0} scale={1.0} scared={true} />
              </motion.g>
              <motion.g
                animate={{ x: [100, 70, 100], y: [-22, 10, -22], rotate: [15, -15, 15] }}
                transition={{ duration: 0.45, repeat: Infinity }}
              >
                <O2Character x={0} y={0} scale={1.0} />
              </motion.g>
              <motion.g
                animate={{ x: [88, 60, 88], y: [42, 18, 42] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <O2Character x={0} y={0} scale={0.96} />
              </motion.g>
            </g>
          )}

          {/* PHASE 2: Dramatic Spark Plug "BOOM!" Ignition */}
          {phase === 2 && (
            <motion.g
              initial={{ scale: 0.3 }}
              animate={{ scale: [0.8, 1.3, 1.12], rotate: [-4, 4, -2, 0] }}
              transition={{ duration: 0.6 }}
            >
              <circle cx="0" cy="10" r="125" fill="#F97316" opacity="0.35" filter="url(#neon-glow)" />
              <polygon
                points="0,-105 30,-42 102,-70 58,-8 125,32 48,44 70,105 0,62 -70,105 -48,44 -125,32 -58,-8 -102,-70 -30,-42"
                fill="#FACC15"
                stroke="#EF4444"
                strokeWidth="6"
              />
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fill="#7F1D1D"
                fontSize="44"
                fontWeight="900"
                fontFamily="Bricolage Grotesque, sans-serif"
              >
                BOOM!
              </text>
            </motion.g>
          )}

          {/* PHASE 3: Cute Dancing CO₂ & H₂O + Floating Thermal Energy */}
          {phase === 3 && (
            <g>
              <circle cx="0" cy="25" r="80" fill="#334155" opacity="0.35" />

              {/* Floating Thermal Energy Vapor at Top */}
              <motion.g
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: [-36, -50, -36], opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ThermalEnergyBadge x={0} y={0} scale={1.04} />
              </motion.g>

              {/* Dancing CO₂ Character */}
              <motion.g
                animate={{ y: [36, 12, 36], rotate: [-8, 8, -8] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <CO2Character x={-125} y={20} scale={1.1} />
              </motion.g>

              {/* Two Dancing H₂O Characters */}
              <motion.g
                animate={{ y: [40, 14, 40], rotate: [8, -8, 8] }}
                transition={{ duration: 0.75, repeat: Infinity, delay: 0.15 }}
              >
                <H2OCharacter x={0} y={40} scale={1.06} />
              </motion.g>
              <motion.g
                animate={{ y: [36, 12, 36], rotate: [-10, 10, -10] }}
                transition={{ duration: 0.85, repeat: Infinity, delay: 0.3 }}
              >
                <H2OCharacter x={125} y={20} scale={1.1} />
              </motion.g>
            </g>
          )}
        </g>

        {/* Prominent Balanced Chemical Equation Banner with Proper Subscripts */}
        <g transform="translate(500, 505)" filter="url(#clay-shadow)">
          <rect
            x="-375"
            y="-34"
            width="750"
            height="64"
            rx="20"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="3.5"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="25"
            fontWeight="900"
            fontFamily="JetBrains Mono, monospace"
          >
            <tspan fill="#34D399">CH</tspan>
            <tspan fill="#34D399" dy="6" fontSize="17">4</tspan>
            <tspan fill="#94A3B8" dy="-6"> + </tspan>
            <tspan fill="#FB7185">2O</tspan>
            <tspan fill="#FB7185" dy="6" fontSize="17">2</tspan>
            <tspan fill="#FACC15" dy="-6"> → </tspan>
            <tspan fill="#E879F9">CO</tspan>
            <tspan fill="#E879F9" dy="6" fontSize="17">2</tspan>
            <tspan fill="#94A3B8" dy="-6"> + </tspan>
            <tspan fill="#38BDF8">2H</tspan>
            <tspan fill="#38BDF8" dy="6" fontSize="17">2</tspan>
            <tspan fill="#38BDF8" dy="-6">O</tspan>
            <tspan fill="#94A3B8"> + </tspan>
            <tspan fill="#FB923C">Thermal Energy</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

/* ============================================================================
   STEP 4: MECHANICAL POWER & ELECTRICITY GENERATION
   - Keeps "Thermal Energy" floating in place
   - Brawl cloud turns into continuous "BOOM! BOOM!" explosions
   - Explosive pressure pushes cartoon pistons up & down rhythmically
   - Mechanical transmission spins a giant generator producing neon lightning "Electrical Energy"
   ============================================================================ */
export const Step4MechanicalPowerScene: React.FC<SceneProps> = ({ isPlaying }) => {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* 1. Floating "Thermal Energy" Kept in Place at Top Left */}
        <motion.g
          animate={isPlaying ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ThermalEnergyBadge x={185} y={95} scale={1.15} />
        </motion.g>

        {/* 2. Continuous "BOOM! BOOM!" Combustion Cylinder + Reciprocating Pistons */}
        <g transform="translate(230, 320)" filter="url(#clay-shadow)">
          <rect x="-155" y="-140" width="310" height="260" rx="28" fill="#1E293B" stroke="#64748B" strokeWidth="5" />

          {/* Left Cylinder Bore */}
          <rect x="-125" y="-115" width="110" height="190" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          {/* Right Cylinder Bore */}
          <rect x="15" y="-115" width="110" height="190" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="3" />

          {/* Continuous BOOM! Explosion in Left Cylinder */}
          <g transform="translate(-70, -75)">
            <motion.g
              animate={isPlaying ? { scale: [0.6, 1.15, 0.6], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              <polygon
                points="0,-38 12,-14 38,-22 22,0 40,18 14,20 18,40 0,24 -18,40 -14,20 -40,18 -22,0 -38,-22 -12,-14"
                fill="#FACC15"
                stroke="#EF4444"
                strokeWidth="3"
              />
              <text x="0" y="6" textAnchor="middle" fill="#7F1D1D" fontSize="14" fontWeight="900">
                BOOM!
              </text>
            </motion.g>
          </g>

          {/* Continuous BOOM! Explosion in Right Cylinder (Alternating Phase) */}
          <g transform="translate(70, -75)">
            <motion.g
              animate={isPlaying ? { scale: [1.15, 0.6, 1.15], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              <polygon
                points="0,-38 12,-14 38,-22 22,0 40,18 14,20 18,40 0,24 -18,40 -14,20 -40,18 -22,0 -38,-22 -12,-14"
                fill="#FB923C"
                stroke="#DC2626"
                strokeWidth="3"
              />
              <text x="0" y="6" textAnchor="middle" fill="#7F1D1D" fontSize="14" fontWeight="900">
                BOOM!
              </text>
            </motion.g>
          </g>

          {/* Left Cartoon Piston Moving Up & Down */}
          <motion.g
            animate={isPlaying ? { y: [-25, 38, -25] } : { y: 0 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="-10" y="-10" width="20" height="75" transform="translate(-70, 0)" fill="#94A3B8" />
            <rect x="-118" y="-32" width="96" height="44" rx="10" fill="url(#steel-grad)" stroke="#CBD5E1" strokeWidth="3" />
            <circle cx="-82" cy="-12" r="3.5" fill="#0F172A" />
            <circle cx="-58" cy="-12" r="3.5" fill="#0F172A" />
            <path d="M-76,-3 Q-70,3 -64,-3" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* Right Cartoon Piston Moving Opposite */}
          <motion.g
            animate={isPlaying ? { y: [38, -25, 38] } : { y: 15 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="-10" y="-10" width="20" height="75" transform="translate(70, 0)" fill="#94A3B8" />
            <rect x="22" y="-32" width="96" height="44" rx="10" fill="url(#steel-grad)" stroke="#CBD5E1" strokeWidth="3" />
            <circle cx="58" cy="-12" r="3.5" fill="#0F172A" />
            <circle cx="82" cy="-12" r="3.5" fill="#0F172A" />
            <path d="M64,-3 Q70,3 76,-3" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </motion.g>

          <text x="0" y="102" textAnchor="middle" fill="#CBD5E1" fontSize="15" fontWeight="800" fontFamily="Bricolage Grotesque, sans-serif">
            PISTONS
          </text>
        </g>

        {/* 3. Mechanical Transmission Belt & Spinning Gears */}
        <g transform="translate(475, 330)" filter="url(#clay-soft)">
          <path
            d="M-90,-32 L110,-52 L110,52 L-90,32 Z"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <motion.g
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '-70px 0px' }}
          >
            <circle cx="-70" cy="0" r="34" fill="#475569" stroke="#FBBF24" strokeWidth="5" strokeDasharray="12 8" />
            <circle cx="-70" cy="0" r="12" fill="#FACC15" />
          </motion.g>
          <motion.g
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 1.0, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '15px 0px' }}
          >
            <circle cx="15" cy="0" r="28" fill="#334155" stroke="#38BDF8" strokeWidth="5" strokeDasharray="10 6" />
            <circle cx="15" cy="0" r="10" fill="#38BDF8" />
          </motion.g>
        </g>

        {/* 4. Giant Generator Spinning & Producing Sparkling Neon "Electrical Energy" */}
        <g transform="translate(650, 325)" filter="url(#clay-shadow)">
          <rect x="-95" y="-115" width="190" height="230" rx="34" fill="#0F172A" stroke="#FACC15" strokeWidth="6" />
          <circle cx="0" cy="-10" r="72" fill="#1E293B" stroke="#38BDF8" strokeWidth="4" />

          {/* Spinning Generator Rotor Coil */}
          <motion.g
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0px -10px' }}
          >
            <rect x="-54" y="-22" width="108" height="24" rx="8" fill="url(#copper-grad)" />
            <rect x="-12" y="-64" width="24" height="108" rx="8" fill="url(#copper-grad)" />
            <circle cx="0" cy="-10" r="22" fill="#FACC15" stroke="#FFFFFF" strokeWidth="3" />
          </motion.g>

          <rect x="-70" y="75" width="140" height="28" rx="10" fill="#CA8A04" />
          <text x="0" y="94" textAnchor="middle" fill="#FEF9C3" fontSize="14" fontWeight="900" fontFamily="Bricolage Grotesque, sans-serif">
            GENERATOR
          </text>
        </g>

        {/* 5. Sparkling Neon Lightning Output -> "Electrical Energy" */}
        <motion.g
          animate={
            isPlaying
              ? { scale: [0.96, 1.08, 0.96], y: [0, -10, 0] }
              : {}
          }
          transition={{ duration: 1.1, repeat: Infinity }}
        >
          <path
            d="M745,280 L795,235 L780,255 L835,205"
            stroke="#FEF08A"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#neon-glow)"
          />
          <ElectricalEnergyBadge x={855} y={175} scale={1.18} />
        </motion.g>
      </svg>
    </div>
  );
};
