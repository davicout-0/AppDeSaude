import React, { useState } from 'react';
import { Pill, Clock, Plus, Edit, Trash2, Check, X, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
  taken: { [key: string]: boolean[] };
}

const Medications = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Losartana',
      dosage: '50mg',
      frequency: 'Duas vezes ao dia',
      times: ['08:00', '20:00'],
      startDate: '2024-01-01',
      notes: 'Tomar com água, preferencialmente em jejum',
      taken: {
        '2024-03-20': [true, false],
        '2024-03-21': [true, true],
      }
    },
    {
      id: '2',
      name: 'Metformina',
      dosage: '850mg',
      frequency: 'Uma vez ao dia',
      times: ['14:00'],
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      notes: 'Tomar após o almoço',
      taken: {
        '2024-03-20': [true],
        '2024-03-21': [false],
      }
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: '',
    endDate: '',
    notes: ''
  });

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.startDate) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const medicationData: Medication = {
      id: editingId || Date.now().toString(),
      ...formData,
      times: formData.times.filter(time => time.trim() !== ''),
      taken: {}
    };

    if (editingId) {
      setMedications(prev => prev.map(med => 
        med.id === editingId ? { ...medicationData, taken: prev.find(m => m.id === editingId)?.taken || {} } : med
      ));
      toast.success('Medicamento atualizado com sucesso!');
    } else {
      setMedications(prev => [...prev, medicationData]);
      toast.success('Medicamento adicionado com sucesso!');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      times: [''],
      startDate: '',
      endDate: '',
      notes: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (medication: Medication) => {
    setFormData({
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      times: medication.times,
      startDate: medication.startDate,
      endDate: medication.endDate || '',
      notes: medication.notes || ''
    });
    setEditingId(medication.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este medicamento?')) {
      setMedications(prev => prev.filter(med => med.id !== id));
      toast.success('Medicamento excluído com sucesso!');
    }
  };

  const toggleMedicationTaken = (medicationId: string, timeIndex: number) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medicationId) {
        const todayTaken = med.taken[today] || new Array(med.times.length).fill(false);
        todayTaken[timeIndex] = !todayTaken[timeIndex];
        
        return {
          ...med,
          taken: {
            ...med.taken,
            [today]: todayTaken
          }
        };
      }
      return med;
    }));

    const medication = medications.find(m => m.id === medicationId);
    const wasTaken = medication?.taken[today]?.[timeIndex];
    
    toast.success(wasTaken ? 'Medicamento desmarcado' : 'Medicamento registrado!');
  };

  const addTimeField = () => {
    setFormData({
      ...formData,
      times: [...formData.times, '']
    });
  };

  const removeTimeField = (index: number) => {
    setFormData({
      ...formData,
      times: formData.times.filter((_, i) => i !== index)
    });
  };

  const updateTimeField = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({
      ...formData,
      times: newTimes
    });
  };

  const getTodayProgress = () => {
    let totalDoses = 0;
    let takenDoses = 0;

    medications.forEach(med => {
      totalDoses += med.times.length;
      const todayTaken = med.taken[today] || [];
      takenDoses += todayTaken.filter(Boolean).length;
    });

    return { taken: takenDoses, total: totalDoses };
  };

  const progress = getTodayProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Meus Medicamentos
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie seus medicamentos e horários
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Novo Medicamento
        </button>
      </div>

      {/* Today's Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Progresso de Hoje
          </h2>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {progress.taken}/{progress.total}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress.total > 0 ? (progress.taken / progress.total) * 100 : 0}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {progress.total > 0 
            ? `${Math.round((progress.taken / progress.total) * 100)}% das doses tomadas hoje`
            : 'Nenhum medicamento cadastrado'
          }
        </p>
      </div>

      {/* Medication Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {editingId ? 'Editar Medicamento' : 'Novo Medicamento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome do Medicamento *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Losartana"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dosagem *
                </label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 50mg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Frequência *
                </label>
                <input
                  type="text"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Duas vezes ao dia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Horários
                </label>
                {formData.times.map((time, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateTimeField(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.times.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTimeField(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTimeField}
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar horário
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Fim
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Instruções especiais..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Medications List */}
      <div className="space-y-6">
        {medications.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Nenhum medicamento cadastrado
            </p>
          </div>
        ) : (
          medications.map((medication) => {
            const todayTaken = medication.taken[today] || new Array(medication.times.length).fill(false);
            
            return (
              <div
                key={medication.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {medication.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(medication)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(medication.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Horários de Hoje:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {medication.times.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => toggleMedicationTaken(medication.id, index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          todayTaken[index]
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-2 border-green-500'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500'
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        {time}
                        {todayTaken[index] ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {medication.notes && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Observações:</strong> {medication.notes}
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Período: {new Date(medication.startDate).toLocaleDateString('pt-BR')}
                  {medication.endDate && ` até ${new Date(medication.endDate).toLocaleDateString('pt-BR')}`}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Medications;