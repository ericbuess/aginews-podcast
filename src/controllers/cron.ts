import { scrapeSources } from '../services/scrapeSources';
import { getCronSources } from '../services/getCronSources';
import { generatePodcastScript } from '../services/generatePodcastScript'
import { sendPodcast } from '../services/sendPodcast'
import { generatePodcast } from '../services/generatePodcast';

export const handleCron = async (): Promise<void> => {
  try {
    const cronSources = await getCronSources();
    const rawStories = await scrapeSources(cronSources!);
    const rawStoriesString = JSON.stringify(rawStories);
    const podcastScript = await generatePodcastScript(rawStoriesString);
    const podcastUrl = await generatePodcast(podcastScript);
    const result = await sendPodcast(podcastUrl!, "enter email here");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}