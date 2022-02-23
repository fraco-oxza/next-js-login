export const sessionOptions = {
  cookieName: "loginLearningSession",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
