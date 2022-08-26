import { i18n } from "../../../../next-i18next.config";
import { I18nContext, useTranslation } from "next-i18next";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const {t} = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const {
    i18n: { language },
  } = useContext(I18nContext);
  const [currentLocale, setCurrentLocale] = useState({ locale });

  useEffect(() => {
    const _locale = window.localStorage.getItem("locale");
    router.push(router.asPath, router.asPath, { locale: _locale });
  }, [currentLocale]);

  const onChangeLanguage = (e, data) => {
    const selectedLanguage = data.value;

    setCurrentLocale(selectedLanguage);
    i18n.language = selectedLanguage;

    localStorage.setItem("locale", selectedLanguage);
  };

  const languageOptions = [
    {
      key: "pt",
      value: "pt",
      text: "Português",
      image: { src: "img/flags/br.png" },
    },
    {
      key: "en",
      value: "en",
      text: "English",
      image: { src: "img/flags/en.png" },
    },
    {
      key: "es",
      value: "es",
      text: "Español",
      image: { src: "img/flags/es.png" },
    },
  ];
  return (
    <>
      <Dropdown
        inline
        options={languageOptions}
        onChange={onChangeLanguage}
        defaultValue={language}
      />
    </>
  );
};

export default LanguageSwitcher;
