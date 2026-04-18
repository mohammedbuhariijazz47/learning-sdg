export type SDGQAEntry = {
  q: string;
  a: string;
  /** Extra phrases that should match the same answer */
  match?: string[];
};

/** Shown as tappable chips below the question box */
export const SUGGESTED_SDG_QUESTIONS: readonly string[] = [
  "What does SDG stand for?",
  "Who launched SDGs?",
  "What year were SDGs introduced?",
  "How many SDGs exist?",
  "What is SDG 7 about?",
  "What is the target year of SDGs?",
  "What organization monitors SDGs?",
  "What is the main theme of SDGs?",
] as const;

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "shall",
  "can",
  "to",
  "of",
  "in",
  "for",
  "on",
  "with",
  "at",
  "by",
  "from",
  "as",
  "into",
  "through",
  "during",
  "before",
  "after",
  "about",
  "tell",
  "me",
  "please",
]);

export const SDG_QA: SDGQAEntry[] = [
  {
    q: "What are Sustainable Development Goals",
    a: "Sustainable Development Goals (SDGs) are 17 global goals established by the United Nations in 2015 to achieve a better and more sustainable future for all by 2030. They address global challenges such as poverty, inequality, climate change, environmental protection, peace, and justice.",
    match: ["what are sdgs", "explain sdgs", "what are the sdgs", "tell me about sdgs"],
  },
  {
    q: "Explain the Concept of Sustainable Development Goals",
    a: "The Sustainable Development Goals (SDGs) are a set of 17 global goals adopted by the United Nations in 2015 as part of the 2030 Agenda for Sustainable Development. These goals aim to address the world's most pressing challenges such as poverty, hunger, inequality, climate change, environmental degradation, peace, and justice.\n\nThe SDGs provide a shared global framework that guides governments, organizations, and individuals to work together to achieve sustainable development by the year 2030.\n\nMain Objectives of SDGs:\n• End poverty and hunger worldwide\n• Improve health and education\n• Achieve gender equality\n• Ensure access to clean water and energy\n• Promote economic growth and decent work\n• Protect the environment and biodiversity\n• Build peaceful and inclusive societies\n\nThe SDGs are based on three key pillars of sustainability:\n• Economic Sustainability – promoting economic growth and employment\n• Social Sustainability – improving quality of life and equality\n• Environmental Sustainability – protecting natural resources and ecosystems\n\nThe core principle of the SDGs is “Leave No One Behind,” meaning development should benefit all people, especially vulnerable groups.",
    match: ["concept of sustainable development goals", "explain sustainable development goals"],
  },
  {
    q: "When were the SDGs adopted",
    a: "The SDGs were adopted on 25 September 2015 by all 193 United Nations member countries as part of the 2030 Agenda for Sustainable Development.",
    match: ["when were sdgs adopted", "when did sdgs start", "sdgs adopted when"],
  },
  {
    q: "How many Sustainable Development Goals are there",
    a: "There are 17 Sustainable Development Goals.",
    match: ["how many sdgs", "how many sdg are there", "number of sdgs"],
  },
  {
    q: "How many SDGs exist",
    a: "There are 17 Sustainable Development Goals.",
    match: ["how many sustainable development goals"],
  },
  {
    q: "What is the main aim of the SDGs",
    a: "The main aim is to end poverty, protect the planet, and ensure peace and prosperity for all people by 2030.",
    match: ["main aim of sdgs", "main objective of sdgs", "purpose of sdgs"],
  },
  {
    q: "What is the main theme of SDGs",
    a: "The main theme of SDGs is sustainable development — improving human life while protecting the planet for future generations.",
    match: ["main theme of sustainable development goals", "theme of sdgs"],
  },
  {
    q: "Who created the SDGs",
    a: "The United Nations (UN) created the SDGs.",
    match: ["who made the sdgs", "who launched sdgs", "who introduced sdgs"],
  },
  {
    q: "What is the timeline for achieving SDGs",
    a: "The SDGs are planned to be achieved by the year 2030.",
    match: ["timeline for sdgs", "when will sdgs be achieved", "deadline for sdgs"],
  },
  {
    q: "What is the target year of SDGs",
    a: "The target year for achieving the SDGs is 2030.",
    match: ["target year sdg", "sdg target year", "by what year sdgs"],
  },
  {
    q: "What year were SDGs introduced",
    a: "The SDGs were introduced in 2015.",
    match: ["what year sdgs", "when were sdgs introduced", "sdgs year"],
  },
  {
    q: "How many targets are included in the SDGs",
    a: "The 17 SDGs contain 169 targets.",
    match: ["how many targets in sdgs", "sdg targets how many", "169 targets"],
  },
  {
    q: "How are SDGs measured",
    a: "They are measured using over 230 global indicators that track progress toward each target.",
    match: ["how do we measure sdgs", "sdg measurement", "how is sdg progress measured"],
  },
  {
    q: "What organization monitors SDGs",
    a: "The United Nations (UN) monitors and tracks the progress of the SDGs through global indicators and reports.",
    match: ["who monitors sdgs", "who tracks sdgs", "sdg monitoring organization"],
  },
  {
    q: "What are indicators in SDGs",
    a: "Indicators are measurable data points used to track progress toward achieving each goal.",
    match: ["what is an sdg indicator", "sdg indicators meaning"],
  },
  {
    q: "What does the principle Leave No One Behind mean",
    a: "It means that development should benefit all people equally, especially the poorest and most vulnerable groups.",
    match: ["leave no one behind", "what does leave no one behind mean"],
  },
  {
    q: "What does SDG stand for",
    a: "SDG stands for Sustainable Development Goals.",
    match: ["sdg stands for", "what sdg means", "meaning of sdg"],
  },
  {
    q: "Why were the SDGs introduced",
    a: "The SDGs were introduced to create a global framework for sustainable development. They help governments, organizations, and individuals work together to solve major social, economic, and environmental problems.",
  },
  {
    q: "What is the 2030 Agenda for Sustainable Development",
    a: "The 2030 Agenda is a global action plan created by the United Nations to achieve sustainable development by the year 2030 through the implementation of the 17 SDGs.",
    match: ["2030 agenda", "what is 2030 agenda"],
  },
  {
    q: "Why are SDGs important",
    a: "They help countries work together to solve global problems such as poverty, climate change, and inequality.",
    match: ["importance of sdgs", "why sdgs matter"],
  },
  {
    q: "What are the three dimensions of sustainable development",
    a: "The three dimensions of sustainable development are:\n\n• Economic development\n• Social development\n• Environmental protection",
    match: ["three dimensions of sustainable development", "three pillars of sustainable development", "dimensions of sustainability"],
  },
  {
    q: "What global problems do SDGs address",
    a: "SDGs address problems such as:\n\n• Poverty\n• Hunger\n• Climate change\n• Pollution\n• Gender inequality\n• Lack of education\n• Health issues",
    match: ["global problems sdgs", "what problems do sdgs solve"],
  },
  {
    q: "Who is responsible for achieving the SDGs",
    a: "Many groups share responsibility:\n\n• Governments\n• International organizations\n• Businesses\n• NGOs\n• Individuals",
    match: ["who achieves sdgs", "who implements sdgs"],
  },
  {
    q: "How can students contribute to SDGs",
    a: "Students can contribute by:\n\n• Saving energy\n• Reducing waste\n• Promoting education\n• Supporting equality\n• Participating in community service",
    match: ["students and sdgs", "how students help sdgs"],
  },
  {
    q: "What challenges affect SDG progress",
    a: "Challenges include:\n\n• Climate change\n• Economic inequality\n• Lack of funding\n• Global conflicts\n• Pandemics",
    match: ["challenges to sdgs", "sdg challenges", "obstacles to sdgs"],
  },
  {
    q: "How many countries agreed to SDGs",
    a: "193 countries agreed to the SDGs.",
    match: ["how many countries sdgs", "countries agreed sdg", "member states sdgs"],
  },
  {
    q: "What is sustainable development",
    a: "Sustainable development means meeting the needs of the present without compromising the ability of future generations to meet their needs.",
    match: ["define sustainable development", "meaning of sustainable development"],
  },
  {
    q: "Describe the 17 SDGs in Detail",
    a: "Here is a clear overview of all 17 goals:\n\nSDG 1: No Poverty — Eradicate extreme poverty and support vulnerable people.\n\nSDG 2: Zero Hunger — End hunger, improve nutrition, and support sustainable farming.\n\nSDG 3: Good Health and Well-being — Healthy lives and well-being for all ages.\n\nSDG 4: Quality Education — Inclusive, equitable quality education and lifelong learning.\n\nSDG 5: Gender Equality — Empower women and girls and end discrimination.\n\nSDG 6: Clean Water and Sanitation — Safe water and sanitation for everyone.\n\nSDG 7: Affordable and Clean Energy — Access to modern, affordable, sustainable energy.\n\nSDG 8: Decent Work and Economic Growth — Inclusive growth and decent jobs.\n\nSDG 9: Industry, Innovation and Infrastructure — Resilient infrastructure and innovation.\n\nSDG 10: Reduced Inequalities — Reduce inequality within and among countries.\n\nSDG 11: Sustainable Cities and Communities — Safe, inclusive, resilient cities.\n\nSDG 12: Responsible Consumption and Production — Sustainable use of resources and less waste.\n\nSDG 13: Climate Action — Urgent action on climate change.\n\nSDG 14: Life Below Water — Protect oceans and marine resources.\n\nSDG 15: Life on Land — Protect land ecosystems and biodiversity.\n\nSDG 16: Peace, Justice and Strong Institutions — Peaceful societies and access to justice.\n\nSDG 17: Partnerships for the Goals — Global cooperation to reach the SDGs.",
    match: ["list all sdgs", "all 17 sdgs", "describe sdgs"],
  },
  {
    q: "Discuss the Importance of SDGs in Global Development",
    a: "The SDGs are important because they provide a unified framework for global development.\n\nKey points:\n\n1. Poverty reduction — improve living standards worldwide.\n2. Environmental protection — sustainable use of nature and ecosystems.\n3. Social equality — fairness in gender, income, and opportunity.\n4. Economic growth — inclusive jobs and productivity.\n5. Global cooperation — countries working together on shared problems.\n6. Quality of life — better health, education, and infrastructure for people.",
    match: ["importance of sdgs in global development", "why sdgs matter globally"],
  },
  {
    q: "Explain the Challenges in Achieving SDGs by 2030",
    a: "Achieving the SDGs by 2030 faces real challenges:\n\n1. Lack of funding — big investment is needed, especially in developing countries.\n2. Climate change — affects farms, water, and ecosystems.\n3. Economic inequality — uneven resources slow progress.\n4. Political conflicts — wars and instability disrupt development.\n5. Global health crises — events like pandemics can slow many goals.\n6. Lack of awareness — some communities still need clearer SDG education and action plans.",
    match: ["challenges achieving sdgs by 2030", "sdg challenges 2030"],
  },
  {
    q: "Discuss the Role of Technology in Achieving SDGs",
    a: "Technology can speed up SDG progress:\n\n1. Renewable energy — solar, wind, and hydro support clean energy.\n2. Digital education — online learning reaches more students.\n3. Smart agriculture — sensors and data help grow food with less waste.\n4. Healthcare technology — telemedicine and better tools improve care.\n5. Smart cities — data and smart infrastructure support safer, greener cities.\n6. Environmental monitoring — satellites and sensors track climate and nature changes.",
    match: ["technology and sdgs", "role of technology in sdgs"],
  },
  {
    q: "What is SDG 1",
    a: "SDG 1: No Poverty — End poverty in all forms everywhere.\n\nThis goal focuses on social protection, equal access to economic resources, and stronger support for people in vulnerable situations.",
    match: ["sdg 1", "goal 1 poverty", "first sdg"],
  },
  {
    q: "What is SDG 2",
    a: "SDG 2: Zero Hunger — End hunger and promote sustainable agriculture.\n\nIt supports food security, better nutrition, and farming that protects the environment.",
    match: ["sdg 2", "goal 2 hunger", "zero hunger"],
  },
  {
    q: "What is SDG 3",
    a: "SDG 3: Good Health and Well-being — Ensure healthy lives and promote well-being for all ages.\n\nIt focuses on reducing disease, supporting strong health systems, and healthy lifestyles.",
    match: ["sdg 3", "goal 3 health"],
  },
  {
    q: "What is SDG 4",
    a: "SDG 4: Quality Education — Ensure inclusive and equitable quality education.\n\nIt promotes lifelong learning and skills for everyone.",
    match: ["sdg 4", "goal 4 education"],
  },
  {
    q: "What is SDG 5",
    a: "SDG 5: Gender Equality — Achieve gender equality and empower women and girls.\n\nIt aims to end discrimination and support equal rights and opportunities.",
    match: ["sdg 5", "goal 5 gender"],
  },
  {
    q: "What is SDG 6",
    a: "SDG 6: Clean Water and Sanitation — Ensure access to safe water and sanitation.\n\nClean water and hygiene protect health and support communities.",
    match: ["sdg 6", "goal 6 water"],
  },
  {
    q: "What is SDG 7",
    a: "SDG 7: Affordable and Clean Energy — Provide access to sustainable and modern energy.\n\nIt promotes reliable electricity and more renewable energy like solar and wind.",
    match: ["sdg 7", "goal 7 energy", "what is sdg 7 about", "sdg seven"],
  },
  {
    q: "What is SDG 8",
    a: "SDG 8: Decent Work and Economic Growth — Promote sustainable economic growth and employment.\n\nIt supports fair jobs, entrepreneurship, and safe working conditions.",
    match: ["sdg 8", "goal 8 work"],
  },
  {
    q: "What is SDG 9",
    a: "SDG 9: Industry, Innovation and Infrastructure — Build resilient infrastructure and promote innovation.\n\nIt helps countries grow with better transport, internet, and research.",
    match: ["sdg 9", "goal 9 industry"],
  },
  {
    q: "What is SDG 10",
    a: "SDG 10: Reduced Inequalities — Reduce inequality within and among countries.\n\nIt promotes fairness in income, opportunity, and inclusion.",
    match: ["sdg 10", "goal 10 inequality"],
  },
  {
    q: "What is SDG 11",
    a: "SDG 11: Sustainable Cities and Communities — Make cities inclusive, safe, resilient, and sustainable.\n\nIt focuses on housing, transport, and disaster-ready planning.",
    match: ["sdg 11", "goal 11 cities"],
  },
  {
    q: "What is SDG 12",
    a: "SDG 12: Responsible Consumption and Production — Ensure sustainable consumption patterns.\n\nIt encourages less waste, recycling, and smarter use of materials.",
    match: ["sdg 12", "goal 12 consumption"],
  },
  {
    q: "What is SDG 13",
    a: "SDG 13: Climate Action — Take urgent action to combat climate change.\n\nIt supports cutting emissions and protecting people from climate impacts.",
    match: ["sdg 13", "goal 13 climate"],
  },
  {
    q: "What is SDG 14",
    a: "SDG 14: Life Below Water — Conserve and sustainably use oceans and marine resources.\n\nIt tackles pollution and protects ocean life.",
    match: ["sdg 14", "goal 14 ocean"],
  },
  {
    q: "What is SDG 15",
    a: "SDG 15: Life on Land — Protect ecosystems, forests, and biodiversity.\n\nIt supports restoring land and stopping habitat loss.",
    match: ["sdg 15", "goal 15 land"],
  },
  {
    q: "What is SDG 16",
    a: "SDG 16: Peace, Justice and Strong Institutions — Promote peaceful societies and strong institutions.\n\nIt supports safety, justice, and accountable governance.",
    match: ["sdg 16", "goal 16 peace"],
  },
  {
    q: "What is SDG 17",
    a: "SDG 17: Partnerships for the Goals — Strengthen global partnerships to achieve sustainable development.\n\nCooperation, finance, and technology sharing help all countries progress.",
    match: ["sdg 17", "goal 17 partnerships"],
  },
  {
    q: "How does technology support SDGs",
    a: "Technology helps achieve SDGs through:\n\n• Artificial intelligence for healthcare\n• Renewable energy technologies\n• Smart agriculture systems\n• Data tools to track development progress",
    match: ["technology support sdgs"],
  },
  {
    q: "How can engineering projects support SDGs",
    a: "Engineering projects can support SDGs through:\n\n• Renewable energy systems\n• Smart irrigation and water projects\n• Waste management technologies\n• Smart city and transport solutions",
    match: ["engineering and sdgs", "engineers sdgs"],
  },
];

const imageMap: Record<string, string> = {
  "1": "SDG 1.png",
  "2": "SDG  2.png",
  "3": "SDG  3.jpeg",
  "4": "SDG 4.png",
  "5": "SDG 5.png",
  "6": "SDG 6.png",
  "7": "SDG 7.png",
  "8": "SDG 8.png",
  "9": "SDG 9.png",
  "10": "SDG 10.png",
  "11": "SDG 11.png",
  "12": "SDG 12.png",
  "13": "SDG  13.png",
  "14": "SDG 14.png",
  "15": "SDG 15.png",
  "16": "SDG 16.png",
  "17": "SDG 17.png",
};

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function meaningfulTokens(s: string): string[] {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function tokenOverlapScore(userNorm: string, phraseNorm: string): number {
  const tu = meaningfulTokens(userNorm);
  const tp = meaningfulTokens(phraseNorm);
  if (!tu.length || !tp.length) return 0;
  const setU = new Set(tu);
  let inter = 0;
  for (const t of tp) if (setU.has(t)) inter += 1;
  const union = new Set([...tu, ...tp]).size;
  return union ? inter / union : 0;
}

function scorePhrase(userNorm: string, phraseNorm: string): number {
  if (!phraseNorm) return 0;
  if (userNorm === phraseNorm) return 1;
  if (userNorm.includes(phraseNorm) && phraseNorm.length >= 10) return 0.92;
  if (userNorm.includes(phraseNorm) && phraseNorm.length >= 6) return 0.88;
  if (phraseNorm.includes(userNorm) && userNorm.length >= 10) return 0.9;
  if (phraseNorm.includes(userNorm) && userNorm.length >= 6) return 0.84;
  const overlap = tokenOverlapScore(userNorm, phraseNorm);
  if (overlap >= 0.55) return Math.min(0.9, 0.65 + overlap * 0.35);
  if (overlap >= 0.4) return 0.55 + overlap * 0.2;
  return overlap * 0.85;
}

function bestEntryScore(userQuery: string, entry: SDGQAEntry): number {
  const userNorm = normalize(userQuery);
  const phrases = [entry.q, ...(entry.match ?? [])];
  let best = 0;
  for (const phrase of phrases) {
    const p = normalize(phrase);
    best = Math.max(best, scorePhrase(userNorm, p));
  }
  return best;
}

const MATCH_THRESHOLD = 0.58;

export function findSDGAnswer(query: string): { text: string; image: string } | null {
  const defaultImage = "/SDG photos/SDG.jpeg";
  const userNorm = normalize(query);

  const sdgWordMatch = userNorm.match(/\bsdg\s*(\d{1,2})\b/) || userNorm.match(/\bgoal\s*(\d{1,2})\b/);
  if (sdgWordMatch) {
    const num = sdgWordMatch[1];
    const n = Number(num);
    if (n >= 1 && n <= 17) {
      const key = `What is SDG ${n}`;
      const entry = SDG_QA.find((e) => e.q === key);
      if (entry) {
        const imgFileName = imageMap[String(n)] ?? "SDG.jpeg";
        return { text: entry.a, image: `/SDG photos/${imgFileName}` };
      }
    }
  }

  let best: { text: string; score: number; image: string } | null = null;
  for (const entry of SDG_QA) {
    const score = bestEntryScore(query, entry);
    if (score > (best?.score ?? 0)) {
      best = { text: entry.a, score, image: defaultImage };
    }
  }

  if (best && best.score >= MATCH_THRESHOLD) {
    const nMatch = userNorm.match(/\b(sdgs?)\s*(\d{1,2})\b/)?.[2] || userNorm.match(/\b(\d{1,2})\s*(sdgs?)\b/)?.[1];
    if (nMatch) {
      const n = Number(nMatch);
      if (n >= 1 && n <= 17) {
        const sdgEntry = SDG_QA.find((e) => e.q === `What is SDG ${n}`);
        if (sdgEntry && best.text === sdgEntry.a) {
          const imgFileName = imageMap[String(n)] ?? "SDG.jpeg";
          return { text: best.text, image: `/SDG photos/${imgFileName}` };
        }
      }
    }
    return { text: best.text, image: best.image };
  }

  return null;
}
