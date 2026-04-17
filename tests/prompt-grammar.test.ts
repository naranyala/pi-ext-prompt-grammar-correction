import { describe, expect, it, vi, beforeEach } from "bun:test";
import { PromptGrammarFeature } from "../src/features/prompt-grammar";
import { createMockPi, createMockContext } from "./mocks";

describe("PromptGrammarFeature", () => {
  let mockPi: any;
  let mockCtx: any;
  let feature: PromptGrammarFeature;

  beforeEach(() => {
    mockPi = createMockPi();
    mockCtx = createMockContext();
    feature = new PromptGrammarFeature(mockPi);
    feature.init();
  });

  describe("Commands", () => {
    beforeEach(() => {
      mockCtx.ui.notify.mockClear();
    });

    it("should register the 'grammar' command", () => {
      const commands = mockPi.__getCommands();
      expect(commands.has("grammar")).toBe(true);
      expect(commands.get("grammar").description).toBe("Grammar correction settings");
    });

    it("should enable grammar on 'on' arg", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      await cmd.handler("on", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith("✅ Grammar correction enabled", "info");
    });

    it("should disable grammar on 'off' arg", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      await cmd.handler("off", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith("❌ Grammar correction disabled", "info");
    });

    it("should toggle suggestions on 'suggestions' arg", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      
      await cmd.handler("suggestions", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith("🔕 Suggestions hidden", "info");
      
      await cmd.handler("suggestions", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith("🔔 Suggestions shown", "info");
    });

    it("should show stats on 'stats' arg", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      await cmd.handler("stats", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith(
        expect.stringContaining("📊 Corrections:"),
        "info"
      );
    });

    it("should show help on 'help' arg", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      await cmd.handler("help", mockCtx);
      expect(mockCtx.ui.notify).toHaveBeenCalledWith(
        expect.stringContaining("Usage:"),
        "info"
      );
    });
  });

  describe("Tools", () => {
    it("should register 'correct_grammar' tool", () => {
      const tools = mockPi.__getTools();
      expect(tools.has("correct_grammar")).toBe(true);
      expect(tools.get("correct_grammar").label).toBe("Correct Grammar");
    });

    it("should register 'check_grammar' tool", () => {
      const tools = mockPi.__getTools();
      expect(tools.has("check_grammar")).toBe(true);
      expect(tools.get("check_grammar").label).toBe("Check Grammar");
    });

    it("should correct text with typo", async () => {
      const tool = mockPi.__getTools().get("correct_grammar");
      const onUpdate = vi.fn();
      const result = await tool.execute("call-1", { text: "I definately agree" }, {}, onUpdate, mockCtx);
      
      expect(result.content[0].text).toContain("definitely");
      expect(result.details.corrected).toBe("I definitely agree");
      expect(result.details.fixes).toHaveLength(1);
    });

    it("should return original when no issues", async () => {
      const tool = mockPi.__getTools().get("correct_grammar");
      const onUpdate = vi.fn();
      const result = await tool.execute("call-1", { text: "This is correct" }, {}, onUpdate, mockCtx);
      
      expect(result.content[0].text).toContain("Original:");
      expect(result.content[0].text).toContain("Corrected:");
      expect(result.details.fixes).toHaveLength(0);
    });

    it("should check grammar without fixing", async () => {
      const tool = mockPi.__getTools().get("check_grammar");
      const onUpdate = vi.fn();
      const result = await tool.execute("call-1", { text: "I seperated the files" }, {}, onUpdate, mockCtx);
      
      expect(result.content[0].text).toContain("seperate");
      expect(result.details.hasIssues).toBe(true);
      expect(result.details.issueCount).toBe(1);
    });
  });

  describe("Event Handlers", () => {
    it("should register 'before_agent_start' event", () => {
      const events = mockPi.__getEvents();
      expect(events.has("before_agent_start")).toBe(true);
    });

    it("should register 'session_start' event", () => {
      const events = mockPi.__getEvents();
      expect(events.has("session_start")).toBe(true);
    });

    it("should show suggestion when typo detected in prompt", async () => {
      const handlers = mockPi.__getEvents().get("before_agent_start");
      const handler = handlers[0];
      
      await handler({ prompt: "I definately need help" }, mockCtx);
      
      expect(mockCtx.ui.notify).toHaveBeenCalledWith(
        expect.stringContaining("📝 Grammar suggestions:"),
        "info"
      );
    });

    it("should not notify when no issues found", async () => {
      mockCtx.ui.notify.mockClear();
      const handlers = mockPi.__getEvents().get("before_agent_start");
      const handler = handlers[0];
      
      await handler({ prompt: "I need help with coding" }, mockCtx);
      
      expect(mockCtx.ui.notify).not.toHaveBeenCalled();
    });

    it("should set widget on session_start", async () => {
      const handlers = mockPi.__getEvents().get("session_start");
      const handler = handlers[0];
      
      await handler({}, mockCtx);
      
      expect(mockCtx.ui.setWidget).toHaveBeenCalledWith(
        "grammar-correction",
        expect.arrayContaining(["✨ Grammar Correction Ready"])
      );
    });

    it("should skip short prompts", async () => {
      const handlers = mockPi.__getEvents().get("before_agent_start");
      const handler = handlers[0];
      
      await handler({ prompt: "hi" }, mockCtx);
      await handler({ prompt: "" }, mockCtx);
      
      expect(mockCtx.ui.notify).not.toHaveBeenCalled();
    });
  });

  describe("Feature State", () => {
    it("should start enabled by default", async () => {
      const cmd = mockPi.__getCommands().get("grammar");
      await cmd.handler("stats", mockCtx);
      
      expect(mockCtx.ui.notify).toHaveBeenCalledWith(
        expect.stringContaining("Enabled: true"),
        "info"
      );
    });
  });
});