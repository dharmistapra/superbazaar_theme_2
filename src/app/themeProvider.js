export function getThemeLayout(theme) {
  switch (theme) {
    case "theme1":
      return require("./theme/theme1/layout").default;
    case "theme2":
      return require("./theme/theme2/layout").default;
    default:
      return ({ children }) => <>{children}</>;
  }
}
