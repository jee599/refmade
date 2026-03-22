"use client";

import { useState, useEffect, useCallback } from "react";
import { type ModelChoice, getStoredModel, MODEL_CHANGE_EVENT } from "../components/ModelSwitcher";

type InputTab = "url" | "code";

interface AnalysisIssue {
  id: string;
  description: string;
  severity: "high" | "medium" | "low";
}

interface AnalysisResult {
  score: number;
  issues: AnalysisIssue[];
  closestReference: { id: string; name: string };
  summary: string;
  improvedCode: string;
}

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
      className="rounded-md border border-accent-30 bg-accent-10 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-accent-light transition-all duration-200 hover:bg-accent-20 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  const color =
    score >= 7 ? "var(--accent)" : score >= 4 ? "#eab308" : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-2xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-zinc-500">/10</span>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: AnalysisIssue["severity"] }) {
  const styles = {
    high: "border-red-800 bg-red-900/20 text-red-400",
    medium: "border-yellow-800 bg-yellow-900/20 text-yellow-400",
    low: "border-zinc-700 bg-zinc-800 text-zinc-400",
  };

  const labels = { high: "high", medium: "med", low: "low" };

  return (
    <span
      className={`inline-flex rounded-md border px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] font-medium ${styles[severity]}`}
    >
      {labels[severity]}
    </span>
  );
}

export default function ImprovePage() {
  const [tab, setTab] = useState<InputTab>("url");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showImproved, setShowImproved] = useState(false);
  const [model, setModel] = useState<ModelChoice>("sonnet");
  const [outputMode, setOutputMode] = useState<"analyze" | "prompt">("analyze");
  const [promptOutput, setPromptOutput] = useState("");

  useEffect(() => {
    setModel(getStoredModel());
    const handler = (e: Event) => setModel((e as CustomEvent).detail as ModelChoice);
    window.addEventListener(MODEL_CHANGE_EVENT, handler);
    return () => window.removeEventListener(MODEL_CHANGE_EVENT, handler);
  }, []);

  const handleAnalyze = async () => {
    const input = tab === "url" ? url.trim() : code.trim();
    if (!input) {
      setError(tab === "url" ? "Please enter a URL." : "Please enter HTML code.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPromptOutput("");
    setShowImproved(false);

    try {
      const requestBody = tab === "url"
        ? { url: input, model, format: outputMode }
        : { code: input, model, format: outputMode };

      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Could not read stream.");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      if (outputMode === "prompt") {
        setPromptOutput(accumulated);
      } else {
        // Strip markdown code fences if present
        let jsonStr = accumulated.trim();
        if (jsonStr.startsWith("```")) {
          jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
        }

        const parsed = JSON.parse(jsonStr) as AnalysisResult;
        setResult(parsed);
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Could not parse response. Please try again.");
      } else {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImproved = () => {
    if (!result?.improvedCode) return;
    const blob = new Blob([result.improvedCode], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "improved-design.html";
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Input Section */}
      <div className="border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="mb-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight">
            Improve Design
          </h1>
          <p className="mb-8 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">
            <span className="text-accent">$</span> improve --analyze --suggest
          </p>

          {/* Tabs */}
          <div className="mb-6 flex rounded-lg border border-zinc-800 bg-zinc-900 p-1 w-fit">
            <button
              onClick={() => setTab("url")}
              className={`rounded-md px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                tab === "url"
                  ? "bg-accent-10 text-accent-light border border-accent-30"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              url
            </button>
            <button
              onClick={() => setTab("code")}
              className={`rounded-md px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                tab === "code"
                  ? "bg-accent-10 text-accent-light border border-accent-30"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              code
            </button>
          </div>

          {/* Output Mode Toggle */}
          <div className="mb-6 flex rounded-lg border border-zinc-800 bg-zinc-900 p-1 w-fit">
            <button
              onClick={() => setOutputMode("analyze")}
              className={`rounded-md px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                outputMode === "analyze"
                  ? "bg-accent-10 text-accent-light border border-accent-30"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              analyze
            </button>
            <button
              onClick={() => setOutputMode("prompt")}
              className={`rounded-md px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                outputMode === "prompt"
                  ? "bg-accent-10 text-accent-light border border-accent-30"
                  : "text-zinc-500 hover:text-zinc-300 border border-transparent"
              }`}
            >
              prompt
            </button>
          </div>

          {/* URL Input */}
          {tab === "url" && (
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-accent-70">$</span>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-3 pl-7 pr-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="shrink-0 rounded-lg bg-accent px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {loading ? "analyzing..." : outputMode === "prompt" ? "$ export --prompt" : `$ analyze --model ${model}`}
              </button>
            </div>
          )}

          {/* Code Input */}
          {tab === "code" && (
            <div className="space-y-3">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste HTML code here..."
                rows={12}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 resize-none"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="rounded-lg bg-accent px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {loading ? "analyzing..." : outputMode === "prompt" ? "$ export --prompt" : `$ analyze --model ${model}`}
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm text-red-400">
              <span className="text-red-500">[ERR]</span> {error}
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-zinc-800" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 rounded bg-zinc-800" />
                <div className="h-4 w-72 rounded bg-zinc-800" />
              </div>
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-zinc-800" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prompt Output */}
      {promptOutput && outputMode === "prompt" && !loading && (
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="mb-4 rounded-lg border border-accent-30 bg-accent-10 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-accent-light">
            Paste this prompt into Claude, ChatGPT, or any AI.
          </div>
          <div className="flex justify-end mb-3">
            <CopyButton text={promptOutput} />
          </div>
          <pre className="rounded-lg border border-zinc-800 bg-[#0c0c0e] p-6 font-[family-name:var(--font-jetbrains-mono)] text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap break-words overflow-auto max-h-[600px]">
            {promptOutput}
          </pre>
        </div>
      )}

      {/* Analysis Results */}
      {result && !loading && outputMode === "analyze" && (
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Score + Summary */}
          <div className="mb-8 flex items-start gap-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <ScoreRing score={result.score} />
            <div className="flex-1">
              <h2 className="mb-1 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">Design Score</h2>
              <p className="mb-3 text-base text-zinc-400">{result.summary}</p>
              <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-400 w-fit">
                <span className="text-zinc-600">closest_ref:</span>
                <span className="font-medium text-accent-light">
                  #{result.closestReference.id} {result.closestReference.name}
                </span>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="mb-8">
            <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">Issues Found</h2>
            <div className="space-y-2">
              {result.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-800"
                    style={{ accentColor: "var(--accent)" }}
                    readOnly
                  />
                  <span className="flex-1 text-base text-zinc-300">
                    {issue.description}
                  </span>
                  <SeverityBadge severity={issue.severity} />
                </div>
              ))}
            </div>
          </div>

          {/* Improve Button */}
          {!showImproved && result.improvedCode && (
            <button
              onClick={() => setShowImproved(true)}
              className="w-full rounded-lg bg-accent px-6 py-3 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-accent-light cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              $ show --improved-code
            </button>
          )}

          {/* Improved Code Output */}
          {showImproved && result.improvedCode && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">Improved Code</h2>
                <div className="flex items-center gap-2">
                  <CopyButton text={result.improvedCode} />
                  <button
                    onClick={handleDownloadImproved}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    download
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-zinc-800">
                {/* Terminal title bar */}
                <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">improved-design.html</span>
                </div>
                <pre className="max-h-[600px] overflow-auto bg-[#0c0c0e] p-6 font-[family-name:var(--font-jetbrains-mono)] text-xs leading-relaxed text-zinc-300">
                  <code>{result.improvedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
