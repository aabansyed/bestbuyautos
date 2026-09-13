import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts, updatePost, deletePost } from "../../lib/blogApi";

export default function BlogList() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    try {
      setPosts(await fetchAllPosts());
    } catch (err) {
      setError(err.message || "Failed to load posts.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = search.toLowerCase();
    return posts.filter((p) => !q || p.title.toLowerCase().includes(q));
  }, [posts, search]);

  const handleTogglePublish = async (post) => {
    setBusyId(post.id);
    try {
      const updated = await updatePost(post.id, { published: !post.published });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    } catch (err) {
      alert(err.message || "Failed to update post.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setBusyId(post.id);
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      alert(err.message || "Failed to delete post.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Blog Posts</h1>
          <p className="admin-page-sub">
            {posts ? `${posts.length} total · ${posts.filter((p) => p.published).length} published` : "Loading…"}
          </p>
        </div>
        <Link to="/admin/blog/new" className="admin-btn-primary">
          <i className="fas fa-circle-plus"></i> New Post
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search title…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}

      {!posts && !error && (
        <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading posts…</div>
      )}

      {posts && filtered.length === 0 && (
        <div className="admin-empty">
          <i className="fas fa-newspaper"></i>
          <p>No posts match your search.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className={busyId === post.id ? "is-busy" : ""}>
                  <td>
                    <img
                      className="admin-thumb"
                      src={post.image_url || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200"}
                      alt={post.title}
                    />
                  </td>
                  <td>
                    <div className="admin-car-name">{post.title}</div>
                  </td>
                  <td>{post.badge}</td>
                  <td>{post.published_date}</td>
                  <td>
                    <button
                      className={`admin-status-toggle ${post.published ? "on" : "off"}`}
                      onClick={() => handleTogglePublish(post)}
                      disabled={busyId === post.id}
                      title="Toggle published state"
                    >
                      <span className="dot"></span> {post.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <Link to={`/admin/blog/${post.id}`} className="admin-icon-btn" title="Edit">
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        className="admin-icon-btn danger"
                        onClick={() => handleDelete(post)}
                        disabled={busyId === post.id}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}