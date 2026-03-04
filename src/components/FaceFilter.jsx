import { useState, useRef } from 'react';
import styles from './FaceFilter.module.css';

export default function FaceFilter({ faces, activeFace, onSelect }) {
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef(null);

  const mouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const mouseLeave = () => setDragging(false);
  const mouseUp    = () => setDragging(false);
  const mouseMove  = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${styles.title} serif`}>
          <span className="gold">✦</span> Your Photos
        </h2>
        <p className={styles.sub}>Tap a face to see only your photos</p>
      </div>

      <div
        className={styles.track}
        ref={trackRef}
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        {/* ALL button */}
        <button
          className={`${styles.faceCard} ${!activeFace ? styles.active : ''}`}
          onClick={() => onSelect(null)}
        >
          <div className={styles.avatar}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className={styles.label}>Everyone</span>
          <span className={styles.count}>All</span>
        </button>

        {faces.map((face) => (
          <button
            key={face.face_id}
            className={`${styles.faceCard} ${activeFace === face.face_id ? styles.active : ''}`}
            onClick={() => onSelect(face.face_id)}
          >
            <div className={styles.avatar}>
              {face.thumbnail_base64
                ? <img src={face.thumbnail_base64} alt={face.display_name} className={styles.faceImg} />
                : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
              }
            </div>
            <span className={styles.label}>{face.display_name}</span>
            <span className={styles.count}>{face.photo_count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
