"use client";

import React, { useState } from "react";
import { ChevronDown, AlertCircle, Wrench, Terminal } from "lucide-react";
import { CopyButton } from "./CopyButton";

interface TroubleItem {
  id: string;
  title: string;
  symptom: string;
  cause: string;
  solution: string;
  codeSolution?: string;
}

export function Troubleshooting() {
  const [openItem, setOpenItem] = useState<string | null>("noise-failure");

  const issues: TroubleItem[] = [
    {
      id: "noise-failure",
      title: "Test fails during replay due to timestamp difference (body.ts)",
      symptom:
        "Keploy reports FAILED on test-1 with a diff in the JSON body: expected ts: 1718943885198315028 but got ts: 1790939375380806179.",
      cause:
        "The Go application computes time.Now().UnixNano() on every URL creation. Because timestamps are non-deterministic, exact-match comparison fails unless explicitly marked as noise.",
      solution:
        "Open keploy/test-set-0/tests/test-1.yaml and verify that body.ts is declared under the assertions.noise block so Keploy ignores timestamp variance while asserting on the rest of the body.",
      codeSolution: `assertions:
  noise:
    body.ts: []
    header.Date: []`,
    },
    {
      id: "mongo-connection",
      title: "failed to create mgo db client or connection refused to mongoDb:27017",
      symptom:
        "Application container logs: 'failed to create mgo db client: server selection error: server selection timeout'.",
      cause:
        "The Go application container and the MongoDB container are running on different Docker networks or the shared network keploy-network was not created.",
      solution:
        "Ensure both containers are attached to the same network: keploy-network. Verify the network exists and that mongoDb container is running.",
      codeSolution: `docker network create keploy-network 2>/dev/null || true
docker network connect keploy-network mongoDb 2>/dev/null || true`,
    },
    {
      id: "port-conflict",
      title: "Bind for 0.0.0.0:8080 failed: port is already allocated",
      symptom:
        "Docker fails to start the Go container with error: 'driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:8080 failed'.",
      cause:
        "Another local service or an orphaned container from a previous test run is still listening on port 8080 or 27017.",
      solution:
        "Inspect running containers with docker ps and stop any stale application instances occupying port 8080.",
      codeSolution: `docker rm -f MongoApp testGinApp 2>/dev/null || true
lsof -i :8080 | awk 'NR>1 {print $2}' | xargs kill -9 2>/dev/null || true`,
    },
    {
      id: "empty-testset",
      title: "Keploy finishes recording with 0 test cases generated",
      symptom:
        "When stopping keploy record, the output says 'No testcases recorded' or keploy/test-set-0/tests is empty.",
      cause:
        "Either no HTTP requests were sent while keploy record was running, or requests were sent before the application container finished its startup delay (build-delay).",
      solution:
        "Wait for the application to output '[GIN-debug] Listening and serving HTTP on :8080' before firing curl requests. Always pass --build-delay 15 to ensure the container is ready.",
      codeSolution: `curl -v http://localhost:8080/url -H 'Content-Type: application/json' -d '{"url":"https://google.com"}'`,
    },
  ];

  return (
    <div className="my-8 space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-500" />
          <span>Troubleshooting & Common Edge Cases</span>
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Practical solutions to issues encountered during local containerized Go recording and replay.
        </p>
      </div>

      <div className="space-y-3">
        {issues.map((item) => {
          const isOpen = openItem === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-amber-500/50 bg-amber-500/[0.02] dark:bg-amber-500/[0.03] shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : item.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isOpen
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  />
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-amber-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3 text-xs sm:text-sm animate-in fade-in-50 duration-150">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      Symptom
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      {item.symptom}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Root Cause
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      {item.cause}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Verified Fix
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  {item.codeSolution && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
                      <div className="flex items-center justify-between px-3 py-1 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                        <span>quick fix</span>
                        <CopyButton text={item.codeSolution} />
                      </div>
                      <pre className="p-3 font-mono text-xs overflow-x-auto text-emerald-400">
                        <code>{item.codeSolution}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
