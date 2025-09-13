let cachedTheme = null;
export const setTheme = (theme) => {
  console.log("theme", theme)
  cachedTheme = theme;
};

export const getTheme = () => {
  console.log("cachedTheme", cachedTheme)
  return cachedTheme || "theme1";
};
