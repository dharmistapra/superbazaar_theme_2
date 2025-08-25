import themes from "@/app/themeConfig";
const HomePage = async() => {
  const currentTheme = "theme1";
  const { Home } = themes[currentTheme];
  return (
      <Home/>
  );
};

export default HomePage;
