// Project submission page logic (scoped to project-submit.html)

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const translationsSubmit = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navEvents: "Events",
    navContact: "Contact",
    footerBrand: "Free and Open Source Software Society",
    footerJoin: "Join Us",
    footerCopy: "2025 (c) FO3S",

    kicker: "Project Submission",
    title: "Submit your project to FO3S",
    lead: "Share your idea with the community. Fill in your basic info and the project details.",

    visitorTitle: "Visitor information",
    visitorSub: "Basic personal details",
    projectTitle: "Project details",
    projectSub: "Title, description, and links",

    lblFullName: "Full name",
    lblEmail: "Email",
    lblPhone: "Phone (optional)",
    lblOrg: "University / Organization (optional)",
    lblSocial: "Social / GitHub (optional)",

    lblPTitle: "Project title",
    lblPSummary: "Short summary",
    lblPDesc: "Full description",
    lblTech: "Technologies (optional)",
    lblRepo: "Repository URL (optional)",
    lblDemo: "Demo URL (optional)",
    lblFiles: "Attachments (optional)",

    hintRequired: "Required",
    hintPhone: "Example: 9xxxxxxx",
    hintFiles: "You can attach screenshots or a PDF.",

    consent: "I agree to share these details with FO3S for review.",
    btnPreview: "Preview",
    btnSubmit: "Submit",

    previewTitle: "Preview",
    previewOk: "Looks good",

    statusFix: "Please fix the highlighted fields.",
    statusOk: "Saved locally. Next step: connect this form to a backend/email.",
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navEvents: "الفعاليات",
    navContact: "تواصل معنا",
    footerBrand: "جماعة البرمجيات الحرة والمفتوحة المصدر",
    footerJoin: "انضم إلينا",
    footerCopy: "2025 (c) FO3S",

    kicker: "تسليم مشروع",
    title: "قدّم مشروعك إلى FO3S",
    lead: "شارك فكرتك مع المجتمع. املأ معلوماتك الأساسية وتفاصيل المشروع.",

    visitorTitle: "معلومات الزائر",
    visitorSub: "البيانات الشخصية الأساسية",
    projectTitle: "تفاصيل المشروع",
    projectSub: "العنوان، الوصف، والروابط",

    lblFullName: "الاسم الكامل",
    lblEmail: "البريد الإلكتروني",
    lblPhone: "رقم الهاتف (اختياري)",
    lblOrg: "الجامعة / المؤسسة (اختياري)",
    lblSocial: "حساب اجتماعي / GitHub (اختياري)",

    lblPTitle: "عنوان المشروع",
    lblPSummary: "ملخص قصير",
    lblPDesc: "وصف كامل",
    lblTech: "التقنيات (اختياري)",
    lblRepo: "رابط المستودع (اختياري)",
    lblDemo: "رابط تجربة/عرض (اختياري)",
    lblFiles: "مرفقات (اختياري)",

    hintRequired: "مطلوب",
    hintPhone: "مثال: 9xxxxxxx",
    hintFiles: "يمكنك إرفاق صور أو ملف PDF.",

    consent: "أوافق على مشاركة هذه البيانات مع FO3S للمراجعة.",
    btnPreview: "معاينة",
    btnSubmit: "إرسال",

    previewTitle: "معاينة",
    previewOk: "ممتاز",

    statusFix: "يرجى تصحيح الحقول المظللة.",
    statusOk: "تم الحفظ محلياً. الخطوة التالية: ربط النموذج بخدمة إرسال/قاعدة بيانات.",
  },
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerText = value;
}

function updateLang(lang) {
  const t = translationsSubmit[lang] || translationsSubmit.en;

  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  setText("nav-home", t.navHome);
  setText("nav-about", t.navAbout);
  setText("nav-events", t.navEvents);
  setText("nav-contact", t.navContact);

  setText("footer-brand", t.footerBrand);
  setText("footer-join", t.footerJoin);
  setText("footer-copy", t.footerCopy);

  setText("submit-kicker", t.kicker);
  setText("submit-title", t.title);
  setText("submit-lead", t.lead);

  setText("card-visitor-title", t.visitorTitle);
  setText("card-visitor-sub", t.visitorSub);
  setText("card-project-title", t.projectTitle);
  setText("card-project-sub", t.projectSub);

  setText("lbl-fullname", t.lblFullName);
  setText("lbl-email", t.lblEmail);
  setText("lbl-phone", t.lblPhone);
  setText("lbl-org", t.lblOrg);
  setText("lbl-social", t.lblSocial);

  setText("lbl-ptitle", t.lblPTitle);
  setText("lbl-psummary", t.lblPSummary);
  setText("lbl-pdesc", t.lblPDesc);
  setText("lbl-tech", t.lblTech);
  setText("lbl-repo", t.lblRepo);
  setText("lbl-demo", t.lblDemo);
  setText("lbl-files", t.lblFiles);

  setText("hint-fullname", t.hintRequired);
  setText("hint-email", t.hintRequired);
  setText("hint-phone", t.hintPhone);
  setText("hint-ptitle", t.hintRequired);
  setText("hint-psummary", t.hintRequired);
  setText("hint-pdesc", t.hintRequired);
  setText("hint-files", t.hintFiles);

  setText("lbl-consent", t.consent);
  setText("btn-preview", t.btnPreview);
  setText("btn-submit", t.btnSubmit);

  setText("preview-title", t.previewTitle);
  setText("btn-preview-ok", t.previewOk);

  localStorage.setItem("preferred_lang", lang);
}

function count(el, max, outId) {
  const out = document.getElementById(outId);
  if (!out) return;
  out.innerText = `${String(el.value.length)}/${String(max)}`;
}

function setProgress(pct) {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  bar.style.width = `${pct}%`;
}

function computeProgress() {
  const required = [
    $("#fullName"),
    $("#email"),
    $("#projectTitle"),
    $("#projectSummary"),
    $("#projectDesc"),
    $("#consent"),
  ].filter(Boolean);

  const filled = required.filter((el) => {
    if (el.type === "checkbox") return el.checked;
    return String(el.value || "").trim().length > 0;
  }).length;

  const pct = Math.round((filled / required.length) * 100);
  setProgress(pct);
}

function showStatus(msg, ok = false) {
  const s = $("#formStatus");
  if (!s) return;
  s.innerText = msg;
  s.classList.toggle("is-ok", ok);
  s.classList.toggle("is-bad", !ok);
}

function markValidity(form) {
  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((f) => {
    const isValid = f.checkValidity();
    f.classList.toggle("is-invalid", !isValid);
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPreview() {
  const data = {
    fullName: $("#fullName")?.value || "",
    email: $("#email")?.value || "",
    phone: $("#phone")?.value || "",
    org: $("#org")?.value || "",
    social: $("#social")?.value || "",
    projectTitle: $("#projectTitle")?.value || "",
    projectSummary: $("#projectSummary")?.value || "",
    projectDesc: $("#projectDesc")?.value || "",
    tech: $("#tech")?.value || "",
    repoUrl: $("#repoUrl")?.value || "",
    demoUrl: $("#demoUrl")?.value || "",
  };

  const rows = [
    ["Full name / الاسم", data.fullName],
    ["Email / البريد", data.email],
    ["Phone / الهاتف", data.phone],
    ["Org / المؤسسة", data.org],
    ["Social / GitHub", data.social],
    ["Project title / العنوان", data.projectTitle],
    ["Short summary / ملخص", data.projectSummary],
    ["Full description / وصف", data.projectDesc],
    ["Tech / التقنيات", data.tech],
    ["Repo URL", data.repoUrl],
    ["Demo URL", data.demoUrl],
  ];

  return `
    <div class="preview-grid">
      ${rows
        .filter(([, v]) => String(v).trim().length > 0)
        .map(
          ([k, v]) => `
            <div class="preview-row">
              <div class="preview-key">${escapeHtml(k)}</div>
              <div class="preview-val">${escapeHtml(v)}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function openPreview() {
  const modal = $("#previewModal");
  const content = $("#previewContent");
  if (!modal || !content) return;
  content.innerHTML = buildPreview();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePreview() {
  const modal = $("#previewModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = $("#language_toggle");
  const savedLang = localStorage.getItem("preferred_lang") || "ar";
  if (toggle) toggle.checked = savedLang === "en";
  updateLang(savedLang === "en" ? "en" : "ar");

  if (toggle) {
    toggle.addEventListener("change", () => {
      updateLang(toggle.checked ? "en" : "ar");
    });
  }

  const title = $("#projectTitle");
  const summary = $("#projectSummary");
  const desc = $("#projectDesc");

  if (title) title.addEventListener("input", () => count(title, 80, "count-ptitle"));
  if (summary) summary.addEventListener("input", () => count(summary, 220, "count-psummary"));
  if (desc) desc.addEventListener("input", () => count(desc, 1200, "count-pdesc"));

  // init counters
  if (title) count(title, 80, "count-ptitle");
  if (summary) count(summary, 220, "count-psummary");
  if (desc) count(desc, 1200, "count-pdesc");

  const form = $("#projectForm");
  if (!form) return;

  form.addEventListener("input", () => {
    computeProgress();
    showStatus("", true);
  });
  computeProgress();

  $("#previewBtn")?.addEventListener("click", openPreview);
  $("#previewClose")?.addEventListener("click", closePreview);
  $("#previewOk")?.addEventListener("click", closePreview);
  $("#previewModal")?.addEventListener("click", (e) => {
    if (e.target === $("#previewModal")) closePreview();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePreview();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const lang = localStorage.getItem("preferred_lang") || "ar";
    markValidity(form);

    if (!form.checkValidity()) {
      showStatus(translationsSubmit[lang]?.statusFix || translationsSubmit.en.statusFix, false);
      computeProgress();
      return;
    }

    // No backend yet: store a copy locally for now
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.consent = $("#consent")?.checked ? "yes" : "no";
    payload.saved_at = new Date().toISOString();

    const list = JSON.parse(localStorage.getItem("fo3s_project_submissions") || "[]");
    list.unshift(payload);
    localStorage.setItem("fo3s_project_submissions", JSON.stringify(list.slice(0, 50)));

    showStatus(translationsSubmit[lang]?.statusOk || translationsSubmit.en.statusOk, true);
    form.reset();
    computeProgress();
  });
});

