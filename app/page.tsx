"use client";

import { useMemo, useState } from "react";
import RarityRush from "./RarityRush";

const concepts = [
  { name: "Neon Nightrider", type: "Outfit", rarity: "Epic", icon: "⚡", color: "violet", description: "A night-runner with electric energy and a city-bright streak." },
  { name: "Cloud Crusher", type: "Pickaxe", rarity: "Rare", icon: "☁", color: "blue", description: "A sky-high harvesting tool built for making an entrance." },
  { name: "Pixel Pop", type: "Wrap", rarity: "Uncommon", icon: "✦", color: "green", description: "Arcade colour and a little bit of retro magic for every match." },
  { name: "Solar Scout", type: "Outfit", rarity: "Legendary", icon: "☀", color: "gold", description: "A fearless explorer ready to bring the sunshine wherever they land." },
];

const filters = ["All", "Outfit", "Pickaxe", "Wrap"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visibleConcepts = useMemo(() => concepts
    .map((concept, index) => ({ ...concept, index }))
    .filter((concept) => (filter === "All" || concept.type === filter)
      && `${concept.name} ${concept.type} ${concept.rarity}`.toLowerCase().includes(query.trim().toLowerCase())), [filter, query]);

  const activeConcept = concepts[selected];

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Fortnitello home"><span>F</span> FORTNITELLO</a>
        <div className={menuOpen ? "navlinks open" : "navlinks"}>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#game" onClick={() => setMenuOpen(false)}>Play</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#create" onClick={() => setMenuOpen(false)}>Create</a>
        </div>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>☰</button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">WELCOME TO THE DESIGN LAB</p>
          <h1>MAKE YOUR<br/><em>OWN LEGEND.</em></h1>
          <p className="intro">A creative home for awesome outfit, weapon and wrap ideas inspired by the Fortnite universe.</p>
          <div className="hero-actions"><a className="button primary" href="#gallery">Explore concepts <b aria-hidden="true">→</b></a><a className="text-link" href="#create">Start creating <span aria-hidden="true">↗</span></a></div>
          <p className="hero-note"><span aria-hidden="true">✦</span> FOUR IDEAS. INFINITE POSSIBILITIES.</p>
        </div>
        <div className="hero-art" role="img" aria-label="Original illustrated futuristic explorer in a neon helmet">
          <div className="orb orb-one"/><div className="orb orb-two"/><div className="spark s1" aria-hidden="true">✦</div><div className="spark s2" aria-hidden="true">✦</div>
          <div className="character" aria-hidden="true"><div className="head"/><div className="visor"/><div className="body"/><div className="arm left"/><div className="arm right"/><div className="leg left-leg"/><div className="leg right-leg"/></div>
          <p className="art-label">FIELD NOTES<br/><strong>NO. 001 — THE DREAMER</strong></p>
          <span className="art-stamp">IMAGINE<br/>MORE</span>
        </div>
      </section>

      <section className="ticker" aria-label="Explore creative ideas"><span>CREATIVE IDEAS</span><i>✦</i><span>OUTFITS</span><i>✦</i><span>PICKAXES</span><i>✦</i><span>WRAPS</span><i>✦</i><span>CREATIVE IDEAS</span></section>

      <section className="gallery section" id="gallery">
        <div className="section-heading"><div><p className="eyebrow">THE COLLECTION <span className="collection-count">/ 004</span></p><h2>FRESH FROM THE<br/><em>DESIGN VAULT.</em></h2></div><p>Big ideas, just off the drawing board. Pick a concept to see what makes it special.</p></div>
        <div className="gallery-tools">
          <div className="filter-list" role="group" aria-label="Filter concepts by type">
            {filters.map((item) => <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}
          </div>
          <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search concepts</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a concept" /></label>
        </div>
        <div className="cards" aria-live="polite">
          {visibleConcepts.map((item) => <button key={item.name} onClick={() => setSelected(item.index)} className={`concept-card ${item.color} ${selected === item.index ? "active" : ""}`} aria-pressed={selected === item.index}>
            <span className="card-number">0{item.index + 1} <span>—</span> {item.rarity}</span><span className="card-icon" aria-hidden="true">{item.icon}</span><div><small>{item.type}</small><h3>{item.name}</h3></div><span className="arrow" aria-hidden="true">↗</span>
          </button>)}
          {visibleConcepts.length === 0 && <p className="empty-state">No concepts found. Try another name or category.</p>}
        </div>
        <div className="concept-detail" aria-live="polite"><span className="detail-mark" aria-hidden="true">✦</span><div><span className="detail-kicker">NOW VIEWING · {activeConcept.type.toUpperCase()}</span><strong>{activeConcept.name}</strong><p>{activeConcept.description}</p></div><span className="detail-rarity">{activeConcept.rarity}</span></div>
      </section>

      <RarityRush />

      <section className="create" id="create"><div className="create-grid"><div><p className="eyebrow">YOUR TURN <span className="collection-count">/ TAKE THE PENCIL</span></p><h2>WHAT WILL YOU<br/><em>DESIGN NEXT?</em></h2><p>Dream up a new outfit, sketch an unstoppable pickaxe, or create a wrap that stands out on the Battle Bus.</p><a className="button primary" href="mailto:?subject=My%20Fortnitello%20Concept&body=My%20concept%20is%3A%20">Share an idea <b aria-hidden="true">→</b></a></div><div className="blueprint" aria-label="Blueprint placeholder for your next concept"><span>CONCEPT CARD <b>NO. ???</b></span><div className="plus" aria-hidden="true">+</div><p>YOUR AWESOME<br/>IDEA GOES HERE</p><small>SKETCH • COLOUR • NAME • BUILD</small><i className="blueprint-corner" aria-hidden="true">✳</i></div></div></section>

      <section className="about section" id="about"><div className="about-mark" aria-hidden="true">F.</div><div><p className="eyebrow">ABOUT FORTNITELLO</p><h2>A PLACE TO <em>IMAGINE,</em><br/>DRAW &amp; PLAY.</h2><p className="about-copy">Fortnitello is a young creator&apos;s design lab. It&apos;s all about big ideas, bold colours and making game-inspired concepts that are completely your own.</p><p className="about-note"><span>01</span> DREAM IT &nbsp; <span>02</span> SKETCH IT &nbsp; <span>03</span> MAKE IT YOURS</p></div></section>
      <footer><a className="brand" href="#top"><span>F</span> FORTNITELLO</a><p>Fan-made creative project. Fortnite is a trademark of Epic Games, Inc.</p><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
    </main>
  );
}
