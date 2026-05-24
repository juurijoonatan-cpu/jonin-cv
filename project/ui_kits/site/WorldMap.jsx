/* WorldMap — zoomed Europe view. Custom equirectangular projection centered
   on Europe, fine dot grid sampled from the world-atlas land geometry.
   The four-leg abroad-with-family journey animates as mint arcs.
   Non-European pins (Valencia, Boston, Barcelona) live in a separate
   "Elsewhere" list rendered alongside the map by PublicView. */

// Coordinates of cities used here
const CITIES = [
  { name: "Espoo",        country: "Finland",         lat: 60.2055, lon:  24.6559, role: "Home · TVO CFO",                era: "now",          big: true },
  { name: "Olkiluoto",    country: "Finland",         lat: 61.2360, lon:  21.4422, role: "TVO power plant",               era: "now-site" },
  { name: "Helsinki",     country: "Finland",         lat: 60.1699, lon:  24.9384, role: "M.Sc. Economics",               era: "study" },

  { name: "Billund",      country: "Denmark",         lat: 55.7308, lon:   9.1153, role: "Siemens Wind · lived & worked", era: "abroad" },
  { name: "Kijkduin",     country: "Netherlands",     lat: 52.0696, lon:   4.2117, role: "Lived · biked to Rotterdam",    era: "abroad-home" },
  { name: "Rotterdam",    country: "Netherlands",     lat: 51.9244, lon:   4.4777, role: "Neste · worked",                era: "abroad" },
  { name: "Geneva",       country: "Switzerland",     lat: 46.2044, lon:   6.1432, role: "Neste · lived & worked",        era: "abroad" },
  { name: "Lausanne",     country: "Switzerland",     lat: 46.5197, lon:   6.6323, role: "IMD · 1-week intensive",        era: "study" },
];

// Abroad-with-family journey: ordered list of legs.
const JOURNEY = [
  { from: "Espoo",   to: "Billund",   years: "2015 · arrived" },
  { from: "Billund", to: "Rotterdam", years: "2016" },
  { from: "Rotterdam", to: "Geneva",  years: "2017" },
  { from: "Geneva",  to: "Espoo",     years: "2020 · home" },
];

// Pins shown in the "Elsewhere" list (not on the Europe map)
const ELSEWHERE = [
  { name: "Valencia",  country: "Spain",         label: "U. de Valencia · 1-year study · pre-kids" },
  { name: "Boston",    country: "United States", label: "Harvard Business School · 1-week intensive" },
  { name: "Barcelona", country: "Spain",         label: "Harvard Boards programme · 1-week intensive" },
];

// View — zoomed Europe.
const VB = { w: 800, h: 500, centerLon: 7.5, centerLat: 53.2, scale: 14 };
const project = (lat, lon) => ({
  x: (lon - VB.centerLon) * VB.scale + VB.w / 2,
  y: (VB.centerLat - lat) * VB.scale + VB.h / 2,
});

const WorldMap = () => {
  const [land, setLand] = React.useState(null);
  const [dots, setDots] = React.useState([]);

  // Load land geometry + sample it into a dot grid in the visible region.
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      while (!window.d3 || !window.topojson) {
        await new Promise(r => setTimeout(r, 50));
      }
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json");
        const topo = await res.json();
        if (cancelled) return;
        const landFeat = window.topojson.feature(topo, topo.objects.land);
        setLand(landFeat);

        // Compute visible lat/lon window from viewBox bounds, plus a margin.
        const lonMin = VB.centerLon - (VB.w / 2 + 40) / VB.scale;
        const lonMax = VB.centerLon + (VB.w / 2 + 40) / VB.scale;
        const latMin = VB.centerLat - (VB.h / 2 + 40) / VB.scale;
        const latMax = VB.centerLat + (VB.h / 2 + 40) / VB.scale;

        const step = 0.9;
        const sampled = [];
        let row = 0;
        for (let lat = latMin; lat <= latMax; lat += step) {
          const offset = (row % 2 === 0) ? 0 : step / 2;
          for (let lon = lonMin + offset; lon <= lonMax; lon += step) {
            if (window.d3.geoContains(landFeat, [lon, lat])) {
              sampled.push(project(lat, lon));
            }
          }
          row += 1;
        }
        if (!cancelled) setDots(sampled);
      } catch (err) {
        console.warn("Map load failed", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Pre-project the city points
  const projected = React.useMemo(
    () => CITIES.map(c => ({ ...c, ...project(c.lat, c.lon) })),
    []
  );
  const cityByName = React.useMemo(
    () => Object.fromEntries(projected.map(c => [c.name, c])),
    [projected]
  );

  // Build a curved arc between two points.
  const arcPath = (a, b) => {
    const midX = (a.x + b.x) / 2;
    const dx   = Math.abs(b.x - a.x);
    const dy   = Math.abs(b.y - a.y);
    const lift = Math.max(40, Math.min(120, Math.sqrt(dx * dx + dy * dy) * 0.32));
    const midY = Math.min(a.y, b.y) - lift;
    return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
  };

  // Animation timing
  const legDur = 2.6;
  const legGap = 0.45;
  const totalDur = JOURNEY.length * legDur + (JOURNEY.length - 1) * legGap + 1.6;

  // Label offsets — keeps clusters legible.
  const labelOffsets = {
    Espoo:     { dx:  8, dy: -8 },
    Olkiluoto: { dx: -8, dy: -8, anchor: "end" },
    Helsinki:  { dx:  8, dy:  12 },
    Billund:   { dx: -8, dy: -8, anchor: "end" },
    Kijkduin:  { dx: -8, dy: -8, anchor: "end" },
    Rotterdam: { dx:  8, dy:  12 },
    Geneva:    { dx: -8, dy: -8, anchor: "end" },
    Lausanne:  { dx:  8, dy:  12 },
  };

  return (
    <div style={{
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      background: "#0A0A0A",
      position: "relative",
    }}>
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id="jj-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#6EE7B7" stopOpacity="0" />
            <stop offset="15%" stopColor="#6EE7B7" stopOpacity="1" />
            <stop offset="85%" stopColor="#6EE7B7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
          </linearGradient>
          <filter id="jj-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dotted continents */}
        {dots.length > 0 && (
          <g fill="rgba(255,255,255,0.32)">
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.0} />
            ))}
          </g>
        )}
        {dots.length === 0 && (
          <text x={VB.w / 2} y={VB.h / 2} textAnchor="middle" fill="rgba(255,255,255,0.4)"
                fontSize="11" letterSpacing="0.22em"
                style={{ fontFamily: "var(--jj-body)", textTransform: "uppercase" }}>
            Loading the map…
          </text>
        )}

        {/* Static dim arcs */}
        {dots.length > 0 && JOURNEY.map((leg, i) => {
          const a = cityByName[leg.from];
          const b = cityByName[leg.to];
          if (!a || !b) return null;
          return (
            <path
              key={`bg-${i}`}
              d={arcPath(a, b)}
              stroke="rgba(110,231,183,0.18)"
              strokeWidth={1}
              fill="none"
              strokeDasharray="2 3"
            />
          );
        })}

        {/* Animated arcs + traveling dots */}
        {dots.length > 0 && JOURNEY.map((leg, i) => {
          const a = cityByName[leg.from];
          const b = cityByName[leg.to];
          if (!a || !b) return null;
          const d = arcPath(a, b);
          const begin = i * (legDur + legGap);
          const drawEnd = (begin + legDur) / totalDur;
          const drawStart = begin / totalDur;
          return (
            <g key={`leg-${i}`}>
              <path
                d={d}
                stroke="url(#jj-arc)"
                strokeWidth={1.7}
                fill="none"
                strokeLinecap="round"
                style={{ filter: "url(#jj-glow)" }}
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 700; 700 0; 700 0; 0 700"
                  keyTimes={`0; ${drawStart.toFixed(3)}; ${drawEnd.toFixed(3)}; 1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Traveling dot */}
              <circle r={3} fill="#6EE7B7" filter="url(#jj-glow)">
                <animateMotion
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints={`0; 0; 1; 1`}
                  keyTimes={`0; ${drawStart.toFixed(3)}; ${drawEnd.toFixed(3)}; 1`}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0; 0; 1; 1; 0; 0"
                  keyTimes={`0; ${drawStart.toFixed(3)}; ${(drawStart + 0.01).toFixed(3)}; ${(drawEnd - 0.01).toFixed(3)}; ${drawEnd.toFixed(3)}; 1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* City dots */}
        {projected.map(c => {
          const fill =
            c.era === "now"        ? "var(--jj-status-go)" :
            c.era === "abroad"     ? "#FFFFFF"             :
            c.era === "abroad-home"? "#FFFFFF"             :
                                     "rgba(255,255,255,0.55)";
          const strokeC = c.era === "now" ? "#0A0A0A" : "rgba(10,10,10,0.6)";
          const r = c.big ? 4.5 : c.era === "abroad" ? 3.5 : 3;
          return (
            <g key={c.name} transform={`translate(${c.x},${c.y})`}>
              {c.big && (
                <>
                  <circle r={4} fill="var(--jj-status-go)" opacity={0.45}>
                    <animate attributeName="r"       values="4;18;4"     dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle r={r} fill={fill} stroke={strokeC} strokeWidth={1} />
            </g>
          );
        })}

        {/* Labels */}
        {projected.map(c => {
          const off = labelOffsets[c.name] || { dx: 8, dy: -8 };
          const anchor = off.anchor || "start";
          return (
            <text
              key={`lbl-${c.name}`}
              x={c.x + off.dx}
              y={c.y + off.dy}
              fill={c.era === "now" ? "#FFFFFF" : "rgba(255,255,255,0.9)"}
              fontSize={c.big ? 13 : c.era === "abroad" ? 12 : 11}
              fontWeight={c.big ? 600 : 500}
              textAnchor={anchor}
              style={{
                fontFamily: "var(--jj-body)",
                letterSpacing: "0.02em",
                paintOrder: "stroke",
                stroke: "rgba(10,10,10,0.9)",
                strokeWidth: 3.2,
                strokeLinejoin: "round",
              }}
            >
              {c.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

window.WorldMap = WorldMap;
window.JJ_CITIES = CITIES;
window.JJ_JOURNEY = JOURNEY;
window.JJ_ELSEWHERE = ELSEWHERE;
