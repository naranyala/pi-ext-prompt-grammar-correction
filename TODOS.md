# Prompt Grammar Correction Extension

## Project Status: ACTIVE 🚀

A comprehensive extension for `pi-mono` that enhances prompt engineering through automated grammar correction, style analysis, and educational feedback.

---

## 🏗️ Codebase Structure & Abstraction

### 1. **Core Layer (`src/core`)**
Modular foundation for building and extending the application.
- **`PiExtension`**: Robust API wrapper for `pi-mono`. Simplifies tool registration and adds internal error handling.
- **`Feature`**: Abstract base class for all extension modules.
- **`FeatureRegistry`**: Central registration for features and third-party plugins.

### 2. **Grammar Engine (`src/shared`)**
The "brain" of the extension, decoupled from the UI for testing and performance.
- **`grammar.ts`**: Implements rule matching for 100+ patterns (typos, homophones, weak words, style).
- **`types.ts`**: Shared TypeScript definitions.

### 3. **Features Layer (`src/features`)**
Concrete implementations of user-facing functionality.
- **`PromptGrammarFeature`**: Main feature that hooks into `before_agent_start` events and provides CLI commands/tools.

### 4. **Entry Point (`src/index.ts`)**
Bootstrap logic that initializes the `PiExtension` wrapper and registers all features via the `FeatureRegistry`.

---

## ✨ Features & Capabilities

### ✅ Active Features
- **Typo Correction (50+ patterns)**: Auto-detects and fixes common misspellings.
- **Homophones Detection (24+ rules)**: Identifies confusing words (their/there/they're).
- **Style Analysis**: Detects passive voice, long sentences, hedge words, and fillers.
- **Word Suggestions**: Replaces weak words (good, bad, thing) with more professional alternatives.
- **Professional Paraphrasing**: Suggests more concise and impactful phrasing for prompts.
- **LLM Tools**: A suite of tools (`correct_grammar`, `improve_prompt`, `explain_grammar`, etc.) that the AI agent can call autonomously.

### 🛠️ CLI Interface
- `/grammar on|off`: Toggle auto-detection.
- `/grammar stats`: View correction counters.
- `/grammar help`: Detailed usage guide.
- `/grammar style|homophones`: Direct triggers for specific analysis modules.

---

## ⚠️ Potential Issues & Technical Debt

### 1. **Performance Bottlenecks**
- **Linear Regex Scanning**: Currently scans all 100+ patterns sequentially. While fast for small prompts, it scales linearly with the number of rules.
- **No Caching**: Analysis is performed on every prompt, even if it hasn't changed (though `before_agent_start` only triggers once per turn).

### 2. **Known Limitations (Potential Bugs)**
- **Technical Jargon**: Regex-based typo detection may flag non-standard technical terms (e.g., "teh" might be intentional in some programming contexts).
- **False Positives**: Homophones detection can be noisy if the user intentionally uses a specific variant for creative writing.
- **No Multi-turn Context**: Grammar correction currently only looks at the *current* prompt, not the conversation history.

---

## 🏗️ Future Architecture (Alternative Path)

To address the limitations above, we are exploring a high-performance **Native CLI Toolchain (Alternative)**:
- [ ] **Rust Grammar Engine**: Rewrite the regex engine in Rust using Aho-Corasick for $O(n)$ pattern matching.
- [ ] **WASM Integration**: Compile the Rust engine to WebAssembly for native execution speed within the JS environment.
- [ ] **Deep NLP Integration**: Explore standalone binaries for full dependency parsing (Subject-Verb agreement).

---

## 🧪 Testing Coverage

- **44 Tests Passing** (24 unit, 20 integration)
- **Validated Tools**: `correct_grammar`, `check_grammar`, `check_homophones`, `improve_prompt`, `explain_grammar`, `paraphrase_prompt`.
- **Validation Strategy**: Using a mock Pi-Mono context to verify event registration and UI notification side-effects.
