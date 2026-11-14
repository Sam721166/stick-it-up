"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [mounted, setMounted] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Ensure portal target exists on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key & freeze body scroll
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen || !mounted) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!brandName.trim()) {
      setError("Please enter your product name.");
      return;
    }
    if (!productUrl.trim()) {
      setError("Please enter your website link.");
      return;
    }
    if (!description.trim()) {
      setError("Please provide a short description.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/sponsor/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          productUrl,
          description,
          email,
          tag: "Partner",
          logoUrl: "",
        }),
      });

      const data = (await res.json()) as { error?: string; checkoutUrl?: string };

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.checkoutUrl) {
        // Redirect to Dodo Payments hosted checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned from payment server");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  // Render via createPortal into document.body to avoid parent CSS transform clipping
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3.5 sm:p-5 bg-black/45 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[420px] rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.18)] animate-in zoom-in-95 duration-150 text-left text-zinc-900"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4">
          <div>
            <h3 className="font-sans text-xl font-semibold tracking-tight text-zinc-900">
              Become a Sponsor
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              Tell us about your brand and pay on the next page. Get featured in our Sponsor section soon.
            </p>
          </div>

          {/* Close cross button */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="cursor-pointer rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 animate-in fade-in">
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-zinc-700 mb-1.5">
              Product
            </label>
            <input
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Acme Studio"
              className="w-full rounded-xl border border-zinc-200/90 bg-zinc-50/60 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
            />
          </div>

          {/* Website Link */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-medium text-zinc-700">
                Link
              </label>
              <span className="text-xs text-zinc-400">
                Where it points
              </span>
            </div>
            <input
              type="text"
              required
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="example.com"
              className="w-full rounded-xl border border-zinc-200/90 bg-zinc-50/60 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-medium text-zinc-700">
                Description
              </label>
              <span className="text-xs text-zinc-400">
                Up to 200 characters
              </span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description highlighting what your product does."
              className="w-full resize-none rounded-xl border border-zinc-200/90 bg-zinc-50/60 p-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
            />
          </div>

          {/* Contact Email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs sm:text-sm font-medium text-zinc-700">
                Email
              </label>
              <span className="text-xs text-zinc-400">
                Where we reach you
              </span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-200/90 bg-zinc-50/60 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900 outline-none transition-all"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-950 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_4px_rgba(0,0,0,0.15)] hover:from-zinc-700 hover:to-zinc-900 active:scale-[0.99] transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Connecting to payment...</span>
                </>
              ) : (
                <span>Continue to payment</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
