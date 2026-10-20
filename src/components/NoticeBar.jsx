// Self-contained notice marquee: CSS is embedded below, so NO separate css file / import is needed.
// Usage in Layout.jsx:  import NoticeBar from "./NoticeBar";  ...  <NoticeBar />

const NOTICE_TEXT =
  "For all payments and customer support, please use only the banking details and contact number provided on our website. Any communication or payment to other numbers will not be the responsibility of BestBuy Auto.";

const CSS = `
.bbn-bar{background:#8b1a1a;border-top:1px solid gold;border-bottom:1px solid gold;display:flex;align-items:center;overflow:hidden;height:36px;width:100%;position:relative;z-index:1000;}
.bbn-label{background:gold;color:#111;font-size:11px;font-weight:700;padding:0 14px;height:100%;display:flex;align-items:center;gap:6px;white-space:nowrap;text-transform:uppercase;letter-spacing:.08em;flex-shrink:0;}
.bbn-viewport{flex:1;min-width:0;height:100%;overflow:hidden;display:flex;align-items:center;}
.bbn-track{display:flex;width:max-content;animation:bbnScroll 45s linear infinite;will-change:transform;}
.bbn-group{display:flex;align-items:center;flex-shrink:0;min-width:100vw;justify-content:space-around;}
.bbn-item{display:flex;align-items:center;gap:10px;flex-shrink:0;padding:0 40px;color:#fff;font-size:12.5px;line-height:1;white-space:nowrap;}
.bbn-item i{color:gold;font-size:11px;}
.bbn-bar:hover .bbn-track{animation-play-state:paused;}
@keyframes bbnScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (max-width:600px){.bbn-track{animation-duration:35s;}.bbn-label{padding:0 10px;font-size:10px;}}
@media (prefers-reduced-motion:reduce){.bbn-track{animation:none;}}
`;

export default function NoticeBar() {
  return (
    <>
      <style>{CSS}</style>
      <div className="bbn-bar">
        <div className="bbn-label">
          <i className="fas fa-triangle-exclamation"></i> Notice
        </div>
        <div className="bbn-viewport">
          <div className="bbn-track">
            {[0, 1].map((g) => (
              <div className="bbn-group" key={g} aria-hidden={g === 1 ? "true" : undefined}>
                {[0, 1].map((n) => (
                  <span className="bbn-item" key={n}>
                    <i className="fas fa-shield-halved"></i>
                    {NOTICE_TEXT}
                    <i className="fas fa-car"></i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}