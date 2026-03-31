// Contact page logic (scoped to contact.html)

const $ = (sel) => document.querySelector(sel);

const translationsContact = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navEvents: "Events",
    navContact: "Contact",
    footerBrand: "Free and Open Source Software Society",
    footerJoin: "Join Us",
    footerCopy: "2025 (c) FO3S",

    kicker: "Contact",
    title: "Get in touch with FO3S",
    lead: "We’d love to hear from you. Use the form below or reach us through our official channels.",

    instCta: "Open",
    twCta: "Open",
    phCta: "Call",
    mailCta: "Email",

    formTitle: "Send us a message",
    formSub: "We typically respond as soon as possible.",

    lblName: "Full name",
    lblEmail: "Email",
    lblPhone: "Phone (optional)",
    lblSubject: "Subject",
    lblMessage: "Message",

    required: "Required",
    btnPreview: "Preview",
    btnSend: "Send",
    previewTitle: "Preview",
    previewOk: "Looks good",

    statusFix: "Please fix the highlighted fields.",
    statusOk: "Saved locally. Next step: connect to backend/email.",
  },
  ar: {
    navHome: "الرئيسية",
    navAbout: "من نحن",
    navEvents: "الفعاليات",
    navContact: "تواصل معنا",
    footerBrand: "جماعة البرمجيات الحرة والمفتوحة المصدر",
    footerJoin: "انضم إلينا",
    footerCopy: "2025 (c) FO3S",

    kicker: "تواصل معنا",
    title: "تواصل مع جماعة FO3S",
    lead: "يسعدنا سماعك. استخدم النموذج أدناه أو تواصل معنا عبر القنوات الرسمية.",

    instCta: "فتح",
    twCta: "فتح",
    phCta: "اتصال",
    mailCta: "إرسال",

    formTitle: "أرسل لنا رسالة",
    formSub: "نحاول الرد بأسرع وقت ممكن.",

    lblName: "الاسم الكامل",
    lblEmail: "البريد الإلكتروني",
    lblPhone: "رقم الهاتف (اختياري)",
    lblSubject: "عنوان الرسالة",
    lblMessage: "نص الرسالة",

    required: "مطلوب",
    btnPreview: "معاينة",
    btnSend: "إرسال",
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
  const t = translationsContact[lang] || translationsContact.en;
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  setText("nav-home", t.navHome);
  setText("nav-about", t.navAbout);
  setText("nav-events", t.navEvents);
  setText("nav-contact", t.navContact);

  setText("footer-brand", t.footerBrand);
  setText("footer-join", t.footerJoin);
  setText("footer-copy", t.footerCopy);

  setText("contact-kicker", t.kicker);
  setText("contact-title", t.title);
  setText("contact-lead", t.lead);

  setText("card-inst-cta", t.instCta);
  setText("card-tw-cta", t.twCta);
  setText("card-ph-cta", t.phCta);
  setText("card-mail-cta", t.mailCta);

  setText("form-title", t.formTitle);
  setText("form-sub", t.formSub);

  setText("lbl-name", t.lblName);
  setText("lbl-email", t.lblEmail);
  setText("lbl-phone", t.lblPhone);
  setText("lbl-subject", t.lblSubject);
  setText("lbl-message", t.lblMessage);

  setText("hint-name", t.required);
  setText("hint-email", t.required);
  setText("hint-subject", t.required);
  setText("hint-message", t.required);

  setText("btn-preview", t.btnPreview);
  setText("btn-submit", t.btnSend);
  setText("preview-title", t.previewTitle);
  setText("btn-preview-ok", t.previewOk);

  localStorage.setItem("preferred_lang", lang);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  fields.forEach((f) => f.classList.toggle("is-invalid", !f.checkValidity()));
}

function count(el, max, outId) {
  const out = document.getElementById(outId);
  if (!out) return;
  out.innerText = `${String(el.value.length)}/${String(max)}`;
}

function buildPreview() {
  const data = {
    name: $("#name")?.value || "",
    email: $("#email")?.value || "",
    phone: $("#phone")?.value || "",
    subject: $("#subject")?.value || "",
    message: $("#message")?.value || "",
  };

  const rows = [
    ["Full name / الاسم", data.name],
    ["Email / البريد", data.email],
    ["Phone / الهاتف", data.phone],
    ["Subject / العنوان", data.subject],
    ["Message / الرسالة", data.message],
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

  toggle?.addEventListener("change", () => {
    updateLang(toggle.checked ? "en" : "ar");
  });

  const subject = $("#subject");
  const message = $("#message");
  if (subject) subject.addEventListener("input", () => count(subject, 90, "count-subject"));
  if (message) message.addEventListener("input", () => count(message, 1500, "count-message"));
  if (subject) count(subject, 90, "count-subject");
  if (message) count(message, 1500, "count-message");

  $("#previewBtn")?.addEventListener("click", openPreview);
  $("#previewClose")?.addEventListener("click", closePreview);
  $("#previewOk")?.addEventListener("click", closePreview);
  $("#previewModal")?.addEventListener("click", (e) => {
    if (e.target === $("#previewModal")) closePreview();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePreview();
  });

  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("input", () => showStatus("", true));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const lang = localStorage.getItem("preferred_lang") || "ar";
    markValidity(form);

    if (!form.checkValidity()) {
      showStatus(translationsContact[lang]?.statusFix || translationsContact.en.statusFix, false);
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.saved_at = new Date().toISOString();

    const list = JSON.parse(localStorage.getItem("fo3s_contact_messages") || "[]");
    list.unshift(payload);
    localStorage.setItem("fo3s_contact_messages", JSON.stringify(list.slice(0, 50)));

    showStatus(translationsContact[lang]?.statusOk || translationsContact.en.statusOk, true);
    form.reset();
    if (subject) count(subject, 90, "count-subject");
    if (message) count(message, 1500, "count-message");
  });
});

