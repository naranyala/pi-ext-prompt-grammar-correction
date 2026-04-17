import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { PiExtension } from "./core/pi-wrapper";
import { FeatureRegistry } from "./core/registry";
import { PromptGrammarFeature } from "./features/prompt-grammar";

/**
 * Main Extension Entry Point
 *
 * This extension provides prompt grammar correction to improve user English
 * and make prompts more effective for the LLM.
 */
export default async function (api: ExtensionAPI) {
  const ext = new PiExtension(api);
  const registry = new FeatureRegistry(ext);

  // Register the prompt grammar correction feature
  registry.registerAll([
    PromptGrammarFeature,
  ]);

  // Global session start handler
  api.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("Prompt Grammar Correction Extension Loaded! 🚀", "info");

    // ctx.ui.setWidget("main-status", [
    //   "📝 Grammar Correction Active",
    //   "✅ Features initialized",
    //   `📅 ${new Date().toLocaleDateString()}`,
    // ]);

    console.log("Prompt Grammar Correction Extension initialized successfully.");
  });
}
