export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      NODE_ENV: string;
      REMOTE_URI: string;
      LOCAL_URI: string;
      PORT: string;
    }
  }
}
