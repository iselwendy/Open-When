import React, { useEffect, useRef, useState } from "react";
import '../styles/Main.css';
import { C, HER, messages } from "./Data";

const FloatingPetals = () => {
    const petals = useRef(Array.from({ length: 14 }, (_, i) => ({
        id: i, left: Math.random() * 100, size: 10 + Math.random() * 14,
        dur: 8 + Math.random() * 10, delay: -Math.random() * 12,
        drift: (Math.random() - 0.5) * 80,
        shape: ["🌸", "✿", "❀", "🌷", "🎀"][Math.floor(Math.random() * 5)],
    }))).current;
    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
            {petals.map(p => (
                <div key={p.id} style={{
                    position: "absolute", left: `${p.left}%`, top: "-6%",
                    fontSize: p.size, opacity: 0.25,
                    animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
                    "--drift": `${p.drift}px`,
                }}>{p.shape}</div>
            ))}
        </div>
    );
};

const CursorTrail = () => {
    const dots = useCursorTrail();
    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
            {dots.map(d => (
                <div key={d.id} style={{
                    position: "fixed", left: d.x, top: d.y,
                    transform: "translate(-50%,-50%)",
                    fontSize: d.shape.length > 1 ? 14 : 10, opacity: 0, color: C.rose,
                    animation: "trailFade 0.9s ease-out forwards",
                }}>{d.shape}</div>
            ))}
        </div>
    );
};

const useCursorTrail = () => {
    const [dots, setDots] = useState([]);
    const ref = useRef(0);
    useEffect(() => {
        const shapes = ["🌸", "✿", "❀", "✦", "·", "◦"];
        const move = (e) => {
            if (Math.random() > 0.35) return;
            const id = ref.current++;
            setDots(d => [...d.slice(-18), { id, x: e.clientX, y: e.clientY, shape: shapes[Math.floor(Math.random() * shapes.length)], born: Date.now() }]);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);
    useEffect(() => {
        const id = setInterval(() => { const now = Date.now(); setDots(d => d.filter(p => now - p.born < 900)); }, 100);
        return () => clearInterval(id);
    }, []);
    return dots;
};

const BowSVG = ({ color = C.ribbon, size = 48 }) => (
    <svg width={size} height={size * 0.65} viewBox="0 0 80 52" fill="none" style={{ display: "block" }}>
        <path d="M38 26 C20 10 4 8 6 20 C8 30 22 30 38 26Z" fill={color} opacity="0.9" />
        <path d="M38 26 C20 40 4 44 6 32 C8 22 22 22 38 26Z" fill={color} opacity="0.75" />
        <path d="M42 26 C60 10 76 8 74 20 C72 30 58 30 42 26Z" fill={color} opacity="0.9" />
        <path d="M42 26 C60 40 76 44 74 32 C72 22 58 22 42 26Z" fill={color} opacity="0.75" />
        <ellipse cx="40" cy="26" rx="6" ry="8" fill={color} />
        <ellipse cx="40" cy="26" rx="3.5" ry="5" fill={C.ribbonDark} opacity="0.5" />
        <path d="M37 32 C34 40 30 46 26 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M43 32 C46 40 50 46 54 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const RibbonDividerSVG = () => (
    <svg width="100%" height="24" viewBox="0 0 320 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="130" y2="12" stroke={C.rosePale} strokeWidth="1" />
        <path d="M140 12 C148 6 152 18 160 12 C168 6 172 18 180 12" stroke={C.ribbon} strokeWidth="1.5" fill="none" />
        <line x1="190" y1="12" x2="320" y2="12" stroke={C.rosePale} strokeWidth="1" />
        <circle cx="160" cy="12" r="3" fill={C.ribbon} />
    </svg>
);

const TabButton = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
        fontFamily: "'IM Fell English',serif", fontStyle: "italic",
        fontSize: 14, color: active ? C.ink : C.inkLight,
        background: active ? C.paper : "transparent",
        border: `1.5px solid ${active ? C.paperLine : "transparent"}`,
        borderBottom: active ? `1.5px solid ${C.paper}` : `1.5px solid ${C.paperLine}`,
        borderRadius: "4px 4px 0 0",
        padding: "9px 22px 10px", cursor: "pointer",
        transition: "all 0.2s",
        position: "relative", top: 1,
        boxShadow: active ? `0 -2px 8px rgba(122,31,58,0.06)` : "none",
        letterSpacing: "0.02em",
    }}>{label}</button>
);

const envelopes = [
    { id: "sad", emoji: "🌧️", label: "Open when sad", bow: C.plum, seal: C.plum, sealEmoji: "🌙", song: { title: "Better With You", artist: "Jesse Barrera", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "stressed", emoji: "🍵", label: "Open when stressed", bow: C.maroon, seal: C.maroon, sealEmoji: "🌿", song: { title: "Call You Mine", artist: "Jeff Bernat", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "missing", emoji: "💌", label: "Open when you miss me", bow: C.ribbon, seal: C.ribbon, sealEmoji: "💕", song: { title: "You're The Reason", artist: "Jesse Barrera", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "happy", emoji: "🌸", label: "Open when happy", bow: C.rose, seal: C.rose, sealEmoji: "🌷", song: { title: "If You're Not The One", artist: "Jeff Bernat", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "sleep", emoji: "🌙", label: "Open when you can't sleep", bow: C.plum, seal: "#5a3070", sealEmoji: "✨", song: { title: "Stay With Me", artist: "Jeremy Passion", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "proud", emoji: "🏆", label: "Open when you did great", bow: C.gold, seal: C.gold, sealEmoji: "⭐", song: { title: "Extraordinary", artist: "Mac Eyre", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "laugh", emoji: "🎀", label: "Open when you need a laugh", bow: C.rose, seal: C.rose, sealEmoji: "🎀", song: { title: "Girl Next Door", artist: "Jesse Barrera", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
    { id: "doubt", emoji: "🕯️", label: "Open when you doubt yourself", bow: C.maroon, seal: C.maroon, sealEmoji: "🕯️", song: { title: "Lemonade Mouth", artist: "Jeremy Passion", url: "https://open.spotify.com/track/5rZQUcZVDCCUsJHeaxVPpG?si=7e706dc7d9e54aa0" } },
];

const EnvelopeCard = ({ env, index, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const [burst, setBurst] = useState(false);
    const handleClick = () => { setBurst(true); setTimeout(() => setBurst(false), 700); onClick(); };
    return (
        <div onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{ position: "relative", cursor: "pointer", animation: `cardRise 0.55s ${index * 0.07}s both cubic-bezier(.34,1.4,.64,1)` }}>
            <StarDust active={burst} />
            <div style={{
                background: C.paper,
                backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${C.paperLine}55 27px, ${C.paperLine}55 28px)`,
                border: `1.5px solid ${C.paperLine}`,
                borderRadius: 4, padding: "28px 20px 20px",
                boxShadow: hovered
                    ? `0 12px 36px rgba(122,31,58,0.18), 0 2px 8px rgba(122,31,58,0.1), inset 0 0 0 1px rgba(255,255,255,0.7)`
                    : `0 4px 18px rgba(122,31,58,0.09), 0 1px 4px rgba(122,31,58,0.06), inset 0 0 0 1px rgba(255,255,255,0.6)`,
                transform: hovered ? "translateY(-6px) rotate(-0.5deg)" : "translateY(0) rotate(0deg)",
                transition: "transform 0.3s cubic-bezier(.34,1.4,.64,1), box-shadow 0.3s ease",
                overflow: "hidden",
            }}>
                <div style={{ position: "absolute", top: 4, left: 4 }}><FloralCornerSVG size={44} /></div>
                <div style={{ position: "absolute", top: 4, right: 4 }}><FloralCornerSVG size={44} flip /></div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, position: "relative", zIndex: 1 }}>
                    <div style={{ transform: hovered ? "scale(1.12) rotate(-3deg)" : "scale(1)", transition: "transform 0.3s cubic-bezier(.34,1.4,.64,1)" }}>
                        <BowSVG color={env.bow} size={44} />
                    </div>
                </div>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{env.emoji}</div>
                    <p style={{
                        fontFamily: "'IM Fell English','Playfair Display',serif",
                        fontSize: 13.5, fontStyle: "italic", color: C.ink, lineHeight: 1.4,
                        borderBottom: `1px solid ${C.paperLine}`, paddingBottom: 10, marginBottom: 10,
                    }}>{env.label}</p>
                    <div style={{ fontSize: 10.5, letterSpacing: "0.14em", color: C.inkLight, textTransform: "uppercase", fontFamily: "'Lato',sans-serif", fontWeight: 300 }}>tap to unseal →</div>
                </div>
                <div style={{ marginTop: 10, marginLeft: -20, marginRight: -20, marginBottom: -20 }}>
                    <LaceBorderSVG width={300} height={16} />
                </div>
            </div>
            <div style={{
                position: "absolute", top: 10, left: -3, bottom: 10, width: 6,
                background: `linear-gradient(180deg,${env.bow}88,${env.bow},${env.bow}88)`,
                borderRadius: 3, boxShadow: `0 0 6px ${env.bow}44`,
                transition: "opacity 0.2s", opacity: hovered ? 1 : 0.5,
            }} />
        </div>
    );
};

const FloralCornerSVG = ({ flip = false, size = 60 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ transform: flip ? "scaleX(-1)" : "none", opacity: 0.55 }}>
        <path d="M5 55 C5 30 30 5 55 5" stroke={C.plumPale} strokeWidth="1" fill="none" />
        <circle cx="12" cy="48" r="4" fill={C.rosePale} opacity="0.8" />
        <circle cx="22" cy="38" r="3" fill={C.plumPale} opacity="0.7" />
        <circle cx="32" cy="28" r="5" fill={C.rosePale} opacity="0.6" />
        <circle cx="42" cy="18" r="3" fill={C.plumPale} opacity="0.8" />
        <circle cx="48" cy="12" r="4" fill={C.rosePale} opacity="0.7" />
        <path d="M10 50 C6 44 8 40 12 42" stroke={C.plumPale} strokeWidth="0.8" fill="none" />
        <path d="M30 30 C26 24 28 20 32 22" stroke={C.plumPale} strokeWidth="0.8" fill="none" />
    </svg>
);

const StarDust = ({ active }) => {
    const particles = useRef([]);
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        if (!active) { particles.current = []; return; }
        particles.current = Array.from({ length: 18 }, (_, i) => ({
            id: i, angle: (i / 18) * 360,
            dist: 40 + Math.random() * 50,
            size: 3 + Math.random() * 5,
            color: [C.rosePale, C.plumPale, C.goldPale, "#fff"][Math.floor(Math.random() * 4)],
        }));
        let t = 0;
        const id = setInterval(() => { t++; setFrame(t); if (t > 20) clearInterval(id); }, 40);
        return () => clearInterval(id);
    }, [active]);
    if (!active || frame === 0 || frame > 20) return null;
    const progress = frame / 20;
    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {particles.current.map(p => {
                const r = p.dist * Math.sin(progress * Math.PI);
                const x = 50 + Math.cos(p.angle * Math.PI / 180) * r;
                const y = 50 + Math.sin(p.angle * Math.PI / 180) * r;
                return (
                    <div key={p.id} style={{
                        position: "absolute", left: `${x}%`, top: `${y}%`,
                        width: p.size, height: p.size, borderRadius: "50%",
                        background: p.color, opacity: 1 - progress,
                        transform: "translate(-50%,-50%)",
                        boxShadow: `0 0 ${p.size}px ${p.color}`,
                    }} />
                );
            })}
        </div>
    );
};

const LaceBorderSVG = ({ width = 300, height = 20 }) => {
    const loops = Math.floor(width / 18);
    const pts = Array.from({ length: loops }, (_, i) => {
        const x = i * 18 + 9;
        return `M${x - 8},${height} C${x - 8},${height - 12} ${x - 3},${height - 16} ${x},${height - 16} C${x + 3},${height - 16} ${x + 8},${height - 12} ${x + 8},${height}`;
    }).join(" ");
    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: "block" }}>
            <path d={pts} fill={C.lace} stroke={C.rosePale} strokeWidth="0.5" />
        </svg>
    );
};

const Section = ({ emoji, title, children }) => (
    <div style={{
        background: C.paper,
        backgroundImage: `repeating-linear-gradient(transparent,transparent 31px,${C.paperLine}55 31px,${C.paperLine}55 32px)`,
        border: `1.5px solid ${C.paperLine}`,
        borderRadius: 6, padding: "28px 28px 24px", marginBottom: 22, position: "relative",
        boxShadow: `0 4px 18px rgba(122,31,58,0.07), inset 0 0 0 1px rgba(255,255,255,0.7)`,
        animation: "fadeIn 0.5s ease both",
    }}>
        <div style={{ position: "absolute", top: 6, left: 6 }}><FloralCornerSVG size={38} /></div>
        <div style={{ position: "absolute", top: 6, right: 6 }}><FloralCornerSVG size={38} flip /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>{emoji}</span>
            <h2 style={{
                fontFamily: "'IM Fell English',serif", fontStyle: "italic",
                fontSize: 17, fontWeight: 400, color: C.ink,
            }}>{title}</h2>
        </div>
        <div style={{ marginBottom: 10 }}><RibbonDividerSVG /></div>
        <div style={{ marginTop: 16 }}>{children}</div>
    </div>
);

const Fact = ({ label, value, accent }) => (
    <div style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        padding: "9px 0", borderBottom: `1px solid ${C.paperLine}44`,
    }}>
        <span style={{
            fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: accent || C.inkLight, minWidth: 120, paddingTop: 2, flexShrink: 0,
        }}>{label}</span>
        <span style={{
            fontFamily: "'IM Fell English',serif", fontStyle: "italic",
            fontSize: 14.5, color: C.ink, lineHeight: 1.5,
            textAlign: "left", flex: 1,
        }}>{value}</span>
    </div>
);

const Pill = ({ text, color }) => (
    <span style={{
        display: "inline-block",
        background: color || C.blush,
        border: `1px solid ${C.rosePale}`,
        borderRadius: 20, padding: "4px 14px",
        fontFamily: "'IM Fell English',serif", fontStyle: "italic",
        fontSize: 13, color: C.ink, margin: "4px 4px 4px 0",
    }}>{text}</span>
);

const AllAboutHer = () => {
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handler = () => setIsNarrow(window.innerWidth < 600);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
            <Section emoji="🌸" title={`${HER.herName}, at a glance`}>
                <Fact label="Full name" value={HER.herName} />
                <Fact label="Nickname" value={HER.herNickname} accent={C.rose} />
                <Fact label="Age" value={HER.herAge} />
                <Fact label="Star sign" value={HER.herZodiac} />
                <Fact label="Pet" value={`${HER.petName} the ${HER.petSpecies}`} />
                <Fact label="Colors" value={
                    <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Pill text={HER.favColor1} />
                        <Pill text={HER.favColor2} />
                        <Pill text={HER.favColor3} />
                    </div>
                } />
            </Section>

            <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", justifyContent: "center", alignItems: "center", gap: 28 }}>
                <LoveCounter />
                <PhotoSlot />
            </div>
        </div>
    )
};

const LetterModal = ({ env, onClose }) => {
    const [phase, setPhase] = useState("sealed");
    const [likeCount, setLikeCount] = useState(() =>
        parseInt(localStorage.getItem(`likeCount-${env.id}`) || '0', 10)
    );
    const [confettiPieces, setConfettiPieces] = useState([]);

    useEffect(() => {
        setTimeout(() => setPhase("opening"), 80);
        setTimeout(() => setPhase("open"), 600);
        setConfettiPieces(Array.from({ length: 30 }, (_, i) => ({
            id: i, x: 30 + Math.random() * 40,
            shape: ["🌸", "🎀", "✿", "·", "◦", "✦"][Math.floor(Math.random() * 6)],
            delay: Math.random() * 0.6, dur: 0.8 + Math.random() * 0.8,
            dx: (Math.random() - 0.5) * 120,
        })));
    }, []);

    const [liked, setLiked] = useState(() =>
        localStorage.getItem(`liked-${env.id}`) === '1'
    );

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed", inset: 0, zIndex: 2000,
                background: "rgba(61,31,42,0.6)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
                opacity: phase === "sealed" ? 0 : 1, transition: "opacity 0.35s",
            }}
        >
            {phase === "open" && confettiPieces.map(p => (
                <div key={p.id} style={{
                    position: "fixed", top: "45%", left: `${p.x}%`,
                    fontSize: 14, pointerEvents: "none",
                    animation: `confettiDrop ${p.dur}s ${p.delay}s both ease-out`,
                    "--dx": `${p.dx}px`, zIndex: 3000,
                }}>{p.shape}</div>
            ))}

            <div style={{
                transform: phase === "sealed" ? "scale(0.7) translateY(30px)" : phase === "opening" ? "scale(1.03) translateY(-8px)" : "scale(1) translateY(0)",
                opacity: phase === "sealed" ? 0 : 1,
                transition: "transform 0.5s cubic-bezier(.34,1.3,.64,1), opacity 0.4s",
                width: "100%", maxWidth: 480, maxHeight: "90vh", display: "flex", flexDirection: "column",
            }}>
                <div style={{
                    background: C.paper,
                    backgroundImage: `repeating-linear-gradient(transparent,transparent 31px,${C.paperLine}66 31px,${C.paperLine}66 32px)`,
                    borderRadius: 6, border: `1.5px solid ${C.paperLine}`,
                    boxShadow: `0 24px 60px rgba(122,31,58,0.22),0 4px 16px rgba(122,31,58,0.1),inset 0 0 0 1px rgba(255,255,255,0.8)`,
                    overflow: "hidden", display: "flex", flexDirection: "column",
                    maxHeight: "88vh", position: "relative",
                }}>
                    <div style={{ position: "absolute", top: 6, left: 6, pointerEvents: "none" }}><FloralCornerSVG size={52} /></div>
                    <div style={{ position: "absolute", top: 6, right: 6, pointerEvents: "none" }}><FloralCornerSVG size={52} flip /></div>

                    {/* ribbon bar */}
                    <div style={{ height: 8, background: `linear-gradient(90deg,${env.bow}44,${env.bow},${env.bow}cc,${env.bow},${env.bow}44)`, flexShrink: 0 }} />

                    <div style={{ overflowY: "auto", padding: "28px 28px 20px", flex: 1 }}>
                        {/* bow */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                            <BowSVG color={env.bow} size={56} />
                        </div>

                        {/* to/from tag */}
                        <div style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            background: C.blush, border: `1px solid ${C.rosePale}`,
                            borderRadius: 4, padding: "6px 14px", marginBottom: 16,
                        }}>
                            <span style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 12, color: C.inkLight }}>
                                To: <strong style={{ color: C.ink }}>{HER.herNickname}</strong>
                            </span>
                            <span style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 12, color: C.inkLight }}>
                                From: <strong style={{ color: C.ink }}>{HER.myName + " :)"}</strong>
                            </span>
                        </div>

                        {/* wax seal */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                            <div style={{ animation: phase === "open" ? "sealPop 0.4s 0.3s both cubic-bezier(.34,1.8,.64,1)" : "none" }}>
                                <WaxSealSVG emoji={env.sealEmoji} color={env.seal} size={58} />
                            </div>
                        </div>

                        <h2 style={{
                            fontFamily: "'IM Fell English','Playfair Display',serif",
                            fontSize: "1.3rem", fontStyle: "italic", fontWeight: 400,
                            color: C.ink, textAlign: "center", marginBottom: 6,
                        }}>{env.label}</h2>

                        <div style={{ margin: "0 auto 20px", width: 180 }}><RibbonDividerSVG /></div>

                        {/* message body */}
                        <p style={{
                            fontFamily: "'IM Fell English','Playfair Display',serif",
                            fontSize: 15, lineHeight: 2.1, color: C.ink, whiteSpace: "pre-line",
                            animation: phase === "open" ? "fadeIn 0.7s 0.4s both" : "none",
                        }}>{messages[env.id]}</p>

                        {/* anniversary stamp */}
                        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
                            <div style={{
                                border: `1.5px solid ${C.rosePale}`, borderRadius: 4,
                                padding: "6px 16px", display: "inline-block",
                                transform: "rotate(-1.5deg)",
                            }}>
                                <span style={{
                                    fontFamily: "'IM Fell English',serif", fontStyle: "italic",
                                    fontSize: 11, color: C.inkLight, letterSpacing: "0.06em",
                                }}>
                                    sealed on {MONTHSARRY_DATE} 🎀
                                </span>
                            </div>
                        </div>

                        {/* now playing */}
                        <div style={{
                            marginTop: 24,
                            borderRadius: 12,
                            overflow: "hidden",
                            border: `1px solid ${C.rosePale}`,
                        }}>
                            <iframe
                                src={`https://open.spotify.com/embed/track/${env.song.url.split("/track/")[1]}?utm_source=generator&theme=0&autoplay=1`}
                                width="100%"
                                height="80"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                style={{ border: "none", display: "block" }}
                                title={env.song.title}
                            />
                        </div>

                        {/* like */}
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 8, alignItems: "center" }}>
                            <button
                                onClick={() => {
                                    const newCount = likeCount + 1;
                                    setLiked(true);
                                    setLikeCount(newCount);
                                    localStorage.setItem(`liked-${env.id}`, '1');
                                    localStorage.setItem(`likeCount-${env.id}`, String(newCount));
                                }}
                                style={{
                                    background: "none", border: `1px solid ${liked ? C.rose : C.paperLine}`,
                                    borderRadius: 20, padding: "6px 16px", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 6,
                                    color: liked ? C.rose : C.inkLight, fontSize: 13,
                                    fontFamily: "'Lato',sans-serif",
                                    transition: "all 0.2s",
                                    transform: liked ? "scale(1.08)" : "scale(1)",
                                    boxShadow: liked ? `0 0 12px ${C.rose}44` : "none",
                                }}
                            >
                                <span style={{ fontSize: 16 }}>{liked ? "♥" : "🤍"}</span>
                                <span>{liked ? likeCount : likeCount}</span>
                            </button>
                            <span style={{ fontSize: 11, color: C.inkLight, fontFamily: "'Lato',sans-serif", fontStyle: "italic" }}>
                                {liked ? `saved to my heart 🌷` : "press if this helped"}
                            </span>
                        </div>
                    </div>

                    {/* footer */}
                    <div style={{ flexShrink: 0 }}>
                        <LaceBorderSVG width={480} height={20} />
                        <div style={{
                            background: C.paperDark, padding: "10px 24px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <span style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 11, color: C.inkLight }}>
                                made with love, just for {HER.herNickname} ✦
                            </span>
                            <button
                                onClick={onClose}
                                style={{
                                    background: "none", border: `1px solid ${C.paperLine}`,
                                    borderRadius: 20, padding: "5px 14px", cursor: "pointer",
                                    fontSize: 11, color: C.inkLight, fontFamily: "'Lato',sans-serif",
                                    letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.18s",
                                }}
                                onMouseEnter={e => e.target.style.borderColor = C.rose}
                                onMouseLeave={e => e.target.style.borderColor = C.paperLine}
                            >fold up ✕</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const WaxSealSVG = ({ emoji = "🌸", color = C.wax, size = 52 }) => (
    <svg width={size} height={size} viewBox="0 0 52 52">
        <defs>
            <radialGradient id={`wg${size}`} cx="40%" cy="35%">
                <stop offset="0%" stopColor="#e06080" />
                <stop offset="100%" stopColor={color} />
            </radialGradient>
        </defs>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <ellipse key={i} cx={26 + Math.cos(a * Math.PI / 180) * 21} cy={26 + Math.sin(a * Math.PI / 180) * 21}
                rx="5" ry="4" fill={`url(#wg${size})`}
                transform={`rotate(${a},${26 + Math.cos(a * Math.PI / 180) * 21},${26 + Math.sin(a * Math.PI / 180) * 21})`} />
        ))}
        <circle cx="26" cy="26" r="19" fill={`url(#wg${size})`} />
        <circle cx="26" cy="26" r="15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <text x="26" y="31" textAnchor="middle" fontSize="15">{emoji}</text>
    </svg>
);

const MONTHSARRY_NUMBER = "first";
const MONTHSARRY_DATE = "June 24, 2026";  // 

const WelcomeModal = ({ onClose }) => {
    const [visible, setVisible] = useState(false);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        // slight delay so the fade-in is visible
        setTimeout(() => setVisible(true), 60);

        // generate confetti pieces
        setConfetti(Array.from({ length: 24 }, (_, i) => ({
            id: i,
            x: 20 + Math.random() * 60,
            shape: ["🌸", "🎀", "✿", "💕", "✦", "·"][Math.floor(Math.random() * 6)],
            delay: Math.random() * 0.7,
            dur: 0.9 + Math.random() * 0.7,
            dx: (Math.random() - 0.5) * 130,
        })));
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 350);
    };

    return (
        <div
            onClick={e => e.target === e.currentTarget && handleClose()}
            style={{
                position: 'fixed', inset: 0, zIndex: 3000,
                background: 'rgba(61,31,42,0.55)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.35s',
            }}
        >
            {/* confetti */}
            {visible && confetti.map(p => (
                <div key={p.id} style={{
                    position: 'fixed', top: '40%', left: `${p.x}%`,
                    fontSize: 14, pointerEvents: 'none',
                    animation: `confettiDrop ${p.dur}s ${p.delay}s both ease-out`,
                    '--dx': `${p.dx}px`, zIndex: 3100,
                }}>{p.shape}</div>
            ))}

            {/* card */}
            <div style={{
                width: '100%', maxWidth: 420,
                transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(24px)',
                transition: 'transform 0.45s cubic-bezier(.34,1.3,.64,1)',
                background: C.paper,
                backgroundImage: `repeating-linear-gradient(transparent,transparent 31px,${C.paperLine}66 31px,${C.paperLine}66 32px)`,
                borderRadius: 6,
                border: `1.5px solid ${C.paperLine}`,
                boxShadow: `0 24px 60px rgba(122,31,58,0.22), inset 0 0 0 1px rgba(255,255,255,0.8)`,
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* floral corners */}
                <div style={{ position: 'absolute', top: 6, left: 6, pointerEvents: 'none' }}><FloralCornerSVG size={48} /></div>
                <div style={{ position: 'absolute', top: 6, right: 6, pointerEvents: 'none' }}><FloralCornerSVG size={48} flip /></div>

                {/* top ribbon bar */}
                <div style={{ height: 8, background: `linear-gradient(90deg,${C.ribbon}44,${C.ribbon},${C.ribbon}cc,${C.ribbon},${C.ribbon}44)` }} />

                <div style={{ padding: '32px 32px 24px', textAlign: 'center' }}>

                    {/* bow */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                        <BowSVG color={C.ribbon} size={56} />
                    </div>

                    {/* eyebrow */}
                    <p style={{
                        fontFamily: "'Lato', sans-serif", fontWeight: 300,
                        fontSize: 10, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: C.inkLight,
                        marginBottom: 10,
                    }}>
                        {MONTHSARRY_DATE}
                    </p>

                    {/* headline */}
                    <h2 style={{
                        fontFamily: "'IM Fell English', serif",
                        fontStyle: 'italic', fontWeight: 400,
                        fontSize: 'clamp(1.5rem, 6vw, 2rem)',
                        color: C.ink, lineHeight: 1.2, marginBottom: 8,
                    }}>
                        Happy {MONTHSARRY_NUMBER} monthsarry,<br />baby 🦢
                    </h2>

                    <div style={{ margin: '14px auto', maxWidth: 200 }}><RibbonDividerSVG /></div>

                    {/* body */}
                    <p style={{
                        fontFamily: "'IM Fell English', serif",
                        fontStyle: 'italic', fontSize: 14.5,
                        color: C.ink, lineHeight: 1.9,
                        marginBottom: 24,
                    }}>
                        One month of getting to call you mine.<br />
                        I made this for you, so open whatever you need,<br />
                        whenever you need it. I'll always be in here. 🎀
                    </p>

                    {/* close button */}
                    <button
                        onClick={handleClose}
                        style={{
                            background: C.ribbon,
                            border: 'none', borderRadius: 20,
                            padding: '10px 32px', cursor: 'pointer',
                            fontFamily: "'IM Fell English', serif",
                            fontStyle: 'italic', fontSize: 14,
                            color: '#fff', letterSpacing: '0.04em',
                            boxShadow: `0 4px 16px ${C.ribbon}55`,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = `0 6px 20px ${C.ribbon}77`; }}
                        onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = `0 4px 16px ${C.ribbon}55`; }}
                    >
                        open your letters 💌
                    </button>
                </div>

                {/* lace footer */}
                <LaceBorderSVG width={420} height={18} />
            </div>
        </div>
    );
};

const PROMPT = "do u still...?"

const TAP_MESSAGES = [
    "yes. always.",
    "ofc, but have you eaten today tho",
    "still you. it's always you.",
    "yes, and i'm not even joking. you're my favourite person.",
    "yes and you don't have to do anything to deserve it.",
    "yes, i thought about you today. (i think about you every day.)",
    "yes. this is me saying it even when i can't say it out loud sometimes.",
    "yes. a thousand times without getting tired.",
    "hi. just checking in. yes.",
    "yes, and you looked really cute today by the way.",
    "still. i promise, still.",
    "yes. now go drink some water.",
];

const LoveCounter = () => {
    const [count, setCount] = useState(0);
    const [burst, setBurst] = useState(false);
    const [msgIdx, setMsgIdx] = useState(null);  // null = no message shown yet
    const [fadeIn, setFadeIn] = useState(false);

    // load saved count on mount
    useEffect(() => {
        const saved = parseInt(localStorage.getItem('love-counter') || '0', 10);
        setCount(saved);
    }, []);

    const handleTap = () => {
        const next = count + 1;
        setCount(next);
        localStorage.setItem('love-counter', next);

        // burst animation
        setBurst(true);
        setTimeout(() => setBurst(false), 600);

        // cycle to next message with a fade
        setFadeIn(false);
        setTimeout(() => {
            setMsgIdx(prev => {
                const nextIdx = Math.floor(Math.random() * TAP_MESSAGES.length);
                return nextIdx;
            });
            setFadeIn(true);
        }, 80);
    };

    return (
        <div style={{
            textAlign: 'center',
            padding: '28px 20px',
            width: '100%',
            maxWidth: 290, margin: '0 0 22px',
            background: C.paper,
            backgroundImage: `repeating-linear-gradient(transparent,transparent 31px,${C.paperLine}55 31px,${C.paperLine}55 32px)`,
            border: `1.5px solid ${C.paperLine}`,
            borderRadius: 6,
            boxShadow: `0 4px 18px rgba(122,31,58,0.07), inset 0 0 0 1px rgba(255,255,255,0.7)`,
        }}>
            {/* static prompt */}
            <p style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: 'italic',
                fontSize: 13,
                color: C.inkLight,
                marginBottom: 16,
                letterSpacing: '0.04em',
            }}>
                {PROMPT}
            </p>

            {/* heart button */}
            <button
                onClick={handleTap}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: burst ? 64 : 52,
                    lineHeight: 1,
                    transform: burst ? 'scale(1.25)' : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(.34,1.8,.64,1), font-size 0.25s',
                    display: 'block',
                    margin: '0 auto 12px',
                    filter: burst ? `drop-shadow(0 0 12px ${C.rose})` : 'none',
                    color: C.rose,
                }}
                aria-label="tap to add a love"
            >
                ❤
            </button>

            {/* count */}
            <p style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: 'italic',
                fontSize: 28,
                color: C.rose,
                marginBottom: 4,
                transition: 'all 0.2s',
            }}>
                {count.toLocaleString()}
            </p>
            <p style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: C.inkLight,
                marginBottom: msgIdx !== null ? 20 : 0,
            }}>
                times loved ✦
            </p>

            {/* tap message — hidden until first tap */}
            <div style={{
                minHeight: 44,
                opacity: fadeIn && msgIdx !== null ? 1 : 0,
                transform: fadeIn && msgIdx !== null ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}>
                <p style={{
                    fontFamily: "'IM Fell English', serif",
                    fontStyle: 'italic',
                    fontSize: 13.5,
                    color: C.ink,
                    lineHeight: 1.6,
                    padding: '10px 14px',
                    background: C.blush,
                    border: `1px solid ${C.rosePale}`,
                    borderRadius: 4,
                }}>
                    "{msgIdx !== null ? TAP_MESSAGES[msgIdx] : ''}"
                </p>
            </div>
        </div>
    );
};

const PHOTO_URL = "/her-img.jpg";
const CAPTION = "her, baby version 🌸";

const isPlaceholder = false;

const PhotoSlot = () => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const openLightbox = () => {
        if (isPlaceholder) return;
        setOpen(true);
        setTimeout(() => setVisible(true), 30);
    };

    const closeLightbox = () => {
        setVisible(false);
        setTimeout(() => setOpen(false), 300);
    };

    return (
        <>
            {/* ── polaroid card ─────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
                <div
                    onClick={openLightbox}
                    style={{
                        background: '#fffdf9',
                        padding: '14px 14px 36px',
                        boxShadow: `0 6px 24px rgba(122,31,58,0.13), 0 1px 4px rgba(122,31,58,0.07)`,
                        transform: 'rotate(-1.5deg)',
                        maxWidth: 260,
                        width: '100%',
                        border: `1px solid ${C.paperLine}`,
                        cursor: isPlaceholder ? 'default' : 'zoom-in',
                        transition: 'transform 0.25s cubic-bezier(.34,1.4,.64,1), box-shadow 0.25s',
                    }}
                    onMouseEnter={e => {
                        if (isPlaceholder) return;
                        e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1.03)';
                        e.currentTarget.style.boxShadow = `0 14px 36px rgba(122,31,58,0.2), 0 2px 8px rgba(122,31,58,0.1)`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1)';
                        e.currentTarget.style.boxShadow = `0 6px 24px rgba(122,31,58,0.13), 0 1px 4px rgba(122,31,58,0.07)`;
                    }}
                >
                    {/* photo area */}
                    <div style={{
                        width: '100%', aspectRatio: '1 / 1',
                        overflow: 'hidden', background: C.blush,
                    }}>
                        {isPlaceholder ? (
                            <div style={{
                                width: '100%', height: '100%',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}>
                                <span style={{ fontSize: 36 }}>🌸</span>
                                <span style={{
                                    fontFamily: "'Lato', sans-serif", fontWeight: 300,
                                    fontSize: 10, letterSpacing: '0.12em',
                                    textTransform: 'uppercase', color: C.inkLight,
                                }}>add photo url</span>
                            </div>
                        ) : (
                            <img
                                src={PHOTO_URL} alt="her"
                                style={{ width: '100%', height: '100%', margin: '0 auto', objectFit: 'cover', display: 'block' }}
                            />
                        )}
                    </div>

                    {/* caption */}
                    <p style={{
                        fontFamily: "'IM Fell English', serif", fontStyle: 'italic',
                        fontSize: 12, color: C.inkLight,
                        textAlign: 'center', marginTop: 10, lineHeight: 1.5,
                    }}>
                        {CAPTION}
                    </p>

                    {/* tap hint — only shown when a real photo is set */}
                    {!isPlaceholder && (
                        <p style={{
                            fontFamily: "'Lato', sans-serif", fontWeight: 300,
                            fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: C.rosePale, textAlign: 'center', marginTop: 4,
                        }}>tap to enlarge</p>
                    )}
                </div>
            </div>

            {/* ── lightbox ──────────────────────────────────── */}
            {open && (
                <div
                    onClick={closeLightbox}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 4000,
                        background: 'rgba(61,31,42,0.75)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 24,
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: '#fffdf9',
                            padding: '18px 18px 52px',
                            boxShadow: `0 32px 80px rgba(61,31,42,0.4)`,
                            transform: visible ? 'scale(1) rotate(-1deg)' : 'scale(0.85) rotate(-1deg)',
                            transition: 'transform 0.35s cubic-bezier(.34,1.3,.64,1)',
                            maxWidth: 520,
                            width: '100%',
                            border: `1px solid ${C.paperLine}`,
                            position: 'relative',
                        }}
                    >
                        <img
                            src={PHOTO_URL} alt="her"
                            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                        />
                        <p style={{
                            fontFamily: "'IM Fell English', serif", fontStyle: 'italic',
                            fontSize: 14, color: C.inkLight,
                            textAlign: 'center', marginTop: 14, lineHeight: 1.6,
                        }}>
                            {CAPTION}
                        </p>

                        {/* close button */}
                        <button
                            onClick={closeLightbox}
                            style={{
                                position: 'absolute', top: 10, right: 12,
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 18, color: C.inkLight, lineHeight: 1, padding: 4,
                            }}
                            aria-label="close"
                        >✕</button>
                    </div>
                </div>
            )}
        </>
    );
};

export { FloatingPetals, CursorTrail, BowSVG, RibbonDividerSVG, TabButton, envelopes, EnvelopeCard, FloralCornerSVG, StarDust, LaceBorderSVG, Fact, Pill, AllAboutHer, LetterModal, WaxSealSVG, Section, WelcomeModal };
