import { describe, expect, it } from "bun:test";
import { 
  applyGrammarFixes, 
  detectGrammarIssues, 
  getSuggestions, 
  COMMON_TYPOS, 
  detectHomophones, 
  getWordSuggestions, 
  getParaphraseSuggestions,
  analyzeStyle
} from "../src/shared/grammar";

describe("Grammar Module", () => {
  describe("COMMON_TYPOS", () => {
    it("should have at least 40 patterns", () => {
      expect(COMMON_TYPOS.length).toBeGreaterThanOrEqual(40);
    });

    it("should have valid pattern and replacement for each rule", () => {
      for (const rule of COMMON_TYPOS) {
        expect(rule.pattern).toBeInstanceOf(RegExp);
        expect(typeof rule.replacement).toBe("string");
        expect(rule.replacement.length).toBeGreaterThan(0);
      }
    });
  });

  describe("applyGrammarFixes", () => {
    it("should return original text when no issues found", () => {
      const result = applyGrammarFixes("This is a correct sentence.");
      expect(result.corrected).toBe("This is a correct sentence.");
      expect(result.fixes).toHaveLength(0);
    });

    it("should fix single typo", () => {
      const result = applyGrammarFixes("I definately agree.");
      expect(result.corrected).toBe("I definitely agree.");
      expect(result.fixes).toHaveLength(1);
      expect(result.fixes[0].original).toBe("definately");
      expect(result.fixes[0].fixed).toBe("definitely");
    });

    it("should fix multiple typos in same text", () => {
      const result = applyGrammarFixes("I definately recieve the occurance.");
      expect(result.corrected).toBe("I definitely receive the occurrence.");
      expect(result.fixes).toHaveLength(3);
    });

    it("should fix case-insensitive typos", () => {
      const result = applyGrammarFixes("DEFINATELY and RECIEVE");
      expect(result.corrected).toBe("definitely and receive");
    });

    it("should handle phrase corrections", () => {
      const result = applyGrammarFixes("I could of done that.");
      expect(result.corrected).toBe("I could have done that.");
      expect(result.fixes[0].description).toBe("phrase: could of -> could have");
    });

    it("should not modify text without issues", () => {
      const result = applyGrammarFixes("The quick brown fox jumps over the lazy dog.");
      expect(result.original).toBe(result.corrected);
      expect(result.fixes).toHaveLength(0);
    });

    it("should preserve whitespace and formatting", () => {
      const result = applyGrammarFixes("Test    definately   works");
      expect(result.corrected).toBe("Test    definitely   works");
    });

    it("should track word counts correctly", () => {
      const result = applyGrammarFixes("A definately");
      expect(result.wordCountOriginal).toBe(2);
      expect(result.wordCountCorrected).toBe(2);
    });
  });

  describe("detectGrammarIssues", () => {
    it("should return false for clean text", () => {
      expect(detectGrammarIssues("This is a correct sentence.")).toBe(false);
    });

    it("should return true when typo found", () => {
      expect(detectGrammarIssues("I definately agree.")).toBe(true);
    });

    it("should be case insensitive", () => {
      expect(detectGrammarIssues("definately")).toBe(true);
      expect(detectGrammarIssues("DEFINATELY")).toBe(true);
      expect(detectGrammarIssues("DeFiNaTeLy")).toBe(true);
    });

    it("should detect multiple issues", () => {
      expect(detectGrammarIssues("thier recieve")).toBe(true);
    });
  });

  describe("detectHomophones", () => {
    it("should detect common homophones", () => {
      const results = detectHomophones("Check their and your work");
      expect(results).toHaveLength(2);
      expect(results[0].word).toBe("their");
      expect(results[1].word).toBe("your");
    });

    it("should provide alternatives", () => {
      const results = detectHomophones("its a test");
      expect(results[0].alternatives).toContain("it's");
    });
  });

  describe("getWordSuggestions", () => {
    it("should suggest better words for weak ones", () => {
      const suggestions = getWordSuggestions("This is very good");
      expect(suggestions).toHaveLength(2); // 'very' and 'good'
      expect(suggestions.some(s => s.word === "good")).toBe(true);
    });
  });

  describe("getParaphraseSuggestions", () => {
    it("should suggest professional alternatives", () => {
      const suggestions = getParaphraseSuggestions("I want you to help me");
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0].suggested).toBe("Please");
    });
  });

  describe("analyzeStyle", () => {
    it("should detect passive voice", () => {
      const analysis = analyzeStyle("The code was fixed by the agent");
      expect(analysis.suggestions).toContain("Consider using active voice for more direct communication");
    });

    it("should detect hedge words", () => {
      const analysis = analyzeStyle("Maybe we should try this");
      expect(analysis.suggestions.some(s => s.includes("hedge words"))).toBe(true);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty string", () => {
      const result = applyGrammarFixes("");
      expect(result.corrected).toBe("");
      expect(result.fixes).toHaveLength(0);
    });

    it("should handle very long text", () => {
      const longText = "definately ".repeat(100);
      const result = applyGrammarFixes(longText);
      expect(result.corrected).toBe("definitely ".repeat(100));
    });

    it("should handle special characters", () => {
      const result = applyGrammarFixes("definately!@#$%");
      expect(result.corrected).toBe("definitely!@#$%");
    });

    it("should handle newlines and tabs", () => {
      const result = applyGrammarFixes("definately\n\tseperate");
      expect(result.corrected).toBe("definitely\n\tseparate");
    });
  });
});