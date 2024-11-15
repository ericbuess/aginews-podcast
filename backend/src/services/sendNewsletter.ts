
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendPodcast(podcast: string, rawStories: string) {


  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);
    const batchSize = 50;
    let start = 0;
    let hasMore = true;

    while (hasMore) {
      const { data: subscribers, error } = await supabase
        .from('users')
        .select('email')
        .range(start, start + batchSize - 1);

      if (error) {
        throw new Error(`Failed to fetch subscribers: ${error.message}`);
      }

      

      if (subscribers.length < batchSize) {
        hasMore = false;
      }

      console.log(`Sending podcast to ${subscribers.length} subscribers`);

      for (const subscriber of subscribers) {
        const unsubscribe_link = `https://www.aginews.io/api/unsubscribe?email=${subscriber.email}`;
       
        await resend.emails.send({
          from: 'Eric <eric@tryfirecrawl.com>',
          to: subscriber.email,
          subject: 'AGI News Podcast with Eric and Nick',
          html: podcast + `<br><br><a href="${unsubscribe_link}">Unsubscribe</a>`,
        });
        
      }

      start += batchSize;
    }
    return "Success sending newsletter on " + new Date().toISOString();
  } catch (error) {
    console.log("error generating newsletter");
  }
}