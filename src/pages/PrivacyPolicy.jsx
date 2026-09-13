import { Link } from "react-router-dom";
import "../styles/privacypolicy.css";

export default function PrivacyPolicy() {
  return (
    <>
<div className="breadcrumb-section">
  <div className="breadcrumb-tag">Legal</div>
  <h1 className="breadcrumb-title">Privacy <span style={{background: 'linear-gradient(135deg,var(--gold-dark),var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>Policy</span></h1>
  <nav className="breadcrumb-nav">
    <Link to="/">Home</Link>
    <span className="sep"><i className="fas fa-chevron-right"></i></span>
    <span className="active-crumb">Privacy Policy</span>
  </nav>
  <div className="gold-line"></div>
</div>


<section className="policy-section">
  <div className="policy-inner">

    
    <aside className="policy-toc" data-aos="fade-right">

         </aside>

    
    <div className="policy-content">

      <div className="policy-block" id="intro" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-shield-halved"></i></div>
          <h2 className="block-title">Introduction</h2>
        </div>
        <div className="policy-text">
          <p>Welcome to <strong>BestBuy Auto Japan</strong> ("we", "our", or "us"). We are a Japanese vehicle export company based in Yokohama, Japan, serving customers across 120+ countries worldwide.</p>
          <p>Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services to purchase and export vehicles from Japan.</p>
          <p>By accessing our website or placing an order with us, you agree to the terms of this Privacy Policy. If you do not agree, please refrain from using our services.</p>
          <div className="highlight-box">
            <i className="fas fa-info-circle"></i>
            This policy applies to all information collected through our website, email communications, phone interactions, and any other channels through which you interact with BestBuy Auto Japan.
          </div>
        </div>
      </div>

      <div className="policy-block" id="information" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-database"></i></div>
          <h2 className="block-title">Information We Collect</h2>
        </div>
        <div className="policy-text">
          <p>We collect information that you provide directly to us, as well as information collected automatically when you use our website.</p>
          <p><strong>Personal Information you provide:</strong></p>
          <ul>
            <li>Full name, email address, phone number, and country of residence</li>
            <li>Shipping and delivery address for vehicle export</li>
            <li>Payment information (bank transfer details, billing information)</li>
            <li>Government-issued ID or passport details required for export documentation</li>
            <li>Vehicle preferences, inquiry messages, and order details</li>
            <li>Account login credentials (username and password)</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul>
            <li>IP address, browser type, and operating system</li>
            <li>Pages visited, time spent on site, and referring URLs</li>
            <li>Cookie data and session identifiers</li>
            <li>Device information and screen resolution</li>
          </ul>
        </div>
      </div>

      <div className="policy-block" id="usage" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-cogs"></i></div>
          <h2 className="block-title">How We Use Your Information</h2>
        </div>
        <div className="policy-text">
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To process your vehicle purchase orders and export transactions</li>
            <li>To prepare and issue export documentation, invoices, and Bills of Lading</li>
            <li>To arrange international shipping and customs clearance on your behalf</li>
            <li>To communicate with you about your order status, shipment tracking, and delivery</li>
            <li>To respond to your inquiries, price negotiation requests, and customer support needs</li>
            <li>To send transaction receipts, shipping updates, and important notices</li>
            <li>To improve our website functionality, user experience, and services</li>
            <li>To comply with Japanese export regulations and international trade laws</li>
            <li>To detect and prevent fraudulent transactions or unauthorized access</li>
            <li>To send promotional emails and newsletters (only with your consent)</li>
          </ul>
          <div className="highlight-box">
            <i className="fas fa-envelope"></i>
            You may opt out of marketing emails at any time by clicking the "Unsubscribe" link in any of our emails or by contacting us directly.
          </div>
        </div>
      </div>

      <div className="policy-block" id="sharing" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-share-nodes"></i></div>
          <h2 className="block-title">Sharing of Information</h2>
        </div>
        <div className="policy-text">
          <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:</p>
          <ul>
            <li><strong>Shipping & Logistics Partners:</strong> Freight forwarders, shipping lines, and port agents who need your details to process vehicle export and delivery</li>
            <li><strong>Customs Authorities:</strong> Government bodies in Japan and your destination country require buyer and shipment information for legal export clearance</li>
            <li><strong>Banking Partners:</strong> Financial institutions processing your payment transactions</li>
            <li><strong>Auction Houses:</strong> Japanese vehicle auctions that require buyer registration for bidding purposes</li>
            <li><strong>Legal Requirements:</strong> When required by Japanese law, court order, or regulatory authority</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of company assets, with confidentiality agreements in place</li>
          </ul>
          <p>All third parties we work with are contractually required to protect your information and use it only for the purposes for which it was shared.</p>
        </div>
      </div>

      <div className="policy-block" id="cookies" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-cookie-bite"></i></div>
          <h2 className="block-title">Cookies &amp; Tracking</h2>
        </div>
        <div className="policy-text">
          <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic.</p>
          <p><strong>Types of cookies we use:</strong></p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to function — login sessions, cart management, and security tokens</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics to understand how visitors use our site (page views, bounce rates, traffic sources)</li>
            <li><strong>Preference Cookies:</strong> Remember your currency selection, language, and country preferences</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (only with your consent)</li>
          </ul>
          <p>You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</p>
        </div>
      </div>

      <div className="policy-block" id="security" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-lock"></i></div>
          <h2 className="block-title">Data Security</h2>
        </div>
        <div className="policy-text">
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
          <ul>
            <li>SSL/TLS encryption for all data transmitted through our website</li>
            <li>Secure servers and encrypted databases for storing personal information</li>
            <li>Restricted access — only authorized personnel can access customer data</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Two-factor authentication for internal admin accounts</li>
          </ul>
          <div className="highlight-box">
            <i className="fas fa-triangle-exclamation"></i>
            <strong>Important:</strong> BestBuy Auto Japan will <strong>never</strong> ask you to send payments to bank accounts other than those listed on our official website. Always verify banking details directly on our site.
          </div>
        </div>
      </div>

      <div className="policy-block" id="retention" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-clock-rotate-left"></i></div>
          <h2 className="block-title">Data Retention</h2>
        </div>
        <div className="policy-text">
          <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including:</p>
          <ul>
            <li>Active account data is retained for the duration of your account with us</li>
            <li>Transaction and export records are kept for a minimum of 7 years to comply with Japanese tax and trade regulations</li>
            <li>Export documentation (invoices, Bills of Lading, export certificates) are retained for 10 years as required by law</li>
            <li>Marketing preferences and newsletter subscriptions are retained until you opt out</li>
            <li>Website analytics data is retained for up to 26 months</li>
          </ul>
          <p>When your data is no longer required, we securely delete or anonymize it in accordance with applicable data protection laws.</p>
        </div>
      </div>

      <div className="policy-block" id="rights" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-user-shield"></i></div>
          <h2 className="block-title">Your Rights</h2>
        </div>
        <div className="policy-text">
          <p>Depending on your country of residence, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
            <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to the processing of your personal data for marketing purposes</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for any processing based on your consent at any time</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details in the Contact section below. We will respond to your request within 30 days.</p>
        </div>
      </div>

      <div className="policy-block" id="thirdparty" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-link"></i></div>
          <h2 className="block-title">Third-Party Links</h2>
        </div>
        <div className="policy-text">
          <p>Our website may contain links to third-party websites, including social media platforms (Facebook, Instagram), shipping tracking portals, and auction sites. These websites have their own privacy policies, and we have no control over their content or practices.</p>
          <p>We are not responsible for the privacy practices or content of any third-party websites. We encourage you to review the privacy policy of every site you visit.</p>
          <p>Links to third-party sites on our website are provided for your convenience only and do not imply endorsement by BestBuy Auto Japan.</p>
        </div>
      </div>

      <div className="policy-block" id="children" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-child"></i></div>
          <h2 className="block-title">Children's Privacy</h2>
        </div>
        <div className="policy-text">
          <p>Our services are intended for adults aged 18 and above. We do not knowingly collect personal information from children under the age of 18.</p>
          <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will promptly delete any such information from our records upon verification.</p>
        </div>
      </div>

      <div className="policy-block" id="changes" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-rotate"></i></div>
          <h2 className="block-title">Policy Changes</h2>
        </div>
        <div className="policy-text">
          <p>We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we will:</p>
          <ul>
            <li>Update the "Last Updated" date at the top of this page</li>
            <li>Notify registered users via email for significant changes</li>
            <li>Display a notice on our website homepage for major policy updates</li>
          </ul>
          <p>Your continued use of our website and services after any modifications constitutes your acceptance of the updated Privacy Policy.</p>
        </div>
      </div>

      <div className="policy-block" id="contact" data-aos="fade-up">
        <div className="block-header">
          <div className="block-icon"><i className="fas fa-envelope"></i></div>
          <h2 className="block-title">Contact Us</h2>
        </div>
        <div className="policy-text">
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please reach out to us through any of the following channels:</p>
          <div className="contact-card">
            <div className="contact-row"><i className="fas fa-building"></i> BestBuy Auto Japan</div>
            <div className="contact-row"><i className="fas fa-map-marker-alt"></i> Aichi, Japan</div>
            <div className="contact-row"><i className="fas fa-envelope"></i> <a href="mailto:info@bbajapan.com">info@bbajapan.com</a></div>
            <div className="contact-row"><i className="fas fa-envelope"></i> <a href="mailto:support@bbajapan.com">admin@bbajapan.com</a></div>
            <div className="contact-row"><i className="fab fa-whatsapp"></i> <a href="https://wa.me/8190XXXXXXXX">+81-90-XXXX-XXXX</a></div>
            <div className="contact-row"><i className="fas fa-clock"></i> Mon–Sat: 9:00 AM – 7:00 PM JST</div>
          </div>
          <p style={{marginTop: '20px'}}>We are committed to resolving any privacy concerns you may have and will respond to all inquiries within <strong>2–3 business days</strong>.</p>
        </div>
      </div>

    </div>
  </div>
</section>




<div className="float-group">
  <a className="float-btn float-wa" href="https://wa.me/8190XXXXXXXX" target="_blank" rel="noreferrer">
    <span className="float-label">WhatsApp Us</span>
    <i className="fab fa-whatsapp"></i>
  </a>
</div>
    </>
  );
}
