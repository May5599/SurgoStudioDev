"use client";

import { useRef, useState } from "react";
import { X, Upload, ImagePlus, Eye, EyeOff, Send, Loader2, Sparkles } from "lucide-react";

const DEFAULT_TAGS = [
  "Ottawa",
  "Video Production",
  "Surgo Studios",
  "Brand Storytelling",
  "Ottawa Creative Agency",
];

export default function BlogAdminPage() {
  const [topic, setTopic] = useState("");
  const [step, setStep] = useState("idle"); // idle | generating | editing | publishing | done
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [tagInput, setTagInput] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState(""); // success | error | info

  const contentRef = useRef(null);
  const coverInputRef = useRef(null);
  const inlineInputRef = useRef(null);

  // ─── Generate ──────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!topic.trim()) {
      showStatus("Enter a topic first.", "error");
      return;
    }
    setStep("generating");
    setStatusMsg("");
    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Generation failed.");

      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);
      setStep("editing");
      showStatus("Blog generated. Review and edit below, then publish.", "info");
    } catch (err) {
      showStatus(err.message, "error");
      setStep("idle");
    }
  };

  // ─── Cover image upload ────────────────────────────────────────────────────
  const handleCoverUpload = async (file) => {
    if (!file) return;
    setCoverUploading(true);
    setCoverPreview(URL.createObjectURL(file));
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setCoverUrl(data.url);
    } catch (err) {
      showStatus("Cover upload failed: " + err.message, "error");
      setCoverPreview("");
    } finally {
      setCoverUploading(false);
    }
  };

  // ─── Inline image insert ───────────────────────────────────────────────────
  const handleInlineUpload = async (file) => {
    if (!file) return;
    showStatus("Uploading image...", "info");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const textarea = contentRef.current;
      const tag = `\n<img src="${data.url}" alt="Blog image" class="w-full rounded-xl my-6" />\n`;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const next = content.slice(0, start) + tag + content.slice(end);
      setContent(next);
      setTimeout(() => {
        textarea.selectionStart = start + tag.length;
        textarea.selectionEnd = start + tag.length;
        textarea.focus();
      }, 0);
      showStatus("Image inserted.", "success");
    } catch (err) {
      showStatus("Image upload failed: " + err.message, "error");
    }
  };

  // ─── Tags ──────────────────────────────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  };

  const removeTag = (t) => setTags((p) => p.filter((x) => x !== t));

  // ─── Publish ───────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showStatus("Title and content are required.", "error");
      return;
    }
    setStep("publishing");
    try {
      const res = await fetch("/api/publish-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, description, tags, coverImageUrl: coverUrl }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setStep("done");
      showStatus("Blog is live at /blog", "success");
    } catch (err) {
      showStatus("Publish failed: " + err.message, "error");
      setStep("editing");
    }
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const reset = () => {
    setTopic("");
    setTitle("");
    setDescription("");
    setContent("");
    setTags(DEFAULT_TAGS);
    setCoverUrl("");
    setCoverPreview("");
    setPreviewMode(false);
    setStep("idle");
    setStatusMsg("");
  };

  const showStatus = (msg, type) => {
    setStatusMsg(msg);
    setStatusType(type);
  };

  // ─── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">

      {/* Top bar */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Surgo Blog Studio</h1>
          <p className="text-xs text-gray-500 mt-0.5">Publish directly to the site — no deploy needed</p>
        </div>
        {step === "editing" || step === "publishing" ? (
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-zinc-700 hover:border-zinc-500 transition"
            >
              {previewMode ? <EyeOff size={15} /> : <Eye size={15} />}
              {previewMode ? "Edit" : "Preview"}
            </button>
            <button
              onClick={handlePublish}
              disabled={step === "publishing"}
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 disabled:opacity-50 transition"
            >
              {step === "publishing" ? (
                <><Loader2 size={15} className="animate-spin" /> Publishing...</>
              ) : (
                <><Send size={15} /> Publish Live</>
              )}
            </button>
          </div>
        ) : null}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Status banner */}
        {statusMsg && (
          <div className={`mb-6 px-5 py-3 rounded-xl text-sm font-medium ${
            statusType === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
            statusType === "error"   ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                                       "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          }`}>
            {statusMsg}
          </div>
        )}

        {/* ── STEP: IDLE ─────────────────────────────────────────────────────── */}
        {step === "idle" && (
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3">What's the blog about?</h2>
            <p className="text-gray-500 mb-8 text-sm">
              Enter a topic and AI will write a fully SEO-optimized post targeting Ottawa and nearby cities.
            </p>
            <div className="flex gap-3">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. Why Ottawa businesses need video in 2026"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
              />
              <button
                onClick={handleGenerate}
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition whitespace-nowrap"
              >
                Generate
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              Tip: Be specific — "How Kanata tech companies use video to recruit talent" ranks better than "video tips"
            </p>
          </div>
        )}

        {/* ── STEP: GENERATING ───────────────────────────────────────────────── */}
        {step === "generating" && (
          <div className="max-w-2xl mx-auto mt-32 text-center">
            <Loader2 size={40} className="animate-spin text-yellow-400 mx-auto mb-6" />
            <p className="text-gray-300 text-lg font-medium">Writing your blog...</p>
            <p className="text-gray-600 text-sm mt-2">
              AI is crafting an Ottawa-focused, SEO-optimized post. Takes about 15 seconds.
            </p>
          </div>
        )}

        {/* ── STEP: DONE ─────────────────────────────────────────────────────── */}
        {step === "done" && (
          <div className="max-w-xl mx-auto mt-32 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">Published!</h2>
            <p className="text-gray-400 mb-8">
              Your blog is live on <a href="/blog" target="_blank" className="text-yellow-400 underline">/blog</a> right now.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="/blog"
                target="_blank"
                className="px-5 py-2.5 border border-zinc-700 rounded-lg text-sm hover:border-zinc-500 transition"
              >
                View Blog
              </a>
              <button
                onClick={reset}
                className="px-5 py-2.5 bg-yellow-400 text-black rounded-lg text-sm font-semibold hover:bg-yellow-300 transition"
              >
                Write Another
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: EDITING ──────────────────────────────────────────────────── */}
        {(step === "editing" || step === "publishing") && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            {/* LEFT SIDEBAR — metadata */}
            <div className="flex flex-col gap-5">

              {/* Cover image */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Cover Image</p>
                <div
                  onClick={() => coverInputRef.current?.click()}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition ${
                    coverPreview ? "border-transparent" : "border-zinc-700 hover:border-yellow-400/50"
                  }`}
                  style={{ aspectRatio: "16/9" }}
                >
                  {coverPreview ? (
                    <>
                      <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                        <p className="text-xs text-white font-medium">Change image</p>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                      <Upload size={22} className="mb-2" />
                      <p className="text-xs">Click to upload cover</p>
                    </div>
                  )}
                  {coverUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Loader2 size={20} className="animate-spin text-yellow-400" />
                    </div>
                  )}
                </div>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCoverUpload(e.target.files?.[0])}
                />
                {coverPreview && (
                  <button
                    onClick={() => { setCoverPreview(""); setCoverUrl(""); }}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 transition"
                  >
                    Remove cover
                  </button>
                )}
              </div>

              {/* Title */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">Title</label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition resize-none"
                />
              </div>

              {/* Description */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                  Meta Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Short summary shown in Google results..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition resize-none"
                />
              </div>

              {/* Tags */}
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-3">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 rounded-lg text-xs text-gray-300">
                      {t}
                      <button onClick={() => removeTag(t)} className="text-gray-500 hover:text-red-400 transition">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-1.5 bg-zinc-700 rounded-lg text-xs hover:bg-zinc-600 transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Regenerate */}
              <button
                onClick={() => { setStep("idle"); setStatusMsg(""); }}
                className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-300 border border-zinc-800 hover:border-zinc-600 rounded-xl transition"
              >
                Start over with new topic
              </button>
            </div>

            {/* RIGHT — content editor / preview */}
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">

              {/* Editor toolbar */}
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {previewMode ? "Preview" : "Content (HTML)"}
                </p>
                <button
                  onClick={() => inlineInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-yellow-400 transition border border-zinc-700 hover:border-yellow-400/50 px-3 py-1.5 rounded-lg"
                >
                  <ImagePlus size={13} />
                  Insert Image
                </button>
                <input
                  ref={inlineInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleInlineUpload(e.target.files?.[0])}
                />
              </div>

              {/* Edit / Preview toggle */}
              {previewMode ? (
                <div
                  className="flex-1 overflow-y-auto p-8 prose prose-invert prose-lg max-w-none
                    prose-h1:text-purple-400 prose-h2:text-white prose-h2:text-2xl
                    prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white
                    prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-gray-300 font-mono leading-relaxed resize-none focus:outline-none min-h-[600px]"
                  spellCheck={false}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
