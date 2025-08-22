import dynamic from "next/dynamic";

export function getThemeLayout(theme) {
  switch (theme) {
    case "theme1":
      return dynamic(() => import("./theme/theme1/layout"));
    case "theme2":
      return dynamic(() => import("./theme/theme2/layout"));
    default:
      function DefaultLayout({ children }) {
        return <>{children}</>;
      }
      DefaultLayout.displayName = "DefaultLayout";
      return DefaultLayout;
  }
}
