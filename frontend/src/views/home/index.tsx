import { useCallback, useMemo, useState } from "react";
import HomeDesktop from "./components/homeDesktop";
import HomeMobile from "./components/homeMobile";
import { useMutation } from "@tanstack/react-query";
import { CodeService } from "@/services/codeService";

const Home = () => {
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // React Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ lang, code }: { lang: string; code: string }) => {
      return await CodeService.executeCode(lang, code);
    },
    onSuccess: (data) => {
      setCodeOutput(data);
    },
    onError: (error) => {
      console.error("Error executing code:", error);
      setCodeOutput("Error executing code. Please try again.");
    },
  });

  const executeCode = useCallback(
    (lang: string, code: string) => {
      mutate({
        lang,
        code,
      });
    },
    [mutate]
  );

  const clearCode = useCallback(() => {
    setCodeOutput("");
  }, []);

  const lang = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") || "javascript";
  }, [window.location.search]);

  return (
    <>
      <HomeDesktop
        code={code}
        setCode={setCode}
        codeOutput={codeOutput}
        executeCode={executeCode}
        loading={isPending}
        clearCode={clearCode}
        lang={lang}
      />
      <HomeMobile
        code={code}
        setCode={setCode}
        codeOutput={codeOutput}
        executeCode={executeCode}
        loading={isPending}
        lang={lang}
      />
    </>
  );
};

export default Home;
