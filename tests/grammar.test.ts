import { describe, expect, it } from "bun:test";
import { applyGrammarFixes, detectGrammarIssues, getSuggestions, COMMON_TYPOS } from "../src/shared/grammar";

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

  describe("getSuggestions", () => {
    it("should return empty array for clean text", () => {
      const suggestions = getSuggestions("Clean text");
      expect(suggestions).toHaveLength(0);
    });

    it("should return suggestions with descriptions", () => {
      const suggestions = getSuggestions("I seperately the files");
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0].description).toBe("typo: seperately -> separately");
    });

    it("should return all matches", () => {
      const suggestions = getSuggestions("definately seperately");
      expect(suggestions).toHaveLength(2);
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