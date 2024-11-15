import { scrapeSources } from '../services/scrapeSources';
import { getCronSources } from '../services/getCronSources';
import { generatePodcast } from '../services/generatePodcast'
import { sendPodcast } from '../services/sendNewsletter'
import fs from 'fs';
export const handleCron = async (): Promise<void> => {
  try {
   
    const cronSources = await getCronSources();
    const rawStories = await scrapeSources(cronSources);
    //const rawStories = fs.readFileSync('./combinedText.json', 'utf8').toString();
    const rawStoriesString = JSON.stringify(rawStories);
    const podcast = await generatePodcast(rawStoriesString);
    const result = await sendPodcast(podcast!, rawStoriesString);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}