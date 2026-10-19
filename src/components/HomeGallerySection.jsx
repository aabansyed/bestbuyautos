import { useState, useEffect } from "react";
import { fetchPublicGalleryPhotos } from "../lib/galleryApi";
import "../styles/gallery.css";

const INITIAL_COUNT = 10;

export default function HomeGallerySection() {
  const [photos, setPhotos] = useState(null); // null = loading
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [revealFrom, setRevealFrom] = useState(0);

  useEffect(() => {
    fetchPublicGalleryPhotos().then(setPhotos).catch(() => setPhotos([]));
  }, []);

  // Nothing to show and we're sure of it — don't render a broken/empty section.
  if (photos && photos.length === 0) return null;

  const visible = photos ? photos.slice(0, visibleCount) : [];
  const hasMore = photos && visibleCount < photos.length;

  const handleLoadMore = () => {
    setRevealFrom(visibleCount);
    setVisibleCount(photos.length);
  };

  return (
    <section id="gallery">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">Real Customers, Real Cars</div>
          <h2 className="section-title">User Photo <span className="gold">Gallery</span></h2>
          <div className="gold-line"></div>
          <p className="section-desc" style={{ marginTop: "16px" }}>
            Delivery-day moments shared by our customers around the world
          </p>
        </div>

        <div className="gallery-grid">
          {photos === null &&
            Array.from({ length: INITIAL_COUNT }).map((_, i) => (
              <div className="gallery-skeleton" key={i} aria-hidden="true"></div>
            ))}

          {visible.map((photo, i) => (
            <div
              className={"gallery-item" + (i >= revealFrom && i >= INITIAL_COUNT ? " gallery-item-enter" : "")}
              style={i >= revealFrom ? { animationDelay: `${(i - revealFrom) * 45}ms` } : undefined}
              key={photo.id}
            >
              <img
                src={photo.image_url}
                alt={photo.caption || "BestBuy Auto customer with their car"}
                width="600"
                height="600"
                loading="lazy"
              />
              {photo.caption && <div className="gallery-caption">{photo.caption}</div>}
            </div>
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "34px" }}>
            <button type="button" className="btn-outline" onClick={handleLoadMore}>
              <i className="fas fa-images" aria-hidden="true"></i> Load More Photos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}