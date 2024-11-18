
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendPodcast(podcast_url: string, reciever_email: string) {
  try {

    await resend.emails.send({
      from: 'Eric <eric@tryfirecrawl.com>',
      to: reciever_email,
      subject: 'AGI News Podcast with Eric',
      html: `Your podcast is ready to listen to: ` + podcast_url
    });

    return "Success sending newsletter to " + reciever_email + " on " + new Date().toISOString();
  } catch (error) {
    console.log("error sending newsletter");
  }
}