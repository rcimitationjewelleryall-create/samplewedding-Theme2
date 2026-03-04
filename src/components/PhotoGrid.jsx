import { useState } from 'react';
import styles from './PhotoGrid.module.css';

function PhotoCard({ photo, index, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`${styles.card} ${photo.aspect_ratio < 0.85 ? styles.tall : ''}`}
      style={{ animationDelay: `${(index % 20) * 40}ms` }}
      onClick={() => onClick(photo)}
    >
      {!loaded && <div className={`${styles.skeletonPh} skeleton`} />}
      <img
        src={photo.thumbnail_url}
        alt={photo.file_name}
        className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
      />
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          {(photo.face_embeddings?.length ?? 0) > 0 && (
            <span className={styles.faceCount}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              {photo.face_embeddings.length}
            </span>
          )}
          <span className={styles.expandIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhotoGrid({ photos, onPhotoClick }) {
  if (photos.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <p>No photos match this filter combination.</p>
        <p className="muted" style={{ fontSize: '14px' }}>Try selecting All Events or Everyone</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.count} key={photos.length}>
        {photos.length} photo{photos.length !== 1 ? 's' : ''}
      </div>
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} onClick={onPhotoClick} />
        ))}
      </div>
    </div>
  );
}
