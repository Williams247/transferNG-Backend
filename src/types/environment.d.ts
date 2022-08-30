export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}
