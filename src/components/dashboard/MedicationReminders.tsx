import React from 'react';
import { Clock, Check, X } from 'lucide-react';
import { useHealth } from '../../contexts/HealthContext';
import toast from 'react-hot-toast';

export const MedicationReminders = () => {
  const { medications, toggleMedication } = useHealth();

  const handleToggleMedication = (medicationId: string, scheduleIndex: number, taken: boolean) => {
    toggleMedication(medicationId, scheduleIndex);
    toast.success(taken ? 'Medicação desmarcada' : 'Medicação registrada!');
  };

  const getTotalStats = () => {
    let taken = 0;
    let total = 0;
    medications.forEach(med => {
      taken += med.taken.filter(Boolean).length;
      total += med.taken.length;
    });
    return { taken, total };
  };

  const stats = getTotalStats();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="text-blue-500" />
        Lembretes de Medicação
      </h3>

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">Doses hoje:</span>
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {stats.taken}/{stats.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stats.taken / stats.total) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {medications.map(medication => (
          <div
            key={medication.id}
            className="border dark:border-gray-700 rounded-lg p-4 transition-all hover:border-blue-500 dark:hover:border-blue-500"
          >
            <h4 className="font-medium mb-2">{medication.name}</h4>
            <div className="flex flex-wrap gap-2">
              {medication.schedule.map((time, index) => (
                <button
                  key={`${medication.id}-${time}`}
                  onClick={() => handleToggleMedication(medication.id, index, medication.taken[index])}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all
                    ${
                      medication.taken[index]
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {time}
                  {medication.taken[index] ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};