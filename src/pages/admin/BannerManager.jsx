import { useEffect, useState } from "react";
import {
  fetchAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  reorderSlides,
  uploadSlideImage,
} from "../../lib/bannerApi";

export default function BannerManager() {
  const [slides, setSlides] = useState(null);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [dirty, setDirty] = useState({});

  const load = async () => {
    try {
      setSlides(await fetchAllSlides());
    } catch (err) {
      setError(err.message || "Failed to load slides.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const editField = (id, field) => (e) => {
    const value = e.target.value;
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    setDirty((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = async (slide) => {
    setBusyId(slide.id);
    try {
      await updateSlide(slide.id, {
        image_url: slide.image_url,
        title: slide.title,
        subtitle: slide.subtitle,
      });
      setDirty((prev) => ({ ...prev, [slide.id]: false }));
    } catch (err) {
      alert(err.message || "Failed to save.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (slide) => {
    if (!window.confirm(`Delete slide "${slide.title}"?`)) return;
    setBusyId(slide.id);
    try {
      await deleteSlide(slide.id);
      setSlides((prev) => prev.filter((s) => s.id !== slide.id));
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdd = async () => {
    try {
      const nextOrder = slides.length ? Math.max(...slides.map((s) => s.display_order)) + 1 : 0;
      const created = await createSlide(nextOrder);
      setSlides((prev) => [...prev, created]);
    } catch (err) {
      alert(err.message || "Failed to add slide.");
    }
  };

  const handleImageUpload = async (slide, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(slide.id);
    try {
      const url = await uploadSlideImage(file);
      setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, image_url: url } : s)));
      await updateSlide(slide.id, { image_url: url });
      setDirty((prev) => ({ ...prev, [slide.id]: false }));
    } catch (err) {
      alert(err.message || "Image upload failed.");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const move = async (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= slides.length) return;
    const next = [...slides];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setSlides(next);
    try {
      await reorderSlides(next);
    } catch (err) {
      alert(err.message || "Failed to reorder.");
      load();
    }
  };

  if (!slides) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Hero Banner</h1>
          <p className="admin-page-sub">Slides shown at the top of the homepage, in this order.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleAdd}>
          <i className="fas fa-circle-plus"></i> Add Slide
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {slides.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-images"></i>
          <p>No slides yet — add your first one.</p>
        </div>
      )}

      <div className="faq-admin-list">
        {slides.map((slide, i) => (
          <div className="faq-admin-card" key={slide.id}>
            <div className="faq-admin-order">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up">
                <i className="fas fa-chevron-up"></i>
              </button>
              <span>{i + 1}</span>
              <button type="button" onClick={() => move(i, 1)} disabled={i === slides.length - 1} title="Move down">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>

            <div className="banner-admin-preview">
              {slide.image_url ? (
                <img src={slide.image_url} alt={slide.title} />
              ) : (
                <div className="banner-admin-preview-empty"><i className="fas fa-image"></i></div>
              )}
              <label className="admin-btn-secondary banner-upload-btn">
                {uploadingId === slide.id ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
                {uploadingId === slide.id ? "Uploading…" : "Change Image"}
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(slide, e)} disabled={uploadingId === slide.id} />
              </label>
            </div>

            <div className="faq-admin-fields">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" value={slide.title} onChange={editField(slide.id, "title")} placeholder="2024 Ferrari Roma" />
              </div>
              <div className="form-group">
                <label className="form-label">Subtitle</label>
                <input className="form-input" value={slide.subtitle} onChange={editField(slide.id, "subtitle")} placeholder="Italian craftsmanship at its finest" />
              </div>
            </div>

            <div className="faq-admin-actions">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => handleSave(slide)}
                disabled={busyId === slide.id || !dirty[slide.id]}
              >
                <i className="fas fa-save"></i> {dirty[slide.id] ? "Save" : "Saved"}
              </button>
              <button
                type="button"
                className="admin-icon-btn danger"
                onClick={() => handleDelete(slide)}
                disabled={busyId === slide.id}
                title="Delete"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}