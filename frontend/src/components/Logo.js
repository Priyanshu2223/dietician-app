import React from 'react';

/**
 * Logo component (SVG)
 * - size: pixel size for width & height (keeps aspect ratio)
 * - This icon shows a person, a plate and a leaf (nutrition + wellness)
 */
export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="logoTitle logoDesc"
    >
      <title id="logoTitle">Dietician logo</title>
      <desc id="logoDesc">Abstract person above a plate with a leaf representing nutrition and wellness</desc>

      {/* rounded background */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0A74DA" />

      {/* plate (subtle lighter area) */}
      <g transform="translate(6,20)">
        <path
          d="M52 22c0 9.94-11.61 18-26 18S0 31.94 0 22"
          fill="#EAF5FF"
          opacity="0.95"
        />
      </g>

      {/* person (head + body) */}
      <g transform="translate(18,6)" fill="#0A74DA">
        {/* head */}
        <circle cx="14" cy="8" r="6" fill="#FFFFFF" />
        {/* torso (rounded rectangle / shoulders) */}
        <path
          d="M6 28c0-6 8-10 14-10s14 4 14 10v2H6v-2z"
          fill="#FFFFFF"
        />
      </g>

      {/* leaf over the plate to indicate nutrition (green) */}
      <g transform="translate(38,30)" fill="none" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 6c4-6 12-8 18-4 0 0-4 6-10 10-6 4-8 2-8-6z" fill="#10B981" opacity="0.98"/>
        <path d="M8 4c3-2 6-1 8 1" stroke="#ffffff" strokeWidth="1" opacity="0.14"/>
      </g>

      {/* subtle highlight ring on background */}
      <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.04)" strokeWidth="2" fill="none" />
    </svg>
  );
}
