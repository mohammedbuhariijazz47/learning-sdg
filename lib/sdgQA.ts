export const SDG_QA = [
  { q: "What are Sustainable Development Goals", a: "The Sustainable Development Goals (SDGs) are a set of 17 global goals created by the United Nations in 2015 to address major global challenges such as poverty, inequality, climate change, environmental degradation, peace, and justice. These goals aim to achieve a sustainable and better future for all people by the year 2030." },
  { q: "Why were the SDGs introduced", a: "The SDGs were introduced to create a global framework for sustainable development. They help governments, organizations, and individuals work together to solve major social, economic, and environmental problems." },
  { q: "How many Sustainable Development Goals are there", a: "There are 17 Sustainable Development Goals that cover different aspects of global development including poverty reduction, education, health, energy, climate action, and environmental protection." },
  { q: "What is the main objective of the SDGs", a: "The main objective of the SDGs is to end poverty, protect the planet, and ensure peace and prosperity for all people by 2030." },
  { q: "What are the three pillars of sustainable development", a: "Sustainable development is based on three main pillars:\n\nEconomic Sustainability – promoting economic growth and employment\nSocial Sustainability – ensuring equality, education, and health\nEnvironmental Sustainability – protecting natural resources and ecosystems" },
  { q: "What are the 17 Sustainable Development Goals", a: "The 17 goals are:\n1. No Poverty\n2. Zero Hunger\n3. Good Health and Well-being\n4. Quality Education\n5. Gender Equality\n6. Clean Water and Sanitation\n7. Affordable and Clean Energy\n8. Decent Work and Economic Growth\n9. Industry, Innovation, and Infrastructure\n10. Reduced Inequalities\n11. Sustainable Cities and Communities\n12. Responsible Consumption and Production\n13. Climate Action\n14. Life Below Water\n15. Life on Land\n16. Peace, Justice, and Strong Institutions\n17. Partnerships for the Goals" },
  { q: "When were the SDGs adopted", a: "The SDGs were adopted by the United Nations in September 2015 as part of the 2030 Agenda for Sustainable Development." },
  { q: "What is the 2030 Agenda for Sustainable Development", a: "The 2030 Agenda is a global action plan created by the United Nations to achieve sustainable development by the year 2030 through the implementation of the 17 SDGs." },
  { q: "What is meant by sustainable development", a: "Sustainable development means meeting the needs of the present without compromising the ability of future generations to meet their own needs." },
  { q: "Why are SDGs important for the future", a: "SDGs are essential because they provide a global roadmap for sustainable development, ensuring economic growth, environmental protection, and social well-being for future generations." },
  { q: "Why are SDGs important", a: "SDGs are important because they:\n- Address global challenges\n- Promote sustainable economic growth\n- Improve quality of life\n- Protect the environment\n- Encourage global cooperation" },
  { q: "What is SDG 1", a: "SDG 1 aims to eliminate poverty in all its forms by providing equal access to economic resources, social protection systems, and employment opportunities." },
  { q: "What is SDG 2", a: "SDG 2 focuses on ending hunger, improving food security, and promoting sustainable agriculture to ensure everyone has access to nutritious food." },
  { q: "What is SDG 3", a: "SDG 3 aims to ensure healthy lives and promote well-being for people of all ages by improving healthcare systems and reducing diseases." },
  { q: "What is SDG 4", a: "SDG 4 focuses on providing inclusive and equitable quality education and promoting lifelong learning opportunities for everyone." },
  { q: "What is SDG 5", a: "SDG 5 aims to achieve gender equality and empower all women and girls by eliminating discrimination and ensuring equal opportunities." },
  { q: "What is SDG 6", a: "SDG 6 focuses on ensuring access to safe drinking water and sanitation facilities for everyone while promoting sustainable water management." },
  { q: "What is SDG 7", a: "SDG 7 promotes access to reliable, sustainable, and modern energy through renewable sources such as solar and wind energy." },
  { q: "What is SDG 8", a: "SDG 8 aims to promote sustained economic growth, productive employment, and decent work opportunities for all people." },
  { q: "What is SDG 9", a: "SDG 9 focuses on building resilient infrastructure, promoting sustainable industrialization, and encouraging innovation." },
  { q: "What is SDG 10", a: "SDG 10 aims to reduce economic and social inequalities within and among countries." },
  { q: "What is SDG 11", a: "SDG 11 aims to make cities inclusive, safe, resilient, and sustainable by improving housing, transportation, and urban planning." },
  { q: "What is SDG 12", a: "SDG 12 focuses on efficient use of natural resources, reducing waste, and promoting sustainable consumption patterns." },
  { q: "What is SDG 13", a: "SDG 13 calls for urgent action to combat climate change and its impacts by reducing greenhouse gas emissions and promoting climate awareness." },
  { q: "What is SDG 14", a: "SDG 14 aims to conserve and sustainably use oceans, seas, and marine resources." },
  { q: "What is SDG 15", a: "SDG 15 focuses on protecting forests, biodiversity, and land ecosystems." },
  { q: "What is SDG 16", a: "SDG 16 promotes peaceful societies, access to justice, and effective institutions." },
  { q: "What is SDG 17", a: "SDG 17 encourages global partnerships and cooperation between governments, organizations, and communities to achieve the SDGs." },
  { q: "How does technology support SDGs", a: "Technology helps achieve SDGs through:\n- Artificial Intelligence for healthcare\n- Renewable energy technologies\n- Smart agriculture systems\n- Data analytics for development monitoring" },
  { q: "How can students contribute to SDGs", a: "Students can contribute by:\n- Creating sustainable technology projects\n- Promoting environmental awareness\n- Participating in community service\n- Developing innovative solutions for global problems" },
  { q: "How can engineering projects support SDGs", a: "Engineering projects can support SDGs through:\n- Renewable energy systems\n- Smart irrigation systems\n- Waste management technologies\n- Smart city solutions" }
];

export function findSDGAnswer(query: string): string | null {
  const qLower = query.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  
  if (qLower.includes("how many") && qLower.includes("sustainable development goals")) return SDG_QA.find(qa => qa.q.includes("How many"))?.a || null;
  if (qLower.includes("three pillars")) return SDG_QA.find(qa => qa.q.includes("three pillars"))?.a || null;
  if (qLower.includes("main objective")) return SDG_QA.find(qa => qa.q.includes("main objective"))?.a || null;
  if (qLower.match(/what are the 17\s*sustainable/)) return SDG_QA.find(qa => qa.q.includes("What are the 17"))?.a || null;
  if (qLower.includes("when were the sdgs")) return SDG_QA.find(qa => qa.q.includes("When were"))?.a || null;
  if (qLower.includes("2030 agenda")) return SDG_QA.find(qa => qa.q.includes("2030 Agenda"))?.a || null;
  if (qLower.includes("meant by sustainable development")) return SDG_QA.find(qa => qa.q.includes("meant by"))?.a || null;
  if (qLower.includes("why are sdgs important for the future")) return SDG_QA.find(qa => qa.q.includes("important for the future"))?.a || null;
  if (qLower.includes("why are sdgs important")) return SDG_QA.find(qa => qa.q === "Why are SDGs important")?.a || null;
  if (qLower.includes("how does technology support")) return SDG_QA.find(qa => qa.q.includes("technology support"))?.a || null;
  if (qLower.includes("students contribute")) return SDG_QA.find(qa => qa.q.includes("students contribute"))?.a || null;
  if (qLower.includes("engineering projects support")) return SDG_QA.find(qa => qa.q.includes("engineering projects"))?.a || null;
  if (qLower.includes("why were the sdgs introduced")) return SDG_QA.find(qa => qa.q.includes("introduced"))?.a || null;
  if (qLower.match(/what are (the )?sustainable development goals/)) return SDG_QA.find(qa => qa.q.startsWith("What are Sustainable"))?.a || null;
  
  const match = qLower.match(/sdg\s*(\d+)/);
  if (match) {
    const num = match[1];
    const sdgObj = SDG_QA.find(qa => qa.q === `What is SDG ${num}`);
    if (sdgObj) return sdgObj.a;
  }
  
  return null;
}
