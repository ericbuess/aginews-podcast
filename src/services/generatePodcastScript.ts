

import dotenv from 'dotenv';
import OpenAI from 'openai';
import Together from "together-ai";

dotenv.config();

export async function generatePodcastScript(rawStories: string) {
  console.log(`Generating podcast script with raw stories (${rawStories.length} characters)...`)


        try {
          const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

          const podcastScriptResponse = await together.chat.completions.create({
            model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
            messages: [{ role: 'user', content: `Given a list of raw AI and LLM-related stories sourced from various platforms, create a podcast script for 'AGI News Podcast' featuring Eric, the co-founder of Firecrawl. The output format should be a 'script' object like this containing Eric's script:

{
  "podcast_script": "Podcast script here"
}
  
Do not include any other text or formatting like \`\`\`json or \`\`\` just output the JSON object.


The podcast should have the following structure:

A charming and funny yet professional introduction by Eric followed by a discussion of up to 2 stories.

Each story discussion should include:

- Story Headline: Introduced by Eric. 1 sentence.
- Key Highlights: Discussed by Eric, mentioning the significance or implications of the story. 1 sentences.
- Personal Insights: Eric shares thoughts or experiences related to the story. 1 sentence.

Closing with thanks for listening and a call to action for listeners to subscribe to the podcast.

Ensure the script is engaging and informative, maintaining a professional yet friendly tone. Avoid discussing any stories not present in the raw stories or unrelated to AI or LLM. Format the script in JSON without including any HTML tags. The output format should be a 'script' object like this:

{
  "podcast_script": "Podcast script here"
}

Do not include any other text or formatting like \`\`\`json or \`\`\` just output the JSON object.

Here are the raw stories: ${rawStories}\n\n\n JSON output here (no other text or formatting):` }],
        
          });
          

         // Clean the JSON string inline by removing control characters
          const cleanedPodcastScriptRaw = podcastScriptResponse.choices[0].message?.content?.replace(/[\u0000-\u001F]+/g, '');
            
          // Parse the cleaned JSON string
          const podcast_script = JSON.parse(cleanedPodcastScriptRaw!).podcast_script;

    
          
          return podcast_script;
    
        } catch (error) {
          console.log("error generating podcast")
          console.log(error)
          
      
        }
}
    
    