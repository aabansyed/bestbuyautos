import { useEffect, useState } from "react";
import {
  fetchSiteContent, saveSiteContent,
  getOcValues, getOcTeam, getOcPartners, getOcAwards, getOcTimeline,
  getOcInspectionItems, getOcGradeBars, getOcGradeLegend, getOcDocuments, getOcGuarantees,
} from "../../lib/siteContentApi";

// ---- generic list-state helper: every repeatable section below (values,
// team, partners...) is just an array of plain objects, so one hook covers
// edit/add/remove/reorder for all of them instead of repeating the logic 8x.
function useListState(initial) {
  const [items, setItems] = useState(initial);
  const editField = (i, key) => (e) => {
    const value = e.target.value;
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
  };
  const editArrayField = (i, key) => (e) => {
    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [key]: arr } : it)));
  };
  const editNumberField = (i, key) => (e) => {
    const value = Number(e.target.value) || 0;
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
  };
  const add = (empty) => setItems((prev) => [...prev, empty]);
  const remove = (i) => {
    if (!window.confirm("Remove this item?")) return;
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  };
  const move = (i, dir) => {
    setItems((prev) => {
      const ni = i + dir;
      if (ni < 0 || ni >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[ni]] = [next[ni], next[i]];
      return next;
    });
  };
  return { items, setItems, editField, editArrayField, editNumberField, add, remove, move };
}

function Section({ title, desc, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-form" style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
      <button type="button" className="oc-accordion-header" onClick={() => setOpen((o) => !o)}>
        <div>
          <div className="admin-panel-title">{title}</div>
          {desc && <p className="admin-panel-sub" style={{ margin: "4px 0 0" }}>{desc}</p>}
        </div>
        <i className={`fas fa-chevron-${open ? "up" : "down"}`}></i>
      </button>
      {open && <div className="oc-accordion-body">{children}</div>}
    </div>
  );
}

function ListRow({ index, total, list, children, wide }) {
  return (
    <div className="faq-admin-card" style={wide ? { flexWrap: "wrap" } : undefined}>
      <div className="faq-admin-order">
        <button type="button" onClick={() => list.move(index, -1)} disabled={index === 0} title="Move up">
          <i className="fas fa-chevron-up"></i>
        </button>
        <span>{index + 1}</span>
        <button type="button" onClick={() => list.move(index, 1)} disabled={index === total - 1} title="Move down">
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className="faq-admin-fields" style={wide ? { minWidth: 340 } : undefined}>{children}</div>
      <div className="faq-admin-actions">
        <button type="button" className="admin-icon-btn danger" onClick={() => list.remove(index)} title="Remove">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

function AddButton({ onClick, label = "Add Item" }) {
  return (
    <button type="button" className="admin-btn-secondary" onClick={onClick} style={{ marginTop: 12 }}>
      <i className="fas fa-circle-plus"></i> {label}
    </button>
  );
}

export default function OurCompanyManager() {
  const [fields, setFields] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const values = useListState([]);
  const team = useListState([]);
  const partners = useListState([]);
  const awards = useListState([]);
  const timeline = useListState([]);
  const inspectionItems = useListState([]);
  const gradeBars = useListState([]);
  const gradeLegend = useListState([]);
  const documents = useListState([]);
  const guarantees = useListState([]);

  useEffect(() => {
    (async () => {
      try {
        const content = await fetchSiteContent();
        setFields({
          oc_values_tag: content.oc_values_tag, oc_values_title: content.oc_values_title, oc_values_title_gold: content.oc_values_title_gold,
          oc_team_tag: content.oc_team_tag, oc_team_title: content.oc_team_title, oc_team_title_gold: content.oc_team_title_gold, oc_team_desc: content.oc_team_desc,
          oc_partners_tag: content.oc_partners_tag, oc_partners_title: content.oc_partners_title, oc_partners_title_gold: content.oc_partners_title_gold, oc_partners_desc: content.oc_partners_desc,
          oc_awards_tag: content.oc_awards_tag, oc_awards_title: content.oc_awards_title, oc_awards_title_gold: content.oc_awards_title_gold,
          oc_timeline_tag: content.oc_timeline_tag, oc_timeline_title: content.oc_timeline_title, oc_timeline_title_gold: content.oc_timeline_title_gold, oc_timeline_desc: content.oc_timeline_desc,
          oc_inspection_tag: content.oc_inspection_tag, oc_inspection_title: content.oc_inspection_title, oc_inspection_title_gold: content.oc_inspection_title_gold, oc_inspection_desc: content.oc_inspection_desc,
          oc_grade_label: content.oc_grade_label, oc_grade_display: content.oc_grade_display, oc_grade_sub: content.oc_grade_sub,
          oc_documents_tag: content.oc_documents_tag, oc_documents_title: content.oc_documents_title, oc_documents_title_gold: content.oc_documents_title_gold, oc_documents_desc: content.oc_documents_desc,
          oc_guarantees_tag: content.oc_guarantees_tag, oc_guarantees_title: content.oc_guarantees_title, oc_guarantees_title_gold: content.oc_guarantees_title_gold,
          oc_cta_title: content.oc_cta_title, oc_cta_title_gold: content.oc_cta_title_gold, oc_cta_desc: content.oc_cta_desc,
          oc_whatsapp_link: content.oc_whatsapp_link,
        });
        values.setItems(getOcValues(content));
        team.setItems(getOcTeam(content));
        partners.setItems(getOcPartners(content));
        awards.setItems(getOcAwards(content));
        timeline.setItems(getOcTimeline(content));
        inspectionItems.setItems(getOcInspectionItems(content));
        gradeBars.setItems(getOcGradeBars(content));
        gradeLegend.setItems(getOcGradeLegend(content));
        documents.setItems(getOcDocuments(content));
        guarantees.setItems(getOcGuarantees(content));
      } catch (err) {
        setError(err.message || "Failed to load Our Company content.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (key) => (e) => {
    setSaved(false);
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveSiteContent({
        ...fields,
        oc_values: JSON.stringify(values.items),
        oc_team: JSON.stringify(team.items),
        oc_partners: JSON.stringify(partners.items),
        oc_awards: JSON.stringify(awards.items),
        oc_timeline: JSON.stringify(timeline.items),
        oc_inspection_items: JSON.stringify(inspectionItems.items),
        oc_grade_bars: JSON.stringify(gradeBars.items),
        oc_grade_legend: JSON.stringify(gradeLegend.items),
        oc_documents: JSON.stringify(documents.items),
        oc_guarantees: JSON.stringify(guarantees.items),
      });
      setSaved(true);
    } catch (err) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!fields) {
    return <div className="admin-empty"><i className="fas fa-circle-notch fa-spin"></i> Loading…</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Our Company</h1>
          <p className="admin-page-sub">Everything on the public /our-company page — hero &amp; mission live in Company Info, everything else is here.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {error && <div className="admin-auth-error"><i className="fas fa-circle-exclamation"></i> {error}</div>}
      {saved && (
        <div className="admin-auth-error" style={{ background: "rgba(62,207,125,.1)", borderColor: "rgba(62,207,125,.3)", color: "#5be08a" }}>
          <i className="fas fa-circle-check"></i> Saved — changes are live on the site now.
        </div>
      )}

      <form onSubmit={handleSave}>

        {/* ---- VALUES ---- */}
        <Section title="Our Values" desc="The 5 value cards on the Our Company tab.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_values_tag} onChange={setField("oc_values_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_values_title} onChange={setField("oc_values_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_values_title_gold} onChange={setField("oc_values_title_gold")} /></div>
          </div>
          <div className="faq-admin-list">
            {values.items.map((v, i) => (
              <ListRow key={i} index={i} total={values.items.length} list={values}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Icon (Font Awesome class)</label><input className="form-input" value={v.icon} onChange={values.editField(i, "icon")} placeholder="fa-handshake" /></div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={v.title} onChange={values.editField(i, "title")} /></div>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" value={v.desc} onChange={values.editField(i, "desc")} /></div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => values.add({ icon: "fa-star", title: "New Value", desc: "" })} />
        </Section>

        {/* ---- TEAM ---- */}
        <Section title="Leadership Team" desc="The 4 team member cards.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_team_tag} onChange={setField("oc_team_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_team_title} onChange={setField("oc_team_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_team_title_gold} onChange={setField("oc_team_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Section description</label><input className="form-input" value={fields.oc_team_desc} onChange={setField("oc_team_desc")} /></div>
          </div>
          <div className="faq-admin-list">
            {team.items.map((m, i) => (
              <ListRow key={i} index={i} total={team.items.length} list={team} wide>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Initials</label><input className="form-input" value={m.initials} onChange={team.editField(i, "initials")} /></div>
                  <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={m.name} onChange={team.editField(i, "name")} /></div>
                  <div className="form-group"><label className="form-label">Role</label><input className="form-input" value={m.role} onChange={team.editField(i, "role")} /></div>
                </div>
                <div className="form-group"><label className="form-label">Bio</label><textarea className="form-input form-textarea" value={m.desc} onChange={team.editField(i, "desc")} /></div>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <div className="form-group"><label className="form-label">LinkedIn URL (optional)</label><input className="form-input" value={m.linkedin} onChange={team.editField(i, "linkedin")} /></div>
                  <div className="form-group"><label className="form-label">Twitter URL (optional)</label><input className="form-input" value={m.twitter} onChange={team.editField(i, "twitter")} /></div>
                  <div className="form-group"><label className="form-label">WhatsApp URL (optional)</label><input className="form-input" value={m.whatsapp} onChange={team.editField(i, "whatsapp")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => team.add({ initials: "NN", name: "New Person", role: "", desc: "", linkedin: "", twitter: "", whatsapp: "" })} label="Add Team Member" />
        </Section>

        {/* ---- PARTNERS & AWARDS ---- */}
        <Section title="Partners & Awards" desc="The partner logos row and the awards/certifications row.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Partners tag</label><input className="form-input" value={fields.oc_partners_tag} onChange={setField("oc_partners_tag")} /></div>
            <div className="form-group"><label className="form-label">Partners title (plain)</label><input className="form-input" value={fields.oc_partners_title} onChange={setField("oc_partners_title")} /></div>
            <div className="form-group"><label className="form-label">Partners title (gold)</label><input className="form-input" value={fields.oc_partners_title_gold} onChange={setField("oc_partners_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Partners description</label><input className="form-input" value={fields.oc_partners_desc} onChange={setField("oc_partners_desc")} /></div>
          </div>
          <div className="faq-admin-list" style={{ marginBottom: 20 }}>
            {partners.items.map((p, i) => (
              <ListRow key={i} index={i} total={partners.items.length} list={partners}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "0.6fr 2fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Icon (emoji)</label><input className="form-input" value={p.icon} onChange={partners.editField(i, "icon")} /></div>
                  <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={p.name} onChange={partners.editField(i, "name")} /></div>
                  <div className="form-group"><label className="form-label">Country / role</label><input className="form-input" value={p.country} onChange={partners.editField(i, "country")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => partners.add({ icon: "🏢", name: "New Partner", country: "" })} label="Add Partner" />

          <div className="admin-form-grid" style={{ margin: "24px 0 16px" }}>
            <div className="form-group"><label className="form-label">Awards tag</label><input className="form-input" value={fields.oc_awards_tag} onChange={setField("oc_awards_tag")} /></div>
            <div className="form-group"><label className="form-label">Awards title (plain)</label><input className="form-input" value={fields.oc_awards_title} onChange={setField("oc_awards_title")} /></div>
            <div className="form-group"><label className="form-label">Awards title (gold)</label><input className="form-input" value={fields.oc_awards_title_gold} onChange={setField("oc_awards_title_gold")} /></div>
          </div>
          <div className="faq-admin-list">
            {awards.items.map((a, i) => (
              <ListRow key={i} index={i} total={awards.items.length} list={awards}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Icon (Font Awesome class)</label><input className="form-input" value={a.icon} onChange={awards.editField(i, "icon")} /></div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={a.title} onChange={awards.editField(i, "title")} /></div>
                  <div className="form-group"><label className="form-label">Year / detail line</label><input className="form-input" value={a.year} onChange={awards.editField(i, "year")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => awards.add({ icon: "fa-trophy", title: "New Award", year: "" })} label="Add Award" />
        </Section>

        {/* ---- PROCESS TIMELINE ---- */}
        <Section title="Process Timeline" desc="The 6-step 'From Japan to Your Doorstep' timeline on the Our Process tab.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_timeline_tag} onChange={setField("oc_timeline_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_timeline_title} onChange={setField("oc_timeline_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_timeline_title_gold} onChange={setField("oc_timeline_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Section description</label><input className="form-input" value={fields.oc_timeline_desc} onChange={setField("oc_timeline_desc")} /></div>
          </div>
          <div className="faq-admin-list">
            {timeline.items.map((step, i) => (
              <ListRow key={i} index={i} total={timeline.items.length} list={timeline} wide>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Small tag (e.g. "Step 01 — Discovery")</label><input className="form-input" value={step.tag} onChange={timeline.editField(i, "tag")} /></div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={step.title} onChange={timeline.editField(i, "title")} /></div>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" value={step.desc} onChange={timeline.editField(i, "desc")} /></div>
                <div className="form-group"><label className="form-label">Bullet points (comma-separated)</label><input className="form-input" value={(step.points || []).join(", ")} onChange={timeline.editArrayField(i, "points")} /></div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => timeline.add({ tag: "Step 0X", title: "New Step", desc: "", points: [] })} />
        </Section>

        {/* ---- INSPECTION & GRADING ---- */}
        <Section title="Inspection & Grading" desc="The 50-point checklist and the JAAI grade breakdown.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_inspection_tag} onChange={setField("oc_inspection_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_inspection_title} onChange={setField("oc_inspection_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_inspection_title_gold} onChange={setField("oc_inspection_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Section description</label><input className="form-input" value={fields.oc_inspection_desc} onChange={setField("oc_inspection_desc")} /></div>
          </div>

          <p className="admin-panel-sub" style={{ marginBottom: 8 }}>Checklist items (left column):</p>
          <div className="faq-admin-list" style={{ marginBottom: 16 }}>
            {inspectionItems.items.map((it, i) => (
              <div className="faq-admin-card" key={i} style={{ alignItems: "center" }}>
                <div className="oc-list-item-num">{i + 1}</div>
                <div className="faq-admin-fields">
                  <input className="form-input" value={it.label} onChange={inspectionItems.editField(i, "label")} />
                </div>
                <div className="faq-admin-actions" style={{ paddingTop: 0 }}>
                  <button type="button" className="admin-icon-btn" onClick={() => inspectionItems.move(i, -1)} disabled={i === 0}><i className="fas fa-chevron-up"></i></button>
                  <button type="button" className="admin-icon-btn" onClick={() => inspectionItems.move(i, 1)} disabled={i === inspectionItems.items.length - 1}><i className="fas fa-chevron-down"></i></button>
                  <button type="button" className="admin-icon-btn danger" onClick={() => inspectionItems.remove(i)}><i className="fas fa-trash"></i></button>
                </div>
              </div>
            ))}
          </div>
          <AddButton onClick={() => inspectionItems.add({ label: "New check" })} label="Add Checklist Item" />

          <div className="admin-form-grid" style={{ margin: "24px 0 16px" }}>
            <div className="form-group"><label className="form-label">Grade card label</label><input className="form-input" value={fields.oc_grade_label} onChange={setField("oc_grade_label")} /></div>
            <div className="form-group"><label className="form-label">Grade display number</label><input className="form-input" value={fields.oc_grade_display} onChange={setField("oc_grade_display")} /></div>
            <div className="form-group"><label className="form-label">Grade sub-text</label><input className="form-input" value={fields.oc_grade_sub} onChange={setField("oc_grade_sub")} /></div>
          </div>

          <p className="admin-panel-sub" style={{ marginBottom: 8 }}>Grade distribution bars:</p>
          <div className="faq-admin-list" style={{ marginBottom: 16 }}>
            {gradeBars.items.map((g, i) => (
              <ListRow key={i} index={i} total={gradeBars.items.length} list={gradeBars}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "3fr 1fr" }}>
                  <div className="form-group"><label className="form-label">Label</label><input className="form-input" value={g.label} onChange={gradeBars.editField(i, "label")} /></div>
                  <div className="form-group"><label className="form-label">Percent</label><input type="number" min="0" max="100" className="form-input" value={g.percent} onChange={gradeBars.editNumberField(i, "percent")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => gradeBars.add({ label: "New Grade", percent: 0 })} label="Add Grade Bar" />

          <p className="admin-panel-sub" style={{ margin: "20px 0 8px" }}>"What our grades mean" legend:</p>
          <div className="faq-admin-list">
            {gradeLegend.items.map((g, i) => (
              <ListRow key={i} index={i} total={gradeLegend.items.length} list={gradeLegend}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Grade label</label><input className="form-input" value={g.grade} onChange={gradeLegend.editField(i, "grade")} /></div>
                  <div className="form-group"><label className="form-label">Meaning</label><input className="form-input" value={g.meaning} onChange={gradeLegend.editField(i, "meaning")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => gradeLegend.add({ grade: "Grade X:", meaning: "" })} label="Add Legend Row" />
        </Section>

        {/* ---- DOCUMENTS ---- */}
        <Section title="Documents You Receive" desc="The 8-item export documentation list.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_documents_tag} onChange={setField("oc_documents_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_documents_title} onChange={setField("oc_documents_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_documents_title_gold} onChange={setField("oc_documents_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Section description</label><input className="form-input" value={fields.oc_documents_desc} onChange={setField("oc_documents_desc")} /></div>
          </div>
          <div className="faq-admin-list">
            {documents.items.map((d, i) => (
              <ListRow key={i} index={i} total={documents.items.length} list={documents}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Icon (Font Awesome class)</label><input className="form-input" value={d.icon} onChange={documents.editField(i, "icon")} /></div>
                  <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={d.name} onChange={documents.editField(i, "name")} /></div>
                  <div className="form-group"><label className="form-label">Note</label><input className="form-input" value={d.note} onChange={documents.editField(i, "note")} /></div>
                </div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => documents.add({ icon: "fa-file", name: "New Document", note: "" })} />
        </Section>

        {/* ---- GUARANTEES ---- */}
        <Section title="BBA Guarantee" desc="The 4 commitment cards.">
          <div className="admin-form-grid" style={{ marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Section tag</label><input className="form-input" value={fields.oc_guarantees_tag} onChange={setField("oc_guarantees_tag")} /></div>
            <div className="form-group"><label className="form-label">Title (plain)</label><input className="form-input" value={fields.oc_guarantees_title} onChange={setField("oc_guarantees_title")} /></div>
            <div className="form-group"><label className="form-label">Title (gold)</label><input className="form-input" value={fields.oc_guarantees_title_gold} onChange={setField("oc_guarantees_title_gold")} /></div>
          </div>
          <div className="faq-admin-list">
            {guarantees.items.map((g, i) => (
              <ListRow key={i} index={i} total={guarantees.items.length} list={guarantees}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: "1fr 2fr" }}>
                  <div className="form-group"><label className="form-label">Icon (Font Awesome class)</label><input className="form-input" value={g.icon} onChange={guarantees.editField(i, "icon")} /></div>
                  <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={g.title} onChange={guarantees.editField(i, "title")} /></div>
                </div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" value={g.desc} onChange={guarantees.editField(i, "desc")} /></div>
              </ListRow>
            ))}
          </div>
          <AddButton onClick={() => guarantees.add({ icon: "fa-check", title: "New Guarantee", desc: "" })} />
        </Section>

        {/* ---- CTA + CONTACT ---- */}
        <Section title="Bottom CTA & Contact" desc="The closing banner and floating WhatsApp button.">
          <div className="admin-form-grid">
            <div className="form-group"><label className="form-label">CTA title (plain)</label><input className="form-input" value={fields.oc_cta_title} onChange={setField("oc_cta_title")} /></div>
            <div className="form-group"><label className="form-label">CTA title (gold)</label><input className="form-input" value={fields.oc_cta_title_gold} onChange={setField("oc_cta_title_gold")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">CTA description</label><input className="form-input" value={fields.oc_cta_desc} onChange={setField("oc_cta_desc")} /></div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">WhatsApp link</label><input className="form-input" value={fields.oc_whatsapp_link} onChange={setField("oc_whatsapp_link")} /></div>
          </div>
        </Section>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="fas fa-save"></i> {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}