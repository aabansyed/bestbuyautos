import { fetchPublishedPosts } from "../../lib/blogApi";

export function initBlogPage() {

  let posts = [];

  const PER_PAGE = 9;
  let currentCat = '';
  let currentPage = 1;
  let currentSearch = '';

  function getFiltered(){
    return posts.filter(p=>{
      const catOk = !currentCat || p.category===currentCat;
      const q = currentSearch.toLowerCase();
      const searchOk = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }

  function render(){
    const filtered = getFiltered();
    const totalPages = Math.ceil(filtered.length/PER_PAGE) || 1;
    if(currentPage>totalPages) currentPage=1;

    const slice = filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;

    if(slice.length===0){
      grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray)">
        <i class="fas fa-newspaper" style="font-size:3rem;color:var(--dark3);margin-bottom:16px;display:block"></i>
        No articles found. Try a different search or category.
      </div>`;
    } else {
      grid.innerHTML = slice.map(p=>`
        <article class="blog-card">
          <div class="card-img-wrap">
            <a href="/blog/${p.slug}"></a>
            <img src="${p.image_url}" alt="${p.title}" loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600'"/>
            <span class="card-badge">${p.badge}</span>
          </div>
          <div class="card-body-inner">
            <div class="card-date"><i class="fas fa-calendar-alt"></i> ${p.published_date}</div>
            <a href="/blog/${p.slug}" class="card-title">${p.title}</a>
            <p class="card-desc">${p.description}</p>
            <div class="card-footer-row">
              <a href="/blog/${p.slug}" class="btn-read-more">
                Read More <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      `).join('');
    }

    const wrap = document.getElementById('paginationWrap');
    if (!wrap) return;
    if(totalPages<=1){wrap.innerHTML='';return;}
    let html='';
    html+=`<a href="#" class="page-btn ${currentPage===1?'disabled':''}" onclick="changePage(event,${currentPage-1})">‹</a>`;
    for(let i=1;i<=totalPages;i++){
      html+=`<a href="#" class="page-btn ${i===currentPage?'active':''}" onclick="changePage(event,${i})">${i}</a>`;
    }
    html+=`<a href="#" class="page-btn ${currentPage===totalPages?'disabled':''}" onclick="changePage(event,${currentPage+1})">›</a>`;
    wrap.innerHTML=html;
  }

  function changePage(e,p){
    e.preventDefault();
    const filtered=getFiltered();
    const max=Math.ceil(filtered.length/PER_PAGE)||1;
    if(p<1||p>max)return;
    currentPage=p;
    render();
    document.querySelector('.blog-section')?.scrollIntoView({behavior:'smooth'});
  }

  function searchBlog(e){
    e.preventDefault();
    currentSearch=document.getElementById('searchInput').value.trim();
    currentPage=1;
    render();
  }

  window.searchBlog = searchBlog;
  window.changePage = changePage;

  const chipsEl = document.getElementById('chips');
  const onChipClick = function(e){
    const chip=e.target.closest('.blog-chip');
    if(!chip)return;
    e.preventDefault();
    document.querySelectorAll('.blog-chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    currentCat=chip.dataset.cat;
    currentPage=1;
    render();
  };
  chipsEl?.addEventListener('click', onChipClick);

  const grid = document.getElementById('cardsGrid');
  if (grid) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray)">
      <i class="fas fa-circle-notch fa-spin" style="font-size:2rem;color:var(--gold)"></i>
    </div>`;
  }
  fetchPublishedPosts().then((data) => {
    posts = data;
    render();
  }).catch((err) => {
    console.error('Failed to load blog posts:', err);
    if (grid) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray)">
        Couldn't load articles right now. Please refresh the page.
      </div>`;
    }
  });

  return function cleanup() {
    chipsEl?.removeEventListener('click', onChipClick);
  };
}