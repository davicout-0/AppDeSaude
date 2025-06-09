import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Heart, Settings as Lungs, Activity } from 'lucide-react';
import { useHealth } from '../../contexts/HealthContext';
import { generateRandomMeasurement, formatTime } from '../../utils/healthUtils';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CurrentMeasurement = () => {
  const { measurements, addMeasurement, cityAverages } = useHealth();

  const handleNewMeasurement = () => {
    const newData = generateRandomMeasurement();
    addMeasurement(newData);
    toast.success('Nova medição registrada!');
  };

  const chartData = {
    labels: measurements.map(m => formatTime(m.timestamp)),
    datasets: [
      {
        label: 'Pressão Sistólica',
        data: measurements.map(m => m.systolic),
        borderColor: '#3B82F6',
        tension: 0.4,
      },
      {
        label: 'Pressão Diastólica',
        data: measurements.map(m => m.diastolic),
        borderColor: '#60A5FA',
        tension: 0.4,
      },
    ],
  };

  const latestMeasurement = measurements[measurements.length - 1] || {
    systolic: 0,
    diastolic: 0,
    heartRate: 0,
    spO2: 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-blue-500" />
            <h3 className="text-lg font-semibold">Pressão Arterial</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {latestMeasurement.systolic}/{latestMeasurement.diastolic}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Média local: {cityAverages.systolic}/{cityAverages.diastolic}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-500" />
            <h3 className="text-lg font-semibold">Pulsação</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {latestMeasurement.heartRate} bpm
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Média local: {cityAverages.heartRate} bpm
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Lungs className="text-purple-500" />
            <h3 className="text-lg font-semibold">Saturação (SpO2)</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {latestMeasurement.spO2}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Média local: {cityAverages.spO2}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Histórico de Medições</h3>
        <div className="h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  min: 60,
                  max: 160,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNewMeasurement}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg
            transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Nova Medição
        </button>
      </div>
    </div>
  );
};