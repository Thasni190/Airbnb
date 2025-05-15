"use client";
import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
  label: string;
  close: () => void;
  content: React.ReactElement;
  isOpen: boolean;
}

function Model({ label, content, isOpen, close }: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-[90%] md:w-[80%] lg:w-[600px] mx-auto my-6">
        <div
          className={`transform transition-all duration-300 ease-in-out ${
            showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="w-full rounded-xl bg-white shadow-xl flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-[60px] flex items-center justify-center border-b border-gray-200 px-6 relative ">
              <h2 className="text-lg font-semibold">{label}</h2>
              <button
                onClick={handleClose}
                className="absolute left-4 p-2 hover:bg-gray-200 rounded-full transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Content */}
            <section className="p-6 bg-white">{content}</section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
