# ✍️ Prompt Grammar Correction Extension for Pi-Mono

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

An intelligent, real-time grammar and style assistant designed specifically for the **Pi-Mono** coding agent. This extension optimizes the interface between human intent and AI execution by ensuring prompts are clear, professional, and structurally sound.

---

## 🌟 Why This Extension?

In the world of LLMs, **Prompt Engineering is the new syntax**. A single typo or a vague instruction can lead to suboptimal code or logical errors. This extension acts as a transparent quality-assurance layer that:

*   **Reduces Iteration Cycles**: Catching typos before the LLM processes them saves time and compute.
*   **Enhances Professionalism**: Automatically elevates casual phrasing into high-impact communication.
*   **Encourages Best Practices**: Proactively suggests the use of Personas, Constraints, and Output Formats.
*   **Educational Feedback**: Provides contextual explanations, helping users improve their writing skills while they work.

---

## ✨ Features at a Glance

### 1. 🛠️ Robust Correction Engine
*   **Smart Typo Detection**: Over 100+ patterns covering common misspellings and phrase-level errors.
*   **Homophone Guard**: Advanced detection for confusing pairs like *their/there/they're*, *affect/effect*, and *complement/compliment*.
*   **Normalization**: Automatic British-to-American English normalization for consistent prompt styling.

### 2. 🎨 Advanced Style & Vocabulary
*   **Precision Mapping**: Replaces "weak" words (*good, bad, thing*) with context-aware, professional alternatives (*exceptional, detrimental, component*).
*   **Active Voice Enforcement**: Flags passive voice and suggests direct, high-impact alternatives.
*   **Clutter Removal**: Identifies and strips hedge words (*maybe, I think*) and redundant fillers (*basically, actually*).

### 3. 🤖 AI-Agent Integration (LLM Tools)
The AI agent can autonomously call these tools to assist you:
*   `correct_grammar`: Instant one-click fix for all identified issues.
*   `improve_prompt`: A deep-dive analysis of vocabulary, style, and structure.
*   `explain_grammar`: Educational context on *why* a specific correction was suggested.

---

## 🚀 Installation

```bash
pi install git:github.com/naranyala/pi-ext-prompt-grammar-correction
```
---

## ⌨️ CLI Interface

| Command | Description |
| :--- | :--- |
| `/grammar on \| off` | Toggle real-time background analysis |
| `/grammar suggestions` | Toggle the notification overlay for typos |
| `/grammar style` | Run a style check on the last prompt |
| `/grammar stats` | View session correction metrics |
| `/grammar help` | Detailed usage and tool guide |

---

## 🏗️ Architecture & Abstraction

The project follows a modular, feature-based architecture designed for extensibility:

*   **`PiExtension` Wrapper**: A high-level abstraction over the Pi-Mono `ExtensionAPI`, providing safe tool registration and error handling.
*   **`Feature` System**: Decoupled modules (like Grammar or Style) that can be individually enabled, disabled, or extended.
*   **`GrammarEngine`**: A pure, testable regex-based engine separated from the UI logic.

### 🚀 Future-Proofing: The Rust Roadmap
To ensure $O(n)$ performance as the rule set grows, we are exploring:
*   **Native CLI Toolchain**: Porting the regex engine to **Rust** using Aho-Corasick algorithms.
*   **WASM Core**: Compiling the high-performance Rust engine to WebAssembly for native-speed execution within the extension sandbox.

---

## 🧪 Testing

We maintain a rigorous testing suite using **Bun**:
*   **Unit Tests**: Validating 100+ regex patterns and logic in `src/shared/grammar.ts`.
*   **Integration Tests**: Mocking the Pi-Mono context to verify tool registration and event lifecycle.

```bash
bun test
```
---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Naranyala** - [@naranyala](https://github.com/naranyala)
