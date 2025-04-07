import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import UserInfo from "./user-info";

export default function PageHeader({ className }) {
  const theme = useServerDarkMode();

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Blog App
      </Link>

      <div className="flex items-center">
        <DarkModeToggle defaultMode={theme} />
        <UserInfo />
      </div>
    </header>
  );
}
