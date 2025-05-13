import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/language';
import { Select } from 'antd';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' }
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    dispatch(setLanguage(languageCode));
  };

  return (
    <div className="language-switcher">
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        options={languages.map((lang) => ({
          value: lang.code,
          label: lang.name
        }))}
        style={{ width: 120 }}
      />
    </div>
  );
};

export default LanguageSwitcher; 