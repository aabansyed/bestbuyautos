import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPostById,
  createPost,
  updatePost,
  uploadBlogImage,
  slugify,
  BLOG_CATEGORIES,
} from "../../lib/blogApi";

const emptyPost = {
  slug: "",
  category: "vehicle",
  badge: "Vehicle",
  title: "",
  description: "",
  content: "",
  image_url: "",
  published_date: "",
  published: true,
};

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [post, setPost] = useState(emptyPost);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setPost(await fetchPostById(id));
      } catch (err) {
        setError(err.message || "Failed to load post.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setPost((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !slugTouched) next.slug = slugify(value);
      if (field === "category") {
        const cat = BLOG_CATEGORIES.find((c) => c.value === value);
        if (cat) next.badge = cat.label;
      }
      return next;
    });
    if (field === "slug") setSlugTouched(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadBlogImage(file);
      setPost((prev) => ({ ...prev, image_url: url }));
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!post.title.trim() || !post.slug.trim() || !post.description.trim()) {
      setError("Title, slug and short description are required.");
      return;
    }

    const payload = {
      slug: slugify(post.slug),
      category: post.category,
      badge: post.badge,
      title: post.title.trim(),
      description: post.description.trim(),
      content: post.content.trim(),
      image_url: post.image_url,
      published_date: post.published_date.trim() || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      published: post.published,
    };

    setSaving(true);
    try {
      if (isEdit) {
        await updatePost(id, payload);
      } else {
        await createPost(payload);
      }
      navigate("/admin/blog");
    } catch (err) {
      setError(err.message || "Failed to save post. (Tip: slug must be unique.)");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? "Edit Post" : "New Blog Post"}</h1>
          <p className="admin-page-sub">
            {isEdit ? "Update the article's content, image or publish state." : "This post appears at /blog once published."}
          </p>
        </div>
        <button className="admin-btn-secondary" onClick={() => navigate("/admin/blog")}>
          <i className="fas fa-arrow-left"></i> Back to list
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" value={post.title} onChange={set("title")} placeholder="How to Import a Car from Japan" />
        </div>

        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">URL Slug *</label>
            <input className="form-input" value={post.slug} onChange={set("slug")} placeholder="how-to-import-a-car" />
            <p className="admin-hint">Page will be at /blog/{post.slug || "your-slug"}</p>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={post.category} onChange={set("category")}>
              {BLOG_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Display Date</label>
            <input className="form-input" value={post.published_date} onChange={set("published_date")} placeholder="Mar 11, 2026" />
          </div>
          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {post.image_url && <img src={post.image_url} alt="" style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 6 }} />}
              <label className="admin-btn-secondary" style={{ cursor: "pointer" }}>
                {uploading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-cloud-arrow-up"></i>}
                {uploading ? " Uploading…" : " Upload"}
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Short Description *</label>
          <textarea className="form-input form-textarea" value={post.description} onChange={set("description")} placeholder="Shown on the blog listing card." />
        </div>

        <div className="form-group">
          <label className="form-label">Full Article Content</label>
          <textarea
            className="form-input form-textarea"
            style={{ minHeight: 240 }}
            value={post.content}
            onChange={set("content")}
            placeholder="Leave a blank line between paragraphs. Shown on the article's own page."
          />
        </div>

        <label className="admin-checkbox-row">
          <input type="checkbox" checked={post.published} onChange={set("published")} />
          Published (visible on the public site)
        </label>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
            <i className="fas fa-save"></i> {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}