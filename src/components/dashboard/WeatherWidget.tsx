import React from 'react';
import { Cloud, Thermometer, Droplets, ArrowDown } from 'lucide-react';
import { getWeatherMock, getHealthTip } from '../../utils/healthUtils';

export const WeatherWidget = () => {
  const weather = getWeatherMock();
  const healthTip = getHealthTip(weather);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Cloud className="text-blue-500" />
        Clima em Montes Claros
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Thermometer className="mx-auto text-red-500 mb-2" />
          <p className="text-2xl font-bold">{weather.temperature}°C</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Temperatura</p>
        </div>

        <div className="text-center">
          <Droplets className="mx-auto text-blue-500 mb-2" />
          <p className="text-2xl font-bold">{weather.humidity}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Umidade</p>
        </div>

        <div className="text-center">
          <ArrowDown className="mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-bold">{weather.pressure}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pressão</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">{healthTip}</p>
      </div>
    </div>
  );
};