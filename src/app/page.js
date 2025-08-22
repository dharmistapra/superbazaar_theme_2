export default async function HomePage() {
  const currentTheme = "theme2";
  const ThemeHome = (await import(`./theme/${currentTheme}/Home`)).default;

  return <ThemeHome />;
}