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
        const files = ["lessonplans.js", "lp7.js", "lp8.js", "lp9.js", "lp10.js", "lp11.js", "lp12.js", "practice7.js", "practice8.js", "practice9.js", "practice10.js", "practice11.js", "pisa12.js"];
        let pending = 0;
        let called = false;
        const finish = () => {
            if (called) return;
            called = true;
            window.LP_DB = Object.assign({}, window.LPX || {}, window.lessonPlanDB || {}, window.LP_DB || {});
            cb();
            this.populateLessonDropdown(this.getGradeFromKey(this.lessonKey));
        };
        const done = () => { if (--pending <= 0) finish(); };

        if (!window.katex) {
            if (!document.querySelector("link[href*=katex]")) {
                const l = document.createElement("link");
                l.rel = "stylesheet";
                l.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
                document.head.appendChild(l);
            }
            pending++;
            const s1 = document.createElement("script");
            s1.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
            s1.onload = s1.onerror = () => { done(); if (this.slides.length) this.renderSlide(); };
            document.head.appendChild(s1);
        }

        files.forEach(f => {
            const existing = document.querySelector(`script[src^="${f}"]`);
            if (!existing) {
                pending++;
                const s = document.createElement("script");
                s.src = f + "?v=10";
                s.onload = s.onerror = done;
                document.head.appendChild(s);
            }
        });
        if (pending === 0) finish();
    }
    renderKaTeXDirect(el) {
        if (!window.katex) return;
        let html = el.innerHTML;
        // Convert $$...$$ display math first
        html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
            try { return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false }); }
            catch (e) { return tex; }
        });
        // Convert $...$ inline math (trimming internal spaces so KaTeX always renders cleanly)
        html = html.replace(/\$([^\$\n]+?)\$/g, (_, tex) => {
            try { return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false }); }
            catch (e) { return tex; }
        });
        el.innerHTML = html;
    }
    normalizeLines(arr) {
        if (!Array.isArray(arr)) return arr ? [String(arr)] : [];
        const out = [];
        for (let i = 0; i < arr.length; i++) {
            let cur = String(arr[i] || "").trim();
            if (!cur) continue;
            while (i + 1 < arr.length && /(បើ|ដែល|ចំពោះ|នៃ|គឺ|ស្មើ|ដោយ|មាន|និង|ឬ|:|៖)\s*$/.test(cur)) {
                i++;
                cur += " " + String(arr[i] || "").trim();
            }
            out.push(cur);
        }
        return out;
    }
    getGradeFromKey(k) {
        const m = String(k).match(/^(\d+)_/);
        return m ? m[1] : "12";
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
                kicker: `ថ្នាក់ទី ${this.getGradeFromKey(targetKey)} • រយៈពេល ${lesson.dur || 45} នាទី`,
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
    populateLessonDropdown(grade) {
        const db = Object.assign({}, window.LPX || {}, window.lessonPlanDB || {}, window.LP_DB || {});
        const lessonSel = document.getElementById("sp-lesson-select");
        if (!lessonSel) return [];
        const filteredKeys = Object.keys(db)
            .filter(k => this.getGradeFromKey(k) === String(grade))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
        lessonSel.innerHTML = filteredKeys.map(k => {
            const sel = k === this.lessonKey ? "selected" : "";
            const label = k.replace("_", ".") + " : " + (db[k].title || "");
            return `<option value="${k}" ${sel}>${label}</option>`;
        }).join("");
        return filteredKeys;
    }
    initUI() {
        const old = document.getElementById("slide-presenter-overlay");
        if (old) old.remove();
        const curGrade = this.getGradeFromKey(this.lessonKey);
        const grades = ["7", "8", "9", "10", "11", "12"];
        const gradeOptions = grades.map(g => `<option value="${g}" ${g === curGrade ? "selected" : ""}>ថ្នាក់ទី ${g}</option>`).join("");

        const overlay = document.createElement("div");
        overlay.id = "slide-presenter-overlay";
        overlay.innerHTML = [
            "<div class=\"sp-header\">",
            "  <div><div class=\"sp-kicker\" id=\"sp-kicker\">🌐 លោកខាងលិច (5Es / IBL)</div><div class=\"sp-title\" id=\"sp-slide-title\"></div></div>",
            "  <div><span id=\"sp-counter\" style=\"font-size:18px;font-weight:bold;color:var(--slide-muted);\">1 / " + this.slides.length + "</span></div>",
            "</div>",
            "<div class=\"sp-body\" id=\"sp-slide-body\"></div>",
            "<canvas id=\"sp-canvas\"></canvas>",
            "<div class=\"sp-controls forced-show\" id=\"sp-control-bar\" style=\"flex-wrap:wrap;max-width:95vw;\">",
            "  <select class=\"sp-select\" id=\"sp-grade-select\">" + gradeOptions + "</select>",
            "  <select class=\"sp-select\" id=\"sp-lesson-select\" style=\"max-width:250px;\"></select>",
            "  <select class=\"sp-select\" id=\"sp-mode-select\">",
            "    <option value=\"5es\">🌐 លោកខាងលិច (5Es / IBL)</option>",
            "    <option value=\"bansho\">🇯🇵 ជប៉ុន (Bansho Split)</option>",
            "    <option value=\"cpa\">🇸🇬 សិង្ហបុរី (CPA / Misconception)</option>",
            "    <option value=\"tiered\">🇫🇮 ហ្វាំងឡង់ (Tiered Cards)</option>",
            "  </select>",
            "  <button class=\"sp-btn\" id=\"sp-prev\">◀ ថយ</button>",
            "  <button class=\"sp-btn\" id=\"sp-next\">បន្ត ▶</button>",
            "  <button class=\"sp-btn\" id=\"sp-all\">👁️ ទាំងអស់</button>",
            "  <button class=\"sp-btn\" id=\"sp-video\">🎬 វីដេអូ Manim</button>\n  <button class=\"sp-btn\" id=\"sp-pen\">✏️ គូស</button>",
            "  <button class=\"sp-btn\" id=\"sp-clear\">🧹 លុប</button>",
            "  <button class=\"sp-btn\" id=\"sp-dark\">🌓 ពន្លឺ</button>",
            "  <button class=\"sp-btn\" id=\"sp-close\" style=\"color:#FCA5A5;font-weight:bold;\">✕ បិទ</button>",
            "</div>"
        ].join("\n");
        document.body.appendChild(overlay);
        this.populateLessonDropdown(curGrade);

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
        document.getElementById("sp-grade-select").onchange = (e) => {
            const g = e.target.value;
            const list = this.populateLessonDropdown(g);
            if (list && list.length) {
                this.lessonKey = list[0];
                this.currentSlide = 0; this.currentStep = 0;
                this.loadLessonData();
                this.renderSlide();
            }
        };
        document.getElementById("sp-lesson-select").onchange = (e) => {
            this.lessonKey = e.target.value;
            this.currentSlide = 0; this.currentStep = 0;
            this.loadLessonData();
            this.renderSlide();
        };
        document.getElementById("sp-mode-select").onchange = (e) => { this.mode = e.target.value; document.getElementById("sp-kicker").innerText = e.target.options[e.target.selectedIndex].text; this.renderSlide(); };
        
        document.getElementById("sp-video").onclick = () => this.toggleVideoModal();
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
    
    getTieredExercises(grade, lessonKey, fallbackLines, tc, st) {
        const g = String(grade);
        const pools = [
            window["PRACTICE_" + g], window["practice" + g], window["PRAC_" + g],
            window.PRACTICE_DB, window.PISA_12, window.PISA12, window.pisa12
        ].filter(Boolean);
        let items = [];
        pools.forEach(p => {
            if (Array.isArray(p)) items.push(...p);
            else if (typeof p === "object") {
                if (p[lessonKey] && Array.isArray(p[lessonKey])) items.push(...p[lessonKey]);
                else Object.values(p).forEach(v => { if (Array.isArray(v)) items.push(...v); else if (v && typeof v === "object") items.push(v); });
            }
        });
        const cleanTexts = items
            .filter(it => !it.grade || String(it.grade) === g || g === "12")
            .map(it => typeof it === "string" ? it : (it.q || it.question || it.text || it.prompt || it.title || ""))
            .filter(t => t && t.length > 4);

        const basic = cleanTexts[0] || fallbackLines[0] || "ខ្លឹមសារគ្រឹះ និងនិយមន័យសំខាន់ៗ";
        const standard = cleanTexts[1] || fallbackLines[1] || (tc && tc[0]) || "ការអនុវត្តរូបមន្ត និងឧទាហរណ៍គំរូ";
        const challenge = (g === "12" && window.PISA12 && Array.isArray(window.PISA12) && window.PISA12[0])
            ? (window.PISA12[0].q || window.PISA12[0].question || window.PISA12[0].text || cleanTexts[2])
            : (cleanTexts[2] || fallbackLines[2] || (st && st[0]) || "លំហាត់ត្រៀមបាក់ឌុប និងសិស្សពូកែ");
        return [basic, standard, challenge];
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
            const [bTxt, sTxt, cTxt] = this.getTieredExercises(this.getGradeFromKey(this.lessonKey), this.lessonKey, src, slide.tc, slide.st);
            [
                { name: "🟢 កម្រិតមូលដ្ឋាន (Basic)", cls: "basic", text: bTxt },
                { name: "🔵 កម្រិតស្តង់ដារ (Standard)", cls: "standard", text: sTxt },
                { name: "🟡 កម្រិតប្រកួតប្រជែង / PISA (Challenge)", cls: "challenge", text: cTxt }
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
        this.renderKaTeXDirect(body);
    }
    
    extractVideoUrl(lesson) {
        if (!lesson) return "";
        if (lesson.video || lesson.youtube || lesson.url) return lesson.video || lesson.youtube || lesson.url;
        const raw = JSON.stringify(lesson);
        const m = raw.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
        return m ? "https://www.youtube.com/embed/" + m[1] + "?autoplay=1" : "";
    }
    toEmbedUrl(url) {
        if (!url) return "";
        const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
        if (m) return "https://www.youtube.com/embed/" + m[1] + "?autoplay=1";
        return url;
    }
    toggleVideoModal() {
        let modal = document.getElementById("sp-video-modal");
        if (modal) { modal.remove(); return; }
        const db = window.LP_DB || {};
        const lesson = db[this.lessonKey] || {};
        const autoUrl = this.extractVideoUrl(lesson);
        modal = document.createElement("div");
        modal.id = "sp-video-modal";
        modal.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(900px,92vw);background:#0F172A;color:#F8FAFC;border:2px solid #3B82F6;border-radius:18px;padding:18px;z-index:1000001;box-shadow:0 25px 60px rgba(0,0,0,0.75);font-family:\"Khmer OS Battambang\",sans-serif;";
        modal.innerHTML = [
            "<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px;\">",
            "  <strong style=\"font-size:17px;color:#60A5FA;\">🎬 វីដេអូគំនូរជីវចល Manim / YouTube</strong>",
            "  <div style=\"display:flex;gap:8px;flex:1;max-width:520px;\">",
            "    <input id=\"sp-video-input\" type=\"text\" placeholder=\"បិទភ្ជាប់តំណ YouTube ឬ MP4 នៅទីនេះ...\" value=\"" + autoUrl + "\" style=\"flex:1;padding:6px 12px;border-radius:8px;border:1px solid #334155;background:#1E293B;color:#FFF;font-size:14px;\">",
            "    <button id=\"sp-video-load\" style=\"background:#2563EB;color:#FFF;border:none;padding:6px 14px;border-radius:8px;cursor:pointer;font-weight:bold;\">ចាក់</button>",
            "  </div>",
            "  <button id=\"sp-video-close\" style=\"background:#EF4444;color:#FFF;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-weight:bold;\">✕</button>",
            "</div>",
            "<div id=\"sp-video-stage\" style=\"width:100%;aspect-ratio:16/9;background:#020617;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;\"></div>"
        ].join("\n");
        document.getElementById("slide-presenter-overlay").appendChild(modal);
        const renderStage = (rawUrl) => {
            const stage = document.getElementById("sp-video-stage");
            const embed = this.toEmbedUrl(rawUrl.trim());
            if (!embed) {
                stage.innerHTML = "<div style=\"text-align:center;color:#94A3B8;padding:20px;\">សូមបិទភ្ជាប់តំណ YouTube ឬឯកសារវីដេអូ Manim (.mp4) ខាងលើ រួចចុចប៊ូតុង <b>«ចាក់»</b></div>";
                return;
            }
            if (/\.mp4($|\?)/i.test(embed)) {
                stage.innerHTML = `<video src="${embed}" controls autoplay style="width:100%;height:100%;object-fit:contain;"></video>`;
            } else {
                stage.innerHTML = `<iframe src="${embed}" style="width:100%;height:100%;border:none;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
            }
        };
        renderStage(autoUrl);
        document.getElementById("sp-video-load").onclick = () => renderStage(document.getElementById("sp-video-input").value);
        document.getElementById("sp-video-close").onclick = () => modal.remove();
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