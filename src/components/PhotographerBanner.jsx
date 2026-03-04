import { useState, useEffect, useRef } from 'react';
import styles from './PhotographerBanner.module.css';

/* ═══════════════════════════════════════════════════════════
   MUGHAL JALI ARCH FRAME
   ─ A decorative Mughal pointed arch outline in warm gold
   ─ Geometric lattice fills the top corners outside the arch
   ═══════════════════════════════════════════════════════════ */
const MughalFrame = () => (
  <svg
    viewBox="0 0 600 720"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.mughalFrame}
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      {/* Islamic 8-pointed star jali pattern */}
      <pattern id="jali" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        {/* Outer square */}
        <rect x="4" y="4" width="20" height="20" fill="none" stroke="#C9A06A" strokeWidth="0.55" opacity="0.65"/>
        {/* Rotated square to make 8-pointed star */}
        <rect x="4" y="4" width="20" height="20" fill="none" stroke="#C9A06A" strokeWidth="0.55" opacity="0.55"
              transform="rotate(45 14 14)"/>
        {/* Centre dot */}
        <circle cx="14" cy="14" r="1.2" fill="#C9A06A" opacity="0.5"/>
        {/* Corner mini-diamonds at tile edges */}
        <rect x="0" y="0" width="5" height="5" fill="none" stroke="#C9A06A" strokeWidth="0.4" opacity="0.35"
              transform="rotate(45 2.5 2.5)"/>
        <rect x="23" y="0" width="5" height="5" fill="none" stroke="#C9A06A" strokeWidth="0.4" opacity="0.35"
              transform="rotate(45 25.5 2.5)"/>
        <rect x="0" y="23" width="5" height="5" fill="none" stroke="#C9A06A" strokeWidth="0.4" opacity="0.35"
              transform="rotate(45 2.5 25.5)"/>
        <rect x="23" y="23" width="5" height="5" fill="none" stroke="#C9A06A" strokeWidth="0.4" opacity="0.35"
              transform="rotate(45 25.5 25.5)"/>
      </pattern>

      {/* Mask — only show jali in the CORNER areas outside the arch */}
      <mask id="jaliMask">
        <rect width="600" height="720" fill="white"/>
        {/* Clip out the interior arch area */}
        <path d="
          M 80,720
          L 80,360
          C 80,170 140,70 230,34
          Q 280,8  300,6
          Q 320,8  370,34
          C 460,70 520,170 520,360
          L 520,720 Z
        " fill="black"/>
      </mask>
    </defs>

    {/* Top jali fill (corners only, masked by arch) */}
    <rect width="600" height="280" fill="url(#jali)" mask="url(#jaliMask)" opacity="0.75"/>

    {/* ── OUTER ARCH BORDER ── */}
    <path
      d="
        M 62,720
        L 62,355
        C 62,152 128,54 222,18
        Q 272,0  300,0
        Q 328,0  378,18
        C 472,54 538,152 538,355
        L 538,720
      "
      fill="none"
      stroke="#C9A06A"
      strokeWidth="1.8"
      opacity="0.7"
    />

    {/* ── INNER ARCH BORDER (double-lined, slightly inset) ── */}
    <path
      d="
        M 80,720
        L 80,360
        C 80,170 140,72 228,36
        Q 276,14  300,12
        Q 324,14  372,36
        C 460,72 520,170 520,360
        L 520,720
      "
      fill="none"
      stroke="#C9A06A"
      strokeWidth="0.9"
      opacity="0.4"
    />

    {/* ── TOP APEX ORNAMENT ── */}
    <g transform="translate(300, 8)">
      {/* Central gold finial */}
      <ellipse cx="0" cy="0" rx="7" ry="10" fill="#C9A06A" opacity="0.9"/>
      <ellipse cx="0" cy="0" rx="4" ry="6"  fill="#FAF5EE" opacity="0.8"/>
      {/* Radiating petals */}
      {[0,36,72,108,144,180,216,252,288,324].map((a,i) => (
        <line key={i}
          x1="0" y1="0"
          x2={Math.sin(a*Math.PI/180)*16}
          y2={-Math.cos(a*Math.PI/180)*16}
          stroke="#C9A06A" strokeWidth="0.7" opacity="0.35"
        />
      ))}
    </g>

    {/* ── SPRING-POINT ORNAMENTS (where arch curves begin) ── */}
    {[62, 538].map((x, i) => (
      <g key={i} transform={`translate(${x}, 355)`}>
        <circle r="6" fill="#C9A06A" opacity="0.7"/>
        <circle r="3.5" fill="#FAF5EE" opacity="0.9"/>
      </g>
    ))}

    {/* ── HORIZONTAL BASE RULE (bottom of arch) ── */}
    <line x1="62" y1="720" x2="538" y2="720" stroke="#C9A06A" strokeWidth="1.2" opacity="0.4"/>

    {/* Small lotus-inspired ornament mid-way on left & right borders */}
    {[
      { x: 62,  y: 200 },
      { x: 538, y: 200 },
      { x: 62,  y: 540 },
      { x: 538, y: 540 },
    ].map((pt, i) => (
      <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
        <circle r="4" fill="#C9A06A" opacity="0.5"/>
        <circle r="2" fill="#FAF5EE" opacity="0.8"/>
      </g>
    ))}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   MUGHAL PAVILION SCENE
   ─ Illustrated architectural bottom scene inspired by
     the reference: balustrade · domes · trees · peacock
   ═══════════════════════════════════════════════════════════ */
const PavilionScene = () => (
  <svg
    viewBox="0 0 1200 230"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.pavilionScene}
    preserveAspectRatio="xMidYMax meet"
  >
    <defs>
      <linearGradient id="domeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#C5CDBB" stopOpacity="1"/>
        <stop offset="100%" stopColor="#9DAF90" stopOpacity="1"/>
      </linearGradient>
      <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#5A8A48"/>
        <stop offset="100%" stopColor="#3D6B30"/>
      </linearGradient>
      <linearGradient id="peaBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#1E6080"/>
        <stop offset="100%" stopColor="#1A4A5E"/>
      </linearGradient>
      <linearGradient id="peaNeck" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="#1A7A6E"/>
        <stop offset="100%" stopColor="#20A080"/>
      </linearGradient>
      <linearGradient id="peaTail" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#2D6E40"/>
        <stop offset="60%"  stopColor="#1A5C30"/>
        <stop offset="100%" stopColor="#114422"/>
      </linearGradient>
    </defs>

    {/* ─── FULL-WIDTH BALUSTRADE ─── */}
    {/* Top rail */}
    <rect x="0" y="188" width="1200" height="7" rx="3.5" fill="#D8D0BA"/>
    {/* Bottom rail */}
    <rect x="0" y="215" width="1200" height="8" rx="4"   fill="#D0C8B2"/>
    {/* Balusters — repeating vase-shaped pillars */}
    {Array.from({ length: 48 }, (_, i) => i * 25 + 5).map((x, i) => (
      <g key={i} transform={`translate(${x}, 194)`}>
        {/* Vase-shaped baluster */}
        <ellipse cx="7" cy="4"  rx="5"   ry="3"   fill="#DDD5BE"/>
        <rect    x="4"  y="4"   width="6" height="10" rx="1" fill="#D8CFB8"/>
        <ellipse cx="7" cy="14" rx="6"   ry="3.5" fill="#D0C8B0"/>
      </g>
    ))}

    {/* ─── LEFT TROPICAL TREES ─── */}
    {/* Background palm */}
    <g transform="translate(38, 20)">
      <line x1="0" y1="170" x2="-4" y2="60" stroke="#6B5A3A" strokeWidth="5" strokeLinecap="round"/>
      {[-50,-30,-10,10,30,50].map((dx, i) => (
        <path key={i}
          d={`M -4,${60 + i*4} Q ${dx/2},${30 + i*4} ${dx},${20 + i*3}`}
          fill="none" stroke={i>2?"#5A8A48":"#4A7A38"} strokeWidth={i>2?10:8}
          strokeLinecap="round" opacity="0.85"
        />
      ))}
    </g>
    {/* Front lush tree */}
    <g transform="translate(100, 10)">
      <line x1="0" y1="178" x2="2" y2="70" stroke="#5A4A2E" strokeWidth="6" strokeLinecap="round"/>
      {[-55,-35,-15,5,28,50].map((dx, i) => (
        <path key={i}
          d={`M 2,${70 + i*3} Q ${dx/2+2},${40 + i*3} ${dx+2},${22 + i*2}`}
          fill="none" stroke={i<3?"#4A7A38":"#6AAF50"} strokeWidth={i<3?12:9}
          strokeLinecap="round" opacity={0.9 - i*0.05}
        />
      ))}
      {/* Small parakeet on tree */}
      <ellipse cx="-28" cy="55" rx="6" ry="4" fill="#50B870" transform="rotate(-20,-28,55)"/>
      <circle  cx="-25" cy="52" r="3.5"       fill="#3A9050"/>
      <path    d="M -22,52 L -18,51" stroke="#C9A06A" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
    {/* Small bush / shrubs at base */}
    <ellipse cx="60"  cy="193" rx="40" ry="18" fill="#5A8A48" opacity="0.7"/>
    <ellipse cx="130" cy="195" rx="30" ry="14" fill="#6AAF50" opacity="0.6"/>
    {/* Flowers */}
    {[[55,190,'#E8B4A0'],[75,192,'#F0C8B0'],[40,194,'#D4A0C4']].map(([x,y,c],i) => (
      <circle key={i} cx={x} cy={y} r="5" fill={c} opacity="0.85"/>
    ))}

    {/* ─── LEFT CHATRI (smaller pavilion) ─── */}
    <g transform="translate(240, 60)">
      {/* Dome */}
      <ellipse cx="55" cy="52" rx="42" ry="14" fill="url(#domeGrad)" opacity="0.9"/>
      <path d="M 13,52 Q 55,4 97,52" fill="url(#domeGrad)"/>
      {/* Finial */}
      <line x1="55" y1="4" x2="55" y2="-14" stroke="#C9A06A" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="55" cy="-16" rx="5" ry="7" fill="#C9A06A"/>
      {/* Decorative band on dome */}
      <path d="M 22,42 Q 55,32 88,42" fill="none" stroke="#C9A06A" strokeWidth="1.2" opacity="0.6"/>
      {/* Scalloped arch band */}
      <path d="M 13,52 Q 24,44 35,52 Q 46,44 55,52 Q 64,44 75,52 Q 86,44 97,52"
            fill="none" stroke="#B0A898" strokeWidth="1" opacity="0.8"/>
      {/* Pillars */}
      {[16, 36, 74, 94].map((x, i) => (
        <g key={i}>
          <rect x={x} y="52" width="7" height="70" rx="3" fill="#D8D0BA"/>
          <ellipse cx={x+3.5} cy="52"  rx="5" ry="3"   fill="#C8C0A8"/>
          <ellipse cx={x+3.5} cy="122" rx="6" ry="3.5" fill="#D0C8B0"/>
        </g>
      ))}
      {/* Floor platform */}
      <rect x="10" y="122" width="90" height="8" rx="3" fill="#D0C8B0"/>
    </g>

    {/* ─── CENTRE / MAIN CHATRI (larger) ─── */}
    <g transform="translate(600, 20)">
      {/* Dome — larger */}
      <ellipse cx="90" cy="80" rx="70" ry="20"  fill="url(#domeGrad)" opacity="0.92"/>
      <path d="M 20,80 Q 90,8 160,80"           fill="url(#domeGrad)"/>
      {/* Top finial */}
      <line x1="90" y1="8" x2="90" y2="-20"    stroke="#C9A06A" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="90" cy="-23" rx="7" ry="10"  fill="#C9A06A"/>
      <ellipse cx="90" cy="-23" rx="3.5" ry="5" fill="#FAF5EE" opacity="0.8"/>
      {/* Dome decorative band */}
      <path d="M 32,65 Q 90,50 148,65" fill="none" stroke="#C9A06A" strokeWidth="1.5" opacity="0.55"/>
      {/* Scalloped arch edging */}
      <path d="M 20,80 Q 35,70 50,80 Q 65,70 80,80 Q 90,70 100,80 Q 115,70 130,80 Q 145,70 160,80"
            fill="none" stroke="#B0A89A" strokeWidth="1.2" opacity="0.9"/>
      {/* Pillars */}
      {[22, 50, 80, 110, 136, 158].map((x, i) => (
        <g key={i}>
          <rect x={x} y="80" width="8" height="95" rx="3.5" fill="#D8D0BA"/>
          <ellipse cx={x+4} cy="80"  rx="6.5" ry="4"  fill="#C8C0A8"/>
          <ellipse cx={x+4} cy="175" rx="8"   ry="5"  fill="#D0C8B0"/>
          {/* Capital scroll */}
          <path d={`M ${x-2},80 Q ${x+4},74 ${x+10},80`} fill="none" stroke="#C9A06A" strokeWidth="1" opacity="0.5"/>
        </g>
      ))}
      {/* Floor */}
      <rect x="18" y="175" width="144" height="10" rx="4" fill="#D0C8B0"/>
      {/* Steps */}
      <rect x="25" y="185" width="130" height="5"  rx="2" fill="#C8C0A8"/>
    </g>

    {/* ─── CONNECTING GARDEN WALL ─── */}
    <rect x="230" y="160" width="120" height="28" rx="3" fill="#D8D0BA" opacity="0.7"/>
    <rect x="740" y="160" width="80"  height="28" rx="3" fill="#D8D0BA" opacity="0.7"/>

    {/* ─── RIGHT PEACOCK ─── */}
    <g transform="translate(870, 58)">
      {/* Tail train — swept back, layered feathers */}
      <path d="M 40,90 Q 0,80 -50,75 Q -90,72 -130,78 Q -160,84 -170,100"
            fill="url(#peaTail)" opacity="0.9"/>
      <path d="M 40,90 Q 5,75 -45,68 Q -90,63 -130,68 Q -160,72 -172,88"
            fill="#1A5C30" opacity="0.6"/>
      <path d="M 40,90 Q 10,70 -38,60 Q -85,52 -125,56 Q -155,58 -168,72"
            fill="#2D6E40" opacity="0.4"/>
      {/* Feather eye spots on tail */}
      {[[-60,78],[-100,72],[-135,80],[-75,63],[-110,58]].map(([tx,ty],i) => (
        <g key={i}>
          <ellipse cx={tx} cy={ty} rx="7" ry="5" fill="#1E6080" opacity="0.8" transform={`rotate(-10 ${tx} ${ty})`}/>
          <ellipse cx={tx} cy={ty} rx="4" ry="3" fill="#4A90B0" opacity="0.7" transform={`rotate(-10 ${tx} ${ty})`}/>
          <ellipse cx={tx} cy={ty} rx="2" ry="1.5" fill="#D4AF37" opacity="0.9" transform={`rotate(-10 ${tx} ${ty})`}/>
        </g>
      ))}
      {/* Body */}
      <ellipse cx="55" cy="95" rx="36" ry="28" fill="url(#peaBody)"/>
      {/* Wing detail */}
      <path d="M 30,80 Q 60,68 88,80 Q 60,76 30,80" fill="#1A4870" opacity="0.6"/>
      {/* Chest */}
      <ellipse cx="65" cy="100" rx="18" ry="14" fill="#164060" opacity="0.5"/>
      {/* Neck — long, graceful */}
      <path d="M 60,75 Q 55,55 58,38 Q 62,22 70,14"
            stroke="url(#peaNeck)" strokeWidth="12" fill="none" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="72" cy="12" r="12" fill="#1A6E60"/>
      {/* Crown — crest of golden dots on stems */}
      {[[-8,-10],[-5,-14],[0,-16],[5,-14],[8,-10]].map(([dx,dy],i) => (
        <g key={i}>
          <line x1={72+dx*0.5} y1={12} x2={72+dx} y2={12+dy}
                stroke="#2A8870" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
          <circle cx={72+dx} cy={12+dy} r="2.5" fill="#D4AF37"/>
        </g>
      ))}
      {/* Beak */}
      <path d="M 82,10 L 95,8 L 82,14 Z" fill="#C9A06A"/>
      {/* Eye */}
      <circle cx="79" cy="9"  r="4"   fill="#EEE"/>
      <circle cx="80" cy="9"  r="2.5" fill="#1A1A1A"/>
      <circle cx="80.8" cy="8.2" r="0.8" fill="#fff"/>
      {/* Legs */}
      <line x1="48" y1="120" x2="44" y2="152" stroke="#8B7050" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="62" y1="122" x2="66" y2="152" stroke="#8B7050" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Feet */}
      <path d="M 44,152 L 34,156 M 44,152 L 40,158 M 44,152 L 48,157"
            stroke="#8B7050" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 66,152 L 74,156 M 66,152 L 70,158 M 66,152 L 62,157"
            stroke="#8B7050" strokeWidth="2" strokeLinecap="round"/>
    </g>

    {/* ─── RIGHT SMALL TREE ─── */}
    <g transform="translate(1050, 30)">
      <line x1="0" y1="168" x2="-2" y2="78" stroke="#5A4A2E" strokeWidth="4" strokeLinecap="round"/>
      {[-40,-22,-4,14,32].map((dx, i) => (
        <path key={i}
          d={`M -2,${78+i*5} Q ${dx/2-2},${50+i*4} ${dx-2},${30+i*3}`}
          fill="none" stroke="#5A8A48" strokeWidth="8"
          strokeLinecap="round" opacity={0.85-i*0.08}
        />
      ))}
    </g>

    {/* Ground foliage at base */}
    <ellipse cx="185" cy="196" rx="35" ry="10" fill="#6AAF50" opacity="0.55"/>
    <ellipse cx="970" cy="196" rx="30" ry="9"  fill="#5A8A48" opacity="0.5"/>
    {/* Scattered flowers */}
    {[[165,193,'#F0C0A8'],[205,195,'#E8B4C4'],[185,191,'#FFF0D8']].map(([x,y,c],i)=>(
      <circle key={i} cx={x} cy={y} r="4.5" fill={c} opacity="0.8"/>
    ))}
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function PhotographerBanner({ photographer, gallery }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waNumber = (photographer.whatsapp || photographer.phone || '').replace(/\D/g, '');
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Namaste! I saw the ${gallery.title} gallery and would love to book you!`)}`
    : '#';

  const groom = gallery.groom_name || 'Groom';
  const bride = gallery.bride_name  || 'Bride';

  const bgShift  = scrollY * 0.30;
  const midShift = scrollY * 0.15;
  const fgShift  = scrollY * 0.07;

  return (
    <>
      {/* ── STICKY NAV ── */}
      <header
        className={styles.navbar}
        style={{ opacity: Math.max(0.15, 1 - scrollY / 280) }}
      >
        <div className={styles.navInner}>
          <div className={styles.brand}>
            {photographer.logo_url
              ? <img src={photographer.logo_url} alt="logo" className={styles.logo}/>
              : <span className={`${styles.logoInitial} serif`}>{photographer.name[0]}</span>
            }
            <span className={styles.brandName}>{photographer.name}</span>
          </div>
          <div className={styles.navLinks}>
            {photographer.instagram && (
              <a href={photographer.instagram} target="_blank" rel="noreferrer" className={styles.socialLink} title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            )}
            <a href={waLink} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Hire Us
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className={styles.hero}>

        {/* BG — warm ivory with marble blush */}
        <div className={styles.layerBg} style={{ transform: `translateY(${bgShift}px)` }}/>

        {/* Mughal arch frame (parallax medium) */}
        <div className={styles.archWrap} style={{ transform: `translateY(${midShift}px)` }}>
          <MughalFrame />
        </div>

        {/* Centre text (slowest parallax) */}
        <div className={styles.content} style={{ transform: `translateY(${fgShift}px)` }}>
          {/* Flourish top */}
          <div className={styles.flourish}>
            <span className={styles.line}/>
            <span className={styles.diamond}>◆</span>
            <span className={styles.line}/>
          </div>

          <p className={styles.presents}>
            <span className={styles.presentsStudio}>{photographer.name}</span>
            &ensp;Presents
          </p>

          <h1 className={`${styles.coupleNames} serif`}>
            <span className={styles.groom}>{groom}</span>
            <span className={`${styles.weds} serif`}>weds</span>
            <span className={styles.bride}>{bride}</span>
          </h1>

          {/* Flourish bottom */}
          <div className={styles.flourish} style={{ marginTop: '4px' }}>
            <span className={styles.line}/>
            <span className={styles.lotus}>✿</span>
            <span className={styles.line}/>
          </div>

          <p className={styles.eventName}>
            {gallery.title.charAt(0).toUpperCase() + gallery.title.slice(1)}
          </p>
          <p className={styles.eventDate}>
            {new Date(gallery.event_date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
            &ensp;·&ensp;{gallery.total_photos} Moments
          </p>

          <div className={styles.ctas}>
            <a href={waLink} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              {photographer.cta_text || 'Hire Us'}
            </a>
            <button
              className={styles.secondaryBtn}
              onClick={() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Gallery ↓
            </button>
          </div>
        </div>

        {/* Pavilion scene — pinned to bottom */}
        <div className={styles.sceneWrap} style={{ transform: `translateY(${bgShift * 0.3}px)` }}>
          <PavilionScene />
        </div>
      </section>
    </>
  );
}
