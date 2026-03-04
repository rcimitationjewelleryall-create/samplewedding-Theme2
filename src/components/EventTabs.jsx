import styles from './EventTabs.module.css';

export default function EventTabs({ sections, activeSection, onSelect }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {/* "All" tab */}
        <button
          className={`${styles.tab} ${!activeSection ? styles.active : ''}`}
          onClick={() => onSelect(null)}
        >
          <span className={styles.icon}>🎞</span>
          <span>All Events</span>
          <span className={styles.badge}>
            {sections.reduce((s, sec) => s + sec.photo_count, 0)}
          </span>
        </button>

        {sections.map((sec) => (
          <button
            key={sec.id}
            className={`${styles.tab} ${activeSection === sec.id ? styles.active : ''}`}
            onClick={() => onSelect(sec.id)}
          >
            <span className={styles.icon}>{sec.icon}</span>
            <span>{sec.label}</span>
            {sec.time_start && (
              <span className={styles.time}>{sec.time_start}–{sec.time_end}</span>
            )}
            <span className={styles.badge}>{sec.photo_count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
