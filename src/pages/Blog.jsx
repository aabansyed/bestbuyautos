import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initBlogPage } from "./scripts/blogScript";
import "../styles/blog.css";

export default function Blog() {
  useEffect(() => {
    const cleanup = initBlogPage();
    return cleanup;
  }, []);

  return (
    <>
      <section className="breadcrumb-banner">
        <h1>BBA Japan News</h1>
        <div className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <span className="sep"><i className="fas fa-chevron-right" style={{ fontSize: ".7rem" }}></i></span>
          <span className="current">BBA Japan News</span>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-toolbar">
            <div className="blog-toolbar-title">Browse by categories</div>
            <form className="blog-search-form" onSubmit={(e) => window.searchBlog && window.searchBlog(e)}>
              <input type="text" id="searchInput" className="blog-search-input" placeholder="Search articles..." />
              <button type="submit" className="blog-search-btn" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="blog-chips" id="chips">
            <a href="#" className="blog-chip active" data-cat="">All</a>
            <a href="#" className="blog-chip" data-cat="vehicle">Vehicle</a>
            <a href="#" className="blog-chip" data-cat="buying-guide">Buying Guide</a>
            <a href="#" className="blog-chip" data-cat="maintenance">Maintenance</a>
            <a href="#" className="blog-chip" data-cat="reviews">Reviews</a>
          </div>

          <div className="blog-cards-grid" id="cardsGrid"></div>
          <div className="blog-pagination" id="paginationWrap"></div>
        </div>
      </section>

      <a className="float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
