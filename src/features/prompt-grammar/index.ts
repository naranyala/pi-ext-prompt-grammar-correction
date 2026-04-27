import { Type } from "@sinclair/typebox";
import { Feature } from "../../core/feature";
import { applyGrammarFixes, detectGrammarIssues, getSuggestions, detectHomophones, getWordSuggestions, analyzeStyle, getParaphraseSuggestions, HOMOPHONES, WORD_SUGGESTIONS } from "../../shared/grammar";

export class PromptGrammarFeature extends Feature {
  private enabled = true;
  private showSuggestions = true;
  private correctionCount = 0;

  init() {
    this.registerCommands();
    this.registerTools();
    this.registerEventHandlers();
  }

  private registerCommands() {
    this.ext.registerCommand("grammar", {
      description: "Grammar correction settings",
      handler: async (args, ctx) => {
        const arg = args.trim().toLowerCase();
        
        if (arg === "on") {
          this.enabled = true;
          ctx.ui.notify("✅ Grammar correction enabled", "info");
        } else if (arg === "off") {
          this.enabled = false;
          ctx.ui.notify("❌ Grammar correction disabled", "info");
        } else if (arg === "suggestions") {
          this.showSuggestions = !this.showSuggestions;
          ctx.ui.notify(
            this.showSuggestions ? "🔔 Suggestions shown" : "🔕 Suggestions hidden",
            "info"
          );
        } else if (arg === "stats") {
          ctx.ui.notify(
            `📊 Corrections: ${this.correctionCount}, Enabled: ${this.enabled}`,
            "info"
          );
        } else if (arg === "help") {
          ctx.ui.notify(
            "Usage: /grammar on|off|suggestions|stats|help|homophones|style|explain\n\n" +
            "Auto-detects common typos in your prompts.\n" +
            "/grammar homophones - Check confusing words\n" +
            "/grammar style - Analyze writing style\n" +
            "/grammar explain - Get detailed explanations",
            "info"
          );
        } else if (arg === "homophones") {
          ctx.ui.notify(
            "📝 Homophones Detection:\n" +
            "• their/there/they're\n• your/you're\n• to/too/two\n" +
            "• affect/effect\n• accept/except\n• and 20+ more",
            "info"
          );
        } else if (arg === "style") {
          ctx.ui.notify(
            "🎨 Style Analysis:\n" +
            "• Passive voice detection\n• Long sentence warnings\n" +
            "• Weak word suggestions\n• Professional phrasing tips",
            "info"
          );
        } else if (arg === "explain") {
          ctx.ui.notify(
            "📚 Grammar Explainer:\n" +
            "Get detailed explanations for corrections\n" +
            "Use /explain_grammar tool for specific text",
            "info"
          );
        } else {
          ctx.ui.notify(
            "Usage: /grammar on|off|suggestions|stats|help|homophones|style|explain",
            "info"
          );
        }
      },
    });
  }

  private registerTools() {
    this.ext.registerTool({
      name: "paraphrase_prompt",
      label: "Paraphrase Prompt",
      description: "Suggest more professional or concise ways to phrase your prompt",

      parameters: Type.Object({
        text: Type.String({ description: "Text to paraphrase" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Analyzing phrasing..." }],
          details: {}
        });

        const suggestions = getParaphraseSuggestions(params.text);
        
        onUpdate?.({
          content: [{ type: "text", text: suggestions.length > 0 ? `✅ Found ${suggestions.length} phrasing improvements` : "✅ Phrasing is already optimal" }],
          details: { suggestionsCount: suggestions.length }
        });

        const suggestionsText = suggestions.length > 0
          ? suggestions.map(s => `• "${s.original}" → "${s.suggested}"\n  💡 ${s.reason}`).join("\n\n")
          : "No significant phrasing improvements suggested.";

        return {
          content: [
            { type: "text", text: suggestionsText }
          ],
          details: {
            original: params.text,
            suggestions,
            issueCount: suggestions.length,
          },
        };
      },
    });

    this.ext.registerTool({
      name: "correct_grammar",
      label: "Correct Grammar",
      description: "Fix grammar, spelling and improve prompts for better English",

      parameters: Type.Object({
        text: Type.String({ description: "Text to correct" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Analyzing grammar..." }],
          details: {}
        });

        const result = applyGrammarFixes(params.text);
        this.correctionCount++;
        
        onUpdate?.({
          content: [{ type: "text", text: `✅ ${result.fixes.length} issues fixed` }],
          details: { fixesCount: result.fixes.length }
        });

        return {
          content: [
            { type: "text", text: `**Original:**\n${params.text}\n\n**Corrected:**\n${result.corrected}` }
          ],
          details: {
            original: params.text,
            corrected: result.corrected,
            fixes: result.fixes,
            wordCountOriginal: result.wordCountOriginal,
            wordCountCorrected: result.wordCountCorrected,
          },
        };
      },
    });

    this.ext.registerTool({
      name: "check_grammar",
      label: "Check Grammar",
      description: "Check for grammar issues without fixing them",

      parameters: Type.Object({
        text: Type.String({ description: "Text to check" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Checking grammar..." }],
          details: {}
        });

        const suggestions = getSuggestions(params.text);
        const hasIssues = detectGrammarIssues(params.text);
        
        onUpdate?.({
          content: [{ type: "text", text: hasIssues ? `⚠️ Found ${suggestions.length} issues` : "✅ No issues found" }],
          details: { issuesFound: suggestions.length }
        });

        const suggestionsText = suggestions.length > 0
          ? suggestions.map(s => `• "${s.original}" → "${s.fixed}" (${s.description})`).join("\n")
          : "No grammar issues detected.";

        return {
          content: [
            { type: "text", text: suggestionsText }
          ],
          details: {
            original: params.text,
            hasIssues,
            suggestions,
            issueCount: suggestions.length,
          },
        };
      },
    });

    this.ext.registerTool({
      name: "check_homophones",
      label: "Check Homophones",
      description: "Find confusing words like their/there/they're, your/you're",

      parameters: Type.Object({
        text: Type.String({ description: "Text to check for homophones" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Checking homophones..." }],
          details: {}
        });

        const results = detectHomophones(params.text);
        
        onUpdate?.({
          content: [{ type: "text", text: results.length > 0 ? `⚠️ Found ${results.length} homophone issues` : "✅ No homophone confusion" }],
          details: { issuesFound: results.length }
        });

        const resultsText = results.length > 0
          ? results.map(r => `• "${r.word}" → could be: ${r.alternatives.join(", ")} (${r.explanation})`).join("\n")
          : "No homophone confusion detected.";

        return {
          content: [
            { type: "text", text: resultsText }
          ],
          details: {
            original: params.text,
            results,
            issueCount: results.length,
          },
        };
      },
    });

    this.ext.registerTool({
      name: "improve_prompt",
      label: "Improve Prompt",
      description: "Suggest ways to make prompts clearer and more effective",

      parameters: Type.Object({
        text: Type.String({ description: "Prompt to improve" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Analyzing prompt effectiveness..." }],
          details: {}
        });

        const wordSuggestions = getWordSuggestions(params.text);
        const styleAnalysis = analyzeStyle(params.text);
        
        onUpdate?.({
          content: [{ type: "text", text: `✅ Analysis complete: ${wordSuggestions.length} word suggestions, ${styleAnalysis.suggestions.length} style tips, ${styleAnalysis.paraphraseSuggestions.length} phrasing improvements` }],
          details: { suggestionsCount: wordSuggestions.length + styleAnalysis.suggestions.length + styleAnalysis.paraphraseSuggestions.length }
        });

        const wordText = wordSuggestions.length > 0
          ? `📝 Word Suggestions:\n${wordSuggestions.map(w => `• "${w.word}" → ${w.suggestion} (${w.reason})`).join("\n")}`
          : "✅ Word choices are good";

        const paraphraseText = styleAnalysis.paraphraseSuggestions.length > 0
          ? `🔄 Paraphrase Suggestions:\n${styleAnalysis.paraphraseSuggestions.map(p => `• "${p.original}" → "${p.suggested}" (${p.reason})`).join("\n")}`
          : "✅ Phrasing is professional";

        const styleText = styleAnalysis.suggestions.length > 0
          ? `🎨 Style Suggestions:\n${styleAnalysis.suggestions.map(s => `• ${s}`).join("\n")}`
          : "✅ Writing style is clear";

        return {
          content: [
            { type: "text", text: `${wordText}\n\n${paraphraseText}\n\n${styleText}` }
          ],
          details: {
            original: params.text,
            wordSuggestions,
            styleAnalysis,
          },
        };
      },
    });

    this.ext.registerTool({
      name: "explain_grammar",
      label: "Explain Grammar",
      description: "Get detailed explanations for grammar corrections",

      parameters: Type.Object({
        text: Type.String({ description: "Text to get explanations for" }),
      }),

      async execute(_toolCallId, params, _signal, onUpdate, _ctx) {
        onUpdate?.({
          content: [{ type: "text", text: "🔍 Getting grammar explanations..." }],
          details: {}
        });

        const result = applyGrammarFixes(params.text);
        const homophones = detectHomophones(params.text);
        
        onUpdate?.({
          content: [{ type: "text", text: `✅ Found ${result.fixes.length + homophones.length} items to explain` }],
          details: { itemsToExplain: result.fixes.length + homophones.length }
        });

        const explanations = [];
        
        // Typo explanations
        for (const fix of result.fixes) {
          explanations.push(`📝 "${fix.original}" → "${fix.fixed}": ${fix.description}`);
        }
        
        // Homophone explanations
        for (const homo of homophones) {
          explanations.push(`🔤 "${homo.word}": ${homo.explanation}`);
        }

        const explanationsText = explanations.length > 0
          ? explanations.join("\n\n")
          : "No grammar issues found to explain.";

        return {
          content: [
            { type: "text", text: explanationsText }
          ],
          details: {
            original: params.text,
            corrected: result.corrected,
            explanations: explanations,
            typoCount: result.fixes.length,
            homophoneCount: homophones.length,
          },
        };
      },
    });
  }

  private registerEventHandlers() {
    this.ext.on("before_agent_start", async (event, _ctx) => {
      if (!this.enabled || !this.showSuggestions) return;

      const userPrompt = event.prompt;
      if (!userPrompt || userPrompt.trim().length < 3) return;

      if (detectGrammarIssues(userPrompt)) {
        const result = applyGrammarFixes(userPrompt);
        const suggestions = result.fixes.slice(0, 5).map(f => `• "${f.original}" → "${f.fixed}"`).join("\n");
        _ctx.ui.notify(`📝 Grammar suggestions:\n${suggestions}`, "info");
      }
    });
  }
}