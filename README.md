# ✍️ Prompt Grammar Correction Extension for pi-mono

An intelligent, real-time grammar and style assistant for the pi coding agent. This extension improves the quality of user prompts, enhances professional communication, and optimizes prompt engineering to elicit better responses from the LLM.

## 🌟 Overview

The Prompt Grammar Correction Extension acts as a transparent layer between the user and the AI. It doesn't just fix typos; it analyzes the **intent, tone, and structure** of prompts to ensure they are clear, concise, and professional.

### 🚀 Key Value Propositions
- **Higher Quality Responses**: Clearer prompts $\rightarrow$ Better LLM output.
- **Passive Learning**: Users improve their English grammar and professional writing through real-time suggestions.
- **Professional Tone**: Transforms casual phrasing into high-impact professional communication.
- **Prompt Engineering**: Proactively suggests best practices (Personas, Constraints, Formats).

---

## ✨ Features

### 1. 🛠️ Robust Correction Engine
- **Typo Detection**: 50+ common misspelling patterns and phrase-level corrections.
- **Homophone Guard**: Distinguishes between confusing words (e.g., *their/there/they're*, *affect/effect*, *complement/compliment*).
- **Consistency**: Automatic British-to-American English normalization for consistent prompt styling.

### 2. 📚 Rich Vocabulary & Paraphrasing
- **Weak $\rightarrow$ Strong Word Mapping**: Replaces vague adjectives (e.g., *"good"*, *"big"*) with precise, professional alternatives (e.g., *"exceptional"*, *"substantial"*).
- **Professional Verbs**: Suggests formal alternatives for phrasal verbs (e.g., *"look at"* $\rightarrow$ *"analyze"*).
- **Phrase Paraphrasing**: 
  - **Professionalism**: *"I want you to"* $\rightarrow$ *"Please"*
  - **Conciseness**: *"in order to"* $\rightarrow$ *"to"*
  - **Impact**: *"at the end of the day"* $\rightarrow$ *"ultimately"*

### 3. 🎨 Advanced Style Analysis
- **Active Voice**: Detects passive voice and suggests direct alternatives.
- **Hedge Word Detection**: Flags tentative language (*"maybe"*, *"I think"*) to make prompts more confident.
- **Filler Word Removal**: identifies redundant words (*"basically"*, *"actually"*) to increase conciseness.
- **Redundancy Check**: Catches tautologies like *"added bonus"* or *"past history"*.

### 4. 💡 Prompt Engineering Guide
The extension analyzes prompts for core AI interaction principles:
- **Persona Assignment**: Suggests adding a role (e.g., *"Act as a Senior Architect"*).
- **Format Specification**: Reminds users to specify output formats (e.g., *"Output as a JSON array"*).
- **Constraint Definition**: Suggests adding boundaries (e.g., *"Do not use external libraries"*).

---

## 🛠️ Usage

### ⌨️ Commands
Use these commands directly in the pi chat:

| Command | Description |
|----------|-------------|
| `/grammar on` | Enable real-time correction and notifications |
| `/grammar off` | Disable the extension |
| `/grammar suggestions` | Toggle auto-notification for typos |
| `/grammar stats` | View the number of corrections made in this session |
| `/grammar help` | Show full usage guide |
| `/grammar style` | Quick overview of style analysis capabilities |

### 🤖 LLM Tools
The AI can call these tools to help the user refine their prompts:

- `correct_grammar(text)`: Fixes all typos and basic grammar issues instantly.
- `check_grammar(text)`: Identifies issues without applying fixes.
- `check_homophones(text)`: Specifically checks for confusing word pairs.
- `improve_prompt(text)`: Performs a full analysis (Vocabulary + Style + Prompt Engineering).
- `paraphrase_prompt(text)`: Suggests more professional or concise ways to phrase the prompt.
- `explain_grammar(text)`: Provides educational explanations for why a correction was made.

---

## ⚙️ Installation & Development

### Quick Start
```bash
# Install dependencies
npm install

# Run the extension locally
pi -e ./src/index.ts
```

### Project Structure
- `src/index.ts`: Extension entry point and registration.
- `src/shared/grammar.ts`: The "Brain" containing all regex patterns, word maps, and analysis logic.
- `src/features/prompt-grammar/`: Feature implementation and tool registrations.
- `tests/`: Comprehensive test suite for grammar and feature logic.

### Running Tests
```bash
npm test
```

## 📄 License
MIT
