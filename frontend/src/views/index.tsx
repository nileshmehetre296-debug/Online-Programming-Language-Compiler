import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";
import Home from "./home";
import { langItems } from "@/constant";

const validateLang = (lang: string) => {
  const validLanguages = langItems.map((it) => it.lang);
  return validLanguages.includes(lang);
};

export const Views = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "javascript";

  if (!validateLang(lang)) {
    // Redirect to the default language if invalid or missing
    return <Navigate to="/?lang=javascript" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
