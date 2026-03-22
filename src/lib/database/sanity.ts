import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

declare const process: any;

const getEnv = (name: string) => {
    if (typeof process !== 'undefined' && process.env && process.env[name]) return process.env[name];
    // @ts-ignore
    if (import.meta.env && import.meta.env[name]) return import.meta.env[name];
    return '';
};

const projectId = getEnv('VITE_SANITY_PROJECT_ID');
const dataset = getEnv('VITE_SANITY_DATASET') || 'production';
const writeToken = getEnv('VITE_SANITY_WRITE_TOKEN');

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2023-05-03',
});

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  token: writeToken,
  apiVersion: '2023-05-03',
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  return builder.image(source);
};
