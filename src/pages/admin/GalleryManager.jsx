import { useEffect, useRef, useState } from "react";
import {
  fetchAllGalleryPhotos, uploadGalleryImage, createGalleryPhoto,
  updateGalleryPhoto, deleteGalleryPhoto, reorderGalleryPhotos,
} from "../../lib/galleryApi";

// ── Upload limits (apni zaroorat ke hisaab se badal lena) ──
const MAX_VIDEO_SECONDS = 120; // 2 minutes
const MAX_VIDEO_MB = 50;       // Supabase free plan ki per-file limit
const MAX_IMAGE_MB = 10;

const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      URL.revokeObjectURL(v.src);
      resolve(v.duration);
    };
    v.onerror = () => reject(new Error(`Could not read video: ${file.name}`));
    v.src = URL.createObjectURL(file);
  });

// Returns "image" or "video", ya error throw karta hai agar limit cross ho
async function validateFile(file) {
  const isVideo = file.type.startsWith("video/");
  const sizeMB = file.size / (1024 * 1024);

  if (isVideo) {
    if (sizeMB > MAX_VIDEO_MB) {
      throw new Error(`${file.name}: video is ${sizeMB.toFixed(1)}MB (max ${MAX_VIDEO_MB}MB).`);
    }
    const duration = await getVideoDuration(file);
    if (duration > MAX_VIDEO_SECONDS) {
      throw new Error(`${file.name}: video is ${Math.round(duration)}s (max ${MAX_VIDEO_SECONDS}s).`);
    }
    return "video";
  }

  if (sizeMB > MAX_IMAGE_MB) {
    throw new Error(`${file.name}: image is ${sizeMB.toFixed(1)}MB (max ${MAX_IMAGE_MB}MB).`);
  }
  return "image";
}

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
      setError(err.message || "Failed to load gallery.");
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
      // Pehle sab files validate karo, taake aadhi upload hokar na ruk jaye
      const types = [];
      for (const file of files) types.push(await validateFile(file));

      for (let i = 0; i < files.length; i++) {
        const url = await uploadGalleryImage(files[i]);
        const row = await createGalleryPhoto(url, startOrder + i, types[i]);
        created.push(row);
        setUploadProgress({ done: i + 1, total: files.length });
      }
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      // Jo upload ho chuki hain wo dikha do, chahe baad mein koi fail ho
      if (created.length) setPhotos((prev) => [...prev, ...created]);
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
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteGalleryPhoto(photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (err) {
      setError(err.message || "Failed to delete.");
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
            Shown on the homepage — first {10} items load immediately, the rest appear on "Load More".
            {photos.length > 0 && ` Currently ${photos.length} item${photos.length === 1 ? "" : "s"}.`}
          </p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <i className="fas fa-cloud-arrow-up"></i>
          {uploading ? `Uploading ${uploadProgress?.done}/${uploadProgress?.total}…` : "Upload Photos / Videos"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
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
          <p>Nothing here yet — upload photos or videos to get the gallery started.</p>
        </div>
      ) : (
        <div className="gallery-admin-grid">
          {photos.map((photo, i) => (
            <div className="gallery-admin-card" key={photo.id}>
              <div className="gallery-admin-thumb-wrap">
                {photo.media_type === "video" ? (
                  <video src={photo.image_url} controls preload="metadata" muted playsInline />
                ) : (
                  <img src={photo.image_url} alt={photo.caption || "Gallery photo"} />
                )}
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
                <button type="button" className="gallery-admin-delete" onClick={() => handleDelete(photo)} title="Delete">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <button type="button" className="gallery-admin-upload-tile" onClick={() => fileInputRef.current?.click()}>
            <i className="fas fa-circle-plus"></i>
            <span>Add Photos / Videos</span>
          </button>
        </div>
      )}
    </div>
  );
}