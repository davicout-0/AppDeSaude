import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Bell, Globe, Database, Info } from 'lucide-react';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  const handleBackup = () => {
    toast.success('Backup realizado com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Aparência</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="text-blue-500" /> : <Sun className="text-blue-500" />}
              <span>Tema Escuro</span>
            </div>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              className={`${
                isDarkMode ? 'bg-blue-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Notificações</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="text-blue-500" />
              <span>Notificações Push</span>
            </div>
            <Switch
              checked={pushNotifications}
              onChange={setPushNotifications}
              className={`${
                pushNotifications ? 'bg-blue-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  pushNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Idioma</h2>
          <div className="flex items-center gap-4">
            <Globe className="text-blue-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US" disabled>English (US)</option>
              <option value="es-ES" disabled>Español</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Dados</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="text-blue-500" />
              <span>Backup de Dados</span>
            </div>
            <button
              onClick={handleBackup}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Fazer Backup
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Sobre</h2>
          <div className="flex items-center gap-2 mb-2">
            <Info className="text-blue-500" />
            <span>Versão 1.0.0</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Health Monitor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}