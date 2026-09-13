import { useEffect, useState } from "react";
import { fetchPublicFaqs } from "../lib/faqApi";

export default function HomeFaqSection() {
  const [faqs, setFaqs] = useState(null);

  useEffect(() => {
    fetchPublicFaqs().then(setFaqs).catch(() => setFaqs([]));
  }, []);

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Frequently Asked <span className="gold">Questions</span></h2>
          <div className="gold-line"></div>
        </div>
        <div className="faq-list" id="faqList">
          {faqs === null && (
            <div style={{ textAlign: "center", padding: "30px 0", color: "var(--gray)" }}>
              <i className="fas fa-circle-notch fa-spin" style={{ color: "var(--gold)" }}></i>
            </div>
          )}
          {faqs && faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              <div className="faq-q" onClick={(e) => window.toggleFaq(e.currentTarget)}>
                {faq.question}
                <div className="faq-icon"><i className="fas fa-plus"></i></div>
              </div>
              <div className="faq-a">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}