import { useState, useEffect } from 'react';
import '../styles/Main.css';
import { FloatingPetals, CursorTrail, BowSVG, RibbonDividerSVG, TabButton, envelopes, EnvelopeCard, AllAboutHer, LetterModal, WelcomeModal } from './Comps';
import { C, HER } from './Data';

function Main() {
    const [opened, setOpened] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [tab, setTab] = useState("letters");
    useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
    const seen = localStorage.getItem('welcome-seen');

    if (!seen) { setShowWelcome(true); localStorage.setItem('welcome-seen', '1'); }

    return (
        <>
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
            <div className="main">
                <div className="header" style={{
                    opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(-16px)"
                }}>
                    <div className="bow-container">
                        <BowSVG color={C.ribbon} size={64} />
                    </div>
                    <p className="to-her">A little something for {HER.herName}</p>
                    <h1>Open When...</h1>
                    <p className="from-me">letters sealed with love, from {HER.myName} 🎀</p>
                    <div className="ribbon-divider">
                        <RibbonDividerSVG />
                    </div>
                </div>

                <div className="tabs">
                    <div className="tab-buttons">
                        <TabButton label="💌 Open When Letters" active={tab === "letters"} onClick={() => setTab("letters")} />
                        <TabButton label={`🌸 About ${HER.herName}`} active={tab === "about"} onClick={() => setTab("about")} />
                    </div>
                    <div className="tab-bottom" />
                </div>
                {tab === "letters" && (
                    <div className="tab-content">
                        <div className="envelopes">
                            {envelopes.map((env, i) => (
                                <EnvelopeCard key={env.id} env={env} index={i} onClick={() => setOpened(env)} />
                            ))}
                        </div>
                    </div>
                )}
                {tab === "about" && <AllAboutHer />}

                <div className="footer">
                    <div className="ribbon-divider">
                        <RibbonDividerSVG />
                    </div>
                    <p className="authors-note">
                        made with love, for every moment you need it ✦
                    </p>
                </div>
            </div>
            {opened && <LetterModal env={opened} onClose={() => setOpened(null)} />}
            {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
        </>
    );
}

export default Main;
