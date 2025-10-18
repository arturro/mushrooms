<!--
  Project: mushrooms (workspace root: c:\Dev\prv\mushrooms)
  Generated: 2025-10-18
  Purpose: guidance for AI coding agents to be immediately productive in this repo.
-->

# Copilot / AI Agent Instructions

Repository state (discovered): this workspace appears to contain no source files or project manifests (no `package.json`, `pyproject.toml`, `README.md`, or `.github/workflows` discovered). If files are missing locally, first pull or ask the maintainer for the correct repository contents.

Goal for an agent arriving here:
- Quickly detect the project type and build/test workflow.
- Prefer non-destructive reads before edits; if the repo is empty, create scaffolding only after confirmation.

Immediate actionable steps (use PowerShell commands shown below):

1. Repo discovery (run from workspace root):

```powershell
# Look for common manifests and top-level docs
Get-ChildItem -Recurse -File -Include package.json,pyproject.toml,requirements.txt,setup.py,README.md,Makefile,Dockerfile -ErrorAction SilentlyContinue

# Look for CI/workflow files
Get-ChildItem -Recurse -File -Include '*.yml','*.yaml' | Where-Object { $_.FullName -match '\.github\\workflows' }

# Quick source folders
Get-ChildItem -Directory -Name | Where-Object { $_ -in @('src','lib','app','cmd','pkg','internal','server','web','frontend','backend','api') }
```

2. If the repo truly has no files:
- Do not push large scaffolding without instruction. Create a short note in `.github/copilot-instructions.md` (this file) explaining detected emptiness and suggested next steps for maintainers.
- Ask the user/maintainer for the canonical repo URL or the missing files.

Project-specific patterns and heuristics (nothing found — keep these checks ready):
- Node.js: prefer `package.json` -> check `scripts` for `build`, `test`, `start`.
- Python: prefer `pyproject.toml` or `requirements.txt` -> look for `tox.ini` or `pytest` usage.
- Go: presence of `go.mod` and `cmd/` or `pkg/` indicates Go layout.

When you find code, extract these facts into short bullets and update this file:
- language(s) and primary entrypoint(s) (files that run services or start the app)
- how to build locally (exact commands from manifests or CI)
- how to run tests (exact commands from manifests or CI)
- where integration or infra config lives (Dockerfile, `infra/`, `.github/workflows`)

Editing and merge guidance for other AI agents:
- If `.github/copilot-instructions.md` already exists, merge by preserving its explicit examples and augmenting the "discovered facts" section. Keep historical notes but move stale items under a "stale/archived" heading.
- Keep file concise (20–50 lines). Use explicit commands and exact file paths when possible.

Communication and PR hints:
- Create a small PR with one focused change per branch. Use branch names like `copilot/update-instructions/{short-desc}`.
- Include a short "what I changed" summary and the commands you ran to validate.

If blocked or uncertain:
- Ask the maintainer for the canonical repository URL or the missing top-level files.
- If the maintainer is unavailable, create a minimal issue describing which critical files are missing and what you'd add next (e.g., README, language manifest).

Files to update when repo is populated:
- Add a short "discovered facts" section at the top with: language, build/test commands, important directories and the service entrypoints.

End of instructions.
