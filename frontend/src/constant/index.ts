import { FaJava } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io";
import { SiPython } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

export const langExt: Record<string, string> = {
  javascript: "js",
  cpp: "cpp",
  python: "py",
  java: "java",
};

export const langInitCode: Record<string, string> = {
  javascript: `// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Try programiz.pro");`,
  cpp: `// Online C++ compiler to run C++ program online
#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Try programiz.pro";

    return 0;
}`,
  python: `# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.
print("Try programiz.pro")`,
  java: `// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
    }
}`,
};

// Menu items.
export const langItems = [
  {
    title: "Online Javascript Compiler",
    lang: "javascript",
    url: "#",
    icon: IoLogoNodejs,
    ext: "js",
  },
  {
    title: "Online Python Compiler",
    lang: "python",
    url: "#",
    icon: SiPython,
    ext: "py",
  },
  {
    title: "Online C++ Compiler",
    lang: "cpp",
    url: "#",
    icon: TbBrandCpp,
    ext: "cpp",
  },
  {
    title: "Online Java Compiler",
    lang: "java",
    url: "#",
    icon: FaJava,
    ext: "java",
  },
];
