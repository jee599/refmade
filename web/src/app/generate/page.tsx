"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const REFERENCES = [
  { id: "001-clean-minimal", name: "Clean Minimal", accent: "#000000", tone: "light" },
  { id: "002-professional-blue", name: "Professional Blue", accent: "#2563eb", tone: "light" },
  { id: "003-developer-terminal", name: "Developer Terminal", accent: "#10b981", tone: "dark" },
  { id: "004-editorial-serif", name: "Editorial Serif", accent: "#c8102e", tone: "light" },
  { id: "005-fintech-trust", name: "Fintech Trust", accent: "#0f172a", tone: "light" },
  { id: "006-ai-product", name: "AI Product", accent: "#818cf8", tone: "dark" },
  { id: "007-korean-modern", name: "Korean Modern", accent: "#3182f6", tone: "light" },
  { id: "008-creative-portfolio", name: "Creative Portfolio", accent: "#e11d48", tone: "light" },
  { id: "009-documentation", name: "Documentation", accent: "#2563eb", tone: "light" },
  { id: "010-saas-dashboard", name: "SaaS Dashboard", accent: "#2563eb", tone: "light" },
  { id: "011-dark-luxury", name: "Dark Luxury", accent: "#d4a574", tone: "dark" },
  { id: "012-ecommerce-landing", name: "E-commerce Landing", accent: "#16a34a", tone: "light" },
  { id: "013-community-social", name: "Community Social", accent: "#ef4444", tone: "light" },
  { id: "014-mobile-app-landing", name: "Mobile App Landing", accent: "#0ea5e9", tone: "light" },
  { id: "015-enterprise-b2b", name: "Enterprise B2B", accent: "#4f46e5", tone: "light" },
];

type OutputFormat = "code" | "markdown";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 cursor-pointer"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-3 p-6">
      <div className="h-4 w-3/4 rounded bg-zinc-800" />
      <div className="h-4 w-full rounded bg-zinc-800" />
      <div className="h-4 w-5/6 rounded bg-zinc-800" />
      <div className="h-4 w-2/3 rounded bg-zinc-800" />
      <div className="h-4 w-full rounded bg-zinc-800" />
      <div className="h-4 w-4/5 rounded bg-zinc-800" />
      <div className="h-4 w-3/4 rounded bg-zinc-800" />
      <div className="h-4 w-full rounded bg-zinc-800" />
    </div>
  );
}

function simpleMarkdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-zinc-100 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-zinc-50 mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-zinc-50 mt-8 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, '<code class="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-emerald-400">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-zinc-300">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-zinc-300">$2</li>');

  html = html
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="my-2 space-y-1">${match}</ul>`)
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\n/g, "<br/>");

  return html;
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-zinc-950 font-[family-name:var(--font-jetbrains-mono)] text-zinc-500">loading...</div>}>
      <GeneratePageInner />
    </Suspense>
  );
}

function GeneratePageInner() {
  const searchParams = useSearchParams();

  const [selectedRef, setSelectedRef] = useState(REFERENCES[1].id);
  const [description, setDescription] = useState("");
  const [brandColor, setBrandColor] = useState(REFERENCES[1].accent);
  const [format, setFormat] = useState<OutputFormat>("code");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputTab, setOutputTab] = useState<"code" | "preview">("preview");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const match = REFERENCES.find((r) => r.id.startsWith(ref));
      if (match) {
        setSelectedRef(match.id);
        setBrandColor(match.accent);
      }
    }
  }, [searchParams]);

  const handleRefChange = (refId: string) => {
    setSelectedRef(refId);
    const ref = REFERENCES.find((r) => r.id === refId);
    if (ref) setBrandColor(ref.accent);
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("사이트 설명을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceId: selectedRef,
          description: description.trim(),
          brandColor,
          format,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "생성에 실패했습니다.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("스트림을 읽을 수 없습니다.");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setOutput(accumulated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const ext = format === "code" ? "html" : "md";
    const mimeType = format === "code" ? "text/html" : "text/markdown";
    const blob = new Blob([output], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `design-output.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentRef = REFERENCES.find((r) => r.id === selectedRef);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Left Panel - Configuration */}
      <div className="w-1/2 border-r border-zinc-800 overflow-y-auto">
        <div className="p-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight mb-2">
            디자인 생성
          </h1>
          <p className="mb-8 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">
            <span className="text-emerald-500">$</span> generate --mode interactive
          </p>

          {/* Reference Selector */}
          <div className="mb-6">
            <label className="mb-2 block font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-wider text-zinc-500">
              래퍼런스 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {REFERENCES.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => handleRefChange(ref.id)}
                  className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-left font-[family-name:var(--font-jetbrains-mono)] text-xs transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                    selectedRef === ref.id
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border border-zinc-700"
                    style={{ backgroundColor: ref.accent }}
                  />
                  <span className="truncate">{ref.id.split("-")[0]} {ref.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="mb-2 block font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-wider text-zinc-500"
            >
              사이트 설명
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="AI 기반 프로젝트 관리 도구의 랜딩 페이지"
              rows={4}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 resize-none"
            />
          </div>

          {/* Brand Color */}
          <div className="mb-6">
            <label className="mb-2 block font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-wider text-zinc-500">
              브랜드 색상
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border border-zinc-800 bg-transparent"
              />
              <input
                type="text"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                maxLength={7}
                className="w-28 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-100 uppercase transition-all duration-200 focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              />
              {currentRef && (
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">
                  default: {currentRef.accent}
                </span>
              )}
            </div>
          </div>

          {/* Output Format Toggle */}
          <div className="mb-8">
            <label className="mb-2 block font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-wider text-zinc-500">
              출력 형식
            </label>
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-1">
              <button
                onClick={() => setFormat("code")}
                className={`flex-1 rounded-md px-4 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  format === "code"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                code (HTML)
              </button>
              <button
                onClick={() => setFormat("markdown")}
                className={`flex-1 rounded-md px-4 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  format === "markdown"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                markdown
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm text-red-400">
              <span className="text-red-500">[ERR]</span> {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                </svg>
                generating...
              </span>
            ) : (
              "$ generate"
            )}
          </button>
        </div>
      </div>

      {/* Right Panel - Output */}
      <div className="w-1/2 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          {/* Terminal title bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
              {format === "code" ? "output.html" : "output.md"}
            </span>
          </div>
          {output && (
            <div className="flex items-center gap-2">
              {format === "code" && (
                <div className="flex rounded-md border border-zinc-700 bg-zinc-800 p-0.5">
                  <button
                    onClick={() => setOutputTab("code")}
                    className={`rounded px-2.5 py-1 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium transition-all duration-200 cursor-pointer ${
                      outputTab === "code"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    }`}
                  >
                    code
                  </button>
                  <button
                    onClick={() => setOutputTab("preview")}
                    className={`rounded px-2.5 py-1 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium transition-all duration-200 cursor-pointer ${
                      outputTab === "preview"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    }`}
                  >
                    preview
                  </button>
                </div>
              )}
              <CopyButton text={output} />
              <button
                onClick={handleDownload}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                $ download
              </button>
              {format === "code" && (
                <button
                  onClick={() => {
                    const w = window.open("", "_blank");
                    if (w) {
                      w.document.write(output);
                      w.document.close();
                    }
                  }}
                  className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  $ open --new-tab
                </button>
              )}
            </div>
          )}
        </div>

        <div ref={outputRef} className="flex-1 overflow-y-auto bg-[#0c0c0e]">
          {loading && !output && <SkeletonLoader />}

          {!loading && !output && (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-4xl text-zinc-800">
                  &gt;_
                </div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-600">
                  Awaiting input...<br />Select a reference and run generate.
                </p>
              </div>
            </div>
          )}

          {output && format === "code" && outputTab === "code" && (
            <pre className="p-6 font-[family-name:var(--font-jetbrains-mono)] text-xs leading-relaxed text-zinc-300 overflow-x-auto">
              <code>{output}</code>
            </pre>
          )}

          {output && format === "code" && outputTab === "preview" && (
            <iframe
              srcDoc={output}
              className="w-full min-h-[600px] flex-1 rounded-lg border border-zinc-800"
              sandbox="allow-scripts allow-same-origin"
              title="Live Preview"
            />
          )}

          {output && format === "markdown" && (
            <div
              className="prose prose-invert max-w-none p-6 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(output) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
