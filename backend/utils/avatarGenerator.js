const PROFILE_PICS = [
  "/avatar1.png",
  "/avatar2.png",
  "/avatar3.png",
  "/avatar4.png",
  "/avatar5.png",
];

export const avatarGenerator = () => {
  return PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
};
