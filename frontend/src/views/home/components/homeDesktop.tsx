import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Code from "./code";
import { langExt, langItems } from "@/constant";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { memo, MouseEventHandler } from "react";

type Props = {
  codeOutput: string;
  code: string;
  setCode: Function;
  executeCode: Function;
  loading: boolean;
  clearCode: MouseEventHandler;
  lang: string;
};

const HomeDesktop = memo((props: Props) => {
  const { code, setCode, executeCode, loading, codeOutput, clearCode, lang } =
    props;

  return (
    <div className="hidden md:block flex-1 w-full  border border-border-[0.5px]">
      <div className="flex h-full">
        {/* side language panel section */}
        <div className="px-2 py-2 border-r border-border-[0.5px] hidden md:block">
          {langItems.map((item) => (
            <div className="pb-2" key={item.lang}>
              <div
                className={cn("border p-2", {
                  "bg-[#0556f3]": lang == item.lang,
                })}
              >
                <Link to={`?lang=${item.lang}`}>
                  <item.icon className="text-[#25265e66] dark:text-white h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* code Editor or input section */}
        <div className="w-[50%] border border-border-[0.5px] flex flex-col">
          <div className="flex h-12">
            <div className="bg-[#f5f5f5] dark:bg-[#1c2130] w-28 flex justify-center items-center dark:text-white">
              {`main.${langExt[lang]}`}
            </div>
            <div className="border-l border-b border-border-[0.5px] w-full flex justify-end px-6">
              <div className="flex items-center gap-3">
                <ModeToggle />
                <Button
                  variant={"default"}
                  className="rounded-none bg-[#0556f3] text-white"
                  onClick={() => executeCode(lang, code)}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={55} className="animate-spin" />
                  ) : (
                    "Run"
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f5] dark:bg-[#1c2130] flex-1">
            <Code lang={lang} code={code} setCode={setCode} />
          </div>
        </div>

        {/* output of code section */}
        <div className="w-[50%] border border-border-[0.5px] flex flex-col">
          <div className="flex h-12">
            <div className="border-b border-border-[0.5px] w-full flex justify-between items-center px-5">
              <div>Output</div>
              <div>
                <Button
                  variant={"outline"}
                  className="border-border rounded-none"
                  onClick={clearCode}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f5] dark:bg-[#1c2130] flex-1 p-1 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: codeOutput.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomeDesktop;
