import { SurpriseDeck } from "@/components/SurpriseDeck";
import { StellarCanvas } from "@/components/StellarCanvas";
import styles from "./page.module.css";

const timelineStops = [
  {
    id: "sonic-lantern",
    tag: "T-47 MIN",
    title: "Sonic Lantern Emerges",
    description:
      "An abandoned lighthouse hums a chord that only future memories can hear. Tune in, hum back, and it will fold one impossible coincidence into your evening.",
  },
  {
    id: "cloud-sequencer",
    tag: "T-32 MIN",
    title: "Cloud Sequencer Sync",
    description:
      "Cumulonimbus verses drift across the city grid. Sketch the next verse on your wrist and the clouds will scroll it overhead at sunrise.",
  },
  {
    id: "orbit-tea",
    tag: "T-19 MIN",
    title: "Orbit Tea Ceremony",
    description:
      "Boil water under moonlight, drop in mint, and the steam will trace a glowing map to the nearest pocket universe worth visiting tonight.",
  },
  {
    id: "midnight-archive",
    tag: "T-5 MIN",
    title: "Midnight Archive Opens",
    description:
      "Pages from lives you almost lived begin to flutter at the edge of your screen. Choose one. The rest will gently haunt your playlists for a week.",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <StellarCanvas className={styles.canvas} />
      <div className={styles.gradientVeil} aria-hidden="true" />
      <main className={styles.main}>
        <section className={styles.hero}>
          <label htmlFor="surprise-deck">Tonight’s anomaly brief</label>
          <h1>Serendipity Observatory</h1>
          <p>
            Welcome to a pocket universe engineered to surprise you. Dip into
            shimmering micro-adventures, glitch the predictable, and let a
            curated cascade of cosmic side quests rewrite the rest of your day.
          </p>
          <div className={styles.heroHighlights}>
            <span>Real-time whimsy forecasts</span>
            <span>Algorithmic déjà vu</span>
            <span>Handcrafted impossible tasks</span>
          </div>
          <div className={styles.auroraStack}>
            <div className={styles.auroraCard}>
              <span>Signal Strength</span>
              <strong>91% chance of delightful detours</strong>
            </div>
            <div className={styles.auroraCard}>
              <span>Ambient Mood</span>
              <strong>Luminescent reverie with a hint of mischief</strong>
            </div>
            <div className={styles.auroraCard}>
              <span>Bonus Achievement</span>
              <strong>Unlock the secret chord hidden in tonight’s hum</strong>
            </div>
          </div>
        </section>

        <SurpriseDeck />

        <section className={styles.timeline} aria-labelledby="timeline-heading">
          <div className={styles.timelineHeader}>
            <h2 id="timeline-heading">Surprise Flightpath</h2>
            <p>
              Trace the breadcrumbs from curious whisper to cosmic crescendo.
              Each checkpoint whispers a choice. Follow them in order or throw
              the plan into stardust—it all loops back eventually.
            </p>
          </div>
          <div className={styles.timelineList}>
            {timelineStops.map((stop) => (
              <article key={stop.id} className={styles.timelineItem}>
                <div className={styles.stitch} aria-hidden />
                <div>
                  <span>{stop.tag}</span>
                  <strong>{stop.title}</strong>
                  <p>{stop.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.closing} aria-live="polite">
          <strong>Ready to bend probability?</strong>
          <p>
            Whisper your favorite word to the nearest cup of tea, then hit
            “Reveal Another Surprise” again. The Observatory listens. It also
            giggles.
          </p>
        </section>
      </main>
    </div>
  );
}
