import { useSearchParams } from "react-router-dom";
import { MenuIcon } from "../icons";
import { useSidebar } from "../ui/sidebar";

const Header = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "javascript";
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-[50px] flex items-center px-6">
      <button
        className="bg-transparent border-none outline-none text-black md:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon className="dark:text-white" />
      </button>
      <img
        className="hidden dark:block px-3"
        src="https://cdn.playground-v2.programiz.com/assets/logos/logo-inverted.svg"
      />
      <img
        className="dark:hidden px-3"
        src="https://cdn.playground-v2.programiz.com/assets/logos/logo.svg"
      />
      <div className="text-sm pt-1 capitalize">{lang} Online Compiler</div>
    </header>
  );
};

export default Header;
