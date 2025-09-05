import 'dotenv/config';
export default {
  name: 'AmbiVision',
  slug: 'ambivision',
  version: '1.0.0',
  orientation: 'portrait',
  platforms: ['android'],
  android: { package: 'com.tuorg.ambivision' },
  extra: {
    eas: { projectId: '7c315bda-c705-4393-a306-156dca0ee349' },
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
};