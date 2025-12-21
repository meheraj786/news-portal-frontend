export {};

interface GoogleTranslate {
  translate: {
    TranslateElement: new (
      options: {
        pageLanguage: string;
        includedLanguages?: string;
        autoDisplay?: boolean;
      },
      elementId: string
    ) => void;
  };
}

declare global {
  interface Window {
    google?: GoogleTranslate;
  }
}
