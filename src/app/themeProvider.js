import Theme1Layout from "./theme/theme1/layout";
import Theme2Layout from "./theme/theme2/layout";

export function getThemeLayout(theme) {
  switch (theme) {
    case "theme1":
      return Theme1Layout;
    case "theme2":
      return Theme2Layout;
    default:
      return Theme1Layout;
  }
}
