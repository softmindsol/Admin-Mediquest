const encryptPassword = (password) => {
  try {
    return btoa(password);
  } catch (error) {
    console.error("Encoding error:", error);
    throw error;
  }
};
export default encryptPassword;
