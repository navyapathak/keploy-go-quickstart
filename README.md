# Keploy Go Quickstart Tutorial

A production-grade developer documentation experience and hands-on guide for integrating **[Keploy](https://keploy.io)** with a **Go (Gin + MongoDB)** REST application.

> **Context**: This project was developed as part of the **Keploy DevRel Engineering Candidate Assignment**. It demonstrates technical accuracy, real-world quickstart execution, developer empathy, and technical writing combined with a documentation-style frontend.

---

## Live Links

*   **Live Documentation Site**: [https://keploy-flame.vercel.app](https://keploy-flame.vercel.app)
*   **Source Code Repository**: [https://github.com/navyapathak/keploy-go-quickstart](https://github.com/navyapathak/keploy-go-quickstart)

---

## Overview

Modern cloud-native testing usually forces engineers into an uncomfortable dilemma: either maintain brittle, synthetic mocks with libraries like `gomock` or run heavy, slow end-to-end integration environments with multi-container Docker Compose setups.

This project showcases how **Keploy** eliminates that friction through zero-code eBPF and network transport layer interception:
1. Captures real inbound HTTP API requests and outbound MongoDB binary wire protocols (OP_MSG).
2. Generates human-readable, Git-versionable YAML test cases (`tests/test-1.yaml`) and database mock cassettes (`mocks.yaml`).
3. Calibrates non-deterministic fields (`assertions.noise` for dynamic timestamps like `body.ts`).
4. Replays test cases offline against the Go application with **MongoDB completely shut down**, validating status codes, headers, and responses in milliseconds.

---

## What This Project Does

This repository houses a **single-page static documentation website** built with:
*   **Next.js (App Router, Turbopack)**: Fast static prerendering and zero runtime bundle overhead for content pages.
*   **MDX as Single Source of Truth**: The tutorial article is written entirely in `content/keploy-go-quickstart.mdx` and compiled via server-side MDX.
*   **Tailwind CSS**: Custom documentation-grade design system with dark/light mode toggle and responsive layouts.
*   **Custom Interactive Components**:
    *   `<WorkflowDiagram />`: Interactive architecture visualizer with switchable *Record Mode* vs *Offline Replay Mode*.
    *   `<Step />`: Command cards with rationale, expected terminal outputs, and copy feedback.
    *   `<Callout />`: Accessible informational, warning, tip, and success callouts.
    *   `<Troubleshooting />`: Accordion-based solutions to real edge cases (noise filtering, network bindings, port collisions).
    *   `<TableOfContents />`: Active heading spy with smooth scrolling and mobile quick-jump drawer.
    *   `<ThemeToggle />`: Dark mode, light mode, and system preference with zero flash of unstyled content (FOUC).

---

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
*   **Content Engine**: [MDX](https://mdxjs.com/) via `next-mdx-remote/rsc`
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Target Application Tested**: Go 1.22, Gin Web Framework, Official MongoDB Go Driver
*   **Test Orchestration**: Keploy CLI v3.8.58 & Docker Desktop

---

## Project Structure

```text
keploy/
├── app/
│   ├── layout.tsx         # Root layout with metadata, fonts, and dark mode script
│   ├── page.tsx           # Main documentation page (3-column layout)
│   └── globals.css        # Tailwind CSS imports and theme variables
├── content/
│   └── keploy-go-quickstart.mdx # Complete tutorial content in MDX
├── components/
│   ├── Header.tsx         # Sticky header with logo, navigation, and theme toggle
│   ├── Hero.tsx           # Editorial hero with metadata pills and quick-start button
│   ├── Step.tsx           # Step card component with copy buttons and rationale
│   ├── Callout.tsx        # Styled alert boxes (info, tip, warning, success)
│   ├── WorkflowDiagram.tsx# Interactive Record/Replay architecture visualization
│   ├── Troubleshooting.tsx# Expandable accordion for verified edge cases
│   ├── TableOfContents.tsx# Sticky desktop TOC with scroll spy
│   ├── MobileToc.tsx      # Collapsible mobile TOC drawer
│   ├── CodeBlock.tsx      # Syntax-highlighted code block container
│   ├── CopyButton.tsx     # Clipboard copy button with 'Copied!' state
│   ├── ThemeToggle.tsx    # Light / Dark / System theme switcher
│   ├── GithubIcon.tsx     # Clean SVG GitHub brand icon
│   ├── ProgressIndicator.tsx # Reading progress bar at top of viewport
│   └── Footer.tsx         # Official Keploy links and project attribution
├── lib/
│   ├── mdx.tsx            # Server-side MDX compilation and component bindings
│   └── toc.ts             # Heading extraction and slugification utility
├── package.json           # Project dependencies and build scripts
└── README.md              # Project documentation and setup instructions
```

---

## Running Locally

### Prerequisites
*   Node.js 18.17+ or Node.js 20+
*   npm 9+

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/navyapathak/keploy-go-quickstart.git
cd keploy-go-quickstart
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Production Build

To test the optimized static production build locally:

```bash
npm run build
npm run start
```

The site compiles cleanly to static HTML with zero hydration mismatches.

---

## Testing the Keploy Go Quickstart (Actual Workflow)

To replicate the hands-on Go URL shortener recording tested during this assignment:

1. **Start MongoDB**:
   ```bash
   docker network create keploy-network 2>/dev/null || true
   docker run -p 27017:27017 -d --network keploy-network --name mongoDb mongo
   ```

2. **Build Go App**:
   ```bash
   cd samples-go/gin-mongo
   docker build -t gin-app:1.0 .
   ```

3. **Record API Traffic**:
   ```bash
   keploy record -c "docker run -p 8080:8080 --name MongoApp --rm --network keploy-network gin-app:1.0" --container-name "MongoApp" --build-delay 15
   ```

4. **Send Requests via cURL**:
   ```bash
   curl -X POST http://localhost:8080/url -H 'Content-Type: application/json' -d '{"url":"https://google.com"}'
   curl -i http://localhost:8080/<slug>
   ```

5. **Stop MongoDB and Replay Offline**:
   ```bash
   docker stop mongoDb
   keploy test -c "docker run -p 8080:8080 --net keploy-network --rm --name MongoApp gin-app:1.0" --container-name "MongoApp" --delay 10 --useLocalMock
   ```

---

## Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com):

```bash
npx vercel
```

Because it uses Next.js static prerendering, every page is served from Vercel's global Edge Network with sub-second TTFB.

---

## Author

**Navya Pathak**  
Created for the **Keploy DevRel Engineering Candidate Evaluation**.
