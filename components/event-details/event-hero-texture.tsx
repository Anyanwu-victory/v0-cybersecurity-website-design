import type { Event } from "@/lib/types";

type HeroTexture = NonNullable<Event["heroTexture"]>;

const waveHeights = Array.from({ length: 68 }, (_, index) => {
  const distance = Math.abs(index - 33.5) / 33.5;
  const envelope = Math.pow(1 - distance, 1.6);
  const pulse = Math.abs(Math.sin(index * 0.47) * Math.cos(index * 0.19));
  return 6 + envelope * (48 + pulse * 225);
});

export function EventHeroTexture({ texture = "grain" }: { texture?: HeroTexture }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0b0e14]">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(105,11,25,0.43)_0%,rgba(23,17,29,0.45)_44%,rgba(5,59,79,0.43)_100%)]" />

      {texture === "grid" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(160,185,198,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(160,185,198,0.16) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            maskImage: "linear-gradient(90deg, transparent 8%, black 70%)",
          }}
        />
      )}

      {texture === "waveform" && (
        <svg
          className="absolute -right-[38%] top-[18%] h-[62%] w-[105%] opacity-20 sm:-right-[16%] sm:top-[12%] sm:h-[76%] sm:w-[75%] sm:opacity-35 lg:-right-[5%] lg:top-[9%] lg:h-[82%] lg:w-[58%] lg:opacity-55"
          viewBox="0 0 952 400"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="event-wave-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="200"
              x2="952"
              y2="200"
            >
              <stop offset="0" stopColor="#e11d2e" />
              <stop offset="0.53" stopColor="#9e4c73" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          {waveHeights.map((height, index) => {
            const x = 14 + index * 14;
            return (
              <line
                key={index}
                x1={x}
                x2={x}
                y1={200 - height / 2}
                y2={200 + height / 2}
                stroke="url(#event-wave-gradient)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}

      {texture === "circuit" && (
        <svg
          className="absolute inset-0 h-full w-full opacity-10 sm:opacity-25"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="#69a8c1"
          strokeWidth="1"
        >
          <path d="M320 0v96h140l80 80h180v110h130l95-95h495M720 700V580h155l85-85h180v-85h300M510 700V530l120-120h210l80-80h520M1000 0v130l110 110h330M140 700V585h220l75-75h165" />
          <path d="M530 0v70l95 95h130M850 0v210h145l75 75h210v140h160M400 700v-95l125-125h195M1140 700V585h-100l-90-90M0 315h350l95 95h150" stroke="#a96880" />
          {["460,96", "720,176", "850,286", "945,191", "875,580", "960,495", "1140,410", "1100,240", "1070,285", "525,480", "350,315"].map((point) => {
            const [cx, cy] = point.split(",");
            return <circle key={point} cx={cx} cy={cy} r="4" fill="#0b0e14" strokeWidth="2" />;
          })}
        </svg>
      )}

      <svg className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-soft-light" preserveAspectRatio="none">
        <filter id="event-hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="8" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" fill="#fff" filter="url(#event-hero-grain)" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,13,0.42)_0%,rgba(6,8,13,0.14)_55%,transparent_100%)]" />
    </div>
  );
}
