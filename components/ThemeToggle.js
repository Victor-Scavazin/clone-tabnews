export default function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme =
      current === "dark" ? "light" : "dark";
  }

  return <button onClick={toggleTheme}>🌙</button>;
}
