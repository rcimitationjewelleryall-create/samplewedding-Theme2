import { useState, useMemo } from 'react';
import galleryData from './data.json';
import PhotographerBanner from './components/PhotographerBanner';
import SelfieFilter from './components/SelfieFilter';
import EventTabs from './components/EventTabs';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const { gallery, photographer, event_sections, photos } = galleryData;

  // ── FILTERS ────────────────────────────────────────────────
  // selfieMatchIds: null = no filter, [] = no matches, [id,...] = matched
  const [selfieMatchIds, setSelfieMatchIds] = useState(null);
  const [activeSection,  setActiveSection]  = useState(null);
  const [lightboxPhoto,  setLightboxPhoto]  = useState(null);

  // ── FILTER LOGIC ───────────────────────────────────────────
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchSelfie  = !selfieMatchIds || selfieMatchIds.includes(photo.id);
      const matchSection = !activeSection  || photo.event_section === activeSection;
      return matchSelfie && matchSection;
    });
  }, [selfieMatchIds, activeSection, photos]);

  // ── HANDLERS ───────────────────────────────────────────────
  const handleSelfieResult = (ids) => setSelfieMatchIds(ids);

  const handlePhotoClick   = (photo) => setLightboxPhoto(photo);
  const handleLightboxClose = ()     => setLightboxPhoto(null);
  const handleLightboxNav   = (photo) => setLightboxPhoto(photo);

  const scrollToGallery = () =>
    document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });

  // Is selfie filter active (user uploaded a selfie)
  const selfieActive = selfieMatchIds !== null;

  return (
    <>
      <PhotographerBanner
        photographer={photographer}
        gallery={gallery}
        onYourPhotos={scrollToGallery}
      />

      <main id="gallery-section">

        {/* ── Selfie "Find My Photos" filter ── */}
        <SelfieFilter
          allPhotos={photos}
          onResult={handleSelfieResult}
          isActive={selfieActive}
          matchCount={selfieMatchIds?.length ?? 0}
        />

        {/* ── Sub-event tabs ── */}
        <EventTabs
          sections={event_sections}
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        {/* ── Active filter pill summary ── */}
        {activeSection && (
          <div style={{
            maxWidth: '1400px', margin: '0 auto', padding: '0 32px 20px',
            display: 'flex', gap: '10px', flexWrap: 'wrap'
          }}>
            <ActiveTag
              label={event_sections.find(s => s.id === activeSection)?.label || activeSection}
              onRemove={() => setActiveSection(null)}
            />
          </div>
        )}

        {/* ── Photo grid ── */}
        <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      </main>

      <Footer photographer={photographer} gallery={gallery} />

      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          photos={filteredPhotos}
          onClose={handleLightboxClose}
          onNav={handleLightboxNav}
        />
      )}
    </>
  );
}

/* ── ACTIVE FILTER TAG ────────────────────────────────────── */
function ActiveTag({ label, onRemove }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px',
      background: 'rgba(139,107,67,0.08)',
      border: '1px solid rgba(139,107,67,0.28)',
      borderRadius: '100px',
      fontSize: '13px',
      color: '#8B6B47',
    }}>
      {label}
      <button
        onClick={onRemove}
        style={{ color: 'rgba(139,107,67,0.5)', lineHeight: 1, fontSize: '16px' }}
        aria-label={`Remove ${label} filter`}
      >×</button>
    </div>
  );
}