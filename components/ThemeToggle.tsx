
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle dark mode"
      className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors text-muted-foreground hover:text-primary"
      type="button"
    >
      <Switch checked={dark} onCheckedChange={setDark} />
      <span className="sr-only">Toggle Theme</span>
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
