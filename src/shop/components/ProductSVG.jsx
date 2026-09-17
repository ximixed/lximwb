// SVG product illustrations for gaming accessories

export function ProductSVG({ type, color = '#6366f1', size = 140 }) {
  const svgs = {
    headset: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="65" r="38" stroke={color} strokeWidth="5" fill="none" opacity="0.3"/>
        <path d="M32 65 C32 44 49 27 70 27 C91 27 108 44 108 65" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
        <rect x="22" y="60" width="18" height="30" rx="9" fill={color} opacity="0.9"/>
        <rect x="100" y="60" width="18" height="30" rx="9" fill={color} opacity="0.9"/>
        <rect x="24" y="65" width="14" height="20" rx="7" fill={color}/>
        <rect x="102" y="65" width="14" height="20" rx="7" fill={color}/>
        <circle cx="70" cy="65" r="6" fill={color} opacity="0.5"/>
        <path d="M55 90 Q70 100 85 90" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
        <circle cx="70" cy="65" r="38" stroke={color} strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.2"/>
        <circle cx="31" cy="70" r="3" fill={color} opacity="0.4"/>
        <circle cx="109" cy="70" r="3" fill={color} opacity="0.4"/>
      </svg>
    ),
    mouse: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="42" y="28" width="56" height="85" rx="28" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
        <line x1="70" y1="28" x2="70" y2="80" stroke={color} strokeWidth="2.5" opacity="0.5"/>
        <rect x="52" y="38" width="26" height="8" rx="4" fill={color} opacity="0.3"/>
        <circle cx="70" cy="65" r="7" fill={color} opacity="0.6"/>
        <circle cx="70" cy="65" r="3" fill={color}/>
        <rect x="42" y="55" width="15" height="2" rx="1" fill={color} opacity="0.4"/>
        <rect x="83" y="55" width="15" height="2" rx="1" fill={color} opacity="0.4"/>
        <ellipse cx="70" cy="105" rx="20" ry="5" fill={color} opacity="0.1"/>
        <rect x="64" y="33" width="12" height="3" rx="1.5" fill={color} opacity="0.8"/>
      </svg>
    ),
    keyboard: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="45" width="110" height="65" rx="10" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5"/>
        {/* Row 1 */}
        {[20, 35, 50, 65, 80, 95, 110].map((x, i) => (
          <rect key={`r1-${i}`} x={x} y="55" width="10" height="10" rx="2.5" fill={color} opacity="0.5"/>
        ))}
        {/* Row 2 */}
        {[17, 32, 47, 62, 77, 92, 107].map((x, i) => (
          <rect key={`r2-${i}`} x={x} y="70" width="10" height="10" rx="2.5" fill={color} opacity="0.4"/>
        ))}
        {/* Row 3 */}
        {[20, 35, 50, 65, 80, 95].map((x, i) => (
          <rect key={`r3-${i}`} x={x} y="85" width="10" height="10" rx="2.5" fill={color} opacity="0.35"/>
        ))}
        {/* Spacebar */}
        <rect x="35" y="100" width="70" height="10" rx="3" fill={color} opacity="0.6"/>
        {/* RGB glow line */}
        <rect x="15" y="107" width="110" height="3" rx="1.5" fill={color} opacity="0.3"/>
        <rect x="110" y="70" width="15" height="10" rx="2.5" fill={color} opacity="0.5"/>
      </svg>
    ),
    controller: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 60 C25 40 40 30 55 30 H85 C100 30 115 40 115 60 L110 95 C105 115 90 115 80 110 L75 105 H65 L60 110 C50 115 35 115 30 95 Z"
          fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
        {/* D-pad */}
        <rect x="40" y="62" width="20" height="6" rx="2" fill={color} opacity="0.6"/>
        <rect x="47" y="55" width="6" height="20" rx="2" fill={color} opacity="0.6"/>
        {/* Buttons */}
        <circle cx="90" cy="58" r="5" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7"/>
        <circle cx="100" cy="66" r="5" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.7"/>
        <circle cx="80" cy="66" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.7"/>
        <circle cx="90" cy="74" r="5" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.7"/>
        {/* Thumbsticks */}
        <circle cx="60" cy="82" r="9" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
        <circle cx="60" cy="82" r="5" fill={color} opacity="0.5"/>
        <circle cx="82" cy="82" r="9" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
        <circle cx="82" cy="82" r="5" fill={color} opacity="0.5"/>
        {/* Center */}
        <rect x="63" y="52" width="14" height="8" rx="4" fill={color} opacity="0.4"/>
      </svg>
    ),
    monitor: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="120" height="80" rx="8" fill={color} opacity="0.12" stroke={color} strokeWidth="2.5"/>
        <rect x="16" y="26" width="108" height="68" rx="4" fill={color} opacity="0.08"/>
        {/* Screen content */}
        <rect x="20" y="30" width="100" height="60" rx="3" fill={color} opacity="0.05"/>
        <path d="M20 50 L40 40 L55 55 L70 35 L90 48 L110 30 L120 38 L120 88 L20 88 Z" fill={color} opacity="0.2"/>
        {/* RGB strip */}
        <rect x="10" y="96" width="120" height="3" rx="1.5" fill={color} opacity="0.5"/>
        {/* Stand */}
        <rect x="62" y="100" width="16" height="20" rx="3" fill={color} opacity="0.4"/>
        <rect x="48" y="118" width="44" height="6" rx="3" fill={color} opacity="0.5"/>
        {/* Refresh rate badge */}
        <rect x="88" y="34" width="28" height="14" rx="3" fill={color} opacity="0.3"/>
        <text x="93" y="44" fontSize="7" fill={color} opacity="0.9" fontWeight="bold">540Hz</text>
      </svg>
    ),
    chair: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back */}
        <rect x="48" y="15" width="44" height="65" rx="14" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
        <rect x="55" y="22" width="30" height="51" rx="8" fill={color} opacity="0.1"/>
        {/* Seat */}
        <rect x="40" y="72" width="60" height="22" rx="10" fill={color} opacity="0.2" stroke={color} strokeWidth="2"/>
        {/* Armrests */}
        <rect x="25" y="70" width="18" height="8" rx="4" fill={color} opacity="0.4"/>
        <rect x="25" y="70" width="5" height="20" rx="2.5" fill={color} opacity="0.3"/>
        <rect x="97" y="70" width="18" height="8" rx="4" fill={color} opacity="0.4"/>
        <rect x="110" y="70" width="5" height="20" rx="2.5" fill={color} opacity="0.3"/>
        {/* Base */}
        <rect x="63" y="94" width="14" height="20" rx="3" fill={color} opacity="0.35"/>
        <ellipse cx="70" cy="118" rx="30" ry="8" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
        <circle cx="45" cy="115" r="4" fill={color} opacity="0.4"/>
        <circle cx="95" cy="115" r="4" fill={color} opacity="0.4"/>
        <circle cx="55" cy="122" r="4" fill={color} opacity="0.4"/>
        <circle cx="85" cy="122" r="4" fill={color} opacity="0.4"/>
        <circle cx="70" cy="124" r="4" fill={color} opacity="0.4"/>
        {/* Logo */}
        <rect x="60" y="38" width="20" height="4" rx="2" fill={color} opacity="0.5"/>
      </svg>
    ),
    mousepad: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="120" height="75" rx="8" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
        <rect x="16" y="41" width="108" height="63" rx="5" fill={color} opacity="0.05"/>
        {/* Surface texture dots */}
        {Array.from({length: 6}, (_, row) =>
          Array.from({length: 10}, (_, col) => (
            <circle key={`${row}-${col}`} cx={24 + col * 11} cy={50 + row * 10} r="1" fill={color} opacity="0.2"/>
          ))
        )}
        {/* RGB edge */}
        <rect x="10" y="35" width="120" height="3" rx="1.5" fill={color} opacity="0.6"/>
        <rect x="10" y="107" width="120" height="3" rx="1.5" fill={color} opacity="0.6"/>
        <rect x="10" y="35" width="3" height="75" rx="1.5" fill={color} opacity="0.6"/>
        <rect x="127" y="35" width="3" height="75" rx="1.5" fill={color} opacity="0.6"/>
        {/* Logo area */}
        <rect x="55" y="60" width="30" height="20" rx="5" fill={color} opacity="0.1" stroke={color} strokeWidth="1" strokeDasharray="3 3"/>
      </svg>
    ),
    webcam: (
      <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <rect x="32" y="30" width="76" height="55" rx="12" fill={color} opacity="0.15" stroke={color} strokeWidth="2.5"/>
        {/* Lens outer */}
        <circle cx="70" cy="57" r="22" fill={color} opacity="0.1" stroke={color} strokeWidth="2.5"/>
        {/* Lens middle */}
        <circle cx="70" cy="57" r="15" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5"/>
        {/* Lens inner */}
        <circle cx="70" cy="57" r="8" fill={color} opacity="0.5"/>
        <circle cx="70" cy="57" r="4" fill={color}/>
        {/* Lens shine */}
        <circle cx="65" cy="52" r="2.5" fill="#fff" opacity="0.4"/>
        {/* LED */}
        <circle cx="108" cy="35" r="4" fill={color} opacity="0.8"/>
        <circle cx="108" cy="35" r="2" fill="#fff" opacity="0.9"/>
        {/* Mount */}
        <rect x="60" y="85" width="20" height="10" rx="3" fill={color} opacity="0.35"/>
        <path d="M45 100 Q70 110 95 100" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
        <rect x="50" y="100" width="40" height="8" rx="4" fill={color} opacity="0.3"/>
        {/* Ring light effect */}
        <circle cx="70" cy="57" r="22" stroke={color} strokeWidth="1" fill="none" opacity="0.2" strokeDasharray="4 4"/>
      </svg>
    ),
  };

  return (
    <svg className="product-svg" viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      {svgs[type] || svgs.headset}
    </svg>
  );
}
