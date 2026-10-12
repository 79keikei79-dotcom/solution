import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClayDefs,
  BottleCharacter,
  StillageCharacter,
  PopBurst,
  ThermalEnergyBadge,
  ElectricalEnergyBadge,
  PelletCharacter,
} from './ClayFiltersAndCharacters';
import { SceneProps } from './StepScenesOneToFour';

/* ============================================================================
   5-FINGERED CARTOON HAND COMPONENT
   - Clearly renders a cartoon hand with 5 distinct fingers (Thumb + Index, Middle, Ring, Pinky)
   - Supports 2 poses:
     + 'open': all 5 fingers spread wide (approaching or releasing throw)
     + 'grip': all 5 fingers curled inward clutching the two energies tightly
   ============================================================================ */
const FiveFingerHand: React.FC<{ pose: 'open' | 'grip' }> = ({ pose }) => (
  <g filter="url(#clay-shadow)">
    {/* Forearm Sleeve Entering from Left */}
    <rect
      x="-175"
      y="-32"
      width="115"
      height="64"
      rx="22"
      fill="#6366F1"
      stroke="#A5B4FC"
      strokeWidth="4"
    />
    {/* White Glove Wrist Cuff */}
    <rect
      x="-70"
      y="-40"
      width="32"
      height="80"
      rx="15"
      fill="#E2E8F0"
      stroke="#94A3B8"
      strokeWidth="3.5"
    />

    {/* Palm Base */}
    <ellipse
      cx="-10"
      cy="0"
      rx="42"
      ry="40"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="4"
    />

    {pose === 'open' ? (
      /* 5 FINGERS SPREAD OPEN (Thumb + 4 Fingers) */
      <g>
        {/* 1. Thumb (Top) */}
        <rect
          x="-20"
          y="-74"
          width="22"
          height="46"
          rx="11"
          transform="rotate(-28 -10 -45)"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3.5"
        />
        {/* 2. Index Finger */}
        <rect
          x="16"
          y="-40"
          width="54"
          height="19"
          rx="9.5"
          transform="rotate(-22 16 -30)"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3.5"
        />
        {/* 3. Middle Finger */}
        <rect
          x="22"
          y="-13"
          width="60"
          height="19"
          rx="9.5"
          transform="rotate(-5 22 -4)"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3.5"
        />
        {/* 4. Ring Finger */}
        <rect
          x="20"
          y="12"
          width="54"
          height="19"
          rx="9.5"
          transform="rotate(12 20 22)"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3.5"
        />
        {/* 5. Pinky Finger */}
        <rect
          x="10"
          y="31"
          width="44"
          height="17"
          rx="8.5"
          transform="rotate(28 10 40)"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="3.5"
        />
      </g>
    ) : (
      /* 5 FINGERS CURLED INWARD CLUTCHING / GRABBING */
      <g>
        <ellipse
          cx="25"
          cy="-25"
          rx="19"
          ry="10.5"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="3.5"
        />
        <ellipse
          cx="29"
          cy="-8"
          rx="21"
          ry="10.5"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="3.5"
        />
        <ellipse
          cx="27"
          cy="9"
          rx="20"
          ry="10.5"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="3.5"
        />
        <ellipse
          cx="21"
          cy="25"
          rx="17"
          ry="9.5"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="3.5"
        />
        <ellipse
          cx="6"
          cy="-32"
          rx="21"
          ry="12"
          transform="rotate(20 6 -32)"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="3.5"
        />
      </g>
    )}

    <line x1="-26" y1="-13" x2="-8" y2="-13" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
    <line x1="-26" y1="0" x2="-6" y2="0" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
    <line x1="-26" y1="13" x2="-8" y2="13" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
  </g>
);

/* ============================================================================
   STEP 5: 100% SELF-SUFFICIENT LOOP
   - Fast 5-fingered hand:
     + Phase 0 (0.0s - 0.55s): 5 fingers open next to Thermal & Electrical Energy
     + Phase 1 (0.55s - 1.05s): 5 fingers curl inward quickly grabbing both energies
     + Phase 2 (1.05s - 1.55s): Fast throwing motion hurling both energies into the Distillery!
     + Phase 3 (1.55s - 9.5s): Distillery bursts into full Step-1 operation + "100% Self-Sufficient!"
   - Factory is the EXACT complete Distillery from Step 1 (Copper Still -> Bottles on Conveyor ->
     Left Stillage Discharge Chute + Stillage POP!).
   - Before the energies are thrown in (phase < 3), the entire factory is 100% stopped:
     NO bottles on the conveyor belt, NO Stillage popping out, rollers stopped, no chimney steam!
   ============================================================================ */
export const Step5SelfSufficientScene: React.FC<SceneProps> = ({ isPlaying, playKey }) => {
  const [phase, setPhase] = useState<number>(0); // 0: Open Hand, 1: Curl 5 Fingers & Grab, 2: Fast Throw, 3: Factory Bursts Into Action!
  const [prodCycle, setProdCycle] = useState<number>(0);

  useEffect(() => {
    setPhase(0);
    setProdCycle(0);
  }, [playKey]);

  useEffect(() => {
    if (!isPlaying) return;
    // Snappy, fast hand grab & throw sequence!
    const t1 = setTimeout(() => setPhase(1), 550);
    const t2 = setTimeout(() => setPhase(2), 1050);
    const t3 = setTimeout(() => setPhase(3), 1550);
    const loop = setTimeout(() => {
      setPhase(0);
      setProdCycle(0);
    }, 9500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(loop);
    };
  }, [isPlaying, phase === 0 ? playKey : undefined]);

  // High-productivity bottle + stillage cycle only runs when phase === 3!
  useEffect(() => {
    if (!isPlaying || phase !== 3) return;
    const interval = setInterval(() => {
      setProdCycle((c) => c + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying, phase]);

  const isFactoryPowered = phase === 3;

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* Night Sky Hills & Ground Floor (Matching Step 1) */}
        <path d="M0,440 Q250,390 520,440 T1000,430 L1000,560 L0,560 Z" fill="#131C3E" />
        <rect x="0" y="465" width="1000" height="95" fill="#0F172A" />

        {/* ===================================================================
            EXACT STEP 1 DISTILLERY PLANT (Shifted slightly right at x+55 so hand has room on left)
            - Before throw (phase < 3): 100% stopped, ZERO bottles on belt, ZERO stillage!
            - After throw (phase === 3): High-productivity bottles + Stillage POP!
           =================================================================== */}
        <g transform="translate(55, 18)">
          <g filter="url(#clay-shadow)">
            {/* Power Surge Glow Outline when Powered in Phase 3 */}
            {isFactoryPowered && (
              <motion.rect
                x="242"
                y="148"
                width="636"
                height="334"
                rx="42"
                fill="none"
                stroke="#FACC15"
                strokeWidth="7"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}

            {/* Chimneys (No steam when stopped; fast steam puffs when powered in Phase 3) */}
            <rect
              x="330"
              y="75"
              width="44"
              height="110"
              rx="10"
              fill="url(#copper-grad)"
              stroke="#FDBA74"
              strokeWidth="3"
            />
            <rect
              x="400"
              y="95"
              width="40"
              height="90"
              rx="10"
              fill="url(#copper-grad)"
              stroke="#FDBA74"
              strokeWidth="3"
            />

            {isFactoryPowered && isPlaying && (
              <>
                <motion.circle
                  cx="352"
                  cy="55"
                  r="18"
                  fill="#FEF08A"
                  opacity="0.7"
                  animate={{ y: [-5, -42], opacity: [0.8, 0], scale: [0.8, 1.5] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
                <motion.circle
                  cx="420"
                  cy="70"
                  r="15"
                  fill="#A7F3D0"
                  opacity="0.7"
                  animate={{ y: [-5, -38], opacity: [0.75, 0], scale: [0.8, 1.4] }}
                  transition={{ duration: 1.0, repeat: Infinity, delay: 0.3 }}
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
              fill={isFactoryPowered ? '#1E293B' : '#111827'}
              stroke={isFactoryPowered ? '#34D399' : '#475569'}
              strokeWidth="5"
            />

            {/* Roof Sign */}
            <rect
              x="420"
              y="128"
              width="280"
              height="48"
              rx="18"
              fill="url(#copper-grad)"
              stroke={isFactoryPowered ? '#FEF08A' : '#94A3B8'}
              strokeWidth="3"
            />
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
              fill={isFactoryPowered ? '#0F172A' : '#090D16'}
              stroke={isFactoryPowered ? '#38BDF8' : '#1E293B'}
              strokeWidth="4"
            />

            {/* Left Side Byproduct Chute (just like Step 1) */}
            <path
              d="M320,340 L210,320 L210,385 L320,375 Z"
              fill="url(#steel-grad)"
              stroke="#94A3B8"
              strokeWidth="3"
            />

            {/* Copper Distillation Still at the Start of the Conveyor Belt */}
            <g transform="translate(365, 315)">
              <motion.g
                animate={
                  isFactoryPowered && isPlaying
                    ? { scaleY: [1, 1.08, 0.94, 1], y: [0, -5, 0] }
                    : { scaleY: 1, y: 0 }
                }
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <rect x="-42" y="45" width="84" height="40" rx="10" fill="#334155" />
                <circle cx="0" cy="10" r="46" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="3" />
                <path d="M-22,-28 L0,-75 L22,-28 Z" fill="url(#copper-grad)" stroke="#FDBA74" strokeWidth="2.5" />
                <path d="M8,-65 Q55,-85 75,-30" stroke="#FDBA74" strokeWidth="10" fill="none" strokeLinecap="round" />
                {/* Still Face: Dormant when stopped, wide-eyed & happy when powered */}
                {isFactoryPowered ? (
                  <>
                    <circle cx="-14" cy="6" r="4.5" fill="#431407" />
                    <circle cx="14" cy="6" r="4.5" fill="#431407" />
                    <path d="M-7,18 Q0,26 7,18" stroke="#431407" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="-18" y1="6" x2="-8" y2="6" stroke="#431407" strokeWidth="3" strokeLinecap="round" />
                    <line x1="8" y1="6" x2="18" y2="6" stroke="#431407" strokeWidth="3" strokeLinecap="round" />
                    <line x1="-6" y1="18" x2="6" y2="18" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
              </motion.g>
            </g>

            {/* Conveyor Belt System */}
            <g transform="translate(435, 365)">
              {/* Belt Track */}
              <rect x="0" y="0" width="320" height="32" rx="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
              {/* Rollers: Completely still before throw; spinning fast when powered! */}
              {[30, 95, 160, 225, 290].map((rx, idx) => (
                <g key={idx} transform={`translate(${rx}, 16)`}>
                  <motion.g
                    animate={isFactoryPowered && isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.55, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="0" cy="0" r="11" fill="#94A3B8" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#1E293B" strokeWidth="3" />
                    <line x1="0" y1="-8" x2="0" y2="8" stroke="#1E293B" strokeWidth="3" />
                  </motion.g>
                </g>
              ))}

              {/* Spirit Bottles on Belt:
                  - Before throw (phase < 3): ZERO bottles on the conveyor belt!
                  - After throw (phase === 3): High-productivity bottles pouring out onto the belt! */}
              {isFactoryPowered && (
                <>
                  <motion.g
                    key={`p5-first-${prodCycle}`}
                    initial={{ x: 18, scale: 0.2, opacity: 0 }}
                    animate={
                      isPlaying
                        ? { x: [18, 18, 96], scale: [0.2, 1.05, 0.95], opacity: [0, 1, 1] }
                        : { x: 18, scale: 0.95, opacity: 1 }
                    }
                    transition={{ duration: 1.5, times: [0, 0.15, 1], ease: 'linear' }}
                  >
                    <BottleCharacter x={0} y={-18} scale={0.95} />
                  </motion.g>

                  {[1, 2, 3].map((bIdx) => (
                    <motion.g
                      key={`p5-b-${prodCycle}-${bIdx}`}
                      initial={{ x: bIdx * 78 + 18 }}
                      animate={isPlaying ? { x: (bIdx + 1) * 78 + 18 } : { x: bIdx * 78 + 18 }}
                      transition={{ duration: 1.5, ease: 'linear' }}
                    >
                      <BottleCharacter x={0} y={-18} scale={0.95} />
                    </motion.g>
                  ))}
                </>
              )}
            </g>
          </g>

          {/* Finished Bottle Collection Crate on Right */}
          <g transform="translate(790, 420)" filter="url(#clay-soft)">
            <rect x="-35" y="-25" width="70" height="45" rx="10" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2.5" />
            <text x="0" y="2" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="800">
              SPIRITS
            </text>
          </g>

          {/* When Powered in Phase 3: Stillage Pops Out from the Left Chute Just Like Step 1! */}
          {isFactoryPowered && (
            <>
              <AnimatePresence mode="popLayout">
                <motion.g
                  key={`p5-stillage-${prodCycle}`}
                  initial={{ x: 340, y: 335, scale: 0.2, opacity: 0 }}
                  animate={{
                    x: [340, 225, 145],
                    y: [335, 240, 395],
                    scale: [0.3, 1.2, 1.05],
                    opacity: [1, 1, 1],
                  }}
                  transition={{ duration: 0.9, times: [0, 0.4, 1], ease: 'easeOut' }}
                >
                  <StillageCharacter x={0} y={0} scale={1.12} showLabel={true} />
                </motion.g>
              </AnimatePresence>

              <AnimatePresence>
                <motion.g
                  key={`p5-pop-${prodCycle}`}
                  initial={{ x: 255, y: 265, scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.35, 1, 0],
                    opacity: [0, 1, 1, 0],
                    rotate: [-12, 8, -5, 0],
                  }}
                  transition={{ duration: 0.75, times: [0, 0.25, 0.7, 1] }}
                >
                  <PopBurst x={0} y={0} scale={1.15} />
                </motion.g>
              </AnimatePresence>

              <g transform="translate(140, 435)">
                <StillageCharacter x={-32} y={10} scale={0.82} showLabel={false} />
                <StillageCharacter x={26} y={12} scale={0.78} showLabel={false} />
                <StillageCharacter x={0} y={0} scale={1.05} showLabel={true} />
              </g>
            </>
          )}
        </g>

        {/* ===================================================================
            LEFT SIDE: FLOATING THERMAL & ELECTRICAL ENERGY + FAST 5-FINGERED HAND
           =================================================================== */}
        {phase < 3 && (
          <motion.g
            animate={
              phase === 0
                ? { x: 215, y: 215, scale: 1, opacity: 1 }
                : phase === 1
                ? { x: 185, y: 205, scale: 0.9, opacity: 1 }
                : {
                    x: [185, 380, 610],
                    y: [205, 145, 315],
                    scale: [0.92, 1.04, 0.3],
                    opacity: [1, 1, 0],
                  }
            }
            transition={
              phase === 2
                ? { duration: 0.48, times: [0, 0.4, 1], ease: 'easeIn' }
                : { duration: 0.32, ease: 'easeOut' }
            }
          >
            <ThermalEnergyBadge x={-38} y={-28} scale={0.92} />
            <ElectricalEnergyBadge x={38} y={28} scale={0.92} />
          </motion.g>
        )}

        {/* Fast 5-Fingered Cartoon Hand */}
        {phase < 3 && (
          <motion.g
            animate={
              phase === 0
                ? { x: 120, y: 215, rotate: -6 }
                : phase === 1
                ? { x: 165, y: 205, rotate: -18 }
                : { x: 315, y: 185, rotate: 18 }
            }
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <FiveFingerHand pose={phase === 1 ? 'grip' : 'open'} />
          </motion.g>
        )}

        {/* Fast Throw Trajectory Arc in Phase 2 */}
        {phase === 2 && (
          <motion.path
            d="M 240,195 Q 430,115 610,310"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="6"
            strokeDasharray="14 10"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.48 }}
          />
        )}

        {/* PHASE 3: CELEBRATORY BANNER AT TOP OF STAGE: "100% Self-Sufficient!" */}
        {phase === 3 && (
          <motion.g
            initial={{ scale: 0.3, opacity: 0, y: -35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'backOut' }}
            style={{ transformOrigin: '500px 68px' }}
            filter="url(#clay-shadow)"
          >
            <g transform="translate(500, 68)">
              <rect
                x="-320"
                y="-46"
                width="640"
                height="92"
                rx="28"
                fill="url(#ch4-grad)"
                stroke="#FEF08A"
                strokeWidth="6"
              />
              <rect
                x="-304"
                y="-34"
                width="608"
                height="68"
                rx="20"
                fill="#064E3B"
                opacity="0.92"
              />
              <text
                x="0"
                y="13"
                textAnchor="middle"
                fill="#FEF08A"
                fontSize="38"
                fontWeight="900"
                fontFamily="Bricolage Grotesque, sans-serif"
              >
                100% Self-Sufficient!
              </text>
            </g>
          </motion.g>
        )}
      </svg>
    </div>
  );
};

/* ============================================================================
   STEP 6: BIOMASS PELLET PRESS
   - Exact Horizontal Order on Ground Level:
     1) LEFT: "Biogas Tank" with settled "Fibrous Residue" at the bottom
     2) PIPE: Connects the bottom of the Biogas Tank to the Pellet Press in the middle
     3) MIDDLE: "Pellet Press" (Compressor) sitting firmly on the floor (wrapped in static <g>
                so it NEVER flies up!)
     4) RIGHT: From the Pellet Press output nozzle, "Biomass Pellets" are discharged into
               the "Biomass Pellets" storage bin!
   ============================================================================ */
export const Step6PelletPressScene: React.FC<SceneProps> = ({ isPlaying, playKey }) => {
  const [phase, setPhase] = useState<number>(0); // 0: Fibrous Residue enters Press, 1: Press compresses residue, 2: Press discharges Biomass Pellets

  useEffect(() => {
    setPhase(0);
  }, [playKey]);

  useEffect(() => {
    if (!isPlaying) return;
    const t1 = setTimeout(() => setPhase(1), 2400);
    const t2 = setTimeout(() => setPhase(2), 4800);
    const loop = setTimeout(() => setPhase(0), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(loop);
    };
  }, [isPlaying, phase === 0 ? playKey : undefined]);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* Ground Floor */}
        <rect x="0" y="485" width="1000" height="75" fill="#090D1E" />

        {/* 1. LEFT: Biogas Tank with Settled Fibrous Residue at the Bottom */}
        <g transform="translate(180, 275)" filter="url(#clay-shadow)">
          <path
            d="M-135,-125 C-135,-200 135,-200 135,-125 L135,140 C135,182 75,208 0,208 C-75,208 -135,182 -135,140 Z"
            fill="#1E293B"
            stroke="#10B981"
            strokeWidth="5"
          />
          <path
            d="M-120,-120 C-120,-185 120,-185 120,-120 L120,135 C120,172 68,195 0,195 C-68,195 -120,172 -120,135 Z"
            fill="#0B132B"
          />
          <rect x="-82" y="-195" width="164" height="36" rx="12" fill="#065F46" stroke="#34D399" strokeWidth="2.5" />
          <text
            x="0"
            y="-171"
            textAnchor="middle"
            fill="#ECFDF5"
            fontSize="16"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Biogas Tank
          </text>

          {/* Settled Fibrous Residue at Bottom of Tank */}
          <path
            d="M-120,85 Q0,72 120,85 L120,135 C120,172 68,195 0,195 C-68,195 -120,172 -120,135 Z"
            fill="#78350F"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          <text
            x="0"
            y="145"
            textAnchor="middle"
            fill="#FEF3C7"
            fontSize="14.5"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Fibrous Residue
          </text>
        </g>

        {/* 2. PIPE CONNECTING BIOGAS TANK BOTTOM TO PELLET PRESS IN THE MIDDLE */}
        <g filter="url(#clay-soft)">
          <rect
            x="305"
            y="385"
            width="135"
            height="42"
            rx="12"
            fill="url(#steel-grad)"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          {/* Moving Fibrous Residue Clumps Inside Pipe into the Pellet Press */}
          {phase === 0 &&
            [0, 1, 2].map((idx) => (
              <motion.g
                key={idx}
                initial={{ x: 320, y: 406 }}
                animate={isPlaying ? { x: [320, 430] } : { x: 335 + idx * 35 }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: idx * 0.35,
                  ease: 'linear',
                }}
              >
                <ellipse cx="0" cy="0" rx="15" ry="10" fill="url(#pellet-grad)" stroke="#FDE68A" strokeWidth="2" />
              </motion.g>
            ))}
        </g>

        {/* 3. MIDDLE: PELLET PRESS (COMPRESSOR) PLANTED SOLIDLY ON THE GROUND NEXT TO BIOGAS TANK */}
        <g transform="translate(525, 360)" filter="url(#clay-shadow)">
          <motion.g
            animate={
              phase === 1 && isPlaying
                ? {
                    rotate: [-2, 2, -2, 2, 0],
                    y: [0, -5, 2, -4, 0],
                    scaleX: [1, 1.04, 0.96, 1.03, 1],
                    scaleY: [1, 0.96, 1.04, 0.97, 1],
                  }
                : { rotate: 0, y: 0, scaleX: 1, scaleY: 1 }
            }
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            {/* Heavy Press Base & Frame Sitting on Ground (y = +125 touches ground at 485) */}
            <rect
              x="-95"
              y="-115"
              width="190"
              height="240"
              rx="30"
              fill="url(#copper-grad)"
              stroke="#FDE047"
              strokeWidth="5"
            />
            {/* Inner Compression Chamber Window */}
            <rect
              x="-72"
              y="-55"
              width="144"
              height="125"
              rx="18"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="3"
            />

            {/* Cute Expressive Press Machine Face */}
            <circle cx="-28" cy="-82" r="8" fill="#FFFFFF" />
            <circle cx="28" cy="-82" r="8" fill="#FFFFFF" />
            <circle cx="-26" cy="-82" r="4" fill="#0F172A" />
            <circle cx="26" cy="-82" r="4" fill="#0F172A" />
            <path d="M-16,-67 Q0,-59 16,-67" stroke="#FEF08A" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Fibrous Residue Inside Chamber being Compressed */}
            <g transform="translate(0, 48)">
              <motion.rect
                x="-52"
                y="-22"
                width="104"
                height="40"
                rx="10"
                fill="#78350F"
                stroke="#F59E0B"
                strokeWidth="2"
                animate={
                  phase === 0
                    ? { scaleY: [0.35, 1], opacity: 1 }
                    : phase === 1
                    ? { scaleY: [1, 0.45, 0.85, 0.42], scaleX: [1, 1.12, 0.96, 1.1] }
                    : { scaleY: 0.45, opacity: 0.7 }
                }
                transition={{ duration: 0.7, repeat: phase === 1 ? Infinity : 0 }}
              />
            </g>

            {/* Hydraulic Compressing Stamp Inside Chamber */}
            <motion.g
              animate={
                phase === 1
                  ? { y: [-28, 18, -28] }
                  : phase === 2
                  ? { y: 14 }
                  : { y: -28 }
              }
              transition={
                phase === 1
                  ? { duration: 0.42, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.4 }
              }
            >
              <rect x="-14" y="-52" width="28" height="42" fill="#64748B" />
              <rect x="-56" y="-14" width="112" height="24" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2.5" />
            </motion.g>

            {/* Machine Header Label */}
            <rect x="-78" y="-138" width="156" height="36" rx="12" fill="#7C2D12" stroke="#FDBA74" strokeWidth="2.5" />
            <text
              x="0"
              y="-115"
              textAnchor="middle"
              fill="#FEF3C7"
              fontSize="16"
              fontWeight="900"
              fontFamily="Bricolage Grotesque, sans-serif"
            >
              Pellet Press
            </text>

            {/* Right Output Nozzle Chute pointing to Biomass Pellets Bin */}
            <path d="M95,15 L165,30 L165,68 L95,58 Z" fill="url(#steel-grad)" stroke="#CBD5E1" strokeWidth="3" />
          </motion.g>
        </g>

        {/* 4. PHASE 2 ONLY: PELLET PRESS DISCHARGES BIOMASS PELLETS FROM ITS NOZZLE INTO THE BIN! */}
        {phase === 2 &&
          [0, 1, 2, 3].map((pIdx) => (
            <motion.g
              key={pIdx}
              initial={{ x: 685, y: 405, opacity: 0 }}
              animate={{
                x: [685, 815 + (pIdx % 2) * 32],
                y: [405, 445],
                rotate: [0, 25],
                opacity: [1, 1],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: pIdx * 0.18,
                ease: 'easeIn',
              }}
            >
              <PelletCharacter x={0} y={0} scale={1.1} />
            </motion.g>
          ))}

        {/* 5. RIGHT: Storage Container Bin for "Biomass Pellets" */}
        <g transform="translate(835, 435)" filter="url(#clay-shadow)">
          {phase === 2 && (
            <g transform="translate(0, -35)">
              <motion.g
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <PelletCharacter x={-55} y={10} rotate={-8} scale={1.05} />
                <PelletCharacter x={-18} y={8} rotate={4} scale={1.05} />
                <PelletCharacter x={20} y={8} rotate={-5} scale={1.05} />
                <PelletCharacter x={55} y={10} rotate={10} scale={1.05} />
                <PelletCharacter x={-38} y={-8} rotate={6} scale={1.05} />
                <PelletCharacter x={0} y={-10} rotate={-4} scale={1.05} />
                <PelletCharacter x={38} y={-8} rotate={8} scale={1.05} />
              </motion.g>
            </g>
          )}

          {/* Bin Body */}
          <path
            d="M-105,-30 L105,-30 L88,52 L-88,52 Z"
            fill="#065F46"
            stroke="#34D399"
            strokeWidth="4"
          />
          <rect x="-88" y="-12" width="176" height="44" rx="14" fill="#064E3B" stroke="#FBBF24" strokeWidth="2.5" />
          <text
            x="0"
            y="16"
            textAnchor="middle"
            fill="#FEF3C7"
            fontSize="18"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Biomass Pellets
          </text>
        </g>
      </svg>
    </div>
  );
};

/* ============================================================================
   STEP 7: GREEN COMMERCIALIZATION & DISTRIBUTION
   - "Biomass Pellets" appear prominently on left hub
   - Layout branches into 2 main arrows:
     + Arrow 1 -> Cluster of factories labeled "Other Industrial Plants"
     + Arrow 2 -> Cozy "Household", which further branches into 3 cute mini-scenes:
                  1) "Fireplace"
                  2) "BBQ Grill"
                  3) "Pizza Oven"
   ============================================================================ */
export const Step7GreenDistributionScene: React.FC<SceneProps> = ({ isPlaying }) => {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0D132A] clay-stage select-none">
      <svg viewBox="0 0 1000 560" className="w-full h-full">
        <ClayDefs />
        <rect width="1000" height="560" fill="url(#stage-bg)" />

        {/* 1. LEFT HUB: Prominent "Biomass Pellets" Showcase */}
        <g transform="translate(145, 290)" filter="url(#clay-shadow)">
          <circle cx="0" cy="0" r="102" fill="#1E293B" stroke="#F59E0B" strokeWidth="6" />
          <circle cx="0" cy="0" r="82" fill="#0F172A" />

          <PelletCharacter x={-32} y={12} rotate={-12} scale={1.25} />
          <PelletCharacter x={28} y={14} rotate={14} scale={1.25} />
          <PelletCharacter x={0} y={-8} rotate={-4} scale={1.3} />
          <PelletCharacter x={-22} y={-28} rotate={8} scale={1.2} />
          <PelletCharacter x={24} y={-26} rotate={-10} scale={1.2} />

          <rect x="-92" y="52" width="184" height="44" rx="16" fill="#78350F" stroke="#FDE047" strokeWidth="3" />
          <text
            x="0"
            y="80"
            textAnchor="middle"
            fill="#FEF9C3"
            fontSize="18"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Biomass Pellets
          </text>
        </g>

        {/* 2. BRANCHING ARROWS (Arrow 1 Up to Industrial Plants, Arrow 2 Down to Household) */}
        <g>
          <path
            d="M 255,255 C 330,195 365,145 450,145"
            fill="none"
            stroke="#34D399"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <polygon points="445,128 475,145 445,162" fill="#34D399" />

          <path
            d="M 255,325 C 330,375 365,395 450,395"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <polygon points="445,378 475,395 445,412" fill="#FBBF24" />

          {isPlaying && (
            <>
              <motion.g
                animate={{ x: [265, 430], y: [250, 145] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PelletCharacter x={0} y={0} scale={0.9} />
              </motion.g>
              <motion.g
                animate={{ x: [265, 430], y: [330, 395] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                <PelletCharacter x={0} y={0} scale={0.9} />
              </motion.g>
            </>
          )}
        </g>

        {/* 3. TOP BRANCH NODE: Cluster of Factories ("Other Industrial Plants") */}
        <g transform="translate(655, 145)" filter="url(#clay-shadow)">
          <rect x="-170" y="-85" width="340" height="165" rx="28" fill="#1E293B" stroke="#34D399" strokeWidth="4" />

          <g transform="translate(-85, 8)">
            <rect x="-32" y="-52" width="16" height="35" rx="4" fill="#64748B" />
            <rect x="-42" y="-22" width="76" height="52" rx="10" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2.5" />
            <circle cx="-14" cy="-2" r="4" fill="#FEF08A" />
            <circle cx="10" cy="-2" r="4" fill="#FEF08A" />
          </g>
          <g transform="translate(10, 4)">
            <rect x="-25" y="-60" width="18" height="40" rx="4" fill="#EA580C" />
            <rect x="8" y="-52" width="16" height="32" rx="4" fill="#EA580C" />
            <rect x="-38" y="-25" width="84" height="58" rx="12" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="2.5" />
            <circle cx="-8" cy="-2" r="4" fill="#FEF08A" />
            <circle cx="16" cy="-2" r="4" fill="#FEF08A" />
          </g>
          <g transform="translate(100, 10)">
            <rect x="-30" y="-20" width="64" height="50" rx="10" fill="#10B981" stroke="#A7F3D0" strokeWidth="2.5" />
            <circle cx="-6" cy="2" r="4" fill="#FEF08A" />
            <circle cx="14" cy="2" r="4" fill="#FEF08A" />
          </g>

          <rect x="-135" y="42" width="270" height="36" rx="12" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <text
            x="0"
            y="65"
            textAnchor="middle"
            fill="#ECFDF5"
            fontSize="16"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Other Industrial Plants
          </text>
        </g>

        {/* 4. BOTTOM BRANCH NODE: Cozy "Household" Hub */}
        <g transform="translate(565, 395)" filter="url(#clay-shadow)">
          <rect x="-82" y="-75" width="164" height="150" rx="26" fill="#1E293B" stroke="#FBBF24" strokeWidth="4" />
          <polygon points="-52,-12 0,-55 52,-12" fill="#EF4444" stroke="#FCA5A5" strokeWidth="3" strokeLinejoin="round" />
          <rect x="-40" y="-12" width="80" height="52" rx="8" fill="#FEF3C7" />
          <rect x="-12" y="10" width="24" height="30" rx="6" fill="#D97706" />
          <circle cx="-24" cy="6" r="7" fill="#38BDF8" />
          <circle cx="24" cy="6" r="7" fill="#38BDF8" />

          <rect x="-66" y="42" width="132" height="32" rx="10" fill="#78350F" stroke="#FDE047" strokeWidth="2" />
          <text
            x="0"
            y="63"
            textAnchor="middle"
            fill="#FEF9C3"
            fontSize="16"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Household
          </text>
        </g>

        {/* 5. THREE SUB-BRANCH ARROWS FROM HOUSEHOLD -> FIREPLACE, BBQ GRILL, PIZZA OVEN */}
        <g>
          <path d="M 650,365 L 745,295" stroke="#FB923C" strokeWidth="6" strokeLinecap="round" />
          <polygon points="738,284 762,288 748,308" fill="#FB923C" />

          <path d="M 650,395 L 745,395" stroke="#FB923C" strokeWidth="6" strokeLinecap="round" />
          <polygon points="742,383 764,395 742,407" fill="#FB923C" />

          <path d="M 650,425 L 745,495" stroke="#FB923C" strokeWidth="6" strokeLinecap="round" />
          <polygon points="748,482 762,502 738,504" fill="#FB923C" />
        </g>

        {/* Sub-Scene 1: Warm "Fireplace" */}
        <g transform="translate(865, 285)" filter="url(#clay-shadow)">
          <rect x="-92" y="-44" width="184" height="84" rx="20" fill="#1E293B" stroke="#FB923C" strokeWidth="3.5" />
          <g transform="translate(-45, -2)">
            <rect x="-26" y="-24" width="52" height="42" rx="8" fill="#9A3412" stroke="#FDBA74" strokeWidth="2" />
            <path d="M-16,18 C-16,-6 16,-6 16,18 Z" fill="#0F172A" />
            <motion.path
              d="M0,-4 C8,4 10,16 0,18 C-10,16 -8,4 0,-4 Z"
              fill="#FACC15"
              animate={isPlaying ? { scaleY: [0.9, 1.25, 0.9] } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </g>
          <text
            x="28"
            y="6"
            textAnchor="middle"
            fill="#FFEDD5"
            fontSize="18"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Fireplace
          </text>
        </g>

        {/* Sub-Scene 2: "BBQ Grill" */}
        <g transform="translate(865, 395)" filter="url(#clay-shadow)">
          <rect x="-92" y="-44" width="184" height="84" rx="20" fill="#1E293B" stroke="#F43F5E" strokeWidth="3.5" />
          <g transform="translate(-45, -4)">
            <path d="M-24,-4 C-24,20 24,20 24,-4 Z" fill="#E11D48" stroke="#FDA4AF" strokeWidth="2" />
            <line x1="-14" y1="12" x2="-20" y2="24" stroke="#94A3B8" strokeWidth="3" />
            <line x1="14" y1="12" x2="20" y2="24" stroke="#94A3B8" strokeWidth="3" />
            <motion.path
              d="M-8,-6 C-4,-18 4,-18 8,-6"
              stroke="#FACC15"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={isPlaying ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </g>
          <text
            x="28"
            y="6"
            textAnchor="middle"
            fill="#FFE4E6"
            fontSize="18"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            BBQ Grill
          </text>
        </g>

        {/* Sub-Scene 3: "Pizza Oven" */}
        <g transform="translate(865, 500)" filter="url(#clay-shadow)">
          <rect x="-92" y="-44" width="184" height="84" rx="20" fill="#1E293B" stroke="#FACC15" strokeWidth="3.5" />
          <g transform="translate(-45, 4)">
            <path d="M-26,14 C-26,-22 26,-22 26,14 Z" fill="#D97706" stroke="#FDE68A" strokeWidth="2" />
            <path d="M-14,14 C-14,-2 14,-2 14,14 Z" fill="#451A03" />
            <circle cx="0" cy="10" r="8" fill="#FACC15" stroke="#EF4444" strokeWidth="2" />
          </g>
          <text
            x="28"
            y="6"
            textAnchor="middle"
            fill="#FEF9C3"
            fontSize="18"
            fontWeight="900"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            Pizza Oven
          </text>
        </g>
      </svg>
    </div>
  );
};
