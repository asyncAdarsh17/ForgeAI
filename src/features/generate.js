import inquirer from "inquirer";
import ora from "ora";
import { askAI } from "../core/openrouter.js";
import { saveHistory } from "../storage/history.js";
import { printPretty } from "../ui/printer.js";
import { setLastResult } from "../storage/exporter.js";

const CONTENT_TYPES = [
  "🎬 YouTube Video Script",
  "💡 YouTube Video Ideas",
  "🐦 Twitter/X Thread",
  "💼 LinkedIn Post",
  "📝 Tech Blog Post",
  "📱 Instagram Caption (Tech)",
  "🎙️  Podcast Script / Talking Points",
  "📊 Video Title + Description + Tags",
  "✏️  Custom Content"
];

const PROMPTS = {
  "YouTube Video Script": `Write a full engaging YouTube video script for a tech content creator.
Structure it as:
- Hook (first 30 seconds to grab attention)
- Introduction
- Main Content (with clear sections)
- Key Takeaways
- Call to Action (like, subscribe, comment)
Topic: `,

  "YouTube Video Ideas": `Generate 10 unique, trending YouTube video ideas for a tech content creator.
For each idea include:
- Video title (catchy and SEO friendly)
- One line description
- Target audience
- Estimated interest level
Topic/Niche: `,

  "Twitter/X Thread": `Write a viral Twitter/X thread for a tech content creator.
Structure:
- Tweet 1: Hook that makes people stop scrolling
- Tweets 2-8: Value packed content, one point per tweet
- Last Tweet: Call to action and summary
Keep each tweet under 280 characters.
Topic: `,

  "LinkedIn Post": `Write a professional and engaging LinkedIn post for a tech content creator.
Structure:
- Opening line that hooks the reader
- Personal insight or story
- Key technical points
- Practical takeaway
- Call to action
- Relevant hashtags
Topic: `,

  "Tech Blog Post": `Write a complete, well structured tech blog post.
Structure:
- SEO friendly title
- Introduction
- Main sections with subheadings
- Code examples where relevant
- Conclusion
- Meta description (for SEO)
Topic: `,

  "Instagram Caption": `Write an engaging Instagram caption for a tech content creator.
Include:
- Attention grabbing first line
- Value packed content
- Emojis where appropriate
- Call to action
- Relevant hashtags (15-20)
Topic: `,

  "Podcast Script": `Write a podcast script / talking points for a tech content creator.
Structure:
- Intro and welcome
- Topic introduction
- Main talking points (5-7 points with details)
- Guest question suggestions (if applicable)
- Outro and call to action
Topic: `,

  "Video Title + Description + Tags": `Generate YouTube SEO optimized metadata for a tech video.
Include:
- 5 catchy video title options
- Full video description (with timestamps placeholder)
- 20 relevant tags
- Thumbnail text suggestion
Topic: `,

  "Custom Content": `You are a tech content creation expert. Generate the best content for the following request:\n`
};

export async function generate() {

  // Step 1 — pick content type
  const { contentType } = await inquirer.prompt([
    {
      type: "list",
      name: "contentType",
      message: "What type of content do you want to create?",
      pageSize: 10,
      choices: CONTENT_TYPES
    }
  ]);

  // Step 2 — get topic
  const { topic } = await inquirer.prompt([
    {
      type: "input",
      name: "topic",
      message: "Enter your topic or idea:"
    }
  ]);

  if (!topic.trim()) {
    console.log("❌ No topic provided.");
    return;
  }

  // Step 3 — pick target audience
  const { audience } = await inquirer.prompt([
    {
      type: "list",
      name: "audience",
      message: "Who is your target audience?",
      choices: [
        "Beginners (students, newcomers to tech)",
        "Intermediate (working developers)",
        "Advanced (senior engineers)",
        "General tech enthusiasts"
      ]
    }
  ]);

  // Step 4 — pick tone
  const { tone } = await inquirer.prompt([
    {
      type: "list",
      name: "tone",
      message: "What tone do you want?",
      choices: [
        "Casual and fun",
        "Professional and informative",
        "Motivational and inspiring",
        "Simple and beginner friendly"
      ]
    }
  ]);

  // Step 5 — build prompt
  const matchedKey = Object.keys(PROMPTS).find(k => contentType.includes(k));
  const basePrompt = PROMPTS[matchedKey] || PROMPTS["Custom Content"];

  const fullPrompt = `
${basePrompt}${topic}

Target Audience: ${audience}
Tone: ${tone}

Make it engaging, valuable, and shareable. Optimized for maximum reach and impact.
`;

  const spinner = ora("✨ Creating your content...").start();

  try {

    const result = await askAI(fullPrompt);

    spinner.stop();

    saveHistory("user", `[${contentType}] ${topic}`);
    saveHistory("ai", result);
    setLastResult(result);

    await printPretty(result);

  } catch (err) {
    spinner.stop();
    console.log("❌ Error:", err.message);
  }
}