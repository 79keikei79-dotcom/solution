import React from 'react';
import { motion } from 'motion/react';

export const ClayDefs: React.FC = () => (
  <defs>
    {/* 3D Clay Drop Shadow & Inner Highlight Filter */}
    <filter id="clay-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#020617" floodOpacity="0.55" />
    </filter>

    <filter id="clay-soft" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#020617" floodOpacity="0.45" />
    </filter>

    <filter id="neon-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Stage Background Gradient */}
    <radialGradient id="stage-bg" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stopColor="#1E295B" />
      <stop offset="60%" stopColor="#111836" />
      <stop offset="100%" stopColor="#090D1E" />
    </radialGradient>

    {/* 3D Clay Character Gradients */}
    <radialGradient id="ch4-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#6EE7B7" />
      <stop offset="55%" stopColor="#10B981" />
      <stop offset="100%" stopColor="#047857" />
    </radialGradient>

    <radialGradient id="o2-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FDA4AF" />
      <stop offset="50%" stopColor="#F43F5E" />
      <stop offset="100%" stopColor="#9F1239" />
    </radialGradient>

    <radialGradient id="co2-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#F0ABFC" />
      <stop offset="55%" stopColor="#C026D3" />
      <stop offset="100%" stopColor="#701A75" />
    </radialGradient>

    <radialGradient id="h2o-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#BAE6FD" />
      <stop offset="50%" stopColor="#0EA5E9" />
      <stop offset="100%" stopColor="#0369A1" />
    </radialGradient>

    <radialGradient id="stillage-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FBBF24" />
      <stop offset="50%" stopColor="#B45309" />
      <stop offset="100%" stopColor="#78350F" />
    </radialGradient>

    <radialGradient id="pellet-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#D97706" />
      <stop offset="55%" stopColor="#92400E" />
      <stop offset="100%" stopColor="#451A03" />
    </radialGradient>

    <radialGradient id="microbe-purple" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#DDD6FE" />
      <stop offset="50%" stopColor="#8B5CF6" />
      <stop offset="100%" stopColor="#4C1D95" />
    </radialGradient>

    <radialGradient id="microbe-pink" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FBCFE8" />
      <stop offset="50%" stopColor="#EC4899" />
      <stop offset="100%" stopColor="#831843" />
    </radialGradient>

    <radialGradient id="thermal-grad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#FEF08A" />
      <stop offset="50%" stopColor="#F97316" />
      <stop offset="100%" stopColor="#DC2626" />
    </radialGradient>

    <radialGradient id="elec-grad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#FEF9C3" />
      <stop offset="50%" stopColor="#FACC15" />
      <stop offset="100%" stopColor="#CA8A04" />
    </radialGradient>

    <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDBA74" />
      <stop offset="45%" stopColor="#EA580C" />
      <stop offset="100%" stopColor="#9A3412" />
    </linearGradient>

    <linearGradient id="steel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#94A3B8" />
      <stop offset="50%" stopColor="#475569" />
      <stop offset="100%" stopColor="#1E293B" />
    </linearGradient>

    <linearGradient id="glass-pipe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
      <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.18" />
      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
    </linearGradient>
  </defs>
);

/* 1. Glossy Spirit Bottle on Conveyor */
export const BottleCharacter: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Bottle Neck & Cork */}
    <rect x="-7" y="-52" width="14" height="10" rx="4" fill="#D97706" />
    <rect x="-6" y="-44" width="12" height="16" rx="3" fill="#38BDF8" />
    {/* Bottle Body */}
    <rect x="-16" y="-30" width="32" height="46" rx="10" fill="#0EA5E9" stroke="#7DD3FC" strokeWidth="2" />
    {/* Liquid Inside */}
    <rect x="-13" y="-12" width="26" height="25" rx="7" fill="#F59E0B" />
    {/* Glossy Highlight */}
    <path d="M-10,-25 L-10,8" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
    {/* Cute Label with Smile */}
    <rect x="-11" y="-22" width="22" height="16" rx="4" fill="#FEF3C7" />
    <circle cx="-4" cy="-16" r="2" fill="#0F172A" />
    <circle cx="4" cy="-16" r="2" fill="#0F172A" />
    <path d="M-4,-11 Q0,-8 4,-11" stroke="#0F172A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </g>
);

/* 2. Stillage Blob Character */
export const StillageCharacter: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  showLabel?: boolean;
}> = ({ x = 0, y = 0, scale = 1, showLabel = true }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Messy Clay Blob Shape */}
    <path
      d="M-32,8 C-38,-8 -25,-26 -8,-24 C2,-32 22,-26 28,-12 C38,-4 36,14 22,18 C10,24 -18,22 -32,8 Z"
      fill="url(#stillage-grad)"
      stroke="#FDE68A"
      strokeWidth="2"
    />
    {/* Clay Highlight */}
    <ellipse cx="-10" cy="-12" rx="10" ry="5" fill="#FFFFFF" opacity="0.35" transform="rotate(-15 -10 -12)" />
    {/* Cute Goofy Eyes */}
    <circle cx="-9" cy="-4" r="5.5" fill="#FFFFFF" />
    <circle cx="9" cy="-4" r="5.5" fill="#FFFFFF" />
    <circle cx="-8" cy="-4" r="2.8" fill="#0F172A" />
    <circle cx="10" cy="-3" r="2.8" fill="#0F172A" />
    <circle cx="-9" cy="-5.5" r="1" fill="#FFFFFF" />
    <circle cx="9" cy="-4.5" r="1" fill="#FFFFFF" />
    {/* Playful Wavy Mouth */}
    <path d="M-6,5 Q0,11 6,5" stroke="#FEF3C7" strokeWidth="2.5" fill="#78350F" strokeLinecap="round" />
    {/* Label */}
    {showLabel && (
      <g transform="translate(0, 29)">
        <rect x="-36" y="-11" width="72" height="22" rx="8" fill="#451A03" stroke="#FBBF24" strokeWidth="2" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="#FEF3C7"
          fontSize="12"
          fontWeight="800"
          fontFamily="Bricolage Grotesque, sans-serif"
        >
          Stillage
        </text>
      </g>
    )}
  </g>
);

/* 3. Comic POP! Burst */
export const PopBurst: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    <polygon
      points="0,-32 9,-14 28,-22 17,-4 34,8 14,12 20,30 2,18 -14,30 -12,12 -32,8 -16,-4 -26,-22 -8,-14"
      fill="#FACC15"
      stroke="#EF4444"
      strokeWidth="3"
    />
    <text
      x="0"
      y="5"
      textAnchor="middle"
      fill="#7F1D1D"
      fontSize="15"
      fontWeight="900"
      fontFamily="Bricolage Grotesque, sans-serif"
    >
      POP!
    </text>
  </g>
);

/* 4. Cute Microbe Creature */
export const MicrobeCharacter: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  variant?: 'purple' | 'pink';
}> = ({ x = 0, y = 0, scale = 1, variant = 'purple' }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Little Antennae / Tentacles */}
    <path d="M-12,-20 Q-18,-32 -10,-34" stroke={variant === 'purple' ? '#C4B5FD' : '#F9A8D4'} strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M12,-20 Q18,-32 10,-34" stroke={variant === 'purple' ? '#C4B5FD' : '#F9A8D4'} strokeWidth="5" strokeLinecap="round" fill="none" />
    <circle cx="-10" cy="-34" r="4" fill="#34D399" />
    <circle cx="10" cy="-34" r="4" fill="#34D399" />

    {/* Plump Clay Body */}
    <rect
      x="-24"
      y="-22"
      width="48"
      height="42"
      rx="20"
      fill={variant === 'purple' ? 'url(#microbe-purple)' : 'url(#microbe-pink)'}
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
    {/* 3D Highlight */}
    <ellipse cx="-8" cy="-12" rx="9" ry="4" fill="#FFFFFF" opacity="0.35" />

    {/* Big Funny Eyes */}
    <circle cx="-9" cy="-5" r="6.5" fill="#FFFFFF" />
    <circle cx="9" cy="-5" r="6.5" fill="#FFFFFF" />
    <circle cx="-7" cy="-5" r="3.2" fill="#0F172A" />
    <circle cx="7" cy="-5" r="3.2" fill="#0F172A" />
    <circle cx="-8.5" cy="-6.5" r="1.2" fill="#FFFFFF" />
    <circle cx="5.5" cy="-6.5" r="1.2" fill="#FFFFFF" />

    {/* Big Chomping Mouth eating Stillage */}
    <path d="M-12,5 Q0,18 12,5 Z" fill="#4C0519" stroke="#FDA4AF" strokeWidth="1.5" />
    {/* Little Teeth */}
    <polygon points="-7,5 -4,10 -1,5" fill="#FFFFFF" />
    <polygon points="1,5 4,10 7,5" fill="#FFFFFF" />
  </g>
);

/* 5. Anthropomorphized CH4 Molecule Character ("CH4" printed on belly) */
export const CH4Character: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  scared?: boolean;
}> = ({ x = 0, y = 0, scale = 1, scared = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* 4 Hydrogen Knobs around Carbon Sphere */}
    <circle cx="-20" cy="-16" r="8" fill="#34D399" stroke="#A7F3D0" strokeWidth="1.5" />
    <circle cx="20" cy="-16" r="8" fill="#34D399" stroke="#A7F3D0" strokeWidth="1.5" />
    <circle cx="-22" cy="14" r="8" fill="#34D399" stroke="#A7F3D0" strokeWidth="1.5" />
    <circle cx="22" cy="14" r="8" fill="#34D399" stroke="#A7F3D0" strokeWidth="1.5" />

    {/* Main Plump Round Body */}
    <circle cx="0" cy="0" r="24" fill="url(#ch4-grad)" stroke="#A7F3D0" strokeWidth="2" />
    {/* 3D Clay Specular Highlight */}
    <ellipse cx="-8" cy="-13" rx="8" ry="4" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 -8 -13)" />

    {/* Cute Face */}
    <circle cx="-8" cy="-6" r="4" fill="#064E3B" />
    <circle cx="8" cy="-6" r="4" fill="#064E3B" />
    <circle cx="-9" cy="-7.5" r="1.5" fill="#FFFFFF" />
    <circle cx="7" cy="-7.5" r="1.5" fill="#FFFFFF" />
    {/* Rosy Cheeks */}
    <ellipse cx="-14" cy="-2" rx="3.5" ry="2" fill="#FB7185" opacity="0.7" />
    <ellipse cx="14" cy="-2" rx="3.5" ry="2" fill="#FB7185" opacity="0.7" />

    {scared ? (
      <circle cx="0" cy="-1" r="4" fill="#064E3B" />
    ) : (
      <path d="M-5,-2 Q0,3 5,-2" stroke="#064E3B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    )}

    {/* Bold "CH₄" printed clearly on the belly with proper subscript 4 */}
    <rect x="-16" y="4" width="32" height="15" rx="6" fill="#064E3B" opacity="0.85" />
    <text
      x="0"
      y="14.5"
      textAnchor="middle"
      fill="#ECFDF5"
      fontSize="11.5"
      fontWeight="900"
      fontFamily="JetBrains Mono, monospace"
    >
      <tspan>CH</tspan>
      <tspan dy="3" fontSize="8.5">4</tspan>
    </text>
  </g>
);

/* 6. Aggressive O2 Molecule Brawler ("O₂" on chest) */
export const O2Character: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Boxing Gloves / Arms */}
    <circle cx="-28" cy="2" r="9" fill="#DC2626" stroke="#FCA5A5" strokeWidth="2" />
    <circle cx="28" cy="2" r="9" fill="#DC2626" stroke="#FCA5A5" strokeWidth="2" />

    {/* Fierce Crimson Body */}
    <circle cx="0" cy="0" r="25" fill="url(#o2-grad)" stroke="#FDA4AF" strokeWidth="2" />
    <ellipse cx="-8" cy="-14" rx="8" ry="4" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 -8 -14)" />

    {/* Angry Fierce V-Eyebrows */}
    <path d="M-16,-12 L-3,-5" stroke="#4C0519" strokeWidth="4" strokeLinecap="round" />
    <path d="M16,-12 L3,-5" stroke="#4C0519" strokeWidth="4" strokeLinecap="round" />

    {/* Fierce Eyes */}
    <circle cx="-8" cy="-5" r="4" fill="#FEF08A" />
    <circle cx="8" cy="-5" r="4" fill="#FEF08A" />
    <circle cx="-7" cy="-5" r="2" fill="#4C0519" />
    <circle cx="7" cy="-5" r="2" fill="#4C0519" />

    {/* Gritting Teeth Mouth */}
    <rect x="-9" y="0" width="18" height="6" rx="3" fill="#FFFFFF" stroke="#4C0519" strokeWidth="1.5" />
    <line x1="-3" y1="0" x2="-3" y2="6" stroke="#4C0519" strokeWidth="1.5" />
    <line x1="3" y1="0" x2="3" y2="6" stroke="#4C0519" strokeWidth="1.5" />

    {/* "O₂" printed clearly on belly with proper subscript 2 */}
    <rect x="-14" y="8" width="28" height="14" rx="5" fill="#4C0519" opacity="0.9" />
    <text
      x="0"
      y="18"
      textAnchor="middle"
      fill="#FFE4E6"
      fontSize="11.5"
      fontWeight="900"
      fontFamily="JetBrains Mono, monospace"
    >
      <tspan>O</tspan>
      <tspan dy="3" fontSize="8.5">2</tspan>
    </text>
  </g>
);

/* 7. Happy Dancing CO2 Molecule Character ("CO₂" on belly) */
export const CO2Character: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Two Oxygen Ears */}
    <circle cx="-22" cy="-8" r="10" fill="#E879F9" stroke="#FAE8FF" strokeWidth="1.5" />
    <circle cx="22" cy="-8" r="10" fill="#E879F9" stroke="#FAE8FF" strokeWidth="1.5" />

    {/* Dancing Arms & Legs */}
    <path d="M-18,6 Q-30,-8 -26,-18" stroke="#F0ABFC" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M18,6 Q30,-8 26,-18" stroke="#F0ABFC" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Main Body */}
    <circle cx="0" cy="0" r="23" fill="url(#co2-grad)" stroke="#F5D0FE" strokeWidth="2" />
    <ellipse cx="-7" cy="-12" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.45" />

    {/* Happy Dancing Eyes (Arcs) */}
    <path d="M-11,-6 Q-7,-12 -3,-6" stroke="#FFFFFF" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    <path d="M3,-6 Q7,-12 11,-6" stroke="#FFFFFF" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* Laughing Mouth */}
    <path d="M-6,-1 Q0,6 6,-1 Z" fill="#FAE8FF" />

    {/* "CO₂" Belly Badge with proper subscript 2 */}
    <rect x="-16" y="5" width="32" height="14" rx="5" fill="#4A044E" />
    <text
      x="0"
      y="14.5"
      textAnchor="middle"
      fill="#FAE8FF"
      fontSize="11"
      fontWeight="900"
      fontFamily="JetBrains Mono, monospace"
    >
      <tspan>CO</tspan>
      <tspan dy="3" fontSize="8">2</tspan>
    </text>
  </g>
);

/* 8. Cute Dancing H2O Molecule Character ("H₂O" on belly) */
export const H2OCharacter: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-soft)">
    {/* Mickey-style Hydrogen Ears */}
    <circle cx="-18" cy="-18" r="10" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.5" />
    <circle cx="18" cy="-18" r="10" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.5" />

    {/* Main Oxygen Sphere */}
    <circle cx="0" cy="0" r="23" fill="url(#h2o-grad)" stroke="#BAE6FD" strokeWidth="2" />
    <ellipse cx="-7" cy="-12" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.5" />

    {/* Sparkling Cute Eyes */}
    <circle cx="-8" cy="-6" r="3.8" fill="#082F49" />
    <circle cx="8" cy="-6" r="3.8" fill="#082F49" />
    <circle cx="-9" cy="-7.5" r="1.5" fill="#FFFFFF" />
    <circle cx="7" cy="-7.5" r="1.5" fill="#FFFFFF" />
    <path d="M-5,-1 Q0,4 5,-1" stroke="#082F49" strokeWidth="2.2" fill="none" strokeLinecap="round" />

    {/* "H₂O" Belly Badge with proper subscript 2 */}
    <rect x="-16" y="5" width="32" height="14" rx="5" fill="#082F49" />
    <text
      x="0"
      y="14.5"
      textAnchor="middle"
      fill="#E0F2FE"
      fontSize="11"
      fontWeight="900"
      fontFamily="JetBrains Mono, monospace"
    >
      <tspan>H</tspan>
      <tspan dy="3" fontSize="8">2</tspan>
      <tspan dy="-3">O</tspan>
    </text>
  </g>
);

/* 9. Thermal Energy Floating Cloud Character */
export const ThermalEnergyBadge: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-shadow)">
    {/* Wavy Warm Steam Puff */}
    <path
      d="M-58,6 C-66,-14 -46,-32 -24,-26 C-12,-42 16,-42 28,-26 C50,-32 68,-12 58,8 C66,24 44,36 22,30 C6,38 -18,38 -32,28 C-52,34 -66,20 -58,6 Z"
      fill="url(#thermal-grad)"
      stroke="#FEF08A"
      strokeWidth="2.5"
    />
    {/* Cute Warm Face */}
    <circle cx="-14" cy="-12" r="4" fill="#431407" />
    <circle cx="14" cy="-12" r="4" fill="#431407" />
    <circle cx="-15" cy="-13.5" r="1.5" fill="#FFFFFF" />
    <circle cx="13" cy="-13.5" r="1.5" fill="#FFFFFF" />
    <path d="M-6,-8 Q0,-2 6,-8" stroke="#431407" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Clear Label */}
    <rect x="-52" y="2" width="104" height="22" rx="8" fill="#7C2D12" stroke="#FDE047" strokeWidth="1.5" />
    <text
      x="0"
      y="17"
      textAnchor="middle"
      fill="#FEF9C3"
      fontSize="12"
      fontWeight="800"
      fontFamily="Bricolage Grotesque, sans-serif"
    >
      Thermal Energy
    </text>
  </g>
);

/* 10. Electrical Energy Neon Lightning Character */
export const ElectricalEnergyBadge: React.FC<{ x?: number; y?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-shadow)">
    {/* Electric Aura */}
    <circle cx="0" cy="-4" r="44" fill="#FACC15" opacity="0.22" filter="url(#neon-glow)" />
    {/* Lightning Bolts Left & Right */}
    <polygon points="-45,-28 -25,-12 -36,-8 -18,16 -42,-2 -31,-6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
    <polygon points="45,-28 25,-12 36,-8 18,16 42,-2 31,-6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

    {/* Central Electric Character Core */}
    <rect x="-42" y="-30" width="84" height="58" rx="22" fill="url(#elec-grad)" stroke="#FEF08A" strokeWidth="3" />
    {/* Cool Eyes */}
    <circle cx="-12" cy="-12" r="4.5" fill="#0F172A" />
    <circle cx="12" cy="-12" r="4.5" fill="#0F172A" />
    <circle cx="-13.5" cy="-13.5" r="1.6" fill="#FFFFFF" />
    <circle cx="10.5" cy="-13.5" r="1.6" fill="#FFFFFF" />
    <path d="M-7,-5 Q0,1 7,-5" stroke="#0F172A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Clear Label */}
    <rect x="-56" y="4" width="112" height="22" rx="8" fill="#0F172A" stroke="#FACC15" strokeWidth="2" />
    <text
      x="0"
      y="19"
      textAnchor="middle"
      fill="#FEF08A"
      fontSize="12"
      fontWeight="800"
      fontFamily="Bricolage Grotesque, sans-serif"
    >
      Electrical Energy
    </text>
  </g>
);

/* 11. Cute Cylindrical Biomass Pellet */
export const PelletCharacter: React.FC<{ x?: number; y?: number; rotate?: number; scale?: number }> = ({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`} filter="url(#clay-soft)">
    <rect x="-14" y="-8" width="28" height="16" rx="6" fill="url(#pellet-grad)" stroke="#FDE68A" strokeWidth="1.2" />
    <ellipse cx="-10" cy="0" rx="3" ry="6" fill="#D97706" />
    <circle cx="-2" cy="-2" r="1.8" fill="#FEF3C7" />
    <circle cx="5" cy="-2" r="1.8" fill="#FEF3C7" />
    <path d="M-1,2 Q1.5,5 4,2" stroke="#FEF3C7" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </g>
);

/* 12. Classic Comic-Book Brawl Dust Cloud with Sparks */
export const BrawlCloud: React.FC<{ x?: number; y?: number; scale?: number; label?: string }> = ({
  x = 0,
  y = 0,
  scale = 1,
  label = 'POW!',
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`} filter="url(#clay-shadow)">
    <motion.g
      animate={{
        rotate: [-4, 5, -5, 4, 0],
        scale: [0.94, 1.08, 0.96, 1.05, 1],
      }}
      transition={{ duration: 0.55, repeat: Infinity }}
    >
      {/* Flying Comic Sparks */}
      <polygon points="-75,-45 -52,-30 -68,-22" fill="#FACC15" />
      <polygon points="78,-40 52,-25 70,-15" fill="#F97316" />
      <polygon points="-70,42 -45,25 -62,15" fill="#FB7185" />
      <polygon points="75,38 48,22 65,12" fill="#34D399" />

      {/* Puffy Dust Cloud */}
      <path
        d="M-55,10 C-72,-15 -50,-48 -20,-42 C-5,-64 30,-60 42,-38 C72,-40 82,-5 62,16 C72,42 42,58 18,46 C-5,62 -42,56 -50,32 C-70,32 -68,18 -55,10 Z"
        fill="#F1F5F9"
        stroke="#94A3B8"
        strokeWidth="4"
      />
      <circle cx="-25" cy="-15" r="22" fill="#E2E8F0" />
      <circle cx="22" cy="12" r="24" fill="#CBD5E1" />

      {/* Peeking CH4 and O2 limbs/gloves */}
      <circle cx="-48" cy="-28" r="11" fill="#DC2626" stroke="#4C0519" strokeWidth="2.5" />
      <circle cx="52" cy="-24" r="10" fill="#10B981" stroke="#064E3B" strokeWidth="2.5" />

      {/* Comic Starburst Center */}
      <polygon
        points="0,-36 10,-14 34,-22 20,0 38,16 14,18 18,40 0,24 -18,40 -14,18 -38,16 -20,0 -34,-22 -10,-14"
        fill="#FACC15"
        stroke="#DC2626"
        strokeWidth="3"
      />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fill="#7F1D1D"
        fontSize="16"
        fontWeight="900"
        fontFamily="Bricolage Grotesque, sans-serif"
      >
        {label}
      </text>
    </motion.g>
  </g>
);
