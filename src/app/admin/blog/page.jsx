"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  X, Upload, ImagePlus, Eye, EyeOff, Send, Loader2, Sparkles,
  Trash2, RefreshCw, CheckCircle2, XCircle, AlertCircle, Copy, ExternalLink,
} from "lucide-react";

const DEFAULT_TAGS = ["Ottawa", "Video Production", "Surgo Studios", "Brand Storytelling", "Ottawa Creative Agency"];

// ── Helpers ──────────────────────────────────────────────────────────────────
function charClass(len, min, max) {
  if (len === 0) return "text-gray-600";
  if (len >= min && len <= max) return "text-green-400";
  if (len >= min - 10 && len <= max + 10) return "text-yellow-400";
  return "text-red-400";
}

function readingTime(htmlContent) {
  const words = htmlContent.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

function SeoCheck({ pass, warn, label }) {
  const Icon = pass ? CheckCircle2 : warn ? AlertCircle : XCircle;
  const color = pass ? "text-green-400" : warn ? "text-yellow-400" : "text-zinc-600";
  return (
    <li className={`flex items-center gap-2 text-xs ${color}`}>
      <Icon size={13} className="shrink-0" />
      {label}
    </li>
  );
}

export default function BlogAdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/list-blogs");
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch { /* silently fail */ }
    finally { setPostsLoading(false); }
  }, []);

  useEffect(() => {
    if (activeTab === "manage") loadPosts();
  }, [activeTab, loadPosts]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/delete-blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) setPosts((p) => p.filter((x) => x.id !== id));
    } catch { /* silently fail */ }
    finally { setDeletingId(null); }
  };

  // ── Create form state ───────────────────────────────────────────────────────
  const [topic, setTopic] = useState("");
  const [step, setStep] = useState("idle"); // idle | generating | editing | publishing | done
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [description, setDescription] = useState(""); // meta description
  const [focusKeyphrase, setFocusKeyphrase] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [tagInput, setTagInput] = useState("");
  const [faqItems, setFaqItems] = useState([]);
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");

  const contentRef = useRef(null);
  const coverInputRef = useRef(null);
  const inlineInputRef = useRef(null);

  // ── Live SEO checklist ──────────────────────────────────────────────────────
  const seoChecks = useMemo(() => {
    const kp = focusKeyphrase.trim().toLowerCase();
    const wordCount = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    const h2Count = (content.match(/<h2/gi) || []).length;
    const hasFaq = content.toLowerCase().includes("faq") || faqItems.length >= 2;
    const hasInternalLink = content.includes('href="/services"') || content.includes('href="/contact"');
    return [
      {
        label: `Meta title: ${metaTitle.length} chars (target 55-65)`,
        pass: metaTitle.length >= 55 && metaTitle.length <= 65,
        warn: metaTitle.length >= 48 && metaTitle.length <= 72,
      },
      {
        label: `Meta description: ${description.length} chars (target 148-158)`,
        pass: description.length >= 148 && description.length <= 158,
        warn: description.length >= 130 && description.length <= 165,
      },
      {
        label: "Focus keyphrase set",
        pass: kp.length > 0,
        warn: false,
      },
      {
        label: "Focus keyphrase in meta title",
        pass: kp.length > 0 && metaTitle.toLowerCase().includes(kp),
        warn: false,
      },
      {
        label: "Focus keyphrase in meta description",
        pass: kp.length > 0 && description.toLowerCase().includes(kp),
        warn: false,
      },
      {
        label: "Cover image uploaded",
        pass: !!coverUrl,
        warn: false,
      },
      {
        label: `Word count: ${wordCount.toLocaleString()} (target 1,200+)`,
        pass: wordCount >= 1200,
        warn: wordCount >= 900,
      },
      {
        label: `H2 sections: ${h2Count} (target 3+)`,
        pass: h2Count >= 3,
        warn: h2Count >= 2,
      },
      {
        label: "FAQ section included (rich results)",
        pass: hasFaq,
        warn: false,
      },
      {
        label: "Internal links to Surgo pages",
        pass: hasInternalLink,
        warn: false,
      },
      {
        label: "Ottawa mentioned in content",
        pass: content.toLowerCase().includes("ottawa"),
        warn: false,
      },
    ];
  }, [metaTitle, description, focusKeyphrase, coverUrl, content, faqItems]);

  const seoScore = useMemo(() => {
    const passed = seoChecks.filter((c) => c.pass).length;
    return Math.round((passed / seoChecks.length) * 100);
  }, [seoChecks]);

  const scoreColor = seoScore >= 85 ? "text-green-400" : seoScore >= 60 ? "text-yellow-400" : "text-red-400";
  const scoreBg = seoScore >= 85 ? "bg-green-400/10 border-green-400/20" : seoScore >= 60 ? "bg-yellow-400/10 border-yellow-400/20" : "bg-red-400/10 border-red-400/20";

  // ── Generate ────────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!topic.trim()) { showStatus("Enter a topic first.", "error"); return; }
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
      setMetaTitle(data.metaTitle || data.title);
      setDescription(data.metaDescription || data.description || "");
      setFocusKeyphrase(data.focusKeyphrase || "");
      setContent(data.content);
      setSlug(data.slug || "");
      setTags(data.tags?.length ? data.tags : DEFAULT_TAGS);
      setFaqItems(data.faqItems || []);
      setStep("editing");
      if (data.warning) {
        showStatus(`⚠️ ${data.warning}`, "error");
      } else {
        showStatus("Generated. Review all fields   especially meta title and description   then publish.", "info");
      }
    } catch (err) {
      showStatus(err.message, "error");
      setStep("idle");
    }
  };

  // ── Cover upload ────────────────────────────────────────────────────────────
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

  // ── Inline image ────────────────────────────────────────────────────────────
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
      const altText = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      const tag = `\n<img src="${data.url}" alt="${altText} - Surgo Studios Ottawa" class="w-full rounded-xl my-6" />\n`;
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

  // ── Tags ─────────────────────────────────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    setTagInput("");
  };
  const removeTag = (t) => setTags((p) => p.filter((x) => x !== t));

  // ── Publish ──────────────────────────────────────────────────────────────────
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
        body: JSON.stringify({
          title,
          content,
          description,
          tags,
          coverImageUrl: coverUrl,
          metaTitle,
          focusKeyphrase,
          faqItems,
          slug,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setPublishedSlug(data.slug);
      setStep("done");
      showStatus("Published!", "success");
    } catch (err) {
      showStatus("Publish failed: " + err.message, "error");
      setStep("editing");
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const reset = () => {
    setTopic(""); setTitle(""); setMetaTitle(""); setDescription("");
    setFocusKeyphrase(""); setContent(""); setSlug(""); setTags(DEFAULT_TAGS);
    setCoverUrl(""); setCoverPreview(""); setFaqItems([]);
    setPreviewMode(false); setStep("idle"); setStatusMsg(""); setPublishedSlug("");
  };

  const showStatus = (msg, type) => { setStatusMsg(msg); setStatusType(type); };

  const rt = useMemo(() => content ? readingTime(content) : 0, [content]);

  // ── UI ────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">

      {/* Top bar */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Surgo Blog Studio</h1>
            <p className="text-xs text-gray-500 mt-0.5">Publish directly to the site   no deploy needed</p>
          </div>
          <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {["create", "manage"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition ${
                  activeTab === tab ? "bg-zinc-700 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "create" && (step === "editing" || step === "publishing") && (
          <div className="flex items-center gap-3">
            {/* SEO score badge */}
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${scoreBg} ${scoreColor}`}>
              SEO {seoScore}%
            </div>
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
        )}
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-8">

        {/* ── MANAGE TAB ──────────────────────────────────────────────────────── */}
        {activeTab === "manage" && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">All Posts</h2>
              <button
                onClick={loadPosts}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition"
              >
                <RefreshCw size={13} /> Refresh
              </button>
            </div>
            {postsLoading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 size={28} className="animate-spin text-zinc-600" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-24 text-gray-600">
                <p>No posts yet. Go to Create to publish your first one.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-zinc-700 transition"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                      <img
                        src={post.cover_image_url || "/default-blog-cover.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{post.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(post.published_at).toLocaleDateString("en-CA", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                    </div>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-gray-600 hover:text-gray-300 transition"
                      title="View live post"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      disabled={deletingId === post.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 rounded-lg transition disabled:opacity-40"
                    >
                      {deletingId === post.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CREATE TAB ──────────────────────────────────────────────────────── */}
        {activeTab === "create" && (
          <>
            {statusMsg && (
              <div className={`mb-6 px-5 py-3 rounded-xl text-sm font-medium ${
                statusType === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                statusType === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              }`}>
                {statusMsg}
              </div>
            )}

            {/* IDLE */}
            {step === "idle" && (
              <div className="max-w-2xl mx-auto mt-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={24} className="text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold mb-3">What&apos;s the blog about?</h2>
                <p className="text-gray-500 mb-8 text-sm">
                  Enter a topic. AI will write a Google-ranking post with full meta tags, FAQ rich results, and Ottawa-focused keywords.
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
                <div className="mt-6 text-left bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-gray-500">
                  <p className="font-semibold text-gray-400 mb-2">Topic tips for higher ranking:</p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Be hyper-local: "How Kanata tech companies use video to recruit talent"</li>
                    <li>Use a question format: "How much does corporate video cost in Ottawa?"</li>
                    <li>Target a service: "Complete guide to video podcast production in Ottawa"</li>
                    <li>Year-specific: "Ottawa video marketing trends for 2026"</li>
                  </ul>
                </div>
              </div>
            )}

            {/* GENERATING */}
            {step === "generating" && (
              <div className="max-w-2xl mx-auto mt-32 text-center">
                <Loader2 size={40} className="animate-spin text-yellow-400 mx-auto mb-6" />
                <p className="text-gray-300 text-lg font-medium">Crafting your SEO post...</p>
                <p className="text-gray-600 text-sm mt-2">
                  Generating meta title, description, FAQ schema, and 1,200+ word article. Takes about 20 seconds.
                </p>
              </div>
            )}

            {/* DONE */}
            {step === "done" && (
              <div className="max-w-xl mx-auto mt-24 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">Published!</h2>
                {publishedSlug && (
                  <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 mb-6 text-sm">
                    <span className="text-gray-500 truncate flex-1 text-left">
                      surgostudios.com/blog/<span className="text-white">{publishedSlug}</span>
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://surgostudios.com/blog/${publishedSlug}`)}
                      className="text-gray-500 hover:text-yellow-400 transition shrink-0"
                      title="Copy URL"
                    >
                      <Copy size={14} />
                    </button>
                    <a
                      href={`/blog/${publishedSlug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-yellow-400 transition shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                <p className="text-gray-400 mb-8 text-sm">
                  The post is live. Google will index it within 24-48 hours.
                  Submit the URL in{" "}
                  <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-yellow-400 underline">
                    Google Search Console
                  </a>{" "}
                  for faster indexing.
                </p>
                <div className="flex gap-3 justify-center">
                  <a
                    href={publishedSlug ? `/blog/${publishedSlug}` : "/blog"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 border border-zinc-700 rounded-lg text-sm hover:border-zinc-500 transition"
                  >
                    View Post
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

            {/* EDITING */}
            {(step === "editing" || step === "publishing") && (
              <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr_260px] gap-6">

                {/* ── LEFT: Metadata sidebar ────────────────────────────────── */}
                <div className="flex flex-col gap-4">

                  {/* Cover image */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
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
                          <p className="text-xs text-gray-700 mt-1">1200x630px recommended</p>
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

                  {/* Display title (H1) */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                      Display Title (H1)
                    </label>
                    <textarea
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      rows={2}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition resize-none"
                    />
                    <p className="text-xs text-gray-600 mt-1">Shown on the page   can be longer than meta title</p>
                  </div>

                  {/* Meta title */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Meta Title (Google SERP)
                      </label>
                      <span className={`text-xs font-mono ${charClass(metaTitle.length, 55, 65)}`}>
                        {metaTitle.length}
                      </span>
                    </div>
                    <textarea
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      rows={2}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition resize-none"
                    />
                    <p className={`text-xs mt-1 ${charClass(metaTitle.length, 55, 65)}`}>
                      {metaTitle.length < 55 ? `${55 - metaTitle.length} chars short` :
                       metaTitle.length > 65 ? `${metaTitle.length - 65} chars over` :
                       "Perfect length"}
                    </p>
                  </div>

                  {/* Meta description */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Meta Description
                      </label>
                      <span className={`text-xs font-mono ${charClass(description.length, 148, 158)}`}>
                        {description.length}
                      </span>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      placeholder="Compelling Google snippet (148-158 chars)..."
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition resize-none"
                    />
                    <p className={`text-xs mt-1 ${charClass(description.length, 148, 158)}`}>
                      {description.length < 148 ? `${148 - description.length} chars short` :
                       description.length > 158 ? `${description.length - 158} chars over` :
                       "Perfect length"}
                    </p>
                  </div>

                  {/* Focus keyphrase */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                      Focus Keyphrase
                    </label>
                    <input
                      value={focusKeyphrase}
                      onChange={(e) => setFocusKeyphrase(e.target.value)}
                      placeholder="e.g. corporate video Ottawa"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
                    />
                    <p className="text-xs text-gray-600 mt-1">Primary keyword this post targets</p>
                  </div>

                  {/* URL slug */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
                      URL Slug
                    </label>
                    <input
                      value={slug}
                      onChange={(e) =>
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 70))
                      }
                      placeholder="seo-friendly-url-slug"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-gray-300 font-mono placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
                    />
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      surgostudios.com/blog/<span className="text-gray-400">{slug || "..."}</span>
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
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
                      <button onClick={addTag} className="px-3 py-1.5 bg-zinc-700 rounded-lg text-xs hover:bg-zinc-600 transition">
                        Add
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => { setStep("idle"); setStatusMsg(""); }}
                    className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-300 border border-zinc-800 hover:border-zinc-600 rounded-xl transition"
                  >
                    Start over with new topic
                  </button>
                </div>

                {/* ── CENTRE: Content editor ────────────────────────────────── */}
                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden min-h-175">
                  <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3 shrink-0">
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        {previewMode ? "Preview" : "Content (HTML)"}
                      </p>
                      {content && (
                        <span className="text-xs text-gray-600">
                          {content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length.toLocaleString()} words &middot; {rt} min read
                        </span>
                      )}
                    </div>
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

                  {previewMode ? (
                    <div
                      className="flex-1 overflow-y-auto p-8 prose prose-invert prose-lg max-w-none
                        prose-headings:text-white prose-h1:text-yellow-400
                        prose-p:text-gray-300 prose-strong:text-white
                        prose-a:text-yellow-400 prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <textarea
                      ref={contentRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex-1 bg-transparent px-5 py-4 text-sm text-gray-300 font-mono leading-relaxed resize-none focus:outline-none"
                      spellCheck={false}
                    />
                  )}
                </div>

                {/* ── RIGHT: SEO checklist ──────────────────────────────────── */}
                <div className="flex flex-col gap-4">

                  {/* Score */}
                  <div className={`rounded-2xl border p-4 ${scoreBg}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">SEO Score</p>
                      <span className={`text-2xl font-black ${scoreColor}`}>{seoScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          seoScore >= 85 ? "bg-green-400" : seoScore >= 60 ? "bg-yellow-400" : "bg-red-400"
                        }`}
                        style={{ width: `${seoScore}%` }}
                      />
                    </div>
                    <p className={`text-xs mt-2 ${scoreColor}`}>
                      {seoScore >= 85 ? "Ready to rank" : seoScore >= 60 ? "Almost there" : "Needs work"}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Checklist</p>
                    <ul className="space-y-2.5">
                      {seoChecks.map((c, i) => (
                        <SeoCheck key={i} pass={c.pass} warn={c.warn} label={c.label} />
                      ))}
                    </ul>
                  </div>

                  {/* FAQ preview */}
                  {faqItems.length > 0 && (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        FAQ Rich Results ({faqItems.length})
                      </p>
                      <ul className="space-y-2.5">
                        {faqItems.map((f, i) => (
                          <li key={i} className="text-xs text-gray-500 border-l-2 border-yellow-400/30 pl-3">
                            {f.question}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-green-400 mt-3 flex items-center gap-1">
                        <CheckCircle2 size={11} /> FAQPage JSON-LD will be added automatically
                      </p>
                    </div>
                  )}

                  {/* Google SERP preview */}
                  {(metaTitle || description) && (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Google SERP Preview
                      </p>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-0.5">surgostudios.com/blog/{slug || "..."}</p>
                        <p className="text-sm font-medium text-blue-700 leading-tight mb-1 line-clamp-2">
                          {metaTitle || title}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Supabase migration note */}
                  <div className="bg-zinc-900 rounded-2xl border border-amber-400/20 p-4">
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
                      DB Setup (one-time)
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Run this SQL in Supabase to enable meta title, keyphrase & FAQ storage:
                    </p>
                    <pre className="text-xs text-gray-400 bg-zinc-950 rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">{`ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS focus_keyphrase TEXT,
  ADD COLUMN IF NOT EXISTS faq_items JSONB
    DEFAULT '[]';`}</pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
