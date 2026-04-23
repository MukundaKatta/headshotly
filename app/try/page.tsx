"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Preset {
  name: string;
  filter: string;
  bg: string;
  description: string;
}

const PRESETS: Preset[] = [
  {
    name: "Studio",
    filter: "contrast(1.1) brightness(1.05) saturate(0.9)",
    bg: "bg-gradient-to-br from-slate-200 to-slate-400",
    description: "Classic studio lighting. Clean, neutral backdrop.",
  },
  {
    name: "Outdoor",
    filter: "brightness(1.1) saturate(1.2) contrast(0.95)",
    bg: "bg-gradient-to-br from-emerald-200 to-emerald-400",
    description: "Warm natural light. Soft green-toned environment.",
  },
  {
    name: "Corporate",
    filter: "grayscale(0.15) contrast(1.15) brightness(0.95)",
    bg: "bg-gradient-to-br from-blue-200 to-blue-400",
    description: "Polished and professional. Dark, formal tone.",
  },
];

export default function TryPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleReset() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-neutral-500" />
          Headshotly
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Preview
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Upload a selfie, see your headshots.
          </h1>
        </div>

        {!preview ? (
          <div className="rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
            <div className="text-5xl">📷</div>
            <p className="mt-4 text-lg font-medium text-neutral-700">Drop a selfie here</p>
            <p className="mt-1 text-sm text-neutral-500">or click to choose a file</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="absolute inset-0 cursor-pointer opacity-0"
              style={{ position: "relative" }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-6 rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
            >
              Choose photo
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              {PRESETS.map((preset) => (
                <div key={preset.name} className="rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                  <div className={`${preset.bg} p-3`}>
                    <img
                      src={preview}
                      alt={`${preset.name} headshot preview`}
                      className="w-full aspect-[3/4] rounded-2xl object-cover"
                      style={{ filter: preset.filter }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold tracking-tight">{preset.name}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{preset.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleReset}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Try another photo
              </button>
              <Link
                href="/#waitlist"
                className="rounded-full border border-neutral-300 px-7 py-3.5 font-medium text-neutral-900 transition hover:border-neutral-900 text-center"
              >
                Get early access
              </Link>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with CSS-filtered mock headshots.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real AI-generated experience.
        </p>
      </div>
    </div>
  );
}
