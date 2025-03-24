// src/types/express-session-extensions.ts
import  'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    isLoggedIn?: boolean;
  }
}