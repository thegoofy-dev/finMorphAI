"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  title = "Promo Video",
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-4xl rounded-lg bg-black/90 p-4 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
          >
            <X className="cursor-pointer" size={24} />
          </button>
        </div>

        {/* Video */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <video
            src={videoSrc}
            controls
            autoPlay
            className="h-full w-full object-cover"
            onEnded={onClose}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};
