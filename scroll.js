/* =========================================================
   FO3S — Scroll Experience
   Lenis + GSAP ScrollTrigger, canvas frame rendering,
   layered section choreography, bilingual EN/AR.
   ========================================================= */

const FRAME_COUNT = 192;
const FRAME_PATH = (i) => `frames/frame_${String(i + 1).padStart(4, "0")}.webp`;
const FRAME_SPEED = 2.0;       // product animation completes ~55% scroll
const IMAGE_SCALE = 0.68;

gsap.registerPlugin(ScrollTrigger);

/* ---------- 1. Lenis smooth scroll ---------- */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ---------- 2. Canvas setup ---------- */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWrap = document.querySelector(".canvas-wrap");
const bgColor = "#000000"; // video stage is pure black
let currentFrame = -1;

function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    if (currentFrame >= 0) drawFrame(currentFrame);
}
window.addEventListener("resize", () => {
    sizeCanvas();
    ScrollTrigger.refresh();
});

function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete) return;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
}

/* ---------- 3. Frame preloader (two-phase) ---------- */
const frames = new Array(FRAME_COUNT);
const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loader-bar");
const loaderPercent = document.getElementById("loader-percent");
let loaded = 0;

function loadFrame(i) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
            frames[i] = img;
            loaded++;
            const pct = Math.round((loaded / FRAME_COUNT) * 100);
            loaderBar.style.width = pct + "%";
            loaderPercent.textContent = pct + "%";
            resolve();
        };
        img.src = FRAME_PATH(i);
    });
}

async function preload() {
    const firstBatch = 12;
    for (let i = 0; i < firstBatch; i++) await loadFrame(i);
    sizeCanvas();
    currentFrame = 0;
    drawFrame(0);

    const rest = [];
    for (let i = firstBatch; i < FRAME_COUNT; i++) rest.push(loadFrame(i));
    await Promise.all(rest);

    loader.classList.add("is-done");
    ScrollTrigger.refresh();
}

/* ---------- 4. Frame-to-scroll binding ---------- */
const scrollContainer = document.getElementById("scroll-container");

/* emblem drifts opposite the active text zone; a scrim darkens the text side */
const shiftEmblem = gsap.quickTo(canvasWrap, "x", { duration: 0.7, ease: "power3.out" });
const scrim = document.getElementById("stage-scrim");
let lastShift = null;
let lastSide = "init";
const mobile = () => window.innerWidth <= 768;

/* zone per scroll progress: +1 => text left, -1 => text right, 0 => centred */
function textZone(p) {
    if (p < 0.12) return 0;
    if (p < 0.28) return 1;
    if (p < 0.435) return -1;
    if (p < 0.585) return 1;
    if (p < 0.72) return -1;
    if (p < 0.86) return 0;
    return 1;
}
function emblemOffset(p) {
    if (mobile()) return 0;
    return textZone(p) * 12 * (window.innerWidth / 100);
}
function applyScrim(p) {
    const side = mobile() ? 0 : textZone(p);
    if (side === lastSide) return;
    lastSide = side;
    scrim.classList.toggle("on", side !== 0);
    scrim.classList.toggle("to-left", side === 1);
    scrim.classList.toggle("to-right", side === -1);
}

ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
        const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
        const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
        if (index !== currentFrame) {
            currentFrame = index;
            requestAnimationFrame(() => drawFrame(index));
        }
        const off = emblemOffset(self.progress);
        if (off !== lastShift) { lastShift = off; shiftEmblem(off); }
        applyScrim(self.progress);
    }
});

/* ---------- 5. Circle-wipe hero reveal ---------- */
const heroSection = document.querySelector(".hero-standalone");

ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
        const p = self.progress;
        heroSection.style.opacity = Math.max(0, 1 - p * 14);
        heroSection.style.pointerEvents = p > 0.05 ? "none" : "auto";
        const wipe = Math.min(1, Math.max(0, (p - 0.008) / 0.055));
        canvasWrap.style.clipPath = `circle(${wipe * 150}% at 50% 50%)`;
    }
});

/* hero heading intro */
gsap.from(".hero-heading span", {
    yPercent: 120,
    opacity: 0,
    duration: 1.1,
    ease: "power4.out",
    stagger: 0.12,
    delay: 0.2
});
gsap.from([".hero-standalone .section-label", ".hero-tagline", ".scroll-cue"], {
    y: 24,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    delay: 0.6
});

/* ---------- 6. Section choreography ---------- */
function buildEntrance(section, type) {
    const children = section.querySelectorAll(
        ".section-label, .section-heading, .section-body, .cta-row, .stat"
    );
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "none" });

    const base = { opacity: 0, stagger: 0.13, ease: "power3.out", duration: 0.9 };
    switch (type) {
        case "slide-left":  tl.from(children, { ...base, x: -90 }, 0.05); break;
        case "slide-right": tl.from(children, { ...base, x: 90 }, 0.05); break;
        case "scale-up":    tl.from(children, { ...base, scale: 0.82, ease: "power2.out", duration: 1.0 }, 0.05); break;
        case "stagger-up":  tl.from(children, { ...base, y: 70, stagger: 0.15, duration: 0.8 }, 0.05); break;
        case "clip-reveal": tl.from(children, { ...base, clipPath: "inset(100% 0 0 0)", ease: "power4.inOut", duration: 1.2, stagger: 0.16 }, 0.05); break;
        case "fade-up":
        default:            tl.from(children, { ...base, y: 55 }, 0.05); break;
    }
    return tl;
}

document.querySelectorAll(".scroll-section").forEach((section) => {
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;
    const persist = section.dataset.persist === "true";
    const span = leave - enter;

    const revealStart = enter;
    const revealEnd = enter + span * 0.4;
    const exitStart = leave - span * 0.22;
    const exitEnd = leave;

    const tl = buildEntrance(section, section.dataset.animation);

    ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const p = self.progress;
            let prog;
            if (p < revealStart) prog = 0;
            else if (p < revealEnd) prog = (p - revealStart) / (revealEnd - revealStart);
            else if (p < exitStart || persist) prog = 1;
            else if (p < exitEnd) prog = 1 - (p - exitStart) / (exitEnd - exitStart);
            else prog = persist ? 1 : 0;

            tl.progress(prog);
            const active = prog > 0.001;
            section.classList.toggle("is-live", active);
            section.classList.toggle("is-interactive", active && (persist || section.classList.contains("section-cta")) && prog > 0.5);
        }
    });
});

/* ---------- 7. Counter animations ---------- */
const statNumbers = document.querySelectorAll(".stat-number");
let countersDone = false;

function runCounters() {
    if (countersDone) return;
    countersDone = true;
    statNumbers.forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const from = parseFloat(el.dataset.from || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: from };
        gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
                el.textContent = decimals === 0
                    ? String(Math.round(obj.v))
                    : obj.v.toFixed(decimals);
            }
        });
    });
}

ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
        if (self.progress >= 0.75) runCounters();
        else if (self.progress < 0.7 && countersDone) {
            countersDone = false;
            statNumbers.forEach((el) => { el.textContent = el.dataset.from || "0"; });
        }
    }
});

/* ---------- 8. Horizontal marquees ---------- */
document.querySelectorAll(".marquee-wrap").forEach((wrap) => {
    const dir = wrap.dataset.marquee === "b" ? 18 : -28;
    gsap.to(wrap.querySelector(".marquee-text"), {
        xPercent: dir,
        ease: "none",
        scrollTrigger: {
            trigger: scrollContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
        const p = self.progress;
        let o = 0;
        if (p > 0.08 && p < 0.68) o = Math.min(1, (p - 0.08) / 0.05, (0.68 - p) / 0.04);
        document.querySelectorAll(".marquee-wrap").forEach((m) => { m.style.opacity = o * 0.7; });
    }
});

/* ---------- 9. Dark overlay (stats) ---------- */
function initDarkOverlay(enter, leave) {
    const overlay = document.getElementById("dark-overlay");
    const fade = 0.035;
    const peak = 0.96;
    ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const p = self.progress;
            let opacity = 0;
            if (p >= enter - fade && p <= enter) opacity = ((p - (enter - fade)) / fade) * peak;
            else if (p > enter && p < leave) opacity = peak;
            else if (p >= leave && p <= leave + fade) opacity = peak * (1 - (p - leave) / fade);
            overlay.style.opacity = opacity;
        }
    });
}
initDarkOverlay(0.73, 0.86);

/* ---------- 10. Language toggle ---------- */
const LANG_KEY = "preferred_lang";
const langToggle = document.getElementById("lang-toggle");

function applyLang(lang) {
    document.body.dataset.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-en]").forEach((el) => {
        const val = lang === "ar" ? el.dataset.ar : el.dataset.en;
        if (val != null) el.textContent = val;
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    ScrollTrigger.refresh();
}

langToggle.addEventListener("click", () => {
    applyLang(document.body.dataset.lang === "ar" ? "en" : "ar");
});

let startLang = "en";
try { startLang = localStorage.getItem(LANG_KEY) || "en"; } catch (e) {}
applyLang(startLang);

/* ---------- go ---------- */
preload();
