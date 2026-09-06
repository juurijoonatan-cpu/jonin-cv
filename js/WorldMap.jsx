/* WorldMap — Europe in dot-matrix.

   Projection: true Mercator (d3.geoMercator), centred on the Baltic. Replaces
   the old raw-equirectangular projection, which stretched Scandinavia badly.

   Land test: the land geometry is rasterised once into an offscreen canvas and
   sampled by pixel alpha. Far faster and more exact than running geoContains
   per point, and it lets the dot lattice be laid out in SCREEN space, so the
   texture stays perfectly even everywhere on the map.

   Pins: five, one per journey stop. Cities closer together than a label can
   survive (Helsinki, Kijkduin, Lausanne) are carried in the list beneath the
   map instead of crowding the plate. */

const VB = { w: 800, h: 440 };
const CENTER = [14.567, 54.4020];
const SCALE = 720.8;

const DOT_STEP = 7.6;   /* screen-space lattice pitch */
const DOT_R    = 1.15;

const CITIES = [
  { name: "Espoo",     caption: "2020–now",  lat: 60.2055, lon: 24.6559, era: "now",  label: "right" },
  { name: "Olkiluoto", caption: "TVO plant",   lat: 61.2360, lon: 21.4422, era: "site", label: "left"  },
  { name: "Billund",   caption: "2015–16", lat: 55.7308, lon:  9.1153, era: "past", label: "right" },
  { name: "Rotterdam", caption: "2016–17", lat: 51.9244, lon:  4.4777, era: "past", label: "left"  },
  { name: "Geneva",    caption: "2017–20", lat: 46.2044, lon:  6.1432, era: "past", label: "left"  },
];

const JOURNEY = [
  { from: "Espoo",     to: "Billund",   years: "2015" },
  { from: "Billund",   to: "Rotterdam", years: "2016" },
  { from: "Rotterdam", to: "Geneva",    years: "2017" },
  { from: "Geneva",    to: "Espoo",     years: "2020" },
];

/* Stops that sit too close to a pin to label, plus the non-European ones. */
const ELSEWHERE = [
  { name: "Helsinki",  country: "Finland",       label: "M.Sc. Economics, University of Helsinki" },
  { name: "Kijkduin",  country: "Netherlands",   label: "Family home during the Rotterdam years" },
  { name: "Lausanne",  country: "Switzerland",   label: "IMD, one-week executive intensive" },
  { name: "Valencia",  country: "Spain",         label: "Universidad de Valencia, one-year programme" },
  { name: "Boston",    country: "United States", label: "Harvard Business School, CFO Program" },
  { name: "Barcelona", country: "Spain",         label: "Harvard Business School, Effective Boards" },
];

const WorldMap = () => {
  const isMobile = useIsMobile();
  /* The plate is a fixed 800-unit viewBox scaled to the container. On a phone
     that is about 0.44x, so labels drawn at desktop sizes end up ~4px on
     screen. Scale the whole label system up to compensate. */
  const LS = isMobile ? 2 : 1;
  const [dotPath, setDotPath] = React.useState("");
  const [failed, setFailed] = React.useState(false);

  const projection = React.useMemo(() => {
    if (!window.d3) return null;
    return window.d3.geoMercator()
      .center(CENTER)
      .translate([VB.w / 2, VB.h / 2])
      .scale(SCALE);
  }, [window.d3]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      let waited = 0;
      while ((!window.d3 || !window.topojson) && waited < 10000) {
        await new Promise(r => setTimeout(r, 50));
        waited += 50;
      }
      if (cancelled) return;
      if (!window.d3 || !window.topojson) { setFailed(true); return; }

      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json");
        const topo = await res.json();
        if (cancelled) return;
        const landFeat = window.topojson.feature(topo, topo.objects.land);

        const proj = window.d3.geoMercator()
          .center(CENTER)
          .translate([VB.w / 2, VB.h / 2])
          .scale(SCALE);

        /* Rasterise the land mask once. */
        const canvas = document.createElement("canvas");
        canvas.width = VB.w;
        canvas.height = VB.h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        window.d3.geoPath(proj, ctx)(landFeat);
        ctx.fill();
        const alpha = ctx.getImageData(0, 0, VB.w, VB.h).data;

        const onLand = (x, y) => {
          const xi = x | 0, yi = y | 0;
          if (xi < 0 || yi < 0 || xi >= VB.w || yi >= VB.h) return false;
          return alpha[(yi * VB.w + xi) * 4 + 3] > 128;
        };

        /* Staggered (hex) lattice in screen space — even texture, no banding.
           Each dot is a zero-length subpath; a round linecap paints it as a circle,
           which is about a fifth of the path data a real arc would need. */
        let d = "";
        let row = 0;
        for (let y = DOT_STEP / 2; y < VB.h; y += DOT_STEP * 0.87) {
          const xOff = (row % 2 === 0) ? 0 : DOT_STEP / 2;
          for (let x = xOff + DOT_STEP / 2; x < VB.w; x += DOT_STEP) {
            if (!onLand(x, y)) continue;
            d += `M${x.toFixed(1)} ${y.toFixed(1)}h0`;
          }
          row += 1;
        }
        if (!cancelled) setDotPath(d);
      } catch (err) {
        console.warn("Map load failed", err);
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const projected = React.useMemo(() => {
    if (!projection) return [];
    return CITIES.map(c => {
      const [x, y] = projection([c.lon, c.lat]);
      return { ...c, x, y };
    });
  }, [projection]);

  const cityByName = React.useMemo(
    () => Object.fromEntries(projected.map(c => [c.name, c])),
    [projected]
  );

  /* Quadratic arc. Lift is clamped so no leg escapes the top of the plate. */
  const arcPath = (a, b) => {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const lift = Math.max(26, Math.min(62, dist * 0.20));
    const midY = Math.max(16, Math.min(a.y, b.y) - lift);
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${((a.x + b.x) / 2).toFixed(1)} ${midY.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  };

  const legDur = 2.6;
  const legGap = 0.45;
  const totalDur = JOURNEY.length * legDur + (JOURNEY.length - 1) * legGap + 1.6;

  const ready = dotPath.length > 0;

  return (
    <div style={{
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      background: "#080808",
      position: "relative",
    }}>
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label="Map of Europe showing the route Espoo, Billund, Rotterdam, Geneva and back to Espoo"
      >
        <defs>
          <linearGradient id="jj-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#6EE7B7" stopOpacity="0" />
            <stop offset="18%"  stopColor="#6EE7B7" stopOpacity="1" />
            <stop offset="82%"  stopColor="#6EE7B7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
          </linearGradient>

          <filter id="jj-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dots sit brightest under the route and fall away toward the edges. */}
          <radialGradient id="jj-dotfade" cx="50%" cy="50%" r="68%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="1" />
            <stop offset="60%"  stopColor="#fff" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.62" />
          </radialGradient>
          <mask id="jj-dotmask">
            <rect width={VB.w} height={VB.h} fill="url(#jj-dotfade)" />
          </mask>
        </defs>

        {/* Land — one path, ~4400 dots */}
        {ready && (
          <g mask="url(#jj-dotmask)">
            <path
              d={dotPath}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={DOT_R * 2}
              strokeLinecap="round"
            />
          </g>
        )}

        {!ready && (
          <text
            x={VB.w / 2} y={VB.h / 2} textAnchor="middle"
            fill="rgba(255,255,255,0.35)" fontSize="10" letterSpacing="0.22em"
            style={{ fontFamily: "var(--jj-body)", textTransform: "uppercase" }}
          >
            {failed ? "Map unavailable" : "Loading map"}
          </text>
        )}

        {ready && JOURNEY.map((leg, i) => {
          const a = cityByName[leg.from], b = cityByName[leg.to];
          if (!a || !b) return null;
          return (
            <path
              key={`bg-${i}`}
              d={arcPath(a, b)}
              stroke="rgba(110,231,183,0.16)"
              strokeWidth={1}
              fill="none"
              strokeDasharray="1.5 4"
              strokeLinecap="round"
            />
          );
        })}

        {ready && JOURNEY.map((leg, i) => {
          const a = cityByName[leg.from], b = cityByName[leg.to];
          if (!a || !b) return null;
          const d = arcPath(a, b);
          const begin = i * (legDur + legGap);
          const t0 = (begin / totalDur).toFixed(3);
          const t1 = ((begin + legDur) / totalDur).toFixed(3);
          return (
            <g key={`leg-${i}`}>
              <path
                d={d}
                stroke="url(#jj-arc)"
                strokeWidth={1.5 * (isMobile ? 1.8 : 1)}
                fill="none"
                strokeLinecap="round"
                style={{ filter: "url(#jj-glow)" }}
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 900; 900 0; 900 0; 0 900"
                  keyTimes={`0; ${t0}; ${t1}; 1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
              </path>
              <circle r={2.6 * (isMobile ? 1.7 : 1)} fill="#6EE7B7" style={{ filter: "url(#jj-glow)" }}>
                <animateMotion
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0; 0; 1; 1"
                  keyTimes={`0; ${t0}; ${t1}; 1`}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0; 0; 1; 1; 0; 0"
                  keyTimes={`0; ${t0}; ${(+t0 + 0.008).toFixed(3)}; ${(+t1 - 0.008).toFixed(3)}; ${t1}; 1`}
                  dur={`${totalDur}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Pins */}
        {ready && projected.map(c => {
          const isNow = c.era === "now";
          const core = isNow ? "#6EE7B7" : c.era === "site" ? "rgba(255,255,255,0.75)" : "#FFFFFF";
          return (
            <g key={c.name} transform={`translate(${c.x.toFixed(1)},${c.y.toFixed(1)})`}>
              {isNow && (
                <circle r={4 * (isMobile ? 1.6 : 1)} fill="#6EE7B7" opacity={0.5}>
                  <animate attributeName="r"       values={isMobile ? "6;26;6" : "4;17;4"} dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5"   dur="2.8s" repeatCount="indefinite" />
                </circle>
              )}
              <circle r={5 * (isMobile ? 1.6 : 1)} fill="none" stroke={core} strokeWidth={0.9 * LS} opacity={0.5} />
              <circle r={2.2 * (isMobile ? 1.6 : 1)} fill={core} stroke="#080808" strokeWidth={0.8 * LS} />
            </g>
          );
        })}

        {/* Labels — tick, name, caption */}
        {ready && projected.map(c => {
          const right = c.label === "right";
          const dir = right ? 1 : -1;
          const tickFrom = c.x + dir * 7 * LS;
          const tickTo   = c.x + dir * 15 * LS;
          const tx       = c.x + dir * 19 * LS;
          const anchor   = right ? "start" : "end";
          const isNow    = c.era === "now";
          return (
            <g key={`lbl-${c.name}`}>
              <line
                x1={tickFrom.toFixed(1)} y1={c.y.toFixed(1)}
                x2={tickTo.toFixed(1)}   y2={c.y.toFixed(1)}
                stroke={isNow ? "rgba(110,231,183,0.7)" : "rgba(255,255,255,0.4)"}
                strokeWidth={0.9 * LS}
              />
              <text
                x={tx.toFixed(1)} y={(c.y - 1.5 * LS).toFixed(1)}
                textAnchor={anchor}
                fill={isNow ? "#6EE7B7" : "#FFFFFF"}
                fontSize={10.5 * LS} fontWeight={600}
                style={{
                  fontFamily: "var(--jj-body)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  paintOrder: "stroke",
                  stroke: "rgba(8,8,8,0.92)",
                  strokeWidth: 3 * LS,
                  strokeLinejoin: "round",
                }}
              >
                {c.name}
              </text>
              <text
                x={tx.toFixed(1)} y={(c.y + 10 * LS).toFixed(1)}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.5)"
                fontSize={8.5 * LS}
                style={{
                  fontFamily: "var(--jj-body)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  paintOrder: "stroke",
                  stroke: "rgba(8,8,8,0.92)",
                  strokeWidth: 2.6 * LS,
                  strokeLinejoin: "round",
                }}
              >
                {c.caption}
              </text>
            </g>
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
