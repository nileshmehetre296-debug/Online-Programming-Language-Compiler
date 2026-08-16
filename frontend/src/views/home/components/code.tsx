import { langInitCode } from "@/constant";
import { useTheme } from "@/context/theme-provider";
import { Editor, Monaco } from "@monaco-editor/react";
import { useEffect } from "react";

type Props = {
  lang: string;
  code: string;
  setCode: Function;
};

const Code = ({ lang, code, setCode }: Props) => {
  const { theme } = useTheme();

  useEffect(() => {
    setCode(langInitCode[lang]);
  }, [lang]);

  const handleEditorDidMount = (_editor: any, monaco: Monaco) => {
    // Define the dark theme
    monaco.editor.defineTheme("darkTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" }, // Soft green
        { token: "keyword", foreground: "C586C0" }, // Soft purple
        { token: "number", foreground: "B5CEA8" }, // Light green
        { token: "string", foreground: "CE9178" }, // Warm brown
        { token: "delimiter", foreground: "D4D4D4" }, // Light gray
      ],
      colors: {
        "editor.background": "#1c2130",
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#00000000", // Transparent background for the current line
        "editor.lineHighlightBorder": "#00000000", // Transparent border for the current line
      },
    });

    // Define the light theme
    monaco.editor.defineTheme("lightTheme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "keyword", foreground: "0000FF" },
        { token: "number", foreground: "098658" },
        { token: "string", foreground: "A31515" },
        { token: "delimiter", foreground: "000000" },
      ],
      colors: {
        "editor.background": "#f5f5f5",
        "editor.lineHighlightBackground": "#00000000", // Transparent background for the current line
        "editor.lineHighlightBorder": "#00000000", // Transparent border for the current line
      },
    });

    // Set the initial theme
    monaco.editor.setTheme(theme === "dark" ? "darkTheme" : "lightTheme");
  };
  return (
    <Editor
      language={lang}
      value={code}
      className="bg-[#f5f5f5] dark:bg-[#1c2130]"
      onMount={handleEditorDidMount}
      theme={theme === "dark" ? "darkTheme" : "lightTheme"}
      options={{
        scrollbar: {
          vertical: "hidden",
          horizontal: "hidden",
        },
        overviewRulerLanes: 0,
        minimap: { enabled: false },
        lineNumbers: "off",
        glyphMargin: false,
        fontFamily: "mono sans",
      }}
      onChange={(newValue) => setCode(newValue || "")}
    />
  );
};

export default Code;
