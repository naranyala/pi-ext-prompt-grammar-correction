export interface GrammarRule {
  pattern: RegExp;
  replacement: string;
  description: string;
  category?: "typo" | "homophone" | "grammar" | "style";
}

export interface GrammarCorrectionResult {
  original: string;
  corrected: string;
  fixes: GrammarFix[];
  wordCountOriginal: number;
  wordCountCorrected: number;
  categories: string[];
}

export interface GrammarFix {
  original: string;
  fixed: string;
  description: string;
  category: string;
}

export interface HomophoneRule {
  pattern: RegExp;
  alternatives: string[];
  explanation: string;
}

export interface WordSuggestion {
  word: string;
  suggestion: string;
  reason: string;
}

export interface PhraseImprovement {
  pattern: RegExp;
  replacement: string;
  reason: string;
}

export const COMMON_TYPOS: GrammarRule[] = [
  // --- Basic Typos ---
  { pattern: /\bi\s+([aeiou])/gi, replacement: "an $1", description: "vowel after 'i'" },
  { pattern: /\bthier\b/gi, replacement: "their", description: "typo: thier -> their" },
  { pattern: /\brecieve\b/gi, replacement: "receive", description: "typo: recieve -> receive" },
  { pattern: /\bdefinately\b/gi, replacement: "definitely", description: "typo: definately -> definitely" },
  { pattern: /\bseperate\b/gi, replacement: "separate", description: "typo: seperate -> separate" },
  { pattern: /\bseperated\b/gi, replacement: "separated", description: "typo: seperated -> separated" },
  { pattern: /\bseperately\b/gi, replacement: "separately", description: "typo: seperately -> separately" },
  { pattern: /\boccured\b/gi, replacement: "occurred", description: "typo: occured -> occurred" },
  { pattern: /\boccurrance\b/gi, replacement: "occurrence", description: "typo: occurrance -> occurrence" },
  { pattern: /\boccurrances\b/gi, replacement: "occurrences", description: "typo: occurrances -> occurrences" },
  { pattern: /\buntill\b/gi, replacement: "until", description: "typo: untill -> until" },
  { pattern: /\bbegining\b/gi, replacement: "beginning", description: "typo: begining -> beginning" },
  { pattern: /\bcalender\b/gi, replacement: "calendar", description: "typo: calender -> calendar" },
  { pattern: /\bcommittment\b/gi, replacement: "commitment", description: "typo: committment -> commitment" },
  { pattern: /\bconcider\b/gi, replacement: "consider", description: "typo: concider -> consider" },
  { pattern: /\bcritisism\b/gi, replacement: "criticism", description: "typo: critisism -> criticism" },
  { pattern: /\benviroment\b/gi, replacement: "environment", description: "typo: enviroment -> environment" },
  { pattern: /\bgoverment\b/gi, replacement: "government", description: "typo: goverment -> government" },
  { pattern: /\bindependant\b/gi, replacement: "independent", description: "typo: independant -> independent" },
  { pattern: /\bintresting\b/gi, replacement: "interesting", description: "typo: intresting -> interesting" },
  { pattern: /\boccassion\b/gi, replacement: "occasion", description: "typo: occassion -> occasion" },
  { pattern: /\brecomend\b/gi, replacement: "recommend", description: "typo: recomend -> recommend" },
  { pattern: /\breffer\b/gi, replacement: "refer", description: "typo: reffer -> refer" },
  { pattern: /\bwritting\b/gi, replacement: "writing", description: "typo: writting -> writing" },
  { pattern: /\bneccessary\b/gi, replacement: "necessary", description: "typo: neccessary -> necessary" },
  { pattern: /\baccomodate\b/gi, replacement: "accommodate", description: "typo: accomodate -> accommodate" },
  { pattern: /\boccurance\b/gi, replacement: "occurrence", description: "typo: occurance -> occurrence" },
  { pattern: /\boccurences\b/gi, replacement: "occurrences", description: "typo: occurences -> occurrences" },
  { pattern: /\boccurence\b/gi, replacement: "occurrence", description: "typo: occurence -> occurrence" },
  { pattern: /\boccurrance\b/gi, replacement: "occurrence", description: "typo: occurrance -> occurrence" },
  { pattern: /\breccommend\b/gi, replacement: "recommend", description: "typo: reccommend -> recommend" },
  { pattern: /\bmisspell\b/gi, replacement: "misspell", description: "typo: misspell -> misspelled" },
  { pattern: /\balot\b/gi, replacement: "a lot", description: "typo: alot -> a lot" },
  { pattern: /\bteh\b/gi, replacement: "the", description: "typo: teh -> the" },
  { pattern: /\brelized\b/gi, replacement: "realized", description: "typo: relized -> realized" },
  { pattern: /\btruely\b/gi, replacement: "truly", description: "typo: truely -> truly" },
  { pattern: /\bwhre\b/gi, replacement: "where", description: "typo: whre -> where" },
  { pattern: /\bwierd\b/gi, replacement: "weird", description: "typo: wierd -> weird" },
  { pattern: /\bacheive\b/gi, replacement: "achieve", description: "typo: acheive -> achieve" },
  { pattern: /\bgaurd\b/gi, replacement: "guard", description: "typo: gaurd -> guard" },
  
  // --- Expanded Typo List ---
  { pattern: /\baccomodation\b/gi, replacement: "accommodation", description: "typo: accomodation -> accommodation" },
  { pattern: /\bembarass\b/gi, replacement: "embarrass", description: "typo: embarass -> embarrass" },
  { pattern: /\bembarasment\b/gi, replacement: "embarrassment", description: "typo: embarasment -> embarrassment" },
  { pattern: /\boccured\b/gi, replacement: "occurred", description: "typo: occured -> occurred" },
  { pattern: /\bsucess\b/gi, replacement: "success", description: "typo: sucess -> success" },
  { pattern: /\bsuccessfull\b/gi, replacement: "successful", description: "typo: successfull -> successful" },
  { pattern: /\barguement\b/gi, replacement: "argument", description: "typo: arguement -> argument" },
  { pattern: /\b privilige\b/gi, replacement: "privilege", description: "typo: privilige -> privilege" },
  { pattern: /\bmaintainence\b/gi, replacement: "maintenance", description: "typo: maintainence -> maintenance" },
  { pattern: /\bpersevere\b/gi, replacement: "persevere", description: "typo: persevere -> persevere" },
  { pattern: /\bcuriousity\b/gi, replacement: "curiosity", description: "typo: curiousity -> curiosity" },
  { pattern: /\bmillenium\b/gi, replacement: "millennium", description: "typo: millenium -> millennium" },
  { pattern: /\bexistance\b/gi, replacement: "existence", description: "typo: existance -> existence" },
  { pattern: /\bconscientious\b/gi, replacement: "conscientious", description: "typo: conscientious -> conscientious" },
  { pattern: /\bcemetary\b/gi, replacement: "cemetery", description: "typo: cemetary -> cemetery" },

  // --- Common Phrases/Grammar ---
  { pattern: /\byour welcome\b/gi, replacement: "you're welcome", description: "phrase: your welcome -> you're welcome" },
  { pattern: /\bits\s+a\b/gi, replacement: "it's a", description: "contraction: its -> it's" },
  { pattern: /\bcould of\b/gi, replacement: "could have", description: "phrase: could of -> could have" },
  { pattern: /\bwould of\b/gi, replacement: "would have", description: "phrase: would of -> would have" },
  { pattern: /\bshould of\b/gi, replacement: "should have", description: "phrase: should of -> should have" },
  { pattern: /\bwhenever\s+where\b/gi, replacement: "wherever", description: "phrase: whenever where -> wherever" },

  // --- British to American (for consistency) ---
  { pattern: /\bhumour\b/gi, replacement: "humor", description: "british: humour -> humor" },
  { pattern: /\blabour\b/gi, replacement: "labor", description: "british: labour -> labor" },
  { pattern: /\bcentre\b/gi, replacement: "center", description: "british: centre -> center" },
  { pattern: /\bcolour\b/gi, replacement: "color", description: "british: colour -> color" },
  { pattern: /\bfavour\b/gi, replacement: "favor", description: "british: favour -> favor" },
  { pattern: /\bbehaviour\b/gi, replacement: "behavior", description: "british: behaviour -> behavior" },
  { pattern: /\banalyse\b/gi, replacement: "analyze", description: "british: analyse -> analyze" },
  { pattern: /\bparalyse\b/gi, replacement: "paralyze", description: "british: paralyse -> paralyze" },
  { pattern: /\borganise\b/gi, replacement: "organize", description: "british: organise -> organize" },
  { pattern: /\brealise\b/gi, replacement: "realize", description: "british: realise -> realize" },
];

export const HOMOPHONES: HomophoneRule[] = [
  { pattern: /\btheir\b/gi, alternatives: ["there", "they're"], explanation: "'their' = possessive, 'there' = location, 'they're' = they are" },
  { pattern: /\byour\b/gi, alternatives: ["you're"], explanation: "'your' = possessive, 'you're' = you are" },
  { pattern: /\bits\b/gi, alternatives: ["it's"], explanation: "'its' = possessive, 'it's' = it is" },
  { pattern: /\bto\b/gi, alternatives: ["too", "two"], explanation: "'to' = preposition, 'too' = also/excessive, 'two' = number" },
  { pattern: /\bwere\b/gi, alternatives: ["where", "we're"], explanation: "'were' = past tense of 'are', 'where' = location, 'we're' = we are" },
  { pattern: /\bwho\b/gi, alternatives: ["whom"], explanation: "'who' = subject, 'whom' = object" },
  { pattern: /\baffect\b/gi, alternatives: ["effect"], explanation: "'affect' = verb (to influence), 'effect' = noun (result)" },
  { pattern: /\baccept\b/gi, alternatives: ["except"], explanation: "'accept' = to receive, 'except' = excluding" },
  { pattern: /\badvice\b/gi, alternatives: ["advise"], explanation: "'advice' = noun, 'advise' = verb" },
  { pattern: /\bchoose\b/gi, alternatives: ["chose"], explanation: "'choose' = present, 'chose' = past" },
  { pattern: /\bdesert\b/gi, alternatives: ["dessert"], explanation: "'desert' = dry land or abandon, 'dessert' = sweet food" },
  { pattern: /\blead\b/gi, alternatives: ["led"], explanation: "'lead' = present or metal, 'led' = past of lead" },
  { pattern: /\bloose\b/gi, alternatives: ["lose", "loss"], explanation: "'loose' = not tight, 'lose' = misplace, 'loss' = noun" },
  { pattern: /\bprincipal\b/gi, alternatives: ["principle"], explanation: "'principal' = main/administrator, 'principle' = rule/belief" },
  { pattern: /\bstationary\b/gi, alternatives: ["stationery"], explanation: "'stationary' = not moving, 'stationery' = paper/supplies" },
  { pattern: /\bweather\b/gi, alternatives: ["whether"], explanation: "'weather' = climate, 'whether' = if/choice" },
  { pattern: /\bwhich\b/gi, alternatives: ["who", "whom"], explanation: "'which' = things, 'who' = people (subject), 'whom' = people (object)" },
  { pattern: /\bpiece\b/gi, alternatives: ["peace"], explanation: "'piece' = part, 'peace' = calm/no war" },
  { pattern: /\bright\b/gi, alternatives: ["write"], explanation: "'right' = correct/direction, 'write' = compose" },
  { pattern: /\bsee\b/gi, alternatives: ["sea"], explanation: "'see' = view, 'sea' = ocean" },
  { pattern: /\bfor\b/gi, alternatives: ["four"], explanation: "'for' = preposition, 'four' = number" },
  { pattern: /\bour\b/gi, alternatives: ["or"], explanation: "'our' = possessive, 'or' = choice" },
  { pattern: /\bknow\b/gi, alternatives: ["no"], explanation: "'know' = understand, 'no' = negative" },
  { pattern: /\bweek\b/gi, alternatives: ["weak"], explanation: "'week' = 7 days, 'weak' = not strong" },
  
  // --- Expanded Homophones ---
  { pattern: /\bcomplement\b/gi, alternatives: ["compliment"], explanation: "'complement' = completes something, 'compliment' = praise" },
  { pattern: /\bdiscrete\b/gi, alternatives: ["discreet"], explanation: "'discrete' = separate/distinct, 'discreet' = careful/unobtrusive" },
  { pattern: /\belusive\b/gi, alternatives: ["illusive"], explanation: "'elusive' = hard to catch/find, 'illusive' = deceptive/illusory" },
  { pattern: /\bensure\b/gi, alternatives: ["insure"], explanation: "'ensure' = make certain, 'insure' = provide insurance" },
  { pattern: /\bpeak\b/gi, alternatives: ["peek", "pique"], explanation: "'peak' = summit, 'peek' = quick look, 'pique' = stimulate interest" },
  { pattern: /\bpore\b/gi, alternatives: ["pour"], explanation: "'pore' = study closely (or skin pore), 'pour' = flow of liquid" },
  { pattern: /\bstationary\b/gi, alternatives: ["stationery"], explanation: "'stationary' = not moving, 'stationery' = writing materials" },
  { pattern: /\bcanvas\b/gi, alternatives: ["canvass"], explanation: "'canvas' = heavy cloth, 'canvass' = survey/seek votes" },
  { pattern: /\bhoarse\b/gi, alternatives: ["horse"], explanation: "'hoarse' = rough voice, 'horse' = animal" },
];

export const WORD_SUGGESTIONS: { pattern: RegExp; suggestion: string; reason: string }[] = [
  // --- Intensifiers ---
  { pattern: /\bvery\s+(\w+)/gi, suggestion: "REPLACE_WITH", reason: "Use a stronger adjective instead of 'very' (e.g., 'very good' -> 'excellent')" },
  { pattern: /\breally\s+(\w+)/gi, suggestion: "REPLACE_WITH", reason: "Use a more precise word instead of 'really'" },
  
  // --- Common Weak Words ---
  { pattern: /\bgood\b/gi, suggestion: "effective/beneficial/valuable/exceptional", reason: "More specific word for context" },
  { pattern: /\bbad\b/gi, suggestion: "problematic/detrimental/harmful/suboptimal", reason: "More specific word for context" },
  { pattern: /\bbig\b/gi, suggestion: "substantial/significant/major/extensive", reason: "More professional word" },
  { pattern: /\bsmall\b/gi, suggestion: "minor/limited/compact/negligible", reason: "More professional word" },
  { pattern: /\bnice\b/gi, suggestion: "pleasant/beneficial/considerate/agreeable", reason: "More specific word" },
  { pattern: /\bthing\b/gi, suggestion: "aspect/element/factor/component", reason: "More precise word" },
  { pattern: /\bstuff\b/gi, suggestion: "material/items/components/details", reason: "More professional word" },
  { pattern: /\blots\s+of\b/gi, suggestion: "substantial/numerous/a wealth of", reason: "More professional phrasing" },
  { pattern: /\balot\b/gi, suggestion: "frequently/significantly/considerably", reason: "Proper word usage" },
  { pattern: /\bgot\b/gi, suggestion: "obtained/received/acquired", reason: "More formal word" },
  { pattern: /\bget\b/gi, suggestion: "obtain/receive/acquire", reason: "Use specific verb for context" },
  { pattern: /\bdo\b/gi, suggestion: "perform/execute/accomplish", reason: "More specific verb" },
  { pattern: /\bmake\b/gi, suggestion: "create/construct/produce/generate", reason: "More specific verb" },
  { pattern: /\buse\b/gi, suggestion: "utilize/employ/apply/leverage", reason: "More professional word" },
  { pattern: /\bwant\b/gi, suggestion: "desire/require/need/aspire to", reason: "More formal word" },
  { pattern: /\bthink\b/gi, suggestion: "believe/consider/assume/hypothesize", reason: "More specific verb" },
  { pattern: /\bneed\b/gi, suggestion: "require/necessitate/demand", reason: "More formal word" },
  
  // --- Professional Alternatives ---
  { pattern: /\bhelp\b/gi, suggestion: "assist/facilitate/support", reason: "More professional" },
  { pattern: /\bchange\b/gi, suggestion: "modify/transform/adjust", reason: "More precise" },
  { pattern: /\bshow\b/gi, suggestion: "demonstrate/illustrate/exhibit", reason: "More formal" },
  { pattern: /\blook at\b/gi, suggestion: "examine/analyze/review", reason: "More professional" },
  { pattern: /\bfind out\b/gi, suggestion: "discover/determine/ascertain", reason: "More formal" },
  { pattern: /\bget rid of\b/gi, suggestion: "eliminate/remove/discard", reason: "More professional" },
  { pattern: /\bdeal with\b/gi, suggestion: "address/manage/resolve", reason: "More professional" },
  { pattern: /\bput in\b/gi, suggestion: "insert/integrate/incorporate", reason: "More precise" },
  { pattern: /\bgo over\b/gi, suggestion: "review/analyze/examine", reason: "More formal" },
];

export const PHRASE_IMPROVEMENTS: PhraseImprovement[] = [
  // --- Professionalism ---
  { pattern: /\bI want you to\b/gi, replacement: "Please", reason: "More polite and direct" },
  { pattern: /\bCan you\b/gi, replacement: "Please", reason: "More direct request (when at start of sentence)" },
  { pattern: /\btell me about\b/gi, replacement: "provide a detailed explanation of", reason: "More professional and specific" },
  { pattern: /\bgive me\b/gi, replacement: "provide", reason: "More formal" },
  { pattern: /\bmake sure\b/gi, replacement: "ensure", reason: "More professional" },
  { pattern: /\bjust\s+let\s+me\s+know\b/gi, replacement: "please notify me", reason: "More formal" },
  
  // --- Conciseness ---
  { pattern: /\bin\s+order\s+to\b/gi, replacement: "to", reason: "More concise" },
  { pattern: /\bdue\s+to\s+the\s+fact\s+that\b/gi, replacement: "because", reason: "More concise" },
  { pattern: /\bat\s+this\s+point\s+in\s+time\b/gi, replacement: "currently", reason: "More concise" },
  { pattern: /\ba\s+large\s+number\s+of\b/gi, replacement: "many", reason: "More concise" },
  { pattern: /\bthe\s+majority\s+of\b/gi, replacement: "most", reason: "More concise" },
  { pattern: /\bof\s+the\s+same\s+kind\b/gi, replacement: "similar", reason: "More concise" },
  
  // --- Clarity & Impact ---
  { pattern: /\bat\s+the\s+end\s+of\s+the\s+day\b/gi, replacement: "ultimately", reason: "Avoids cliché, more professional" },
  { pattern: /\bthink\s+outside\s+the\s+box\b/gi, replacement: "be innovative", reason: "Avoids cliché" },
  { pattern: /\bhit\s+the\s+ground\s+running\b/gi, replacement: "start immediately and effectively", reason: "Avoids cliché" },
];

export function applyGrammarFixes(text: string): GrammarCorrectionResult {
  const fixes: GrammarFix[] = [];
  let corrected = text;

  for (const rule of COMMON_TYPOS) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        const fixed = match.replace(rule.pattern, rule.replacement);
        if (fixed !== match) {
          fixes.push({
            original: match,
            fixed,
            description: rule.description,
            category: rule.category || "typo",
          });
        }
      }
      corrected = corrected.replace(rule.pattern, rule.replacement);
    }
  }

  const categories = [...new Set(fixes.map(f => f.category))];

  return {
    original: text,
    corrected,
    fixes,
    wordCountOriginal: text.split(/\s+/).length,
    wordCountCorrected: corrected.split(/\s+/).length,
    categories,
  };
}

export function detectGrammarIssues(text: string): boolean {
  for (const rule of COMMON_TYPOS) {
    rule.pattern.lastIndex = 0;
    if (rule.pattern.test(text)) {
      return true;
    }
  }
  return false;
}

export function getSuggestions(text: string): GrammarFix[] {
  const fixes: GrammarFix[] = [];
  
  for (const rule of COMMON_TYPOS) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        const fixed = match.replace(rule.pattern, rule.replacement);
        if (fixed !== match) {
          fixes.push({
            original: match,
            fixed,
            description: rule.description,
            category: "typo",
          });
        }
      }
    }
  }
  
  return fixes;
}

export function detectHomophones(text: string): { word: string; alternatives: string[]; explanation: string }[] {
  const results: { word: string; alternatives: string[]; explanation: string }[] = [];
  
  for (const rule of HOMOPHONES) {
    rule.pattern.lastIndex = 0;
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        results.push({
          word: match,
          alternatives: rule.alternatives,
          explanation: rule.explanation,
        });
      }
    }
  }
  
  return results;
}

export function getWordSuggestions(text: string): WordSuggestion[] {
  const suggestions: WordSuggestion[] = [];
  
  for (const rule of WORD_SUGGESTIONS) {
    rule.pattern.lastIndex = 0;
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        suggestions.push({
          word: match,
          suggestion: rule.suggestion,
          reason: rule.reason,
        });
      }
    }
  }
  
  return suggestions;
}

export function getParaphraseSuggestions(text: string): { original: string; suggested: string; reason: string }[] {
  const suggestions: { original: string; suggested: string; reason: string }[] = [];
  
  for (const rule of PHRASE_IMPROVEMENTS) {
    rule.pattern.lastIndex = 0;
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        suggestions.push({
          original: match,
          suggested: match.replace(rule.pattern, rule.replacement),
          reason: rule.reason,
        });
      }
    }
  }
  
  return suggestions;
}

export function analyzeStyle(text: string): { weakWords: WordSuggestion[]; suggestions: string[]; paraphraseSuggestions: { original: string; suggested: string; reason: string }[] } {
  const weakWords = getWordSuggestions(text);
  const paraphraseSuggestions = getParaphraseSuggestions(text);
  const suggestions: string[] = [];
  
  // --- Basic length and structure ---
  if (text.split(/\s+/).length < 5) {
    suggestions.push("Consider adding more context for clearer communication");
  }
  
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
  if (sentenceCount === 1 && text.length > 100) {
    suggestions.push("Consider breaking into shorter sentences for clarity");
  }
  
  const hasPassive = /\b(is|are|was|were|been|being)\s+\w+ed\b/gi.test(text);
  if (hasPassive) {
    suggestions.push("Consider using active voice for more direct communication");
  }
  
  // --- Hedge Words ---
  const hedgeWords = /\b(maybe|perhaps|possibly|I think|sort of|kind of|probably|mostly)\b/gi;
  if (hedgeWords.test(text)) {
    suggestions.push("Avoid hedge words (e.g., 'maybe', 'I think') to make your prompt more confident and direct");
  }
  
  // --- Filler Words ---
  const fillerWords = /\b(basically|actually|literally|honestly|essentially|virtually)\b/gi;
  if (fillerWords.test(text)) {
    suggestions.push("Remove filler words (e.g., 'basically', 'actually') to increase conciseness");
  }

  // --- Redundancies ---
  const redundancies = [
    { pattern: /\badded bonus\b/gi, replacement: "bonus" },
    { pattern: /\bpast history\b/gi, replacement: "history" },
    { pattern: /\bcompletely finished\b/gi, replacement: "finished" },
    { pattern: /\bclose proximity\b/gi, replacement: "proximity" },
    { pattern: /\btrue fact\b/gi, replacement: "fact" },
  ];
  
  for (const red of redundancies) {
    if (red.pattern.test(text)) {
      suggestions.push(`Remove redundancy: "${red.pattern.source}" -> "${red.replacement}"`);
    }
  }

  // --- Prompt Engineering Checks ---
  const hasPersona = /\b(act as a|you are a|assume the role of)\b/gi.test(text);
  if (!hasPersona && text.length > 20) {
    suggestions.push("💡 Tip: Assign a persona (e.g., 'Act as a Senior Software Engineer') for better specialized responses");
  }

  const hasFormat = /\b(output as a|format as a|in a table|in json|list as)\b/gi.test(text);
  if (!hasFormat && text.length > 20) {
    suggestions.push("💡 Tip: Specify the desired output format (e.g., 'Output as a Markdown table')");
  }

  const hasConstraints = /\b(do not|avoid|without|no more than|maximum of)\b/gi.test(text);
  if (!hasConstraints && text.length > 20) {
    suggestions.push("💡 Tip: Add constraints (e.g., 'Do not use jargon') to refine the response");
  }
  
  return { weakWords, suggestions, paraphraseSuggestions };
}
