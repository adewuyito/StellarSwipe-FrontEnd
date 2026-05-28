"use client";

import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LanguageSelector() {
  const { locale, setLocale, supportedLocales, isInitialized } = useI18n();
  const [showMenu, setShowMenu] = useState(false);

  if (!isInitialized) return null;

  const localeLabels: Record<string, string> = {
    en: "English",
    ng: "Yoruba (Nigeria)",
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Change language"
        aria-expanded={showMenu}
        className="gap-1"
      >
        <Globe size={16} />
        {localeLabels[locale]}
      </Button>
      {showMenu && (
        <div className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg z-20 min-w-[150px] p-1">
          {supportedLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setShowMenu(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 ${
                locale === loc
                  ? "bg-blue-500/20 text-blue-500"
                  : "hover:bg-muted text-foreground"
              }`}
              aria-label={`Select ${localeLabels[loc]}`}
            >
              {locale === loc && "✓ "}
              {localeLabels[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
