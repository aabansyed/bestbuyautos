import { useEffect, useRef, useState } from "react";
import {
  fetchAllGalleryPhotos, uploadGalleryImage, createGalleryPhoto,
  updateGalleryPhoto, deleteGalleryPhoto, reorderGalleryPhotos,
} from "../../lib/galleryApi";

export default function GalleryManager() {
  const [photos, setPhotos] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null); // { done, total }
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setPhotos(await fetchAllGalleryPhotos());
    } catch (err) {
      setError(err.message || "Failed to load gallery photos.");
    }
  }

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setError("");
    setUploading(true);
    setUploadProgress({ done: 0, total: files.length });

    const startOrder = photos.length ? Math.max(...photos.map((p) => p.display_order)) + 1 : 0;
    const created = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadGalleryImage(files[i]);
        const row = await createGalleryPhoto(url, startOrder + i);
        created.push(row);
        setUploadProgress({ done: i + 1, total: files.length });
      }
      setPhotos((prev) => [...prev, ...created]);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCaptionBlur = async (photo, value) => {
    if (value === photo.caption) return;
    try {
      await updateGalleryPhoto(photo.id, { caption: value });
      setPhotos((prev) => prev.map((p) => (p.id === photo.id ? { ...p, caption: value } : p)));
    } catch (err) {
      setError(err.message || "Failed to save caption.");
    }
  };

  const handleDelete = async (photo) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await deleteGalleryPhoto(photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (err) {
      setError(err.message || "Failed to delete photo.");
    }
  };

  const handleMove = async (index, dir) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= photos.length) return;
    const next = [...photos];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setPhotos(next);
    try {
      await reorderGalleryPhotos(next);
    } catch (err) {
      setError(err.message || "Failed to reorder.");
      load(); // re-sync with the server if the reorder failed midway
    }
  };

  if (!photos) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>User Photo Gallery</h1>
          <p className="admin-page-sub">
            Shown on the homepage — first {10} photos load immediately, the rest appear on "Load More".
            {photos.length > 0 && ` Currently ${photos.length} photo${photos.length === 1 ? "" : "s"}.`}
          </p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <i className="fas fa-cloud-arrow-up"></i>
          {uploading ? `Uploading ${uploadProgress?.done}/${uploadProgress?.total}…` : "Upload Photos"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFilesSelected}
          disabled={uploading}
        />
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {photos.length === 0 ? (
        <div className="admin-empty">
          <i className="fas fa-images"></i>
          <p>No photos yet — upload some to get the gallery started.</p>
        </div>
      ) : (
        <div className="gallery-admin-grid">
          {photos.map((photo, i) => (
            <div className="gallery-admin-card" key={photo.id}>
              <div className="gallery-admin-thumb-wrap">
                <img src={photo.image_url} alt={photo.caption || "Gallery photo"} />
                <div className="gallery-admin-move-btns">
                  <button type="button" onClick={() => handleMove(i, -1)} disabled={i === 0} title="Move earlier">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button type="button" onClick={() => handleMove(i, 1)} disabled={i === photos.length - 1} title="Move later">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="gallery-admin-body">
                <input
                  type="text"
                  placeholder="Caption (optional)…"
                  defaultValue={photo.caption}
                  onBlur={(e) => handleCaptionBlur(photo, e.target.value)}
                />
                <button type="button" className="gallery-admin-delete" onClick={() => handleDelete(photo)} title="Delete photo">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <button type="button" className="gallery-admin-upload-tile" onClick={() => fileInputRef.current?.click()}>
            <i className="fas fa-circle-plus"></i>
            <span>Add Photos</span>
          </button>
        </div>
      )}
    </div>
  );
}