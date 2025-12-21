import { useEffect } from "react";

const TranslateWidget = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (
        window.google &&
        window.google.translate &&
        document.getElementById("google_translate_element")
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "auto",
            includedLanguages: "en,bn",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white px-2 py-1 rounded border text-sm">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default TranslateWidget;
