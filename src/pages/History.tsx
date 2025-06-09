import React, { useState } from 'react';
import { Calendar, TrendingUp, Download, Filter, BarChart3 } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { useHealth } from '../contexts/HealthContext';
import { formatTime } from '../utils/healthUtils';

const History = () => {
  const { measurements } = useHealth();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const periods = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: '90days', label: 'Últimos 90 dias' },
    { value: 'all', label: 'Todo período' }
  ];

  const metrics = [
    { value: 'all', label: 'Todos os indicadores' },
    { value: 'pressure', label: 'Pressão Arterial' },
    { value: 'heartRate', label: 'Frequência Cardíaca' },
    { value: 'spO2', label: 'Saturação (SpO2)' }
  ];

  const getFilteredData = () => {
    let filtered = [...measurements];
    
    if (selectedPeriod !== 'all') {
      const days = parseInt(selectedPeriod.replace('days', ''));
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(m => new Date(m.timestamp) >= cutoffDate);
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();

  const chartData = {
    labels: filteredData.map(m => formatTime(m.timestamp)),
    datasets: [
      ...(selectedMetric === 'all' || selectedMetric === 'pressure' ? [
        {
          label: 'Pressão Sistólica',
          data: filteredData.map(m => m.systolic),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Pressão Diastólica',
          data: filteredData.map(m => m.diastolic),
          borderColor: '#60A5FA',
          backgroundColor: 'rgba(96, 165, 250, 0.1)',
          tension: 0.4,
        }
      ] : []),
      ...(selectedMetric === 'all' || selectedMetric === 'heartRate' ? [
        {
          label: 'Frequência Cardíaca',
          data: filteredData.map(m => m.heartRate),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        }
      ] : []),
      ...(selectedMetric === 'all' || selectedMetric === 'spO2' ? [
        {
          label: 'Saturação (SpO2)',
          data: filteredData.map(m => m.spO2),
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
        }
      ] : [])
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Histórico de Medições',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const getStats = () => {
    if (filteredData.length === 0) return null;

    const latest = filteredData[filteredData.length - 1];
    const previous = filteredData[filteredData.length - 2];

    return {
      systolic: {
        current: latest.systolic,
        change: previous ? latest.systolic - previous.systolic : 0,
        average: Math.round(filteredData.reduce((sum, m) => sum + m.systolic, 0) / filteredData.length)
      },
      diastolic: {
        current: latest.diastolic,
        change: previous ? latest.diastolic - previous.diastolic : 0,
        average: Math.round(filteredData.reduce((sum, m) => sum + m.diastolic, 0) / filteredData.length)
      },
      heartRate: {
        current: latest.heartRate,
        change: previous ? latest.heartRate - previous.heartRate : 0,
        average: Math.round(filteredData.reduce((sum, m) => sum + m.heartRate, 0) / filteredData.length)
      },
      spO2: {
        current: latest.spO2,
        change: previous ? latest.spO2 - previous.spO2 : 0,
        average: Math.round(filteredData.reduce((sum, m) => sum + m.spO2, 0) / filteredData.length)
      }
    };
  };

  const stats = getStats();

  const handleExport = () => {
    const csvContent = [
      ['Data/Hora', 'Pressão Sistólica', 'Pressão Diastólica', 'Frequência Cardíaca', 'SpO2'],
      ...filteredData.map(m => [
        new Date(m.timestamp).toLocaleString('pt-BR'),
        m.systolic,
        m.diastolic,
        m.heartRate,
        m.spO2
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico-saude-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="text-blue-500" />
          Histórico de Saúde
        </h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" size={20} />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" size={20} />
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              {metrics.map(metric => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Download size={20} />
            Exportar
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Nenhum dado encontrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Registre suas primeiras medições para ver o histórico aqui
          </p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Pressão Sistólica
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.systolic.current}
                  </span>
                  <div className={`flex items-center ${stats.systolic.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    <TrendingUp size={16} className={stats.systolic.change < 0 ? 'rotate-180' : ''} />
                    <span className="text-sm ml-1">{Math.abs(stats.systolic.change)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Média: {stats.systolic.average}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Pressão Diastólica
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.diastolic.current}
                  </span>
                  <div className={`flex items-center ${stats.diastolic.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    <TrendingUp size={16} className={stats.diastolic.change < 0 ? 'rotate-180' : ''} />
                    <span className="text-sm ml-1">{Math.abs(stats.diastolic.change)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Média: {stats.diastolic.average}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Frequência Cardíaca
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.heartRate.current}
                  </span>
                  <div className={`flex items-center ${stats.heartRate.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    <TrendingUp size={16} className={stats.heartRate.change < 0 ? 'rotate-180' : ''} />
                    <span className="text-sm ml-1">{Math.abs(stats.heartRate.change)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Média: {stats.heartRate.average} bpm
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Saturação (SpO2)
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stats.spO2.current}%
                  </span>
                  <div className={`flex items-center ${stats.spO2.change <= 0 ? 'text-red-500' : 'text-green-500'}`}>
                    <TrendingUp size={16} className={stats.spO2.change < 0 ? 'rotate-180' : ''} />
                    <span className="text-sm ml-1">{Math.abs(stats.spO2.change)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Média: {stats.spO2.average}%
                </p>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Registros Detalhados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pressão Arterial
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Freq. Cardíaca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      SpO2
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.slice().reverse().map((measurement, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(measurement.timestamp).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {measurement.systolic}/{measurement.diastolic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {measurement.heartRate} bpm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {measurement.spO2}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;