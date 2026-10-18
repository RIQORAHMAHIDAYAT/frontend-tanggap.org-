<template>
  <div class="relative flex items-center justify-center w-24 h-20 sm:w-28 sm:h-22 shrink-0">
    <svg viewBox="0 0 120 90" class="w-full h-full drop-shadow-sm select-none" aria-hidden="true">
      <defs>
        <!-- Background Dial Gradient -->
        <linearGradient id="gaugeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3A4A5B" />
          <stop offset="100%" stop-color="#223040" />
        </linearGradient>
      </defs>

      <!-- Semi-circle dial body -->
      <path
        d="M 12 70 A 48 48 0 0 1 108 70 Z"
        fill="url(#gaugeBg)"
        stroke="#1E293B"
        stroke-width="1.5"
      />

      <!-- Tick Marks -->
      <!-- Left 180 deg -->
      <line x1="16" y1="67" x2="24" y2="67" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- ~150 deg -->
      <line x1="24" y1="46" x2="31" y2="50" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- ~120 deg -->
      <line x1="39" y1="31" x2="44" y2="38" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- Top 90 deg -->
      <line x1="60" y1="24" x2="60" y2="33" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- ~60 deg -->
      <line x1="81" y1="31" x2="76" y2="38" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- ~30 deg -->
      <line x1="96" y1="46" x2="89" y2="50" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />
      <!-- Right 0 deg -->
      <line x1="104" y1="67" x2="96" y2="67" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round" />

      <!-- Dial Needle (pointed around 35-40 degrees up from horizontal right, approx 2 o'clock) -->
      <!-- Needle line pointing from center (60, 68) to (88, 42) -->
      <line
        x1="58"
        y1="67"
        x2="88"
        y2="42"
        stroke="#EAB308"
        stroke-width="4.5"
        stroke-linecap="round"
      />
      <!-- Needle tip highlight -->
      <line
        x1="62"
        y1="64"
        x2="86"
        y2="44"
        stroke="#FDE047"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- Center Pivot Hub -->
      <circle cx="60" cy="67" r="6.5" fill="#EAB308" />
      <circle cx="60" cy="67" r="3" fill="#1E293B" />
    </svg>
  </div>
</template>

<script setup lang="ts">
// Reusable Speedometer Gauge matching dashboard-00 & dashboard-01 designs
</script>
