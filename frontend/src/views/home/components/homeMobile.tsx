import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Code from "./code";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { langExt } from "@/constant";
import { Loader2 } from "lucide-react";

type Props = {
  codeOutput: string;
  code: string;
  setCode: Function;
  executeCode: Function;
  loading: boolean;
  lang: string;
};

const HomeMobile = memo((props: Props) => {
  const { code, setCode, executeCode, codeOutput, loading, lang } = props;
  const [isEditorEnabled, setEditorEnabled] = useState<boolean>(true);

  const enaledEditor = () => setEditorEnabled(true);
  const enableOutput = () => setEditorEnabled(false);

  return (
    <div className="md:hidden flex-1 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex h-12 justify-between items-center px-3 border border-border">
          <div>
            <Button
              variant="outline"
              onClick={enaledEditor}
              className={cn("rounded-none border-border", {
                "border-[#0556f3] dark:border-white": isEditorEnabled == true,
              })}
            >
              {`main.${langExt[lang]}`}
            </Button>
            <Button
              variant="outline"
              className={cn("rounded-none border-border", {
                "border-[#0556f3] dark:border-white": isEditorEnabled == false,
              })}
              onClick={enableOutput}
            >
              Output
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              variant="default"
              className="rounded-none bg-[#0556f3] text-white"
              onClick={() => {
                executeCode(lang, code);
                enableOutput();
              }}
              disabled={loading}
            >
              {loading ? <Loader2 size={55} className="animate-spin" /> : "Run"}
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-[#f5f5f5] dark:bg-[#1c2130]">
          {isEditorEnabled && (
            <Code lang={lang} code={code} setCode={setCode} />
          )}
          {!isEditorEnabled && (
            <div className="p-1 font-mono">
              <div
                dangerouslySetInnerHTML={{
                  __html: codeOutput.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HomeMobile;
