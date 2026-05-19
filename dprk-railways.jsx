import { useState, useEffect } from "react";

const STATIONS = [
  "Pyongyang Central", "Wonsan", "Kaesong", "Sinuiju", "Hamhung",
  "Chongjin", "Rajin", "Hyesan", "Sariwon", "Nampo",
  "Haeju", "Kanggye", "Kimchaek", "Kusong", "Tanchon"
];

const CLASSES = ["Juche Luxury (1A)", "Songun Premier (2A)", "Paektu Express (SL)", "People's Standard (3A)"];

const SAMPLE_TRAINS = [
  { id: "PK-001", name: "Paektusan Express", number: "1 UP", dep: "06:00", arr: "14:30", duration: "8h 30m", distance: "621 km", avail: { "Juche Luxury (1A)": 4, "Songun Premier (2A)": 12, "Paektu Express (SL)": 0, "People's Standard (3A)": 48 }, price: { "Juche Luxury (1A)": 1200, "Songun Premier (2A)": 840, "Paektu Express (SL)": 620, "People's Standard (3A)": 280 }, days: "D M T W T F S" },
  { id: "PK-002", name: "Mangyongbong Mail", number: "3 UP", dep: "08:15", arr: "19:00", duration: "10h 45m", distance: "621 km", avail: { "Juche Luxury (1A)": 0, "Songun Premier (2A)": 6, "Paektu Express (SL)": 18, "People's Standard (3A)": 96 }, price: { "Juche Luxury (1A)": 980, "Songun Premier (2A)": 680, "Paektu Express (SL)": 500, "People's Standard (3A)": 220 }, days: "D M T W T F S" },
  { id: "PK-003", name: "Chollima Intercity", number: "101 UP", dep: "12:30", arr: "16:45", duration: "4h 15m", distance: "310 km", avail: { "Juche Luxury (1A)": 8, "Songun Premier (2A)": 20, "Paektu Express (SL)": 30, "People's Standard (3A)": 120 }, price: { "Juche Luxury (1A)": 600, "Songun Premier (2A)": 420, "Paektu Express (SL)": 310, "People's Standard (3A)": 140 }, days: "D M _ W _ F _" },
  { id: "PK-004", name: "Kumsusan Rapid", number: "505 UP", dep: "19:45", arr: "05:20", duration: "9h 35m", distance: "621 km", avail: { "Juche Luxury (1A)": 2, "Songun Premier (2A)": 0, "Paektu Express (SL)": 4, "People's Standard (3A)": 72 }, price: { "Juche Luxury (1A)": 1050, "Songun Premier (2A)": 740, "Paektu Express (SL)": 540, "People's Standard (3A)": 250 }, days: "_ M _ W _ F _" },
];

const STAR = "★";

function StarRating() {
  return <span style={{ color: "#e8b84b", fontSize: 11, letterSpacing: 1 }}>{STAR}{STAR}{STAR}{STAR}{STAR}</span>;
}

function Badge({ children, color = "#c41e1e", bg = "#fdf0f0", textColor = "#7a1010" }) {
  return (
    <span style={{ background: bg, color: textColor, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1, border: `1px solid ${color}33` }}>
      {children}
    </span>
  );
}

function AvailBadge({ count }) {
  if (count === 0) return <span style={{ color: "#b91c1c", fontSize: 12, fontWeight: 700 }}>NOT AVBL</span>;
  if (count <= 5) return <span style={{ color: "#b45309", fontSize: 12, fontWeight: 700 }}>RAC {count}</span>;
  return <span style={{ color: "#15803d", fontSize: 12, fontWeight: 700 }}>AVBL {count}</span>;
}

export default function App() {
  const [tab, setTab] = useState("search");
  const [from, setFrom] = useState("Pyongyang Central");
  const [to, setTo] = useState("Wonsan");
  const [date, setDate] = useState("2026-06-15");
  const [tclass, setTclass] = useState("People's Standard (3A)");
  const [quota, setQuota] = useState("General");
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [bookStep, setBookStep] = useState(1);
  const [pnr, setPnr] = useState("");
  const [pnrResult, setPnrResult] = useState(null);
  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "M" }]);
  const [booked, setBooked] = useState(null);
  const [swapping, setSwapping] = useState(false);

  const swap = () => {
    setSwapping(true);
    setTimeout(() => {
      const t = from; setFrom(to); setTo(t);
      setSwapping(false);
    }, 300);
  };

  const search = () => {
    setResults(SAMPLE_TRAINS);
    setTab("results");
    setSelected(null);
  };

  const book = (train) => {
    setSelected(train);
    setBookStep(1);
    setPassengers([{ name: "", age: "", gender: "M" }]);
    setTab("book");
  };

  const confirmBook = () => {
    const pnrNum = "DPRK" + Math.floor(Math.random() * 9000000 + 1000000);
    setBooked({ pnr: pnrNum, train: selected, from, to, date, tclass, passengers });
    setTab("confirm");
  };

  const checkPnr = () => {
    if (pnr.startsWith("DPRK") && booked && booked.pnr === pnr) {
      setPnrResult(booked);
    } else {
      setPnrResult({ notFound: true });
    }
  };

  const navItems = [
    { id: "search", label: "Book Ticket" },
    { id: "pnr", label: "PNR Status" },
    { id: "trains", label: "Train Schedule" },
    { id: "about", label: "About DPRK Rail" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0d0d0d", minHeight: "100vh", color: "#f5f0e8" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #8b0000 0%, #c41e1e 45%, #8b0000 100%)", borderBottom: "3px solid #e8b84b", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            {/* DPRK Emblem placeholder */}
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e8b84b", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #f5f0e8", flexShrink: 0 }}>
              <div style={{ textAlign: "center", lineHeight: 1 }}>
                <div style={{ fontSize: 22 }}>🚂</div>
                <div style={{ fontSize: 8, color: "#7a1010", fontWeight: 900, letterSpacing: 0.5 }}>DPRK</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, color: "#e8b84b", textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
                조선철도 • CHOSŎN CH'ŎLDO
              </div>
              <div style={{ fontSize: 13, color: "#f5f0e8cc", letterSpacing: 3 }}>
                DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA — RAILWAYS BOOKING SYSTEM
              </div>
              <div style={{ fontSize: 10, color: "#e8b84ba0", letterSpacing: 2, marginTop: 2 }}>
                서비스 인민을 위하여 • IN SERVICE OF THE PEOPLE
              </div>
            </div>
          </div>
          {/* Nav */}
          <div style={{ display: "flex", gap: 4, borderTop: "1px solid rgba(232,184,75,0.3)", paddingTop: 10 }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} style={{ background: tab === n.id ? "#e8b84b" : "transparent", color: tab === n.id ? "#7a0000" : "#f5f0e8", border: `1px solid ${tab === n.id ? "#e8b84b" : "rgba(232,184,75,0.4)"}`, padding: "6px 14px", borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1, fontFamily: "inherit", transition: "all 0.2s" }}>
                {n.label}
              </button>
            ))}
            {results && <button onClick={() => setTab("results")} style={{ background: tab === "results" ? "#e8b84b" : "transparent", color: tab === "results" ? "#7a0000" : "#f5f0e8", border: `1px solid ${tab === "results" ? "#e8b84b" : "rgba(232,184,75,0.4)"}`, padding: "6px 14px", borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1, fontFamily: "inherit" }}>Train Results</button>}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: "#1a0a0a", borderBottom: "1px solid #3a1515", padding: "6px 20px", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 40, animation: "none", fontSize: 11, color: "#e8b84b", letterSpacing: 1 }}>
          <span>🔴 Paektusan Express (1 UP) — ON TIME</span>
          <span>🟡 Mangyongbong Mail (3 UP) — DELAYED 25 MIN</span>
          <span>🔴 Chollima Intercity (101 UP) — ON TIME</span>
          <span>📢 All passengers must carry Revolutionary Identity Documents</span>
          <span>⭐ Tatami berths available on overnight services</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>

        {/* SEARCH TAB */}
        {tab === "search" && (
          <div>
            <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>☆ Book Your Revolutionary Journey ☆</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#e8b84b88", letterSpacing: 2, display: "block", marginBottom: 6 }}>FROM STATION</label>
                  <select value={from} onChange={e => setFrom(e.target.value)} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>
                    {STATIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <button onClick={swap} style={{ background: "transparent", border: "1px solid #3a1515", color: "#e8b84b", borderRadius: 6, padding: "10px 14px", fontSize: 18, cursor: "pointer", transition: "transform 0.3s", transform: swapping ? "rotate(180deg)" : "none" }}>⇄</button>
                <div>
                  <label style={{ fontSize: 11, color: "#e8b84b88", letterSpacing: 2, display: "block", marginBottom: 6 }}>TO STATION</label>
                  <select value={to} onChange={e => setTo(e.target.value)} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>
                    {STATIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#e8b84b88", letterSpacing: 2, display: "block", marginBottom: 6 }}>DATE OF JOURNEY</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#e8b84b88", letterSpacing: 2, display: "block", marginBottom: 6 }}>TRAVEL CLASS</label>
                  <select value={tclass} onChange={e => setTclass(e.target.value)} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#e8b84b88", letterSpacing: 2, display: "block", marginBottom: 6 }}>QUOTA</label>
                  <select value={quota} onChange={e => setQuota(e.target.value)} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>
                    {["General", "Ladies", "Senior Citizen", "Party Cadre", "Diplomatic"].map(q => <option key={q}>{q}</option>)}
                  </select>
                </div>
              </div>

              <button onClick={search} style={{ background: "linear-gradient(135deg, #c41e1e, #8b0000)", color: "#e8b84b", border: "1px solid #e8b84b", borderRadius: 6, padding: "14px 40px", fontSize: 15, fontWeight: 900, cursor: "pointer", letterSpacing: 2, fontFamily: "inherit", width: "100%", textTransform: "uppercase" }}>
                ★ Search Trains ★
              </button>
            </div>

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { icon: "🛤️", title: "5,000 km Network", desc: "Spanning the full length of the Motherland from Sinuiju to Rajin" },
                { icon: "⭐", title: "Juche Service", desc: "Trains running on self-reliant revolutionary spirit since Juche 37 (1948)" },
                { icon: "🏔️", title: "Scenic Routes", desc: "Pass through the sacred Paektu Mountain corridor and coastal vistas" },
              ].map(c => (
                <div key={c.title} style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ color: "#e8b84b", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ color: "#f5f0e888", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS TAB */}
        {tab === "results" && results && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ color: "#e8b84b", fontSize: 13, letterSpacing: 2 }}>TRAINS FROM</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{from} → {to}</div>
                <div style={{ color: "#f5f0e888", fontSize: 12 }}>{new Date(date).toDateString()} • {tclass}</div>
              </div>
              <button onClick={() => setTab("search")} style={{ background: "transparent", color: "#e8b84b", border: "1px solid #3a1515", borderRadius: 6, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>← Modify Search</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {results.map(train => {
                const avail = train.avail[tclass];
                const price = train.price[tclass];
                return (
                  <div key={train.id} style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 16, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: 4, bottom: 0, background: avail > 0 ? "#15803d" : avail === 0 ? "#b91c1c" : "#b45309" }} />
                    <div style={{ paddingLeft: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: "#e8b84b" }}>{train.name}</div>
                          <div style={{ fontSize: 12, color: "#f5f0e866", letterSpacing: 1 }}>#{train.number} • {train.distance} • Runs: {train.days}</div>
                        </div>
                        <Badge>{train.id}</Badge>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{train.dep}</div>
                          <div style={{ fontSize: 11, color: "#f5f0e877" }}>{from}</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 10, color: "#e8b84b77", letterSpacing: 1 }}>{train.duration}</div>
                          <div style={{ height: 1, background: "#3a1515", width: 60, margin: "4px auto", position: "relative" }}>
                            <div style={{ position: "absolute", right: 0, top: -3, fontSize: 8, color: "#e8b84b" }}>▶</div>
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{train.arr}</div>
                          <div style={{ fontSize: 11, color: "#f5f0e877" }}>{to}</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <AvailBadge count={avail} />
                          <div style={{ fontSize: 10, color: "#f5f0e855", marginTop: 2 }}>{tclass.split(" (")[1]?.replace(")", "") || ""}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 13, color: "#f5f0e888" }}>₩{price.toLocaleString()}</div>
                          <button
                            onClick={() => avail > 0 && book(train)}
                            style={{ background: avail > 0 ? "linear-gradient(135deg,#c41e1e,#8b0000)" : "#2a1515", color: avail > 0 ? "#e8b84b" : "#555", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: avail > 0 ? "pointer" : "not-allowed", fontFamily: "inherit", letterSpacing: 1, marginTop: 4 }}>
                            {avail > 0 ? "BOOK NOW" : "WAITLIST"}
                          </button>
                        </div>
                      </div>

                      <div style={{ borderTop: "1px solid #2a1010", marginTop: 12, paddingTop: 10, display: "flex", gap: 16 }}>
                        {Object.entries(train.avail).map(([cls, cnt]) => (
                          <div key={cls} style={{ fontSize: 10, color: "#f5f0e866" }}>
                            <span style={{ color: cnt > 0 ? "#4ade80" : "#f87171" }}>●</span> {cls.split(" (")[0]}: {cnt > 0 ? `₩${train.price[cls].toLocaleString()}` : "N/A"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BOOK TAB */}
        {tab === "book" && selected && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <button onClick={() => setTab("results")} style={{ background: "transparent", color: "#e8b84b", border: "1px solid #3a1515", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Booking: {selected.name}</div>
            </div>

            {/* Steps */}
            <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
              {["Passenger Details", "Review & Pay", "Confirmation"].map((s, i) => (
                <div key={s} style={{ flex: 1, background: bookStep > i + 1 ? "#15803d22" : bookStep === i + 1 ? "#c41e1e" : "#1a0a0a", border: `1px solid ${bookStep >= i + 1 ? "#c41e1e" : "#3a1515"}`, borderRadius: 6, padding: "8px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: bookStep >= i + 1 ? "#f5f0e8" : "#555", textAlign: "center" }}>
                  {i + 1}. {s}
                </div>
              ))}
            </div>

            {bookStep === 1 && (
              <div>
                <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 2, marginBottom: 12 }}>JOURNEY SUMMARY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                    {[["Train", selected.name], ["Route", `${from} → ${to}`], ["Date", new Date(date).toDateString()], ["Class", tclass]].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 10, color: "#f5f0e855", letterSpacing: 1 }}>{k}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f0e8" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 2 }}>PASSENGER DETAILS</div>
                    <button onClick={() => setPassengers([...passengers, { name: "", age: "", gender: "M" }])} style={{ background: "transparent", color: "#e8b84b", border: "1px solid #3a1515", borderRadius: 4, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>+ Add Passenger</button>
                  </div>
                  {passengers.map((p, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 10, marginBottom: 10, alignItems: "end" }}>
                      <div>
                        {i === 0 && <label style={{ fontSize: 10, color: "#f5f0e855", letterSpacing: 1, display: "block", marginBottom: 4 }}>FULL NAME</label>}
                        <input value={p.name} onChange={e => { const ps = [...passengers]; ps[i].name = e.target.value; setPassengers(ps); }} placeholder={`Comrade ${i + 1}`} style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        {i === 0 && <label style={{ fontSize: 10, color: "#f5f0e855", letterSpacing: 1, display: "block", marginBottom: 4 }}>AGE</label>}
                        <input value={p.age} onChange={e => { const ps = [...passengers]; ps[i].age = e.target.value; setPassengers(ps); }} placeholder="Age" style={{ width: 60, background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "9px 12px", fontSize: 13, fontFamily: "inherit" }} />
                      </div>
                      <div>
                        {i === 0 && <label style={{ fontSize: 10, color: "#f5f0e855", letterSpacing: 1, display: "block", marginBottom: 4 }}>GENDER</label>}
                        <select value={p.gender} onChange={e => { const ps = [...passengers]; ps[i].gender = e.target.value; setPassengers(ps); }} style={{ background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "9px 10px", fontSize: 13, fontFamily: "inherit" }}>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                      {passengers.length > 1 && (
                        <button onClick={() => setPassengers(passengers.filter((_, j) => j !== i))} style={{ background: "transparent", color: "#b91c1c", border: "1px solid #3a1515", borderRadius: 4, padding: "9px 10px", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
                      )}
                    </div>
                  ))}
                </div>

                <button onClick={() => setBookStep(2)} style={{ background: "linear-gradient(135deg,#c41e1e,#8b0000)", color: "#e8b84b", border: "1px solid #e8b84b44", borderRadius: 6, padding: "14px", fontSize: 14, fontWeight: 900, cursor: "pointer", letterSpacing: 2, fontFamily: "inherit", width: "100%", textTransform: "uppercase" }}>
                  Continue to Review →
                </button>
              </div>
            )}

            {bookStep === 2 && (
              <div>
                <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 2, marginBottom: 16 }}>FARE SUMMARY</div>
                  <div style={{ borderBottom: "1px solid #2a1010", paddingBottom: 12, marginBottom: 12 }}>
                    {passengers.map((p, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                        <span style={{ color: "#f5f0e888" }}>{p.name || `Passenger ${i + 1}`} ({p.age}y, {p.gender})</span>
                        <span>₩{selected.price[tclass].toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#f5f0e888", marginBottom: 6 }}>
                    <span>State Service Contribution (5%)</span>
                    <span>₩{Math.round(selected.price[tclass] * passengers.length * 0.05).toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: "#e8b84b", borderTop: "1px solid #3a1515", paddingTop: 10 }}>
                    <span>TOTAL</span>
                    <span>₩{Math.round(selected.price[tclass] * passengers.length * 1.05).toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ background: "#0f1a0f", border: "1px solid #15803d33", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "#4ade8088" }}>
                  ℹ️ Payment accepted via DPRK National Bank transfer, Koryo Hotel vouchers, or approved foreign currency at service windows.
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <button onClick={() => setBookStep(1)} style={{ background: "transparent", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>← Edit Passengers</button>
                  <button onClick={confirmBook} style={{ background: "linear-gradient(135deg,#15803d,#0d5c2d)", color: "#f5f0e8", border: "1px solid #4ade8044", borderRadius: 6, padding: "14px", fontSize: 13, fontWeight: 900, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: 1 }}>
                    ✓ Confirm & Pay
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONFIRMATION TAB */}
        {tab === "confirm" && booked && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 22, color: "#4ade80", fontWeight: 700, marginBottom: 4 }}>Booking Confirmed!</div>
            <div style={{ color: "#f5f0e877", fontSize: 13, marginBottom: 24 }}>Your revolutionary journey has been registered</div>

            <div style={{ background: "#1a0a0a", border: "2px solid #e8b84b", borderRadius: 8, padding: 24, maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 3 }}>CHOSŎN CH'ŎLDO E-TICKET</div>
                <StarRating />
              </div>

              <div style={{ background: "#0d0d0d", borderRadius: 6, padding: "10px 16px", textAlign: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#f5f0e866", letterSpacing: 2 }}>PNR NUMBER</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#e8b84b", letterSpacing: 3 }}>{booked.pnr}</div>
              </div>

              {[
                ["Train", booked.train.name + " (" + booked.train.number + ")"],
                ["Route", `${booked.from} → ${booked.to}`],
                ["Date", new Date(booked.date).toDateString()],
                ["Departure", booked.train.dep],
                ["Arrival", booked.train.arr],
                ["Class", booked.tclass],
                ["Passengers", booked.passengers.length],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #2a1010", padding: "8px 0", fontSize: 13 }}>
                  <span style={{ color: "#f5f0e877" }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}

              <div style={{ background: "#0f1a0f", borderRadius: 6, padding: 10, marginTop: 16, fontSize: 11, color: "#4ade8088", textAlign: "center" }}>
                ✓ Report to station 45 minutes before departure. Carry Revolutionary Identity Document.
              </div>
            </div>

            <button onClick={() => { setTab("search"); setBooked(null); setSelected(null); setResults(null); }} style={{ marginTop: 20, background: "transparent", color: "#e8b84b", border: "1px solid #3a1515", borderRadius: 6, padding: "10px 24px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Book Another Journey
            </button>
          </div>
        )}

        {/* PNR TAB */}
        {tab === "pnr" && (
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 3, marginBottom: 20, textAlign: "center" }}>PNR STATUS ENQUIRY</div>
            <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 24 }}>
              <label style={{ fontSize: 11, color: "#f5f0e866", letterSpacing: 2, display: "block", marginBottom: 8 }}>ENTER PNR NUMBER</label>
              <input value={pnr} onChange={e => setPnr(e.target.value)} placeholder="e.g. DPRK1234567" style={{ width: "100%", background: "#0d0d0d", color: "#f5f0e8", border: "1px solid #3a1515", borderRadius: 6, padding: "12px", fontSize: 16, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12, letterSpacing: 2, textAlign: "center" }} />
              <button onClick={checkPnr} style={{ background: "linear-gradient(135deg,#c41e1e,#8b0000)", color: "#e8b84b", border: "none", borderRadius: 6, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", width: "100%", letterSpacing: 2 }}>
                CHECK STATUS
              </button>
            </div>

            {pnrResult && !pnrResult.notFound && (
              <div style={{ background: "#1a0a0a", border: "1px solid #15803d44", borderRadius: 8, padding: 20, marginTop: 16 }}>
                <div style={{ color: "#4ade80", fontSize: 13, fontWeight: 700, marginBottom: 12 }}>✓ Booking Found</div>
                {[["PNR", pnrResult.pnr], ["Train", pnrResult.train.name], ["Route", `${pnrResult.from} → ${pnrResult.to}`], ["Date", new Date(pnrResult.date).toDateString()], ["Status", "CONFIRMED"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #2a1010", padding: "7px 0", fontSize: 13 }}>
                    <span style={{ color: "#f5f0e877" }}>{k}</span>
                    <span style={{ color: k === "Status" ? "#4ade80" : "#f5f0e8", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            {pnrResult?.notFound && (
              <div style={{ background: "#1a0a0a", border: "1px solid #b91c1c44", borderRadius: 8, padding: 16, marginTop: 16, color: "#f87171", textAlign: "center", fontSize: 13 }}>
                ✕ PNR not found. Please verify and try again.
              </div>
            )}
          </div>
        )}

        {/* TRAINS TAB */}
        {tab === "trains" && (
          <div>
            <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 3, marginBottom: 20 }}>COMPLETE TRAIN SCHEDULE</div>
            <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px 100px", padding: "10px 16px", background: "#2a1010", fontSize: 10, color: "#e8b84b", letterSpacing: 2, fontWeight: 700 }}>
                <div>TRAIN NAME</div><div>ROUTE</div><div>DEP</div><div>ARR</div><div>DAYS</div>
              </div>
              {SAMPLE_TRAINS.map((t, i) => (
                <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px 100px", padding: "14px 16px", borderTop: "1px solid #2a1010", background: i % 2 === 0 ? "#1a0a0a" : "#140808", alignItems: "center", fontSize: 13 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e8b84b" }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: "#f5f0e855" }}>#{t.number} • {t.distance}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#f5f0e888" }}>PYO → WON</div>
                  <div style={{ fontWeight: 700 }}>{t.dep}</div>
                  <div style={{ fontWeight: 700 }}>{t.arr}</div>
                  <div style={{ fontSize: 10, color: "#f5f0e866", letterSpacing: 1 }}>{t.days}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 11, color: "#e8b84b", letterSpacing: 3, marginBottom: 20 }}>ABOUT CHOSŎN CH'ŎLDO</div>
            <div style={{ background: "#1a0a0a", border: "1px solid #3a1515", borderRadius: 8, padding: 24, lineHeight: 1.8, color: "#f5f0e8cc", fontSize: 14 }}>
              <p style={{ margin: "0 0 16px" }}>The <strong style={{ color: "#e8b84b" }}>Korean State Railway (조선철도)</strong> is the national railway of the Democratic People's Republic of Korea, founded in Juche 37 (1948). Operating over 5,000 kilometres of track, it connects the Motherland from the Sinuiju–Dandong border crossing in the west to the port of Rajin in the northeast.</p>
              <p style={{ margin: "0 0 16px" }}>Under the wise guidance of the Party, the railway network serves as the primary means of inter-city transportation for the working people, carrying both passengers and freight in the spirit of Juche self-reliance.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "20px 0" }}>
                {[["Founded", "Juche 37 (1948)"], ["Network Length", "~5,000 km"], ["Gauge", "1,435 mm (Standard)"], ["Electrification", "3 kV DC (partially)"], ["Headquarters", "Pyongyang Central Station"], ["Passenger Classes", "4 (Luxury to Standard)"]].map(([k, v]) => (
                  <div key={k} style={{ background: "#0d0d0d", borderRadius: 6, padding: "10px 14px" }}>
                    <div style={{ fontSize: 10, color: "#e8b84b88", letterSpacing: 1 }}>{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#f5f0e855", borderTop: "1px solid #2a1010", paddingTop: 16 }}>
                All bookings are subject to approval by the Secretariat of Transportation. Foreign nationals must obtain prior authorization from the Korean International Travel Company (KITC).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #2a1010", marginTop: 40, padding: "16px 20px", textAlign: "center", color: "#f5f0e833", fontSize: 11, letterSpacing: 2 }}>
        조선철도 CHOSŎN CH'ŎLDO © Juche 115 (2026) • ALL RIGHTS RESERVED BY THE KOREAN STATE
      </div>
    </div>
  );
}
