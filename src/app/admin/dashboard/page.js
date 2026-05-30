"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload, Trash2, LogOut, Plus, X, CheckCircle,
  AlertCircle, Layers, ImageIcon, FolderOpen, RefreshCw,
  Grid3X3, Lock, Cloud
} from "lucide-react";

/* ─── Category options (must match galleryData categories) ─── */
const CATEGORIES = ["Game Icons", "Characters", "Symbols", "Backgrounds", "UI & Frames"];
const HEIGHTS = [
  { value: "tall", label: "Tall (portrait)" },
  { value: "medium", label: "Medium (square-ish)" },
  { value: "short", label: "Short (landscape)" },
  { value: "wide", label: "Wide (panoramic)" },
];

/* ─── Toast ─── */
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 20px",
        borderRadius: "14px",
        background: toast.type === "success"
          ? "rgba(16,185,129,0.15)"
          : "rgba(239,68,68,0.15)",
        border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
        backdropFilter: "blur(12px)",
        color: toast.type === "success" ? "#6ee7b7" : "#fca5a5",
        fontSize: "14px",
        fontWeight: 600,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        animation: "slideUp 0.3s ease",
      }}
    >
      {toast.type === "success"
        ? <CheckCircle size={18} />
        : <AlertCircle size={18} />}
      {toast.message}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  // Gallery state
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  // Upload form state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]);
  const [uploadHeight, setUploadHeight] = useState("medium");
  const [uploading, setUploading] = useState(false);

  // Delete state
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const fileInputRef = useRef(null);

  /* ── Show toast ── */
  function showToast(message, type = "success") {
    clearTimeout(toastTimer.current);
    setToast({ message, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  /* ── Load gallery ── */
  const loadGallery = useCallback(async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/gallery", { cache: "no-store" });
      if (res.status === 401) { router.push("/admin"); return; }
      const data = await res.json();
      setGallery(Array.isArray(data) ? data : []);
    } catch {
      showToast("Failed to load gallery", "error");
    } finally {
      setLoadingGallery(false);
    }
  }, [router]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  /* ── Handle file pick ── */
  function handleFilePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    const url = URL.createObjectURL(file);
    setUploadPreview(url);
  }

  function clearUploadForm() {
    setUploadFile(null);
    setUploadPreview(null);
    setUploadTitle("");
    setUploadCategory(CATEGORIES[0]);
    setUploadHeight("medium");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ── Handle upload ── */
  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", uploadFile);
      fd.append("title", uploadTitle.trim());
      fd.append("category", uploadCategory);
      fd.append("height", uploadHeight);

      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });

      if (res.status === 401) { router.push("/admin"); return; }

      if (res.ok) {
        showToast("Image uploaded successfully!");
        clearUploadForm();
        loadGallery();
      } else {
        const data = await res.json();
        showToast(data.error || "Upload failed", "error");
      }
    } catch {
      showToast("Upload failed. Check connection.", "error");
    } finally {
      setUploading(false);
    }
  }

  /* ── Handle delete (Cloudinary only) ── */
  async function handleDelete(item) {
    if (item._source === "static") return; // Static seed items can't be deleted
    setDeletingId(item.id);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: item.public_id }),
      });

      if (res.status === 401) { router.push("/admin"); return; }

      if (res.ok) {
        showToast("Image deleted from Cloudinary!");
        setGallery((prev) => prev.filter((g) => g.id !== item.id));
      } else {
        const data = await res.json();
        showToast(data.error || "Delete failed", "error");
      }
    } catch {
      showToast("Delete failed. Check connection.", "error");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  /* ── Handle logout ── */
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
  }

  /* ── Filtered gallery ── */
  const filteredGallery = filterCategory === "All"
    ? gallery
    : gallery.filter((g) => g.category === filterCategory);

  const allCategories = ["All", ...CATEGORIES];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #080b14;
          color: #e2e8f0;
          min-height: 100vh;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }

        .dashboard-root {
          display: grid;
          grid-template-rows: auto 1fr;
          min-height: 100vh;
        }

        /* ── TOP NAV ── */
        .topnav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          height: 64px;
          background: rgba(8,11,20,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .topnav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1769FF, #6d28d9);
        }
        .nav-title {
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }
        .nav-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(23,105,255,0.2);
          border: 1px solid rgba(23,105,255,0.3);
          color: #93c5fd;
          letter-spacing: 0.05em;
        }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .btn-ghost {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .btn-danger {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          border: 1px solid rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.08);
          color: #fca5a5;
          font-size: 13px; font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-danger:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.5);
        }

        /* ── MAIN LAYOUT ── */
        .main-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 0;
          height: calc(100vh - 64px);
          overflow: hidden;
        }

        /* ── LEFT PANEL (Upload) ── */
        .upload-panel {
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.07);
          overflow-y: auto;
          padding: 28px 24px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }

        .panel-heading {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Drop zone */
        .drop-zone {
          border: 2px dashed rgba(255,255,255,0.12);
          border-radius: 18px;
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s;
          background: rgba(255,255,255,0.02);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }
        .drop-zone:hover {
          border-color: rgba(23,105,255,0.5);
          background: rgba(23,105,255,0.05);
        }
        .drop-zone input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .drop-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: rgba(23,105,255,0.1);
          border: 1px solid rgba(23,105,255,0.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
          color: #60a5fa;
        }
        .drop-text {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
        }
        .drop-text strong { color: rgba(255,255,255,0.8); }

        /* Preview */
        .preview-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          aspect-ratio: 4/3;
          background: rgba(255,255,255,0.03);
        }
        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-clear {
          position: absolute;
          top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff; cursor: pointer;
          transition: all 0.2s;
        }
        .preview-clear:hover { background: rgba(239,68,68,0.6); }

        /* Form fields */
        .field-group { margin-bottom: 16px; }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .field-input, .field-select {
          width: 100%;
          padding: 11px 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #e2e8f0;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s;
          appearance: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus, .field-select:focus {
          border-color: rgba(23,105,255,0.5);
          background: rgba(23,105,255,0.07);
          box-shadow: 0 0 0 3px rgba(23,105,255,0.12);
        }
        .field-select option { background: #1e2535; color: #e2e8f0; }

        /* Upload button */
        .upload-btn {
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #1769FF, #4f46e5);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 6px 20px rgba(23,105,255,0.3);
          display: flex; align-items: center; justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }
        .upload-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(23,105,255,0.45);
        }
        .upload-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Stats strip */
        .stats-strip {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .stat-card {
          flex: 1;
          min-width: 80px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px 16px;
        }
        .stat-num {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        /* ── RIGHT PANEL (Gallery) ── */
        .gallery-panel {
          overflow-y: auto;
          padding: 28px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }

        .gallery-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* Category filters */
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
        }
        .filter-tab.active {
          background: rgba(23,105,255,0.2);
          border-color: rgba(23,105,255,0.4);
          color: #93c5fd;
        }

        /* Gallery grid */
        .gallery-grid {
          columns: 3;
          column-gap: 16px;
        }
        @media (max-width: 1200px) { .gallery-grid { columns: 2; } }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 16px;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          animation: fadeIn 0.3s ease;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gallery-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }

        .gallery-img-wrap {
          position: relative;
          width: 100%;
        }
        .gallery-img-wrap img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Hover overlay */
        .item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.25s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
        }
        .gallery-item:hover .item-overlay { opacity: 1; }

        .item-info {
          margin-top: auto;
        }
        .item-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-category {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        /* Delete button on item */
        .delete-btn {
          align-self: flex-end;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(239,68,68,0.5);
          background: rgba(239,68,68,0.15);
          color: #fca5a5;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
        }
        .delete-btn:hover {
          background: rgba(239,68,68,0.4);
          border-color: rgba(239,68,68,0.8);
          transform: scale(1.1);
        }

        /* Confirm overlay */
        .confirm-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px;
          text-align: center;
          z-index: 10;
          animation: fadeIn 0.2s ease;
        }
        .confirm-text {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 1.5;
        }
        .confirm-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }
        .confirm-buttons {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .confirm-yes {
          padding: 8px 16px;
          border-radius: 10px;
          border: none;
          background: #ef4444;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .confirm-yes:hover { background: #dc2626; }
        .confirm-no {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .confirm-no:hover { background: rgba(255,255,255,0.1); }

        /* Empty state */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: rgba(255,255,255,0.25);
        }
        .empty-state svg { margin: 0 auto 16px; display: block; }
        .empty-state p { font-size: 15px; font-weight: 500; }

        /* Loading skeleton */
        .skeleton {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 18px;
          height: 200px;
          margin-bottom: 16px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 24px 0;
        }
      `}</style>

      <div className="dashboard-root">
        {/* TOP NAV */}
        <nav className="topnav">
          <div className="topnav-left">
            <div className="nav-logo">
              <Layers size={18} color="#fff" />
            </div>
            <span className="nav-title">Gallery Manager</span>
            <span className="nav-badge">Admin</span>
          </div>
          <div className="nav-right">
            <button id="refresh-gallery-btn" className="btn-ghost" onClick={loadGallery}>
              <RefreshCw size={14} />
              Refresh
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost">
                <Grid3X3 size={14} />
                View Site
              </button>
            </a>
            <button id="admin-logout-btn" className="btn-danger" onClick={handleLogout}>
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main-layout">
          {/* ── LEFT: Upload Panel ── */}
          <aside className="upload-panel">
            <p className="panel-heading">
              <Plus size={14} />
              Upload New Image
            </p>

            <form onSubmit={handleUpload}>
              {/* Drop zone / file picker */}
              {!uploadPreview ? (
                <div className="drop-zone">
                  <input
                    ref={fileInputRef}
                    id="upload-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFilePick}
                  />
                  <div className="drop-icon">
                    <ImageIcon size={22} />
                  </div>
                  <p className="drop-text">
                    <strong>Click to choose</strong> or drag & drop
                    <br />
                    PNG, JPG, WebP, GIF up to any size
                  </p>
                </div>
              ) : (
                <div className="preview-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadPreview} alt="Preview" className="preview-img" />
                  <button
                    type="button"
                    className="preview-clear"
                    onClick={clearUploadForm}
                    aria-label="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="field-group">
                <label htmlFor="upload-title" className="field-label">Title *</label>
                <input
                  id="upload-title"
                  type="text"
                  className="field-input"
                  placeholder="e.g. Golden Dragon Wild"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="field-group">
                <label htmlFor="upload-category" className="field-label">Category *</label>
                <select
                  id="upload-category"
                  className="field-select"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Height / layout */}
              <div className="field-group">
                <label htmlFor="upload-height" className="field-label">Card Size</label>
                <select
                  id="upload-height"
                  className="field-select"
                  value={uploadHeight}
                  onChange={(e) => setUploadHeight(e.target.value)}
                >
                  {HEIGHTS.map((h) => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </select>
              </div>

              <button
                id="upload-submit-btn"
                type="submit"
                className="upload-btn"
                disabled={uploading || !uploadFile || !uploadTitle.trim()}
              >
                {uploading ? (
                  <><div className="spinner" /> Uploading…</>
                ) : (
                  <><Upload size={15} /> Upload to Gallery</>
                )}
              </button>
            </form>

            <div className="divider" />

            {/* Stats */}
            <p className="panel-heading">
              <FolderOpen size={14} />
              Gallery Stats
            </p>
            <div className="stats-strip">
              <div className="stat-card">
                <div className="stat-num">{gallery.length}</div>
                <div className="stat-label">Total</div>
              </div>
              {CATEGORIES.map((cat) => (
                <div className="stat-card" key={cat}>
                  <div className="stat-num">
                    {gallery.filter((g) => g.category === cat).length}
                  </div>
                  <div className="stat-label" style={{ fontSize: "10px" }}>
                    {cat.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── RIGHT: Gallery Panel ── */}
          <main className="gallery-panel">
            <div className="gallery-top">
              <p className="panel-heading" style={{ margin: 0 }}>
                <ImageIcon size={14} />
                {filterCategory === "All" ? "All Images" : filterCategory}
                <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: "13px" }}>
                  ({filteredGallery.length})
                </span>
              </p>
              <div className="filter-tabs">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-tab ${filterCategory === cat ? "active" : ""}`}
                    onClick={() => setFilterCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loadingGallery ? (
              <div className="gallery-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: `${[200, 160, 240, 180, 220, 150][i]}px` }} />
                ))}
              </div>
            ) : filteredGallery.length === 0 ? (
              <div className="empty-state">
                <ImageIcon size={48} strokeWidth={1} />
                <p>No images in this category yet.</p>
                <p style={{ fontSize: "13px", marginTop: "8px" }}>Upload one using the panel on the left.</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {filteredGallery.map((item) => {
                  const isCloudinary = item._source === "cloudinary";
                  return (
                    <div key={item.id} className="gallery-item">
                      <div className="gallery-img-wrap">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          style={{ width: "100%", height: "auto", display: "block" }}
                          unoptimized
                        />
                      </div>

                      {/* Source badge (top-left) */}
                      <div style={{
                        position: "absolute", top: "10px", left: "10px",
                        display: "flex", alignItems: "center", gap: "4px",
                        padding: "3px 8px", borderRadius: "20px", fontSize: "10px",
                        fontWeight: 700, letterSpacing: "0.05em",
                        background: isCloudinary ? "rgba(23,105,255,0.25)" : "rgba(255,255,255,0.1)",
                        border: isCloudinary ? "1px solid rgba(23,105,255,0.4)" : "1px solid rgba(255,255,255,0.15)",
                        color: isCloudinary ? "#93c5fd" : "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(8px)",
                      }}>
                        {isCloudinary ? <><Cloud size={9} /> Cloud</> : <><Lock size={9} /> Static</>}
                      </div>

                      {/* Hover overlay */}
                      <div className="item-overlay">
                        {isCloudinary ? (
                          <button
                            className="delete-btn"
                            onClick={() => setConfirmDeleteId(item.id)}
                            aria-label={`Delete ${item.title}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        ) : (
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.3)",
                          }} title="Static images cannot be deleted">
                            <Lock size={13} />
                          </div>
                        )}
                        <div className="item-info">
                          <p className="item-title">{item.title}</p>
                          <p className="item-category">{item.category}</p>
                        </div>
                      </div>

                      {/* Confirm delete overlay (Cloudinary only) */}
                      {isCloudinary && confirmDeleteId === item.id && (
                        <div className="confirm-overlay">
                          <Trash2 size={28} color="#f87171" />
                          <div>
                            <p className="confirm-text">Delete from Cloudinary?</p>
                            <p className="confirm-sub">This cannot be undone.</p>
                          </div>
                          <div className="confirm-buttons">
                            <button
                              className="confirm-yes"
                              onClick={() => handleDelete(item)}
                              disabled={deletingId === item.id}
                            >
                              {deletingId === item.id
                                ? <><div className="spinner" /> Deleting…</>
                                : <><Trash2 size={13} /> Delete</>}
                            </button>
                            <button
                              className="confirm-no"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <Toast toast={toast} />
    </>
  );
}
