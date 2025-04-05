"use server";

import { google } from 'googleapis';

const API_KEY = 'AIzaSyBX_ASjyEAGy2aYfMS4_m_Rm7erBkaWsaU';
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

export const searchTrailer = async (query: string) => {
  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: `${query} official trailer`,
      type: ['video'],
      maxResults: 1,
      videoEmbeddable: 'true'
    });
    
    if (response.data.items?.length) {
      const videoId = response.data.items[0].id?.videoId;
      return {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        title: response.data.items[0].snippet?.title
      };
    }
    return null;
  } catch (error) {
    console.error('YouTube API error:', error);
    return null;
  }
};