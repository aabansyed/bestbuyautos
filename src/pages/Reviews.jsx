import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initReviewsPage } from "./scripts/reviewsScript";
import "../styles/reviews.css";

export default function Reviews() {
  useEffect(() => {
    initReviewsPage();
  }, []);

  return (
    <>
<div className="reviews-hero">
  <div className="hero-badge"><span></span> Verified Customer Voices</div>
  <h1>Real Customers,<br /><span className="gold">Real Stories</span></h1>
  <div className="gold-line"></div>
  <p>Thousands of happy customers around the world trust BBA Japan for their vehicle imports. Here's what they say.</p>
  <div className="hero-stats-row">
    <div className="hstat">
      <span className="hstat-num" id="statRev">2,400+</span>
      <div className="hstat-lbl">Verified Reviews</div>
    </div>
    <div className="hstat">
      <span className="hstat-num">4.9 ★</span>
      <div className="hstat-lbl">Average Rating</div>
    </div>
    <div className="hstat">
      <span className="hstat-num" id="statCust">50,000+</span>
      <div className="hstat-lbl">Happy Customers</div>
    </div>
    <div className="hstat">
      <span className="hstat-num">120+</span>
      <div className="hstat-lbl">Countries Served</div>
    </div>
  </div>
</div>


<section id="reviews">
  <div className="container">

    
    <div className="filter-bar" data-aos="fade-up">
      <div className="filter-bar-label"><i className="fas fa-filter" style={{color: 'var(--gold)'}}></i> Filter</div>
      <div className="filter-chips">
        <button className="chip active" onClick={(e) => window.filterReviews("all", e.currentTarget)}>All Countries</button>
        <button className="chip" onClick={(e) => window.filterReviews("Africa", e.currentTarget)}>🌍 Africa</button>
        <button className="chip" onClick={(e) => window.filterReviews("Middle East", e.currentTarget)}>🌏 Middle East</button>
        <button className="chip" onClick={(e) => window.filterReviews("Pacific", e.currentTarget)}>🌊 Pacific</button>
        <button className="chip" onClick={(e) => window.filterReviews("Asia", e.currentTarget)}>🌏 Asia</button>
        <button className="chip" onClick={(e) => window.filterReviews("Europe", e.currentTarget)}>🇪🇺 Europe</button>
        <button className="chip" onClick={(e) => window.filterReviews("Americas", e.currentTarget)}>🌎 Americas</button>
      </div>
      <div className="review-count-badge">Showing <span id="reviewCount">18</span> reviews</div>
    </div>

    
    <div className="spotlight-wrap" data-aos="fade-up">
      <div className="spotlight-card">
        <div className="spotlight-img-wrap">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80" alt="Mohammed Al Rashid" />
          <div className="spotlight-img-overlay"></div>
        </div>
        <div className="spotlight-body">
          <div className="spotlight-flag-row">
            <span className="flag">🇦🇪</span>
            <span className="spotlight-country">United Arab Emirates</span>
          </div>
          <div className="spotlight-car-pill">
            <i className="fas fa-car"></i> Toyota Land Cruiser 200 GX-R — 2021
          </div>
          <div className="spotlight-stars">★★★★★</div>
          <div className="spotlight-quote">
            BBA Japan gave me the most professional car buying experience I have ever had. From choosing the Land Cruiser to receiving it at Dubai port, every step was flawless. The team was available on WhatsApp at all hours and delivered exactly as promised.
          </div>
          <div className="spotlight-author">
            <div className="spotlight-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Mohammed" />
            </div>
            <div>
              <div className="spotlight-name">Mohammed Al Rashid</div>
              <div className="spotlight-meta">Dubai, UAE · January 2025</div>
              <div className="spotlight-car-tag"><i className="fas fa-check-circle"></i> Verified Purchase</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div className="reviews-masonry" id="reviewsMasonry">

      
      <div className="review-card has-photo" data-region="Africa">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80" alt="Amara Osei" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Toyota Prado 2020</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇰🇪</div>
            <div className="rc-photo-country">Nairobi, Kenya</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"My Prado arrived in perfect condition, exactly as shown in the photos. The export documentation was handled completely by BBA Japan. Highly recommended to anyone in East Africa!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Amara Osei</div>
              <div className="rc-author-meta">March 2025</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
            <div className="rc-date">Mar 2025</div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only highlighted" data-region="Middle East">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">I have bought 3 cars from BBA Japan over 2 years. Each time the process gets smoother. The pricing is the best I've found and their negotiation team is very fair. My Lexus LX570 is a dream machine!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Khalid Al-Mansouri</div>
              <div className="rc-author-meta">🇸🇦 Riyadh, Saudi Arabia</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> 3x Repeat Customer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo tall" data-region="Africa">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&q=80" alt="James Okonkwo" />
          <div className="rc-video-badge"><i className="fas fa-play"></i></div>
          <div className="rc-car-badge"><i className="fas fa-car"></i> Nissan Patrol Y62</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇳🇬</div>
            <div className="rc-photo-country">Lagos, Nigeria</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"Watch my unboxing video! The Patrol Y62 arrived spotless. BBA Japan even helped with Nigerian customs paperwork. Best export company from Japan, period."</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">James Okonkwo</div>
              <div className="rc-author-meta">February 2025</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Pacific">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80" alt="David Wilson" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Subaru Forester 2021</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇳🇿</div>
            <div className="rc-photo-country">Auckland, New Zealand</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"Imported my Forester EyeSight in just 32 days from payment to arrival in Auckland. The shipping calculator was spot on. WeTalk support was brilliant throughout!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">David Wilson</div>
              <div className="rc-author-meta">January 2025</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only" data-region="Asia">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Bought a fleet of 8 Toyota Hiace vans for my transport business. BBA Japan handled the entire LC payment process and container booking flawlessly. Will order 12 more this year!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Raj Bandara</div>
              <div className="rc-author-meta">🇱🇰 Colombo, Sri Lanka</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Fleet Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Africa">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80" alt="Emmanuel Mwangi" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Toyota Land Cruiser 2019</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇹🇿</div>
            <div className="rc-photo-country">Dar es Salaam, Tanzania</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"My first import from Japan and BBA made it incredibly easy. The car condition was exactly Grade 4 as stated. Full Sakujo certificate included. Will definitely order again."</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Emmanuel Mwangi</div>
              <div className="rc-author-meta">December 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only highlighted" data-region="Asia">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">BBA Japan is the most trusted name in Pakistan for Japanese imports. Got my Honda Vezel Hybrid in 15 days — record time! The price negotiation saved me $800 below listed price.</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Arsalan Khan</div>
              <div className="rc-author-meta">🇵🇰 Karachi, Pakistan</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo tall" data-region="Pacific">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" alt="Tom Hartley" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Toyota Alphard 2022</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇦🇺</div>
            <div className="rc-photo-country">Sydney, Australia</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"The Alphard Executive is exactly what our family needed. Came with all Japanese service records. BBA Japan's compliance team guided me through Australian customs — 5 stars all the way!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Tom Hartley</div>
              <div className="rc-author-meta">November 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only" data-region="Middle East">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Exceptional service! The BMW X5 I ordered arrived in just 26 days. BBA Japan's communication was outstanding — daily updates via WhatsApp. The car was immaculately cleaned before loading.</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Yusuf Al-Thani</div>
              <div className="rc-author-meta">🇶🇦 Doha, Qatar</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Africa">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=600&q=80" alt="Kwame Asante" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Mazda CX-5 2022</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇬🇭</div>
            <div className="rc-photo-country">Accra, Ghana</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"The Mazda CX-5 Signature was exactly what I pictured. Paint grade 4, interior like new. BBA Japan's document team handled Tema port clearance with zero hassle. Superb!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Kwame Asante</div>
              <div className="rc-author-meta">October 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only highlighted" data-region="Europe">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Imported a JDM Nissan GT-R R35 — BBA Japan knew exactly how to export it with all the correct de-registration papers for UK compliance. Arrived in under 42 days. A+ experience!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Oliver Hughes</div>
              <div className="rc-author-meta">🇬🇧 Manchester, UK</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Asia">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&q=80" alt="Kyaw Zin" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Honda Vezel Hybrid</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇲🇲</div>
            <div className="rc-photo-country">Yangon, Myanmar</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"Very professional team. They sent me inspection videos before I confirmed the purchase. The car arrived in 12 days — fastest shipping I've experienced. Great value for money!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Kyaw Zin Tun</div>
              <div className="rc-author-meta">September 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only" data-region="Americas">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Shipped a Land Rover Defender to Los Angeles. BBA Japan coordinated everything including US Customs bond documentation. 40 days door to port, no damage. Extraordinary service!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Marcus Johnson</div>
              <div className="rc-author-meta">🇺🇸 Los Angeles, USA</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Asia">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" alt="Rahim Chowdhury" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Toyota Prius 2021</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇧🇩</div>
            <div className="rc-photo-country">Dhaka, Bangladesh</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"My Toyota Prius G Touring is perfect. BBA Japan team was very supportive during the Chittagong customs process. Got the car faster than expected. Top notch company!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Rahim Chowdhury</div>
              <div className="rc-author-meta">August 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only highlighted" data-region="Africa">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Ordered a Mercedes G63 AMG for my collection. BBA Japan found the exact spec I needed and arranged pre-purchase inspection with photos and video. Arrived in Durban flawlessly. 100% recommended!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Sipho Dlamini</div>
              <div className="rc-author-meta">🇿🇦 Johannesburg, South Africa</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Americas">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" alt="Pierre Gagnon" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Nissan GTR R35</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇨🇦</div>
            <div className="rc-photo-country">Toronto, Canada</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"Got my dream GT-R from BBA Japan. The team navigated Canadian import regulations perfectly and all the paperwork was ready on arrival. An incredible buying experience!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Pierre Gagnon</div>
              <div className="rc-author-meta">July 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card text-only" data-region="Europe">
        <div className="rc-body">
          <span className="rc-quote-mark">"</span>
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">Sehr professionell! Bought a JDM Toyota Supra for our club. BBA Japan's export team was incredibly knowledgeable about EU import requirements. Car arrived in Hamburg in 40 days. Wunderbar!</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Klaus Weber</div>
              <div className="rc-author-meta">🇩🇪 Hamburg, Germany</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="review-card has-photo" data-region="Africa">
        <div className="rc-photo-wrap">
          <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&q=80" alt="Fatuma Nyambura" />
          <div className="rc-car-badge"><i className="fas fa-car"></i> Toyota RAV4 2022</div>
          <div className="rc-photo-overlay">
            <div className="rc-photo-flag">🇰🇪</div>
            <div className="rc-photo-country">Mombasa, Kenya</div>
          </div>
        </div>
        <div className="rc-body">
          <div className="rc-stars">★★★★★</div>
          <div className="rc-text">"As a first time importer, I was nervous. BBA Japan held my hand through every step. My RAV4 arrived clean, on time, and below budget. The WhatsApp support is a game changer!"</div>
          <div className="rc-footer">
            <div>
              <div className="rc-author-name">Fatuma Nyambura</div>
              <div className="rc-author-meta">June 2024</div>
              <div className="rc-verified"><i className="fas fa-circle-check"></i> Verified Buyer</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="load-more-wrap" data-aos="fade-up">
      <button className="btn-primary" onClick={() => window.showToast("Loading more reviews...", "info")}>
        <i className="fas fa-plus"></i> Load More Reviews
      </button>
    </div>
  </div>
</section>


<section id="byCountry">
  <div className="container">
    <div style={{textAlign: 'center', marginBottom: '16px'}} data-aos="fade-up">
      <div className="section-tag">Global Reach</div>
      <h2 style={{fontFamily: '\'Playfair Display\',serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: '900', marginBottom: '12px'}}>
        Customers From <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Every Corner</span>
      </h2>
      <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg,var(--gold-dark),var(--gold-light))', borderRadius: '2px', margin: '0 auto'}}></div>
    </div>
    <div className="country-grid">
      <div className="country-card" data-aos="fade-up" data-aos-delay="0" onClick={() => { filterReviews('Africa',document.querySelector('.chip:nth-child(2)')) }}>
        <span className="country-flag-big">🇰🇪</span>
        <div className="country-name">Kenya</div>
        <div className="country-reviews">148 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="40" onClick={() => { filterReviews('Africa',document.querySelector('.chip:nth-child(2)')) }}>
        <span className="country-flag-big">🇳🇬</span>
        <div className="country-name">Nigeria</div>
        <div className="country-reviews">213 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="80" onClick={() => { filterReviews('Middle East',document.querySelector('.chip:nth-child(3)')) }}>
        <span className="country-flag-big">🇦🇪</span>
        <div className="country-name">UAE</div>
        <div className="country-reviews">187 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="120" onClick={() => { filterReviews('Pacific',document.querySelector('.chip:nth-child(4)')) }}>
        <span className="country-flag-big">🇳🇿</span>
        <div className="country-name">New Zealand</div>
        <div className="country-reviews">156 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="160" onClick={() => { filterReviews('Asia',document.querySelector('.chip:nth-child(5)')) }}>
        <span className="country-flag-big">🇱🇰</span>
        <div className="country-name">Sri Lanka</div>
        <div className="country-reviews">204 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="200" onClick={() => { filterReviews('Africa',document.querySelector('.chip:nth-child(2)')) }}>
        <span className="country-flag-big">🇹🇿</span>
        <div className="country-name">Tanzania</div>
        <div className="country-reviews">133 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="240" onClick={() => { filterReviews('Middle East',document.querySelector('.chip:nth-child(3)')) }}>
        <span className="country-flag-big">🇸🇦</span>
        <div className="country-name">Saudi Arabia</div>
        <div className="country-reviews">175 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="280" onClick={() => { filterReviews('Pacific',document.querySelector('.chip:nth-child(4)')) }}>
        <span className="country-flag-big">🇦🇺</span>
        <div className="country-name">Australia</div>
        <div className="country-reviews">98 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="320" onClick={() => { filterReviews('Asia',document.querySelector('.chip:nth-child(5)')) }}>
        <span className="country-flag-big">🇵🇰</span>
        <div className="country-name">Pakistan</div>
        <div className="country-reviews">167 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="360" onClick={() => { filterReviews('Europe',document.querySelector('.chip:nth-child(6)')) }}>
        <span className="country-flag-big">🇬🇧</span>
        <div className="country-name">United Kingdom</div>
        <div className="country-reviews">92 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="400" onClick={() => { filterReviews('Americas',document.querySelector('.chip:nth-child(7)')) }}>
        <span className="country-flag-big">🇺🇸</span>
        <div className="country-name">USA</div>
        <div className="country-reviews">77 reviews</div>
      </div>
      <div className="country-card" data-aos="fade-up" data-aos-delay="440" onClick={() => { filterReviews('Africa',document.querySelector('.chip:nth-child(2)')) }}>
        <span className="country-flag-big">🇬🇭</span>
        <div className="country-name">Ghana</div>
        <div className="country-reviews">111 reviews</div>
      </div>
    </div>
  </div>
</section>


<section id="videoSection">
  <div className="container">
    <div style={{textAlign: 'center', marginBottom: '48px'}} data-aos="fade-up">
      <div className="section-tag">Video Reviews</div>
      <h2 style={{fontFamily: '\'Playfair Display\',serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: '900', marginBottom: '12px'}}>
        See It From <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Our Customers</span>
      </h2>
      <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg,var(--gold-dark),var(--gold-light))', borderRadius: '2px', margin: '0 auto'}}></div>
    </div>
    <div className="video-grid">
      <div className="video-card" data-aos="fade-up" data-aos-delay="0" onClick={() => window.showToast("Video player coming soon!", "info")}>
        <div className="video-thumb">
          <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80" alt="Video 1" />
          <div className="video-play"><div className="video-play-btn"><i className="fas fa-play"></i></div></div>
        </div>
        <div className="video-card-body">
          <div className="video-card-name">🇳🇬 James Okonkwo — Nissan Patrol Y62</div>
          <div className="video-card-meta">Lagos, Nigeria · February 2025</div>
        </div>
      </div>
      <div className="video-card" data-aos="fade-up" data-aos-delay="80" onClick={() => window.showToast("Video player coming soon!", "info")}>
        <div className="video-thumb">
          <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80" alt="Video 2" />
          <div className="video-play"><div className="video-play-btn"><i className="fas fa-play"></i></div></div>
        </div>
        <div className="video-card-body">
          <div className="video-card-name">🇦🇪 Mohammed Al Rashid — Land Cruiser 200</div>
          <div className="video-card-meta">Dubai, UAE · January 2025</div>
        </div>
      </div>
      <div className="video-card" data-aos="fade-up" data-aos-delay="160" onClick={() => window.showToast("Video player coming soon!", "info")}>
        <div className="video-thumb">
          <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" alt="Video 3" />
          <div className="video-play"><div className="video-play-btn"><i className="fas fa-play"></i></div></div>
        </div>
        <div className="video-card-body">
          <div className="video-card-name">🇱🇰 Raj Bandara — Toyota Hiace Fleet</div>
          <div className="video-card-meta">Colombo, Sri Lanka · December 2024</div>
        </div>
      </div>
      <div className="video-card" data-aos="fade-up" data-aos-delay="240" onClick={() => window.showToast("Video player coming soon!", "info")}>
        <div className="video-thumb">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80" alt="Video 4" />
          <div className="video-play"><div className="video-play-btn"><i className="fas fa-play"></i></div></div>
        </div>
        <div className="video-card-body">
          <div className="video-card-name">🇰🇪 Amara Osei — Toyota Prado 2020</div>
          <div className="video-card-meta">Nairobi, Kenya · March 2025</div>
        </div>
      </div>
    </div>
  </div>
</section>


<section id="submitSection">
  <div className="container">
    <div style={{textAlign: 'center', marginBottom: '48px'}} data-aos="fade-up">
      <div className="section-tag">Share Your Experience</div>
      <h2 style={{fontFamily: '\'Playfair Display\',serif', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: '900', marginBottom: '12px'}}>
        Leave a <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Review</span>
      </h2>
      <div style={{width: '60px', height: '3px', background: 'linear-gradient(90deg,var(--gold-dark),var(--gold-light))', borderRadius: '2px', margin: '0 auto'}}></div>
    </div>
    <div className="submit-grid">
      <div data-aos="fade-right">
        <div className="submit-card">
          <h3 style={{fontSize: '1.2rem', fontWeight: '700', marginBottom: '24px'}}><i className="fas fa-star" style={{color: 'var(--gold)', marginRight: '8px'}}></i>Write Your Review</h3>
          <div className="form-group">
            <label className="form-label">Your Rating</label>
            <div className="star-picker" id="starPicker">
              <i className="fas fa-star" onClick={() => window.setStars(1)}></i>
              <i className="fas fa-star" onClick={() => window.setStars(2)}></i>
              <i className="fas fa-star" onClick={() => window.setStars(3)}></i>
              <i className="fas fa-star" onClick={() => window.setStars(4)}></i>
              <i className="fas fa-star" onClick={() => window.setStars(5)}></i>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" placeholder="e.g. Ahmed Hassan" id="rName" />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <input className="form-input" type="text" placeholder="e.g. Nigeria" id="rCountry" />
          </div>
          <div className="form-group">
            <label className="form-label">Vehicle You Purchased</label>
            <input className="form-input" type="text" placeholder="e.g. Toyota Land Cruiser 2021" id="rCar" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" id="rEmail" />
          </div>
          <div className="form-group">
            <label className="form-label">Your Review</label>
            <textarea className="form-textarea" placeholder="Tell us about your experience with BBA Japan…" id="rText"></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Upload a Photo (Optional)</label>
            <input className="form-input" type="file" accept="image/*" style={{padding: '10px', cursor: 'pointer'}} />
          </div>
          <button className="btn-submit" onClick={() => window.submitReview()}>
            <i className="fas fa-paper-plane"></i> Submit Review
          </button>
        </div>
      </div>
      <div data-aos="fade-left">
        <h3 style={{fontSize: '1.2rem', fontWeight: '700', marginBottom: '28px'}}>Why Leave a Review?</h3>
        <ul className="why-list">
          <li className="why-item">
            <div className="why-ico"><i className="fas fa-users"></i></div>
            <div className="why-text">
              <h4>Help Other Buyers</h4>
              <p>Your experience guides other customers around the world in making confident purchasing decisions.</p>
            </div>
          </li>
          <li className="why-item">
            <div className="why-ico"><i className="fas fa-gift"></i></div>
            <div className="why-text">
              <h4>Earn Loyalty Points</h4>
              <p>Verified customers who submit reviews receive 500 loyalty points redeemable on future purchases.</p>
            </div>
          </li>
          <li className="why-item">
            <div className="why-ico"><i className="fas fa-camera"></i></div>
            <div className="why-text">
              <h4>Be Featured on Our Page</h4>
              <p>The best reviews with photos are featured on our homepage and social media channels.</p>
            </div>
          </li>
          <li className="why-item">
            <div className="why-ico"><i className="fas fa-shield-alt"></i></div>
            <div className="why-text">
              <h4>100% Verified & Authentic</h4>
              <p>All reviews are manually verified by our team. We never publish fake reviews.</p>
            </div>
          </li>
          <li className="why-item">
            <div className="why-ico"><i className="fas fa-globe"></i></div>
            <div className="why-text">
              <h4>Join a Global Community</h4>
              <p>Connect with 50,000+ BBA Japan customers worldwide who share your passion for quality vehicles.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>


<div className="glass-banner" data-aos="zoom-in" style={{marginBottom: '80px'}}>
  <h2>Ready to Join Our <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Happy Customers?</span></h2>
  <p>Browse our premium inventory and import your dream vehicle from Japan today</p>
  <div className="glass-banner-btns">
<Link to="/stock-cars" className="btn-primary"><i className="fas fa-car"></i> Browse Inventory</Link>
    <a href="contact-us.html" className="btn-secondary"><i className="fas fa-envelope"></i> Contact Our Team</a>
  </div>
</div>




<div className="float-group">
  <a className="float-btn float-wa" href="https://wa.me/8190XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20a%20car%20from%20BestBuy%20Auto" target="_blank">
    <i className="fab fa-whatsapp"></i>
  </a>
</div>
    </>
  );
}
