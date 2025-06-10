'use client';
import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

type STTProvider = {
  name: string;
  value: string;
  models: {
    name: string;
    value: string;
    languages: {
      name: string;
      value: string;
    }[];
  }[];
};

type STTConfig = {
  providers: STTProvider[];
};

type ToastType = {
  message: string;
  type: 'success' | 'error';
};

export default function AgentPage() {
  const [sttConfig, setSttConfig] = useState<STTConfig | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [models, setModels] = useState<STTProvider['models']>([]);
  const [languages, setLanguages] = useState<STTProvider['models'][0]['languages']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const savedConfig = localStorage.getItem('agentConfig');
    if (savedConfig) {
      const { provider, model, language } = JSON.parse(savedConfig);
      setSelectedProvider(provider);
      setSelectedModel(model);
      setSelectedLanguage(language);
    }
  }, []);

  useEffect(() => {
    const fetchSTTConfig = async () => {
      try {
        const response = await fetch('/api/stt');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to load config');
        setSttConfig({ providers: data.stt });
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSTTConfig();
  }, []);

  useEffect(() => {
    if (selectedProvider && sttConfig) {
      const provider = sttConfig.providers.find(p => p.value === selectedProvider);
      if (provider) {
        setModels(provider.models);
        const modelExists = provider.models.some(m => m.value === selectedModel);
        if (!modelExists) {
          setSelectedModel('');
          setSelectedLanguage('');
        }
      }
    }
  }, [selectedProvider, sttConfig, selectedModel]);

  useEffect(() => {
    if (selectedModel && models.length > 0) {
      const model = models.find(m => m.value === selectedModel);
      if (model) {
        setLanguages(model.languages);
        const langExists = model.languages.some(l => l.value === selectedLanguage);
        if (!langExists) setSelectedLanguage('');
      }
    }
  }, [selectedModel, models, selectedLanguage]);

  useEffect(() => {
    if (selectedProvider && selectedModel && selectedLanguage) {
      localStorage.setItem(
        'agentConfig',
        JSON.stringify({ provider: selectedProvider, model: selectedModel, language: selectedLanguage })
      );
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

  const handleSave = () => {
    toast.success('Configuration saved successfully!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300 max-w-2xl mx-auto">
     
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Agent Configuration</h2>

      <div className="space-y-4">
        {/* Provider */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="">Select a provider</option>
            {sttConfig?.providers.map(provider => (
              <option key={provider.value} value={provider.value}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedProvider}
            className={`w-full px-3 py-2 border rounded focus:outline-none transition ${
              !selectedProvider
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600'
            }`}
          >
            <option value="">Select a model</option>
            {models.map(model => (
              <option key={model.value} value={model.value}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={!selectedModel}
            className={`w-full px-3 py-2 border rounded focus:outline-none transition ${
              !selectedModel
                ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600'
            }`}
          >
            <option value="">Select a language</option>
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary */}
      {(selectedProvider || selectedModel || selectedLanguage) && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Selected Configuration</h3>
          {selectedProvider && (
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Provider: </span>
              <span className="text-gray-600 dark:text-gray-200">
                {sttConfig?.providers.find(p => p.value === selectedProvider)?.name}
              </span>
            </div>
          )}
          {selectedModel && (
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Model: </span>
              <span className="text-gray-600 dark:text-gray-200">
                {models.find(m => m.value === selectedModel)?.name}
              </span>
            </div>
          )}
          {selectedLanguage && (
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Language: </span>
              <span className="text-gray-600 dark:text-gray-200">
                {languages.find(l => l.value === selectedLanguage)?.name}
              </span>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={!selectedProvider || !selectedModel || !selectedLanguage}
        className={`mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded transition ${
          !selectedProvider || !selectedModel || !selectedLanguage
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'
        }`}
      >
        Save Configuration
      </button>
    </div>
  );
}
