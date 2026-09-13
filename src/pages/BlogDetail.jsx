import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostBySlug } from "../lib/blogApi";
import "../styles/blog.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    setPost(undefined);
    fetchPostBySlug(slug)
      .then(setPost)
      .catch((err) => {
        setError(err.message || "");
        setPost(null);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (post === undefined) {
    return (
      <div style={{ padding: "160px 5% 100px", textAlign: "center", color: "var(--gray)" }}>
        <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "2rem", color: "var(--gold)" }}></i>
      </div>
    );
  }

  if (post === null) {
    return (
      <div style={{ padding: "160px 5% 100px", textAlign: "center", color: "var(--gray)" }}>
        <i className="fas fa-newspaper" style={{ fontSize: "2.4rem", color: "var(--dark3)", display: "block", marginBottom: 16 }}></i>
        <h2 style={{ color: "var(--white)", marginBottom: 10 }}>Article not found</h2>
        <p>{error}</p>
        <Link to="/blog" className="btn-read-more" style={{ marginTop: 20, display: "inline-flex" }}>
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>
      </div>
    );
  }

  const paragraphs = (post.content || post.description || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <section className="breadcrumb-banner">
        <h1>{post.title}</h1>
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fas fa-chevron-right" style={{ fontSize: ".7rem" }}></i></span>
          <Link to="/blog">BBA Japan News</Link>
          <span className="sep"><i className="fas fa-chevron-right" style={{ fontSize: ".7rem" }}></i></span>
          <span className="current">{post.badge}</span>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container" style={{ maxWidth: 820 }}>
          <div style={{ marginBottom: 24, color: "var(--gray)", fontSize: ".85rem" }}>
            <i className="fas fa-calendar-alt"></i> {post.published_date}
            <span style={{ margin: "0 10px" }}>·</span>
            <span className="card-badge" style={{ position: "static", display: "inline-block" }}>{post.badge}</span>
          </div>

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              style={{ width: "100%", borderRadius: 16, marginBottom: 30, maxHeight: 420, objectFit: "cover" }}
            />
          )}

          <div style={{ color: "var(--white)", lineHeight: 1.85, fontSize: "1.02rem" }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{ marginBottom: 20 }}>{para}</p>
            ))}
          </div>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--glass-border)", paddingTop: 24 }}>
            <Link to="/blog" className="btn-read-more">
              <i className="fas fa-arrow-left"></i> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}