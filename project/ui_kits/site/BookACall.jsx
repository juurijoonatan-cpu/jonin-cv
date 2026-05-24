/* BookACall — a designed booking card with a real-feeling month grid.
   Visual mock; clicking a slot opens a confirmation. Easily swapped for
   a real Cal.com inline embed by replacing the <CalSlots /> block. */

const TIMES = ["09:30", "11:00", "13:30", "15:00"];

const BookACall = () => {
  const today = new Date();
  const [monthOffset, setMonthOffset] = React.useState(0);
  const [pickedDate, setPickedDate] = React.useState(null);
  const [pickedTime, setPickedTime] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthName = viewDate.toLocaleString("en-GB", { month: "long" });
  const year = viewDate.getFullYear();
  const firstDow = (viewDate.getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

  // Pseudo-random "available" days — fixed per month so it doesn't shimmer
  const seed = viewDate.getFullYear() * 100 + viewDate.getMonth();
  const available = new Set();
  for (let d = 1; d <= daysInMonth; d++) {
    const isPast = monthOffset === 0 && d < today.getDate();
    if (isPast) continue;
    const r = Math.sin(seed + d * 7.31) * 10000;
    if ((r - Math.floor(r)) > 0.55) available.add(d);
  }

  if (confirmed) {
    return (
      <section style={{
        background: "var(--jj-ink)",
        color: "var(--jj-paper-2)",
        borderRadius: 18,
        padding: "44px 40px",
        marginBottom: 6,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 18 }}>
          Confirmed
        </div>
        <h2 style={{
          fontFamily: "var(--jj-display)", fontWeight: 700,
          fontSize: "clamp(28px, 3.4vw, 40px)",
          lineHeight: 1, letterSpacing: "-0.035em",
          margin: 0,
        }}>
          See you {monthName} {pickedDate}, {pickedTime}.
        </h2>
        <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
          A calendar invitation is on its way to your inbox.
        </p>
        <button
          onClick={() => { setConfirmed(false); setPickedDate(null); setPickedTime(null); }}
          style={{
            marginTop: 22,
            background: "transparent", color: "var(--jj-paper-2)",
            border: "1px solid var(--jj-paper-2)",
            padding: "10px 18px", borderRadius: 999,
            fontSize: 10, fontWeight: 500, letterSpacing: "0.16em",
            textTransform: "uppercase", cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Pick another time
        </button>
      </section>
    );
  }

  return (
    <section style={{
      background: "var(--jj-paper-2)",
      borderRadius: 18,
      padding: "28px 40px 32px",
      marginBottom: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <Eyebrow muted>Book a call</Eyebrow>
        <div style={{ fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>05</div>
      </div>
      <H2 soft="thirty minutes.">A focused</H2>
      <Lede style={{ marginTop: 6, marginBottom: 22 }}>
        Short intro calls work best for boards, recruiters, and ex-colleagues.
        Pick a slot — I confirm within a working day.
      </Lede>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "start" }}>
        {/* Calendar grid */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
              {monthName} <span style={{ color: "var(--jj-muted)" }}>{year}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setMonthOffset(o => Math.max(0, o - 1))}
                disabled={monthOffset === 0}
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid var(--jj-ink)",
                  background: "transparent", cursor: monthOffset === 0 ? "not-allowed" : "pointer",
                  opacity: monthOffset === 0 ? 0.3 : 1,
                  fontSize: 12, fontFamily: "inherit",
                }}>←</button>
              <button
                onClick={() => setMonthOffset(o => o + 1)}
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  border: "1px solid var(--jj-ink)",
                  background: "transparent", cursor: "pointer",
                  fontSize: 12, fontFamily: "inherit",
                }}>→</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {["MO","TU","WE","TH","FR","SA","SU"].map(d => (
              <div key={d} style={{
                fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--jj-muted)", textAlign: "center", padding: "4px 0 8px",
              }}>{d}</div>
            ))}
            {Array.from({ length: firstDow }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const avail = available.has(d);
              const isPicked = pickedDate === d;
              return (
                <button
                  key={d}
                  disabled={!avail}
                  onClick={() => { setPickedDate(d); setPickedTime(null); }}
                  style={{
                    height: 36,
                    border: 0,
                    borderRadius: 10,
                    background: isPicked ? "var(--jj-ink)" : (avail ? "var(--jj-paper)" : "transparent"),
                    color: isPicked ? "var(--jj-paper-2)" : (avail ? "var(--jj-ink)" : "var(--jj-muted)"),
                    cursor: avail ? "pointer" : "default",
                    fontFamily: "inherit",
                    fontSize: 12,
                    fontWeight: avail ? 500 : 400,
                    opacity: avail ? 1 : 0.4,
                    transition: "background 140ms var(--jj-ease)",
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slot picker */}
        <div style={{ borderLeft: "1px solid rgba(0,0,0,0.08)", paddingLeft: 28, minHeight: 280 }}>
          <Eyebrow muted style={{ display: "block", marginBottom: 10 }}>
            {pickedDate ? <>Times on {monthName} {pickedDate}</> : "Pick a date first"}
          </Eyebrow>

          {!pickedDate && (
            <div style={{ fontSize: 11, color: "var(--jj-muted)", lineHeight: 1.5, marginTop: 6 }}>
              Highlighted days have open slots — I usually keep one morning and one early-afternoon block each week.
            </div>
          )}

          {pickedDate && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setPickedTime(t)}
                  style={{
                    textAlign: "left",
                    background: pickedTime === t ? "var(--jj-ink)" : "transparent",
                    color: pickedTime === t ? "var(--jj-paper-2)" : "var(--jj-ink)",
                    border: "1px solid var(--jj-ink)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 12,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    transition: "background 140ms var(--jj-ease)",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{t}</span>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: pickedTime === t ? "rgba(255,255,255,0.55)" : "var(--jj-muted)",
                  }}>
                    30 min
                  </span>
                </button>
              ))}

              <Button
                disabled={!pickedTime}
                onClick={() => setConfirmed(true)}
                style={{ marginTop: 8, justifyContent: "center" }}
              >
                Confirm slot <ArrowGlyph />
              </Button>
            </div>
          )}

          <div style={{
            marginTop: 24, paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.08)",
            fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)",
            display: "flex", justifyContent: "space-between",
          }}>
            <span>Helsinki, GMT+2</span>
            <span>Cal.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

window.BookACall = BookACall;
