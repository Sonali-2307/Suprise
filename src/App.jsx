import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const officialDate = new Date("2025-12-12T00:00:00");

const memories = [
  {
    icon: "🎓",
    title: "The Beginning",
    label: "COLLEGE",
    text: "Somewhere in college, two people met without knowing that one day, they would become such an important part of each other's lives.",
  },
  {
    icon: "💬",
    title: "A Year of Us",
    label: "THE CONVERSATIONS",
    text: "We talked for about a year. Little conversations became long conversations, and somehow talking to you became one of my favorite parts of the day.",
  },
  {
    icon: "❤️",
    title: "12.12.2025",
    label: "OUR OFFICIAL DAY",
    text: "December 12, 2025. The date that turned everything into something officially ours.",
  },
  {
    icon: "🍜",
    title: "Food & Happiness",
    label: "OUR LITTLE DATES",
    text: "Eating together somehow makes everything better. Even an ordinary meal becomes a memory when I'm with you.",
  },
  {
    icon: "✈️",
    title: "Our Adventures",
    label: "TRAVELLING TOGETHER",
    text: "Travelling with you means collecting little stories that I know I'll want to remember for a very long time.",
  },
  {
    icon: "✨",
    title: "Just Being Us",
    label: "MY FAVORITE PART",
    text: "Maybe the best memories aren't the big ones. They're the simple moments when we're together and genuinely happy.",
  },
];

const thingsILove = [
  "Your silly side.",
  "The way you make me laugh.",
  "Our random conversations.",
  "Eating together.",
  "Travelling together.",
  "The happiness we create.",
  "Being able to be myself with you.",
  "And yes... your Cheeseball-ness. 😂❤️",
];

const stars = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  left: `${(i * 47.17) % 100}%`,
  top: `${(i * 71.31) % 100}%`,
  size: `${1 + (i % 3)}px`,
  duration: `${2 + (i % 5)}s`,
  delay: `${(i % 12) * 0.25}s`,
}));

function getTimeTogether() {
  const now = new Date();
  const difference = Math.max(0, now - officialDate);

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

function App() {
  const [stage, setStage] = useState("loading");
  const [counter, setCounter] = useState(getTimeTogether());
  const [loveRunning, setLoveRunning] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [finalReveal, setFinalReveal] = useState(false);
  const [activeLove, setActiveLove] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("intro");
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(getTimeTogether());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${5 + ((i * 19) % 90)}%`,
        delay: `${(i % 6) * 0.8}s`,
        duration: `${5 + (i % 5)}s`,
      })),
    []
  );

  const enterUniverse = () => {
    setStage("universe");

    setTimeout(() => {
      document
        .getElementById("story")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const revealFinal = () => {
    setFinalReveal(true);

    setTimeout(() => {
      document
        .getElementById("final")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="app">
      <div className="noise" />

      <div className="stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      {stage !== "loading" && (
        <div className="floating-hearts">
          {floatingHearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{
                y: "-20vh",
                opacity: [0, 0.35, 0.15, 0],
                x: [0, 15, -10, 0],
              }}
              transition={{
                duration: Number(heart.duration),
                delay: Number(heart.delay),
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ left: heart.left }}
            >
              ♥
            </motion.span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.section
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1 }}
          >
            <div className="loading-core">
              <motion.div
                className="loading-orbit orbit-a"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="loading-orbit orbit-b"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="loading-heart"
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                ♥
              </motion.div>
            </div>

            <div className="loading-console">
              <p>&gt; initializing boyfriend_day.exe</p>
              <p>&gt; scanning memories...</p>
              <p>&gt; finding my favorite person...</p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.7 }}
                className="loading-found"
              >
                ✓ FOUND: PRATAP
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3 }}
              >
                nickname: CHEESEBALL ❤️
              </motion.p>
            </div>
          </motion.section>
        )}

        {stage === "intro" && (
          <motion.section
            className="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="hero-glow-heart"
              animate={{
                scale: [1, 1.07, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>

            <p className="eyebrow">A BOYFRIEND DAY SURPRISE</p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hey, <span>Cheeseball.</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              I built a tiny universe
              <br />
              just for you.
            </motion.p>

            <motion.div
              className="secret-note"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <span>PRIVATE MESSAGE</span>
              <p>
                This website has absolutely nothing
                <br />
                important inside.
              </p>
              <small>Probably. 👀</small>
            </motion.div>

            <motion.button
              className="main-button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 35px rgba(255,111,161,.3)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={enterUniverse}
            >
              OPEN YOUR SURPRISE
              <span>→</span>
            </motion.button>
          </motion.section>
        )}

        {stage === "universe" && (
          <motion.section
            className="universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="planet-system">
              <motion.div
                className="planet-orbit orbit-1"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="orbit-dot">✦</span>
              </motion.div>

              <motion.div
                className="planet-orbit orbit-2"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="orbit-dot second">♥</span>
              </motion.div>

              <motion.div
                className="universe-core"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(255,105,160,.25)",
                    "0 0 100px rgba(255,105,160,.6)",
                    "0 0 30px rgba(255,105,160,.25)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <span>♥</span>
              </motion.div>
            </div>

            <p className="eyebrow">WELCOME TO MY LITTLE UNIVERSE</p>

            <h2>
              Somewhere between
              <br />
              friendship and forever,
              <br />
              <span>there was us.</span>
            </h2>

            <p className="universe-text">
              And I'm really, really glad it was you.
            </p>

            <button
              className="scroll-button"
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              SCROLL INTO OUR STORY
              <span>↓</span>
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {stage === "universe" && (
        <div className="main-content">
          <section id="story" className="section story-section">
            <div className="section-heading">
              <p className="eyebrow">THE STORY OF US</p>

              <h2>
                It wasn't one big moment.
                <br />
                <span>It was all the little ones.</span>
              </h2>

              <p>
                The conversations.
                <br />
                The food.
                <br />
                The travels.
                <br />
                The happiness.
              </p>
            </div>

            <div className="timeline">
              {memories.map((memory, index) => (
                <motion.div
                  className={`timeline-item ${
                    index % 2 === 0 ? "left" : "right"
                  }`}
                  key={memory.title}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  <div className="timeline-dot">
                    {memory.icon}
                  </div>

                  <div className="timeline-card">
                    <span>{memory.label}</span>
                    <h3>{memory.title}</h3>
                    <p>{memory.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="section counter-section">
            <p className="eyebrow">SINCE WE BECAME OFFICIAL</p>

            <h2>
              December 12, 2025
              <span> ❤️</span>
            </h2>

            <p className="counter-intro">
              And the clock has been running ever since.
            </p>

            <div className="counter-grid">
              <Counter value={counter.days} label="DAYS" />
              <Counter value={counter.hours} label="HOURS" />
              <Counter value={counter.minutes} label="MINUTES" />
              <Counter value={counter.seconds} label="SECONDS" />
            </div>

            <p className="counter-bottom">
              That's a lot of seconds of having you in my life.
              <br />
              And I wouldn't exchange them for anything.
            </p>
          </section>

          <section className="section love-section">
            <p className="eyebrow">A FEW CONFESSIONS</p>

            <h2>
              Things I secretly
              <br />
              <span>love about us.</span>
            </h2>

            <div className="love-cloud">
              {thingsILove.map((thing, index) => (
                <motion.button
                  key={thing}
                  className={`love-pill pill-${index}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: index % 2 === 0 ? 2 : -2,
                  }}
                  onClick={() => setActiveLove(thing)}
                >
                  {thing}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {activeLove && (
                <motion.div
                  className="little-popup"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <span>❤️</span>
                  <p>{activeLove}</p>
                  <button onClick={() => setActiveLove(null)}>×</button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="section cheeseball-section">
            <div className="cheese-card">
              <div className="cheese-top">
                <div>
                  <p className="eyebrow">OFFICIAL SCIENTIFIC REPORT</p>
                  <h2>
                    The <span>Cheeseball</span> Meter
                  </h2>
                </div>

                <div className="cheese-emoji">🧀</div>
              </div>

              <div className="meter-row">
                <div className="meter-label">
                  <span>Cheesiness</span>
                  <strong>100%</strong>
                </div>

                <div className="meter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </div>

              <div className="meter-row">
                <div className="meter-label">
                  <span>Making me smile</span>
                  <strong>∞%</strong>
                </div>

                <div className="meter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8 }}
                  />
                </div>
              </div>

              <div className="meter-row">
                <div className="meter-label">
                  <span>Importance to me</span>
                  <strong>∞</strong>
                </div>

                <div className="meter">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>

              <div className="scientific-result">
                <span>RESULT</span>
                <p>
                  Extremely Cheeseball.
                  <br />
                  <small>No known cure has been discovered. ❤️</small>
                </p>
              </div>
            </div>
          </section>

          <section className="section terminal-section">
            <p className="eyebrow">A SOFTWARE STUDENT'S CONFESSION</p>

            <div className="terminal-window">
              <div className="terminal-bar">
                <span />
                <span />
                <span />
                <small>cheeseball.exe</small>
              </div>

              <div className="terminal-content">
                <p>&gt; npm install boyfriend</p>
                <p className="muted">
                  resolving dependencies...
                </p>

                <p>&gt; checking requirements</p>

                <div className="terminal-list">
                  <p>✓ must make me laugh</p>
                  <p>✓ must tolerate my nonsense</p>
                  <p>✓ must eat with me</p>
                  <p>✓ must travel with me</p>
                  <p>✓ must make ordinary days happier</p>
                </div>

                {!loveRunning ? (
                  <button
                    className="terminal-run"
                    onClick={() => setLoveRunning(true)}
                  >
                    RUN LOVE.EXE
                  </button>
                ) : (
                  <motion.div
                    className="terminal-result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p>✓ ALL REQUIREMENTS SATISFIED</p>
                    <p>✓ BOYFRIEND INSTALLED</p>
                    <p>✓ LOVE MODULE CONNECTED</p>

                    <br />

                    <p className="error-text">
                      ERROR: Cannot uninstall CHEESEBALL.
                    </p>

                    <p className="muted">
                      Reason: Too important.
                    </p>

                    <p className="success-text">
                      Process complete. ❤️
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          <section className="section envelope-section">
            <p className="eyebrow">A MESSAGE FOR LATER</p>

            <h2>
              Open this
              <br />
              <span>when you miss me.</span>
            </h2>

            {!envelopeOpen ? (
              <motion.button
                className="envelope"
                whileHover={{
                  y: -8,
                  rotate: -1,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setEnvelopeOpen(true)}
              >
                <div className="envelope-flap">♥</div>
                <div className="envelope-label">
                  FOR CHEESEBALL
                  <small>OPEN ME</small>
                </div>
              </motion.button>
            ) : (
              <motion.div
                className="letter"
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
              >
                <div className="letter-heart">♥</div>

                <p>Dear Cheeseball,</p>

                <p>
                  If you're reading this because you miss me,
                  remember that somewhere there's a girl who is
                  probably thinking about you too.
                </p>

                <p>
                  I hope you always remember our little moments:
                  the food, the travelling, the conversations,
                  the laughs, and all those ordinary days that
                  somehow became special.
                </p>

                <p>
                  You became my favorite kind of person —
                  someone I can be happy with simply by being
                  myself.
                </p>

                <p className="letter-ending">
                  Now stop missing me.
                  <br />
                  Come make another memory with me. ❤️
                </p>
              </motion.div>
            )}
          </section>

          <section className="section future-section">
            <p className="eyebrow">THE NEXT CHAPTER</p>

            <h2>
              More food.
              <br />
              More travelling.
              <br />
              <span>More us.</span>
            </h2>

            <div className="future-track">
              <div className="future-point">
                <span>12.12.25</span>
                <i>♥</i>
                <small>WHERE WE STARTED</small>
              </div>

              <div className="future-road">
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.div>
              </div>

              <div className="future-point">
                <span>∞</span>
                <i>✦</i>
                <small>WHERE WE GO</small>
              </div>
            </div>

            <p className="future-text">
              I don't know exactly what every tomorrow will look like.
              <br />
              But I know I want more little moments with you.
            </p>
          </section>

          <section id="final" className="section final-section">
            {!finalReveal ? (
              <>
                <motion.div
                  className="final-heart"
                  animate={{
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                  }}
                >
                  ♥
                </motion.div>

                <p className="eyebrow">ONE LAST SURPRISE</p>

                <h2>
                  I saved
                  <br />
                  <span>something for you.</span>
                </h2>

                <p>
                  You've reached the end...
                  <br />
                  but maybe the best part is still hidden.
                </p>

                <button
                  className="main-button final-trigger"
                  onClick={revealFinal}
                >
                  REVEAL IT
                  <span>✦</span>
                </button>
              </>
            ) : (
              <motion.div
                className="ultimate-message"
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.2,
                }}
              >
                <div className="particle-ring">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        transform: `rotate(${i * 22.5}deg) translateY(-145px)`,
                      }}
                    >
                      {i % 3 === 0 ? "♥" : "✦"}
                    </motion.span>
                  ))}
                </div>

                <p className="eyebrow">12 · 12 · 2025 → ∞</p>

                <h2>
                  Happy
                  <br />
                  <span>Boyfriend Day,</span>
                  <br />
                  Cheeseball.
                </h2>

                <p className="ultimate-copy">
                  Thank you for being the person I can talk to,
                  <br />
                  eat with, travel with, laugh with,
                  <br />
                  annoy, and simply be happy with.
                </p>

                <div className="big-message">
                  <span>YOU ARE</span>
                  <strong>IMPORTANT</strong>
                  <span>TO ME.</span>
                  <b>♥</b>
                </div>

                <p className="final-line">
                  Out of all the people I could have met...
                  <br />
                  I'm really glad I met you.
                </p>

                <div className="signature">
                  Made especially for
                  <br />
                  <strong>Pratap — my Cheeseball ❤️</strong>
                </div>

                <div className="final-stars">
                  ✦　·　♥　·　✧　·　♥　·　✦
                </div>
              </motion.div>
            )}
          </section>

          <footer>
            <p>Made with love, memories & a little bit of code.</p>
            <span>♥</span>
            <p>Our little universe · 12.12.2025</p>
          </footer>
        </div>
      )}
    </div>
  );
}

function Counter({ value, label }) {
  return (
    <motion.div
      className="counter-box"
      whileHover={{
        y: -5,
        borderColor: "rgba(255,142,181,.35)",
      }}
    >
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </motion.div>
  );
}

export default App;