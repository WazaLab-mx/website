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
    <div className="animate-fade-in w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">{t("title")}</h2>
      <p className="text-center text-gray-600 mb-6">{t("description")}</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">{t("emailLabel")}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : t("submit")}
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-4">{t("privacy")}</p>
    </div>
  );
};

export default EmailForm;
