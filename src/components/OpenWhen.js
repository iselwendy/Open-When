import { useState, useEffect, useRef } from "react";

const HER = {

    // ── THE BASICS ───────────────────────────────────────────
    name: "Kassandra Caizer Attillo Bajador",
    nickname: "Kassy",
    myName: "Pat",
    herAge: "18",
    zodiac: "Leo",
    petName: "Bangs",
    petSpecies: "Cat",
    favColor1: "maroon",
    favColor2: "purple",
    favColor3: "pink"
};

/* ─── PALETTE ─────────────────────────────────────────────── */
const C = {
    paper: "#fdf6f0",
    paperDark: "#f5e8df",
    paperLine: "#e8d5cc",
    ink: "#3d1f2a",
    inkLight: "#7a4455",
    rose: "#c9586e",
    rosePale: "#f0b8c4",
    blush: "#f7dde4",
    plum: "#7c3255",
    plumPale: "#d9a8c2",
    maroon: "#7a1f3a",
    maroonPale: "#e8b4c4",
    ribbon: "#b8325a",
    ribbonDark: "#8c1f40",
    lace: "#e8cdd5",
    gold: "#c9945a",
    goldPale: "#f0d8b8",
    cream: "#fef9f5",
    wax: "#c43050",
};

/* ─── SVG MOTIFS ───────────────────────────────────────────── */
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

const RibbonDividerSVG = () => (
    <svg width="100%" height="24" viewBox="0 0 320 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="130" y2="12" stroke={C.rosePale} strokeWidth="1" />
        <path d="M140 12 C148 6 152 18 160 12 C168 6 172 18 180 12" stroke={C.ribbon} strokeWidth="1.5" fill="none" />
        <line x1="190" y1="12" x2="320" y2="12" stroke={C.rosePale} strokeWidth="1" />
        <circle cx="160" cy="12" r="3" fill={C.ribbon} />
    </svg>
);

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

/* ─── ENVELOPE DEFINITIONS ─────────────────────────────────── */
const envelopes = [
    { id: "sad", emoji: "🌧️", label: "Open when sad", bow: C.plum, seal: C.plum, sealEmoji: "🌙" },
    { id: "stressed", emoji: "🍵", label: "Open when stressed", bow: C.maroon, seal: C.maroon, sealEmoji: "🌿" },
    { id: "missing", emoji: "💌", label: "Open when you miss me", bow: C.ribbon, seal: C.ribbon, sealEmoji: "💕" },
    { id: "happy", emoji: "🌸", label: "Open when happy", bow: C.rose, seal: C.rose, sealEmoji: "🌷" },
    { id: "sleep", emoji: "🌙", label: "Open when you can't sleep", bow: C.plum, seal: "#5a3070", sealEmoji: "✨" },
    { id: "proud", emoji: "🏆", label: "Open when you did great", bow: C.gold, seal: C.gold, sealEmoji: "⭐" },
    { id: "laugh", emoji: "🎀", label: "Open when you need a laugh", bow: C.rose, seal: C.rose, sealEmoji: "🎀" },
    { id: "doubt", emoji: "🕯️", label: "Open when you doubt yourself", bow: C.maroon, seal: C.maroon, sealEmoji: "🕯️" },
];

/* ─── MESSAGES (personalised) ──────────────────────────────── */
const messages = {

    sad:
        `Hey, ${HER.nickname}.

I know right now feels heavy — like today forgot to be kind to you. Maybe something happened, maybe nothing did and it still hurts. Both of those are real, and both of them matter.

I want you to know: you are not alone in this. Not even a little bit.

I've watched you carry so much — ${HER.currentStruggle} — and you do it with so much grace it takes my breath away sometimes. But on the days you can't carry anything at all, that's okay too. You don't have to be strong all the time. Not with me. Not today.

When it feels like too much: make yourself a ${HER.favDrink}. Wrap up in ${HER.comfortItem}. Put on ${HER.favShow} or something that asks nothing of you. Let ${HER.petName} sit with you if they will.

${HER.thingYouLove5} — that's part of who you are. The world is lucky for it, even on the days it doesn't feel that way.

I love every version of you. The bright one, the determined one, and yes — this one too. The one with the tired eyes and the full heart.

Breathe. I've got you. 🩷

All my love —
${HER.myName}`,

    stressed:
        `Pause. Just for one second.

In for 4... hold for 4... out for 4.

Okay. Hi. It's me.

${HER.nickname}, you are not behind. You are not failing. You're someone doing hard things — and hard things take time and take something out of you. That's not weakness, that's just how it works.

Here's what I know about you that you sometimes forget: remember ${HER.proudThing}? You showed up for that, even when it felt impossible. You have done hard things before. You will do this one too.

Right now, though — step away from whatever it is. Even five minutes. Make a ${HER.favDrink}. Eat something (${HER.favFood} if you can 🍽️). Stretch. Open the window. Let the outside in for a moment.

The work will still be there. The deadline will still be there. But right now, *you* need to still be there too — rested and breathing and okay.

One thing. Then the next thing. That's all.

I believe in you more than you believe in you right now. Borrow some of mine.

${HER.myName} 💪🩷`,

    missing:
        `I miss you too, ${HER.nickname}.

Right now, wherever I am — I'm probably thinking about you. About ${HER.cuteHabit}. About ${HER.thingYouLove2}. About the way you sound when you're excited about something small and your voice goes faster and your hands start moving.

I think about ${HER.howYouMet} — I had no idea then that you'd become my favourite part of everything. And our first date at ${HER.firstDate}. And ${HER.favouriteMemory}. I keep all of those somewhere safe in my chest.

${HER.ourPlace} holds a version of us in it that I want to go back to again and again.

Put on ${HER.ourSong}. That one's always ours, no matter the distance. No matter the time.

We'll have so many more moments. ${HER.yourDream} — I'm still holding onto that. ${HER.yourDream2} too. We have so many things still ahead of us.

Until then — here's a little piece of me in your pocket.

You're never as far from me as it feels. 🫂

${HER.myName}`,

    happy:
        `WAIT. STOP. LET ME SEE YOU. 🎉

${HER.nickname}!!! You're happy!!! Tell me everything, I need every detail right now.

Look at you. You deserve every single good thing that finds you — every last bit of it. ${HER.thingYouLove1}, ${HER.thingYouLove4} — these are the things that the world gives back to you. You put good in. Good comes back.

Take a mental screenshot of this exact feeling and store it somewhere safe. Because on the harder days, this version of you is still in there. She doesn't go anywhere.

Also — I have to say it — ${HER.insideJoke1}. Just needed to drop that in because I knew it would make you smile even more. 😌

And you know what this calls for? ${HER.favFood}. ${HER.favArtist} on full volume. Dancing alone in your room if the mood strikes. You have full permission.

Here's to more of these. So many more. The world made the right call giving them to you.

🥂🩷 ${HER.myName}`,

    sleep:
        `Hi, midnight brain. We meet again.

I know what it's like in there right now — the thoughts are too loud and the ceiling is too close and sleep feels like something that happens to other people.

So instead of trying to think your way to sleep, let's just think about one good thing. It can be tiny. The smell of ${HER.favDrink}. The next episode of ${HER.favShow} waiting for you tomorrow. ${HER.petName} being warm and soft somewhere nearby. The way ${HER.favSeason} feels on your face.

You don't have to solve anything tonight, ${HER.nickname}. Not ${HER.currentStruggle}, not ${HER.bigGoal}, not whatever your brain is looping through right now. Tonight is not for that. Tonight is for rest.

And here's what I notice: ${HER.sleepyTell}. When that starts — that's your body asking. Listen to it. You're allowed to listen.

You are safe. You are so loved. Morning is already on its way to you.

Close your eyes. Put on ${HER.goToPlaylist}. Let it carry you somewhere quieter.

I'll be here when you wake up. 🌙✨

— ${HER.myName}`,

    proud:
        `OKAY. WAIT. YOU DID THAT?!

${HER.nickname.toUpperCase()}. I am so proud of you I genuinely don't have the words. I'm trying and they're not coming fast enough.

You worked for this. You showed up on the hard days — especially those days. And look. HERE. YOU. ARE.

I want you to sit with that for a second before you move on to the next thing. Actually feel it. You did something hard and you came out the other side and that matters.

I always knew. Even when you doubted yourself — even when ${HER.greatestFear} got loud and you couldn't hear your own strength — I knew. Because I've been paying attention. I've seen ${HER.superpower}. I've seen ${HER.hiddenStrength}. That's all you. It's always been you.

This is what ${HER.howLong} of watching you looks like: I know what you're capable of better than you do sometimes. And this — right now — is not even the ceiling.

Now go celebrate properly. ${HER.favFood}. ${HER.favArtist} too loud. Call someone who loves you.

You earned every single bit of this. 🏆✨

All my love —
${HER.myName}`,

    laugh:
        `Okay, ${HER.nickname}, extremely urgent question and I need your full attention:

Would you rather fight 100 duck-sized horses — or 1 horse-sized duck?

Take your time. This is important.

...

Okay, while you think: remember ${HER.insideJoke2}? I think about that more than I should. And ${HER.insideJoke3} — that one lives rent-free in my head. You were there. You know. And honestly? ${HER.insideJoke4} deserves its own memorial plaque.

${HER.jokePhrase}. 😌

Here is something I need you to know: ${HER.laugh} is the best sound. Not just the best sound you make — the best sound, full stop. Don't muffle it. Don't hide it. Let it be as big as it wants to be.

Also ${HER.hiddenTalent} still lives in my mind as one of the most impressive things I've ever seen in my life and I will not be taking questions.

I love you. Now go be ridiculous. You're so good at it. 😂🩷

— ${HER.myName}`,

    doubt:
        `Hey. Come here, ${HER.nickname}.

I know this feeling. The one where you're not sure you're doing okay, where you feel like everyone else has something figured out that you haven't caught up to yet. Where ${HER.greatestFear} gets loud and convincing and hard to argue with.

But I need you to hear me, really hear me: that voice is lying to you.

I've been paying attention since ${HER.howYouMet}. I've been quietly collecting evidence this whole time, and here's what I have:

${HER.thingYouLove1}. ${HER.thingYouLove3}. ${HER.thingYouLove5}. ${HER.smallKindness}. ${HER.superpower}. ${HER.hiddenStrength} — this one especially. This one the most.

The voice that says you're not enough? It doesn't have access to any of that. It's working with incomplete information. I'm not.

You are not too much. You are not too little. You are not behind. You are not what your worst day says you are.

${HER.yourPromise}.
${HER.yourPromise2}.

${HER.whatYouWant} — that's all I want. For you to know it, feel it, believe it even on the days like this one.

You are more than enough. You always have been.

All my love, always —
${HER.myName} 🕯️🩷`,
};

/* ─── CURSOR TRAIL ─────────────────────────────────────────── */
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

/* ─── ENVELOPE CARD ────────────────────────────────────────── */
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

/* ─── LETTER MODAL ─────────────────────────────────────────── */
const LetterModal = ({ env, onClose }) => {
    const [phase, setPhase] = useState("sealed");
    const [liked, setLiked] = useState(false);
    const [likeCount] = useState(Math.floor(Math.random() * 8) + 3);
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
                                To: <strong style={{ color: C.ink }}>{HER.name}</strong>
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
                                    sealed on {HER.anniversary} 🎀
                                </span>
                            </div>
                        </div>

                        {/* like */}
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 8, alignItems: "center" }}>
                            <button
                                onClick={() => setLiked(true)}
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
                                <span>{liked ? likeCount + 1 : likeCount}</span>
                            </button>
                            <span style={{ fontSize: 11, color: C.inkLight, fontFamily: "'Lato',sans-serif", fontStyle: "italic" }}>
                                {liked ? "saved to my heart 🌷" : "press if this helped"}
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
                                made with love, just for {HER.name} ✦
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
        </div>
    );
};

/* ─── FLOATING PETALS ──────────────────────────────────────── */
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

/* ─── ALL ABOUT HER PAGE ───────────────────────────────────── */
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

const LoveItem = ({ text, index }) => (
    <div style={{
        display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12,
        animation: `cardRise 0.4s ${index * 0.06}s both`,
    }}>
        <span style={{
            fontFamily: "'IM Fell English',serif", fontStyle: "italic",
            fontSize: 13, color: C.rose, flexShrink: 0, paddingTop: 1,
        }}>{index + 1}.</span>
        <span style={{
            fontFamily: "'IM Fell English',serif", fontStyle: "italic",
            fontSize: 14.5, color: C.ink, lineHeight: 1.7,
        }}>{text}</span>
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

const JokeCard = ({ label, text, index }) => (
    <div style={{
        background: C.blush, border: `1px solid ${C.rosePale}`,
        borderRadius: 4, padding: "12px 16px", marginBottom: 10,
        animation: `cardRise 0.4s ${index * 0.07}s both`,
    }}>
        <div style={{
            fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: 10,
            letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkLight, marginBottom: 5,
        }}>{label}</div>
        <div style={{
            fontFamily: "'IM Fell English',serif", fontStyle: "italic",
            fontSize: 14.5, color: C.ink, lineHeight: 1.6,
        }}>{text}</div>
    </div>
);

const AllAboutHer = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>

        {/* identity card */}
        <Section emoji="🌸" title={`${HER.name}, at a glance`}>
            <Fact label="Full name" value={HER.name} />
            <Fact label="Nickname" value={HER.nickname} accent={C.rose} />
            <Fact label="Age" value={HER.herAge} />
            <Fact label="Star sign" value={HER.zodiac} />
            <Fact label="Pet" value={`${HER.petName} the ${HER.petSpecies}`} />
            <Fact label="Colors" value={
                <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Pill text={HER.favColor1} />
                    <Pill text={HER.favColor2} />
                    <Pill text={HER.favColor3} />
                </div>
            } />
        </Section>

    </div>
);

/* ─── TAB BUTTON ───────────────────────────────────────────── */
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

/* ─── MAIN APP ─────────────────────────────────────────────── */
export default function OpenWhen() {
    const [opened, setOpened] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState("letters");
    useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{cursor:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='5' fill='%23c9586e' opacity='0.6'/%3E%3C/svg%3E") 12 12,crosshair;}
        body{background:${C.cream};overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${C.blush};}
        ::-webkit-scrollbar-thumb{background:${C.rosePale};border-radius:4px;}
        @keyframes cardRise{from{opacity:0;transform:translateY(20px) scale(0.96);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes sealPop{from{transform:scale(0.3) rotate(-20deg);opacity:0;}to{transform:scale(1) rotate(0deg);opacity:1;}}
        @keyframes petalFall{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0.2;}10%{opacity:0.3;}90%{opacity:0.2;}100%{transform:translateY(110vh) translateX(var(--drift)) rotate(360deg);opacity:0;}}
        @keyframes trailFade{0%{opacity:0.7;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(-50%,-80%) scale(0.5);}}
        @keyframes confettiDrop{0%{opacity:1;transform:translateY(0) translateX(0) rotate(0deg) scale(1);}100%{opacity:0;transform:translateY(160px) translateX(var(--dx)) rotate(540deg) scale(0.5);}}
        @keyframes bowBounce{0%,100%{transform:translateY(0) rotate(-2deg);}50%{transform:translateY(-6px) rotate(2deg);}}
        @keyframes ribbonWave{0%,100%{transform:scaleX(1);}50%{transform:scaleX(1.03);}}
      `}</style>

            <div style={{
                position: "fixed", inset: 0, zIndex: 0,
                background: `
          radial-gradient(ellipse 80% 40% at 50% 0%,${C.blush}88 0%,transparent 70%),
          radial-gradient(ellipse 60% 30% at 80% 100%,${C.plumPale}44 0%,transparent 70%),
          repeating-linear-gradient(0deg,transparent,transparent 39px,${C.paperLine}33 39px,${C.paperLine}33 40px),
          ${C.cream}`,
                pointerEvents: "none",
            }} />

            <FloatingPetals />
            <CursorTrail />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "44px 18px 72px" }}>

                {/* header */}
                <div style={{
                    textAlign: "center", marginBottom: 36,
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(-16px)",
                    transition: "opacity 0.7s, transform 0.7s",
                }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 4, animation: "bowBounce 3s ease-in-out infinite" }}>
                        <BowSVG color={C.ribbon} size={64} />
                    </div>
                    <div style={{
                        fontFamily: "'IM Fell English',serif", fontStyle: "italic",
                        fontSize: 11, letterSpacing: "0.22em", color: C.inkLight,
                        textTransform: "uppercase", marginBottom: 10,
                    }}>a little something for {HER.name}</div>
                    <h1 style={{
                        fontFamily: "'IM Fell English',serif",
                        fontSize: "clamp(2.2rem,9vw,3.4rem)",
                        fontWeight: 400, color: C.ink, lineHeight: 1.15, marginBottom: 8,
                    }}>Open When...</h1>
                    <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 14, color: C.inkLight }}>
                        letters sealed with love, from {HER.myName} 🎀
                    </p>
                    <div style={{ margin: "18px auto 0", maxWidth: 280, animation: "ribbonWave 4s ease-in-out infinite" }}>
                        <RibbonDividerSVG />
                    </div>
                </div>

                {/* tabs */}
                <div style={{ marginBottom: 0 }}>
                    <div style={{ display: "flex", gap: 0, justifyContent: "center", paddingBottom: 0 }}>
                        <TabButton
                            label="💌 Open When Letters"
                            active={tab === "letters"}
                            onClick={() => setTab("letters")}
                        />
                        <TabButton
                            label={`🌸 All About ${HER.name}`}
                            active={tab === "about"}
                            onClick={() => setTab("about")}
                        />
                    </div>
                    <div style={{ height: "1.5px", background: C.paperLine, marginBottom: 28 }} />
                </div>

                {/* tab content */}
                {tab === "letters" && (
                    <div style={{ animation: "fadeIn 0.35s ease" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,200px),1fr))",
                            gap: 20,
                        }}>
                            {envelopes.map((env, i) => (
                                <EnvelopeCard key={env.id} env={env} index={i} onClick={() => setOpened(env)} />
                            ))}
                        </div>
                    </div>
                )}

                {tab === "about" && <AllAboutHer />}

                {/* footer */}
                <div style={{ marginTop: 52, textAlign: "center" }}>
                    <div style={{ margin: "0 auto 14px", maxWidth: 200 }}><RibbonDividerSVG /></div>
                    <p style={{ fontFamily: "'IM Fell English',serif", fontStyle: "italic", fontSize: 13, color: C.inkLight, letterSpacing: "0.04em" }}>
                        made with love, for every moment you need it ✦
                    </p>
                </div>
            </div>

            {opened && <LetterModal env={opened} onClose={() => setOpened(null)} />}
        </>
    );
}

export const metadata = {
    title: "Open When Letters for Her",
    description: "A collection of heartfelt letters and a scrapbook page, made with love for my partner.",
};