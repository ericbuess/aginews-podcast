
import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import * as PlayHT from 'playht';


dotenv.config();

export async function generatePodcast(podcastScript: string) {
  console.log(`Generating podcast with podcast script (${podcastScript.length} characters)...`)


        try {
          

          PlayHT.init({
            apiKey: process.env.PLAY_HT_API_KEY!,
            userId: process.env.PLAY_HT_USER_ID!,
            defaultVoiceId: 's3://voice-cloning-zero-shot/d0bea180-4042-4e75-9b3f-bbfb96428152/original/manifest.json',
            defaultVoiceEngine: 'PlayHT2.0',
          });

          // Generate podcast audio
          const generated = await PlayHT.generate(podcastScript!);
          const { audioUrl } = generated;

          return audioUrl;
    
        } catch (error) {
          console.log("error generating podcast:")
          console.log(error)
          console.log("podcast script:")
          console.log(podcastScript)
        }
}
    
    