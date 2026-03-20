"use client";

import { useState, useCallback } from "react";

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
      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  const color =
    score >= 7 ? "#22c55e" : score >= 4 ? "#eab308" : "#ef4444";

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
        <span className="text-2xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-zinc-500">/10</span>
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

  const labels = { high: "심각", medium: "보통", low: "낮음" };

  return (
    <span
      className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${styles[severity]}`}
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

  const handleAnalyze = async () => {
    const input = tab === "url" ? url.trim() : code.trim();
    if (!input) {
      setError(tab === "url" ? "URL을 입력해주세요." : "HTML 코드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowImproved(false);

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tab === "url" ? { url: input } : { code: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "분석에 실패했습니다.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("스트림을 읽을 수 없습니다.");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      // Strip markdown code fences if present
      let jsonStr = accumulated.trim();
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
      }

      const parsed = JSON.parse(jsonStr) as AnalysisResult;
      setResult(parsed);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("응답을 파싱할 수 없습니다. 다시 시도해주세요.");
      } else {
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
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
          <h1 className="mb-8 text-2xl font-bold tracking-tight">디자인 고도화</h1>

          {/* Tabs */}
          <div className="mb-6 flex rounded-lg border border-zinc-800 bg-zinc-900 p-1 w-fit">
            <button
              onClick={() => setTab("url")}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                tab === "url"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              URL
            </button>
            <button
              onClick={() => setTab("code")}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 ${
                tab === "code"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Code
            </button>
          </div>

          {/* URL Input */}
          {tab === "url" && (
            <div className="flex gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="shrink-0 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {loading ? "분석 중..." : "분석하기"}
              </button>
            </div>
          )}

          {/* Code Input */}
          {tab === "code" && (
            <div className="space-y-3">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="HTML 코드를 붙여넣으세요..."
                rows={12}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 resize-none"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                {loading ? "분석 중..." : "분석하기"}
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
              {error}
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

      {/* Analysis Results */}
      {result && !loading && (
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Score + Summary */}
          <div className="mb-8 flex items-start gap-6 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <ScoreRing score={result.score} />
            <div className="flex-1">
              <h2 className="mb-1 text-lg font-semibold">현재 디자인 점수</h2>
              <p className="mb-3 text-sm text-zinc-400">{result.summary}</p>
              <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-400 w-fit">
                <span className="text-zinc-500">가장 가까운 래퍼런스:</span>
                <span className="font-medium text-zinc-200">
                  #{result.closestReference.id} {result.closestReference.name}
                </span>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">개선 필요 항목</h2>
            <div className="space-y-2">
              {result.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-800 accent-blue-500"
                    readOnly
                  />
                  <span className="flex-1 text-sm text-zinc-300">
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
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              고도화 결과 보기
            </button>
          )}

          {/* Improved Code Output */}
          {showImproved && result.improvedCode && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">고도화된 코드</h2>
                <div className="flex items-center gap-2">
                  <CopyButton text={result.improvedCode} />
                  <button
                    onClick={handleDownloadImproved}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  >
                    다운로드
                  </button>
                </div>
              </div>
              <pre className="max-h-[600px] overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-xs leading-relaxed text-zinc-300">
                <code>{result.improvedCode}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
