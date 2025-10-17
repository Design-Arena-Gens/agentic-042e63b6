"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./SurpriseDeck.module.css";

type SurpriseCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  bulletPoints: string[];
  ritual: string;
  palette: [string, string];
};

const hexToRgb = (hex: string): string => {
  const raw = hex.replace("#", "");
  const normalized =
    raw.length === 3
      ? raw
          .split("")
          .map((char) => char + char)
          .join("")
      : raw.padEnd(6, "0");
  const bigint = Number.parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

const surpriseCards: SurpriseCard[] = [
  {
    id: "skyline-postcard",
    category: "Flash Quest",
    title: "Draft a skyline postcard for someone you just met today.",
    description:
      "Borrow their favourite syllable, fold it into a skyline you invent on the spot, and write a line about a future you both might visit.",
    bulletPoints: [
      "End the note with a constellation you rename on their behalf.",
      "Seal the postcard with something blue within arm’s reach.",
      "Snap a photo of the postcard using the slowest shutter you own — a blink counts.",
    ],
    ritual:
      "Leave the postcard on a windowsill that faces east. If it slides off before sunrise, the message was received in another timeline.",
    palette: ["#48d7ff", "#bd34fe"],
  },
  {
    id: "echo-recipe",
    category: "Acoustic Alchemy",
    title: "Cook a recipe you’ve never tasted by humming the instructions.",
    description:
      "Hum one note for each ingredient. Pitch it higher if you improvise. The kitchen will reply with feedback, like a choir of spices.",
    bulletPoints: [
      "Use the resonance of your fridge door as the metronome.",
      "Let the loudest pot choose the seasoning.",
      "When plating, whisper a compliment to the steam.",
    ],
    ritual:
      "Serve the dish to an empty chair and take the first bite for it. If the chair creaks, that’s a grateful nod from the void.",
    palette: ["#ffce4f", "#ff78dc"],
  },
  {
    id: "lunar-graffiti",
    category: "Analog Glitch",
    title: "Paint lunar graffiti with a pocket flashlight and a long exposure.",
    description:
      "Trace impossible shapes mid-air. Record the streaks, and in the inverted glow you’ll glimpse the word your week needs.",
    bulletPoints: [
      "Draw the outline of a door no one expects.",
      "Wave the light through a glass of water for ripple scripts.",
      "End with a signature made of three quick spirals.",
    ],
    ritual:
      "Project the photo on a ceiling tonight. Sleep beneath it and take note of the first dream that doesn’t belong to you.",
    palette: ["#8fffdd", "#6f7bff"],
  },
  {
    id: "time-capsule-broadcast",
    category: "Temporal Broadcast",
    title: "Leave a voice memo for yourself exactly five years ahead.",
    description:
      "Speak in the present tense about victories that haven’t happened yet. Assume they’re listening, because of course they are.",
    bulletPoints: [
      "Record near running water for built-in shimmer.",
      "Mention the weather using a colour, not a temperature.",
      "Sign off with a secret you promise to keep for both of you.",
    ],
    ritual:
      "Schedule the memo to replay on the next leap day. Every time you forget about it, the signal grows clearer.",
    palette: ["#56f3ff", "#b894ff"],
  },
  {
    id: "stray-orbit",
    category: "Serendipity Fieldwork",
    title: "Let a coin flip decide which stranger you compliment first.",
    description:
      "Heads: someone wearing circles. Tails: someone carrying a rectangle. Compliment something they didn’t choose.",
    bulletPoints: [
      "Pair the compliment with a question that sounds like a lyric.",
      "Keep a tally of smiles versus puzzled head tilts.",
      "Tie the coin to a ribbon once you’re done. Hang it from your door knob.",
    ],
    ritual:
      "Carry the ribboned coin tomorrow. If it knots itself, you owe the universe a second compliment mission.",
    palette: ["#ffa23c", "#ff7ab0"],
  },
  {
    id: "library-wormhole",
    category: "Portal Maintenance",
    title: "Open a library book to the first sentence you’d tattoo.",
    description:
      "Copy it backwards, then read it aloud right-to-left. Somewhere, a librarian updates the cosmic card catalogue in your name.",
    bulletPoints: [
      "Add a doodle in the margins made of three geometric shapes.",
      "Replace one noun with a sound effect that makes you grin.",
      "Leave a sticky note predicting who finds the page next.",
    ],
    ritual:
      "Reshelve the book in the wrong section with intent. If it reappears in its proper place by next week, destiny needed it too.",
    palette: ["#48d7ff", "#94ffda"],
  },
];

const cardMap = new Map(surpriseCards.map((card) => [card.id, card]));

const randomCard = (excludeId?: string) => {
  const available = excludeId
    ? surpriseCards.filter((card) => card.id !== excludeId)
    : surpriseCards;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
};

export function SurpriseDeck() {
  const [activeCardId, setActiveCardId] = useState(() => randomCard().id);
  const [echoIds, setEchoIds] = useState<string[]>([]);
  const [isRippling, setIsRippling] = useState(false);

  const activeCard = useMemo(
    () => cardMap.get(activeCardId) ?? surpriseCards[0],
    [activeCardId],
  );

  const revealNext = useCallback(() => {
    setIsRippling(true);
    const nextCard = randomCard(activeCardId);
    setActiveCardId(nextCard.id);
    setEchoIds((prev) => {
      const historySeed = prev.filter((id) => id !== activeCardId);
      return [activeCardId, ...historySeed].slice(0, 4);
    });
  }, [activeCardId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsRippling(true);
      setActiveCardId((current) => {
        const next = randomCard(current);
        return next.id;
      });
      setEchoIds((prev) => {
        const candidate = prev.includes(activeCardId)
          ? prev
          : [activeCardId, ...prev];
        return candidate.slice(0, 4);
      });
    }, 24000);

    return () => window.clearInterval(timer);
  }, [activeCardId]);

  useEffect(() => {
    if (!isRippling) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsRippling(false), 420);
    return () => window.clearTimeout(timeout);
  }, [isRippling]);

  const accentStyle = useMemo(() => {
    const [primary, secondary] = activeCard.palette;
    return {
      "--accent-primary": primary,
      "--accent-secondary": secondary,
      "--accent-primary-rgb": hexToRgb(primary),
      "--accent-secondary-rgb": hexToRgb(secondary),
    } as CSSProperties;
  }, [activeCard]);

  return (
    <section
      id="surprise-deck"
      className={styles.deck}
      aria-live="polite"
      aria-label="Surprise generator"
    >
      <div
        className={`${styles.card} ${isRippling ? styles.ripple : ""}`}
        style={accentStyle}
      >
        <span className={styles.category}>{activeCard.category}</span>
        <h2>{activeCard.title}</h2>
        <p className={styles.description}>{activeCard.description}</p>
        <ul className={styles.list}>
          {activeCard.bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className={styles.ritual}>
          <span>Micro-Ritual</span>
          <p>{activeCard.ritual}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={revealNext}
          className={styles.button}
          aria-label="Reveal another surprise"
        >
          Reveal another surprise
        </button>
        <p className={styles.caption}>
          Keep pressing when the world feels too predictable. Cascading coincidences thrive on persistence.
        </p>
      </div>
      {echoIds.length > 0 && (
        <div className={styles.echoes}>
          <h3>Echo Log</h3>
          <ol className={styles.echoList}>
            {echoIds.map((id) => {
              const card = cardMap.get(id);
              if (!card) return null;
              return (
                <li key={card.id}>
                  <span>{card.title}</span>
                  <span className={styles.echoCategory}>{card.category}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}
