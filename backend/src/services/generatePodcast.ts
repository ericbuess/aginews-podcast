
import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import * as PlayHT from 'playht';


dotenv.config();

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});
const fs = require('fs');

export async function generatePodcast(rawStories: string) {
  console.log(`Generating newsletter with raw stories (${rawStories.length} characters)...`)


        try {
          const client = new OpenAI();

          const podcastScriptResponse = await client.chat.completions.create({
            messages: [{ role: 'user', content: `Given a list of raw AI and LLM-related stories sourced from various platforms, create a podcast script for 'AGI News Podcast' featuring Eric and Nick from Firecrawl. The script should be structured in JSON format with lines from both characters.

The podcast should have the following structure:

Title: 'AGI News Podcast with Eric and Nick'
Introduction: A brief introduction by Eric and Nick, welcoming listeners to the podcast and introducing the theme of the episode.
Discussion: Eric and Nick discuss up to 10 of the most interesting and impactful stories, focusing on product launches, demos, and innovations in AI/LLM technology. Each story should be discussed in a conversational manner, with Eric and Nick taking turns to share insights and opinions.

Each story discussion should include:

- Story Headline: Introduced by either Eric or Nick.
- Key Highlights: Discussed by both, mentioning the significance or implications of the story.
- Personal Insights: Eric and Nick share their thoughts or experiences related to the story.

Ensure the script is engaging and informative, maintaining a professional yet friendly tone. Avoid discussing any stories not present in the raw stories or unrelated to AI or LLM. Try not to repeat stories or mention the same company consecutively. Format the script in JSON without including any HTML tags.

Here are the raw stories: ${rawStories}` }],
            model: 'o1-preview',
          });
          console.log(`Podcast script generated successfully with ${podcastScriptResponse.choices[0].message.content?.length} characters.`)

          const podcast_script = podcastScriptResponse.choices[0].message.content;

          // Generate podcast audio
          const generated = await PlayHT.generate(podcast_script!);
          const { audioUrl } = generated;

          return audioUrl;
    
        } catch (error) {
          console.log("error generating newsletter")
      
        }
}
    
    