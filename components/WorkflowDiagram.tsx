"use client";

import React, { useState } from "react";
import { ArrowRight, Database, Globe, Play, Server, ShieldCheck, Sparkles } from "lucide-react";

interface NodeDetail {
  id: string;
  name: string;
  badge: string;
  role: string;
  description: string;
  networkDetails: string;
}

export function WorkflowDiagram() {
  const [activeTab, setActiveTab] = useState<"record" | "replay">("record");
  const [selectedNode, setSelectedNode] = useState<string>("keploy-proxy");

  const nodesRecord: Record<string, NodeDetail> = {
    client: {
      id: "client",
      name: "HTTP Client (cURL / Browser)",
      badge: "Ingress Generator",
      role: "Initiates real API requests",
      description:
        "Sends real HTTP POST and GET requests to create and redirect shortened URLs (e.g., POST /url with JSON payload).",
      networkDetails: "Connects to localhost:8080 over TCP",
    },
    "keploy-proxy": {
      id: "keploy-proxy",
      name: "Keploy Network Hook (eBPF / Proxy)",
      badge: "Traffic Interceptor",
      role: "Captures full duplex network communication",
      description:
        "Passively observes the inbound HTTP request and intercepts the outgoing MongoDB wire socket. Zero code modification required.",
      networkDetails: "Intercepts ports :8080 and :27017 on keploy-network",
    },
    "go-app": {
      id: "go-app",
      name: "Go Application (Gin)",
      badge: "Service Under Test",
      role: "Executes business logic",
      description:
        "Processes the request with Gin, generates a slug, timestamps the entry, and executes MongoDB driver calls to persist data.",
      networkDetails: "Runs inside Docker container MongoApp",
    },
    database: {
      id: "database",
      name: "MongoDB Database",
      badge: "Live Dependency",
      role: "Answers real database queries during recording",
      description:
        "Responds to the Go driver with binary BSON packets (OP_MSG wire protocol). Keploy serializes both request and response.",
      networkDetails: "Runs on mongoDb:27017 in keploy-network",
    },
    artifacts: {
      id: "artifacts",
      name: "Recorded YAML Files",
      badge: "Test & Mock Cassettes",
      role: "Stores persistent deterministic fixtures",
      description:
        "Keploy persists tests/test-1.yaml for HTTP traffic and mocks.yaml for MongoDB query/response pairs. Ready to commit to Git.",
      networkDetails: "Saved locally under ./keploy/test-set-0/",
    },
  };

  const nodesReplay: Record<string, NodeDetail> = {
    runner: {
      id: "runner",
      name: "Keploy Test Engine",
      badge: "Orchestrator",
      role: "Feeds recorded HTTP requests to the app",
      description:
        "Spins up the Go application container in an isolated sandbox and replays the recorded HTTP requests with exact headers.",
      networkDetails: "Transmits to localhost:8080",
    },
    "go-app": {
      id: "go-app",
      name: "Go Application (Gin)",
      badge: "Unchanged Binary",
      role: "Executes unchanged production code",
      description:
        "The application executes its normal handlers and attempts to connect to mongoDb:27017. It has no awareness that it is being tested.",
      networkDetails: "Unaware of mocks; dials default mongoDb host",
    },
    "keploy-mocks": {
      id: "keploy-mocks",
      name: "Keploy Virtual Wire Mock",
      badge: "Zero-Dependency Mocks",
      role: "Simulates MongoDB at the network packet layer",
      description:
        "Intercepts outbound calls to port 27017 and immediately serves the recorded BSON responses from mocks.yaml. Real MongoDB is OFF!",
      networkDetails: "Virtual socket simulation on :27017",
    },
    assertions: {
      id: "assertions",
      name: "Diff & Assertion Engine",
      badge: "Result Validator",
      role: "Compares actual vs expected responses",
      description:
        "Validates HTTP status code, headers, and body. Applies noise rules to ignore dynamic timestamps (ts) and date headers.",
      networkDetails: "Generates PASSED / FAILED summary report",
    },
  };

  const currentNodes = activeTab === "record" ? nodesRecord : nodesReplay;
  const activeDetail = currentNodes[selectedNode] || Object.values(currentNodes)[0];

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-5 sm:p-7 shadow-xs">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Interactive Architecture
          </span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {activeTab === "record"
              ? "How Keploy Records API Traffic"
              : "How Keploy Replays Tests Offline"}
          </h3>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/80 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setActiveTab("record");
              setSelectedNode("keploy-proxy");
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "record"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            1. Record Phase
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("replay");
              setSelectedNode("keploy-mocks");
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "replay"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            2. Replay Phase (Offline)
          </button>
        </div>
      </div>

      {/* Visual Flow diagram */}
      <div className="py-6 overflow-x-auto">
        <div className="min-w-[620px] flex items-center justify-between gap-2">
          {activeTab === "record" ? (
            <>
              {/* Client */}
              <button
                type="button"
                onClick={() => setSelectedNode("client")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "client"
                    ? "border-amber-500 bg-amber-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    HTTP Client
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">cURL / Port 8080</div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Keploy Proxy */}
              <button
                type="button"
                onClick={() => setSelectedNode("keploy-proxy")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  selectedNode === "keploy-proxy"
                    ? "border-amber-500 bg-amber-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Keploy Proxy
                  </span>
                </div>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                  eBPF / Net Filter
                </div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Go App */}
              <button
                type="button"
                onClick={() => setSelectedNode("go-app")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "go-app"
                    ? "border-amber-500 bg-amber-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Server className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Go App (Gin)
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">MongoApp:8080</div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Real Database */}
              <button
                type="button"
                onClick={() => setSelectedNode("database")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "database"
                    ? "border-amber-500 bg-amber-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    MongoDB
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">Live :27017</div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Artifacts */}
              <button
                type="button"
                onClick={() => setSelectedNode("artifacts")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "artifacts"
                    ? "border-amber-500 bg-amber-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">📁</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    YAML Cassettes
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">tests/ & mocks.yaml</div>
              </button>
            </>
          ) : (
            <>
              {/* Keploy Replay Runner */}
              <button
                type="button"
                onClick={() => setSelectedNode("runner")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "runner"
                    ? "border-indigo-500 bg-indigo-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Test Runner
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">Plays test-1.yaml</div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Go App */}
              <button
                type="button"
                onClick={() => setSelectedNode("go-app")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "go-app"
                    ? "border-indigo-500 bg-indigo-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Server className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Go App (Gin)
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500">Standard Container</div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Keploy Virtual Mock */}
              <button
                type="button"
                onClick={() => setSelectedNode("keploy-mocks")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "keploy-mocks"
                    ? "border-indigo-500 bg-indigo-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Database className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Virtual MongoDB
                  </span>
                </div>
                <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  From mocks.yaml
                </div>
              </button>

              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />

              {/* Diff Engine */}
              <button
                type="button"
                onClick={() => setSelectedNode("assertions")}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedNode === "assertions"
                    ? "border-indigo-500 bg-indigo-500/10 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Diff Validator
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Noise Filtered
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Explanatory Node Card */}
      {activeDetail && (
        <div className="mt-2 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {activeDetail.name}
              </h4>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
              {activeDetail.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {activeDetail.description}
          </p>
          <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <span>Role: {activeDetail.role}</span>
            <span className="text-zinc-700 dark:text-zinc-300">{activeDetail.networkDetails}</span>
          </div>
        </div>
      )}
    </div>
  );
}
