export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL: string;
            USER_NAME: string; 
            PASSWORD: string;
        }
    }
}