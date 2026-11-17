class SlidePresenter {
    constructor(lessonKey) {
        this.lessonKey = lessonKey;
        this.slides = [];
        this.currentSlide = 0;
        this.currentStep = 0;
        this.mode = "5es";
        this.isDark = false;
        this.isDrawing = false;
        this.ensureDeps(() => {
            this.loadLessonData();
            this.initUI();
        });
    }
    ensureDeps(cb) {
        const files = ["lp7.js", "lp8.js", "lp9.js", "lp10.js", "lp11.js", "lp12.js"];
        let pending = 0;
        const done = () => { if (--pending <= 0) cb(); };

        // Load KaTeX if missing
        if (!window.katex || !window.renderMathInElement) {
            if (!document.querySelector("link[href*=katex]")) {
                const l = document.createElement("link");
                l.rel = "stylesheet";
                l.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
                document.head.appendChild(l);
            }
            pending += 2;
            const s1 = document.createElement("script");
            s1.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
            s1.onload = () => {
                done();
                const s2 = document.createElement("script");
                s2.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js";
                s2.onload = s2.onerror = () => { done(); if (this.slides.length) this.renderSlide(); };
                document.head.appendChild(s2);
            };
            s1.onerror = () => { done(); done(); };
            document.head.appendChild(s1);
        }

        files.forEach(f => {
            if (!document.querySelector(`script[src^="${f}"]`)) {
                pending++;
                const s = document.createElement("script");
                s.src = f;
                s.onload = s.onerror = done;
                document.head.appendChild(s);
            }
        });
        if (pending === 0) cb();
    }
    normalizeLines(arr) {
        if (!Array.isArray(arr)) return arr ? [String(arr)] : [];
        const out = [];
        for (let i = 0; i < arr.length; i++) {
            let cur = String(arr[i] || "").trim();
            if (!cur) continue;
            // Merge trailing hanging Khmer connectors like "បើ", "ដែល", "ចំពោះ", "នៃ"
            while (i + 1 < arr.length && /(បើ|ដែល|ចំពោះ|នៃ|គឺ|ស្មើ|ដោយ|មាន|និង|ឬ|:|៖)\s*$/.test(cur)) {
                i++;
                cur += " " + String(arr[i] || "").trim();
            }
            // Add clean spacing around $...$ for KaTeX
            cur = cur.replace(/([^\s$])\$/g, "$1 $").replace(/\$([^\s$])/g, "$ $1");
            out.push(cur);
        }
        return out;
    }
    loadLessonData() {
        const db = window.LP_DB || window.lessonPlanDB || {};
        const keys = Object.keys(db);
        const targetKey = db[this.lessonKey] ? this.lessonKey : (keys[0] || null);
        this.lessonKey = targetKey;
        const lesson = targetKey ? db[targetKey] : {
            title: "មេរៀនគណិតវិទ្យា (4-in-1)",
            obj: { knowledge: ["វត្ថុបំណងមេរៀន"], skills: ["អនុវត្តលំហាត់តាមដំណាក់កាល"] }
        };
        this.slides = [
            {
                type: "title",
                title: lesson.title,
                kicker: `គណិតវិទ្យាវិទ្យាល័យ • រយៈពេល ${lesson.dur || 45} នាទី`,
                lines: [
                    "# 🎯 វត្ថុបំណងមេរៀន (ចំណេះដឹង និងបំណិន)",
                    ...this.normalizeLines(lesson.obj && lesson.obj.knowledge),
                    ...this.normalizeLines(lesson.obj && lesson.obj.skills)
                ]
            }
        ];
        if (lesson.steps && Array.isArray(lesson.steps)) {
            lesson.steps.forEach((st, idx) => {
                const ctLines = this.normalizeLines(st.ct);
                const tcLines = this.normalizeLines(st.tc);
                const stLines = this.normalizeLines(st.st);
                const allLines = [];
                if (ctLines.length) allLines.push(...ctLines);
                if (tcLines.length) allLines.push("# 👨‍🏫 សកម្មភាពគ្រូ៖ " + tcLines.join(" • "));
                if (stLines.length) allLines.push("🎓 សកម្មភាពសិស្ស៖ " + stLines.join(" • "));
                this.slides.push({
                    type: "content",
                    title: `${st.n || ("ជំហានទី " + (idx + 1))} (${st.t || 10} នាទី)`,
                    lines: allLines.length ? allLines : ["ខ្លឹមសារមេរៀន"],
                    ct: ctLines,
                    tc: tcLines,
                    st: stLines
                });
            });
        }
        if (lesson.worksheet) {
            const wsLines = this.normalizeLines(Array.isArray(lesson.worksheet) ? lesson.worksheet : [lesson.worksheet]);
            if (wsLines.length) {
                this.slides.push({ type: "content", title: "📝 សន្លឹកកិច្ចការ និងលំហាត់អនុវត្ត", lines: wsLines, ct: wsLines });
            }
        }
    }
    initUI() {
        const old = document.getElementById("slide-presenter-overlay");
        if (old) old.remove();
        const db = window.LP_DB || window.lessonPlanDB || {};
        const lessonOptions = Object.keys(db).map(k => {
            const sel = k === this.lessonKey ? "selected" : "";
            return `<option value="${k}" ${sel}>${k} : ${(db[k].title || "").slice(0, 34)}</option>`;
        }).join("");

        const overlay = document.createElement("div");
        overlay.id = "slide-presenter-overlay";
        overlay.innerHTML = [
            "<div class=\"sp-header\">",
            "  <div><div class=\"sp-kicker\" id=\"sp-kicker\">🌐 លោកខាងលិច (5Es / IBL)</div><div class=\"sp-title\" id=\"sp-slide-title\"></div></div>",
            "  <div><span id=\"sp-counter\" style=\"font-size:18px;font-weight:bold;color:var(--slide-muted);\">1 / " + this.slides.length + "</span></div>",
            "</div>",
            "<div class=\"sp-body\" id=\"sp-slide-body\"></div>",
            "<canvas id=\"sp-canvas\"></canvas>",
            "<div class=\"sp-controls forced-show\" id=\"sp-control-bar\">",
            "  <select class=\"sp-select\" id=\"sp-lesson-select\" style=\"max-width:220px;\">" + lessonOptions + "</select>",
            "  <select class=\"sp-select\" id=\"sp-mode-select\">",
            "    <option value=\"5es\">🌐 លោកខាងលិច (5Es / IBL)</option>",
            "    <option value=\"bansho\">🇯🇵 ជប៉ុន (Bansho Split)</option>",
            "    <option value=\"cpa\">🇸🇬 សិង្ហបុរី (CPA / Misconception)</option>",
            "    <option value=\"tiered\">🇫🇮 ហ្វាំងឡង់ (Tiered Cards)</option>",
            "  </select>",
            "  <button class=\"sp-btn\" id=\"sp-prev\">◀ ថយ</button>",
            "  <button class=\"sp-btn\" id=\"sp-next\">បន្ត ▶</button>",
            "  <button class=\"sp-btn\" id=\"sp-all\">👁️ បង្ហាញទាំងអស់</button>",
            "  <button class=\"sp-btn\" id=\"sp-pen\">✏️ គូស</button>",
            "  <button class=\"sp-btn\" id=\"sp-clear\">🧹 លុប</button>",
            "  <button class=\"sp-btn\" id=\"sp-dark\">🌓 ពន្លឺ</button>",
            "  <button class=\"sp-btn\" id=\"sp-close\" style=\"color:#FCA5A5;font-weight:bold;\">✕ បិទ</button>",
            "</div>"
        ].join("\n");
        document.body.appendChild(overlay);
        setTimeout(() => { const b = document.getElementById("sp-control-bar"); if (b) b.classList.remove("forced-show"); }, 3500);
        this.canvas = document.getElementById("sp-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.getElementById("sp-next").onclick = () => this.nextStep();
        document.getElementById("sp-prev").onclick = () => this.prevStep();
        document.getElementById("sp-all").onclick = () => {
            const lines = this.slides[this.currentSlide].lines || [];
            this.currentStep = Math.max(0, lines.length - 1);
            this.renderSlide();
        };
        document.getElementById("sp-close").onclick = () => { window.removeEventListener("keydown", this.boundKeyHandler); overlay.remove(); };
        document.getElementById("sp-dark").onclick = () => { this.isDark = !this.isDark; overlay.classList.toggle("dark-mode", this.isDark); };
        document.getElementById("sp-lesson-select").onchange = (e) => {
            this.lessonKey = e.target.value;
            this.currentSlide = 0; this.currentStep = 0;
            this.loadLessonData();
            this.renderSlide();
        };
        document.getElementById("sp-mode-select").onchange = (e) => { this.mode = e.target.value; document.getElementById("sp-kicker").innerText = e.target.options[e.target.selectedIndex].text; this.renderSlide(); };
        document.getElementById("sp-pen").onclick = (e) => { this.isDrawing = !this.isDrawing; this.canvas.classList.toggle("active", this.isDrawing); e.target.style.background = this.isDrawing ? "#1F4FBF" : ""; };
        document.getElementById("sp-clear").onclick = () => { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); };
        this.boundKeyHandler = (e) => {
            if (["ArrowRight", " ", "PageDown"].includes(e.key)) { e.preventDefault(); this.nextStep(); }
            else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); this.prevStep(); }
            else if (e.key === "Escape") { window.removeEventListener("keydown", this.boundKeyHandler); overlay.remove(); }
        };
        window.addEventListener("keydown", this.boundKeyHandler);
        let drawing = false;
        this.canvas.onmousedown = (e) => { if (this.isDrawing) { drawing = true; this.ctx.beginPath(); this.ctx.moveTo(e.clientX, e.clientY); } };
        this.canvas.onmousemove = (e) => { if (drawing && this.isDrawing) { this.ctx.lineTo(e.clientX, e.clientY); this.ctx.strokeStyle = this.isDark ? "#38BDF8" : "#EF4444"; this.ctx.lineWidth = 4; this.ctx.stroke(); } };
        this.canvas.onmouseup = () => { drawing = false; };
        this.renderSlide();
    }
    renderSlide() {
        const slide = this.slides[this.currentSlide];
        document.getElementById("sp-slide-title").innerText = slide.title || "";
        document.getElementById("sp-counter").innerText = (this.currentSlide + 1) + " / " + this.slides.length;
        const body = document.getElementById("sp-slide-body");
        body.className = "sp-body layout-" + this.mode;
        body.innerHTML = "";
        const lines = slide.lines || [];
        if (this.mode === "bansho") {
            const c1 = document.createElement("div"), c2 = document.createElement("div");
            c1.innerHTML = "<h3 style=\"color:#1F4FBF;margin-bottom:15px;\">📋 ខ្លឹមសារក្តារខៀន (ខ្លឹមសារមេរៀន)</h3>";
            c2.innerHTML = "<h3 style=\"color:#10B981;margin-bottom:15px;\">💡 ការវិភាគ និងសកម្មភាព (គ្រូ & សិស្ស)</h3>";
            const leftLines = (slide.ct && slide.ct.length) ? slide.ct : lines;
            const rightLines = [...(slide.tc || []), ...(slide.st || [])];
            leftLines.forEach((l, i) => {
                const d = document.createElement("div");
                d.className = "sp-step-item " + (i <= this.currentStep ? "revealed " : "") + (l.startsWith("#") ? "highlight" : "");
                d.innerHTML = l.replace(/^#\s*/, "");
                c1.appendChild(d);
            });
            (rightLines.length ? rightLines : ["ពិភាក្សា និងប្រៀបធៀបដំណោះស្រាយ"]).forEach((l, i) => {
                const d = document.createElement("div");
                d.className = "sp-step-item " + (i <= this.currentStep ? "revealed" : "");
                d.innerHTML = l;
                c2.appendChild(d);
            });
            body.appendChild(c1); body.appendChild(c2);
        } else if (this.mode === "tiered") {
            const src = (slide.ct && slide.ct.length) ? slide.ct : lines;
            [
                { name: "🟢 កម្រិតមូលដ្ឋាន (Basic)", cls: "basic", text: src[0] || "ខ្លឹមសារគ្រឹះ និងនិយមន័យសំខាន់ៗ" },
                { name: "🔵 កម្រិតស្តង់ដារ (Standard)", cls: "standard", text: src[1] || (slide.tc && slide.tc[0]) || "ការអនុវត្តរូបមន្ត និងឧទាហរណ៍គំរូ" },
                { name: "🟡 កម្រិតប្រកួតប្រជែង (Challenge)", cls: "challenge", text: src[2] || (slide.st && slide.st[0]) || "លំហាត់ត្រៀមបាក់ឌុប និងសិស្សពូកែ" }
            ].forEach(tr => {
                const card = document.createElement("div");
                card.className = "tier-card " + tr.cls;
                card.innerHTML = "<strong style=\"display:block;margin-bottom:8px;\">" + tr.name + "</strong><span>" + tr.text + "</span>";
                body.appendChild(card);
            });
        } else if (this.mode === "cpa") {
            const src = (slide.ct && slide.ct.length) ? slide.ct : lines;
            [
                { label: "🧱 រូបី (Concrete - ស្ថានភាពបញ្ហា)", text: src[0] || "ពិនិត្យឧទាហរណ៍ជាក់ស្តែង" },
                { label: "📊 គំនូសតាង / រូបមន្ត (Pictorial & Abstract)", text: src[1] || src[0] || "សរសេរជាទម្រង់រូបមន្តទូទៅ" },
                { label: "⚠️ ចំណុចងាយភាន់ច្រឡំ (Common Misconception)", text: (slide.tc && slide.tc[0]) || "ប្រយ័ត្នសញ្ញា និងលក្ខខណ្ឌដែនកំណត់" }
            ].forEach((blk, i) => {
                const d = document.createElement("div");
                d.className = "sp-step-item " + (i <= this.currentStep ? "revealed " : "") + (i === 2 ? "highlight" : "");
                d.innerHTML = "<strong>" + blk.label + "៖</strong><br>" + blk.text;
                body.appendChild(d);
            });
        } else {
            lines.forEach((l, i) => {
                const d = document.createElement("div");
                d.className = "sp-step-item " + (i <= this.currentStep ? "revealed " : "") + (l.startsWith("#") ? "highlight" : "");
                d.innerHTML = l.replace(/^#\s*/, "");
                body.appendChild(d);
            });
        }
        if (window.renderMathInElement) {
            renderMathInElement(body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false},
                    {left: "\\[", right: "\\]", display: true}
                ],
                throwOnError: false
            });
        }
    }
    nextStep() {
        const lines = this.slides[this.currentSlide].lines || [];
        if (this.currentStep < lines.length - 1) { this.currentStep++; this.renderSlide(); }
        else if (this.currentSlide < this.slides.length - 1) { this.currentSlide++; this.currentStep = 0; this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); this.renderSlide(); }
    }
    prevStep() {
        if (this.currentStep > 0) { this.currentStep--; this.renderSlide(); }
        else if (this.currentSlide > 0) { this.currentSlide--; const lines = this.slides[this.currentSlide].lines || []; this.currentStep = Math.max(0, lines.length - 1); this.renderSlide(); }
    }
}
function startSlidePresenter(lessonKey) { window.activeSlidePresenter = new SlidePresenter(lessonKey || "12_11"); }
window.addEventListener("DOMContentLoaded", () => {
    const btn = document.createElement("button");
    btn.innerHTML = "🖥️ បញ្ចាំងស្លាយ 4-in-1";
    btn.style.cssText = "position:fixed;bottom:90px;right:24px;z-index:9999;background:#1F4FBF;color:#fff;border:none;padding:12px 20px;border-radius:30px;font-family:\"Khmer OS Battambang\",sans-serif;font-size:15px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(31,79,191,0.4);";
    btn.onclick = () => {
        const activeSel = document.querySelector("select[id*=lp], select[id*=lesson]");
        startSlidePresenter((activeSel && activeSel.value) ? activeSel.value : "12_11");
    };
    document.body.appendChild(btn);
});