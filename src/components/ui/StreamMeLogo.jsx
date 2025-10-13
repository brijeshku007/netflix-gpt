const StreamMeLogo = ({
  width = 200,
  height = 60,
  animated = true,
  className = "",
  onClick
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer hover:opacity-80 transition-opacity duration-200 ${className}`}
      onClick={onClick}
    >
      <defs>
        {/* Gradient for the play button */}
        <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ff4757", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#ff3742", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#c44569", stopOpacity: 1 }} />
        </linearGradient>

        {/* Gradient for text */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#f1f2f6", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#ddd", stopOpacity: 1 }} />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Play button circle */}
      <circle cx="25" cy="30" r="18" fill="url(#playGradient)" filter="url(#shadow)" />

      {/* Play triangle */}
      <polygon points="20,22 20,38 32,30" fill="white" opacity="0.95" />

      {/* Streaming waves */}
      <g opacity="0.7">
        <path d="M45 20 Q50 15, 55 20" stroke="url(#playGradient)" strokeWidth="2" fill="none" opacity="0.6">
          {animated && (
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M45 25 Q52 18, 59 25" stroke="url(#playGradient)" strokeWidth="2" fill="none" opacity="0.5">
          {animated && (
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M45 30 Q54 21, 63 30" stroke="url(#playGradient)" strokeWidth="2" fill="none" opacity="0.4">
          {animated && (
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" begin="0.6s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M45 35 Q52 42, 59 35" stroke="url(#playGradient)" strokeWidth="2" fill="none" opacity="0.5">
          {animated && (
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.9s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M45 40 Q50 45, 55 40" stroke="url(#playGradient)" strokeWidth="2" fill="none" opacity="0.6">
          {animated && (
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="1.2s" repeatCount="indefinite" />
          )}
        </path>
      </g>

      {/* StreamMe Text */}
      <text x="75" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="url(#textGradient)" filter="url(#shadow)">
        Stream
      </text>
      <text x="75" y="45" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="url(#playGradient)" filter="url(#shadow)">
        Me
      </text>

      {/* Decorative dots */}
      <circle cx="160" cy="15" r="2" fill="url(#playGradient)" opacity="0.6">
        {animated && (
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="170" cy="20" r="1.5" fill="url(#playGradient)" opacity="0.4">
        {animated && (
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" begin="0.5s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="165" cy="45" r="2" fill="url(#playGradient)" opacity="0.5">
        {animated && (
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" begin="1s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="175" cy="40" r="1.5" fill="url(#playGradient)" opacity="0.3">
        {animated && (
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur="3s" begin="1.5s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
};

export default StreamMeLogo;