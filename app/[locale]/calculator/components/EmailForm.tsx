'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface EmailFormProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, isLoading }) => {
  const t = useTranslations("calculator.email");

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(t("validationError"));
      return;
    }
    setError('');
    onSubmit(email);
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto">
      <span className="block text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-medium text-center">
        {t("eyebrow")}
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white text-center">
        {t("title")}
      </h2>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400 leading-relaxed">
        {t("description")}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10">
        <label htmlFor="email" className="sr-only">{t("emailLabel")}</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
          required
        />
        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : t("submit")}
        </button>
      </form>
      <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-6">{t("privacy")}</p>
    </div>
  );
};

export default EmailForm;
