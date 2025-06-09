import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  phone: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dra. Maria Silva',
      specialty: 'Cardiologia',
      date: '2024-03-25',
      time: '14:30',
      location: 'Hospital Universitário',
      phone: '(38) 3224-8373',
      notes: 'Consulta de rotina - levar exames anteriores',
      status: 'scheduled'
    },
    {
      id: '2',
      doctor: 'Dr. João Santos',
      specialty: 'Clínico Geral',
      date: '2024-04-02',
      time: '09:15',
      location: 'Centro Médico Ibituruna',
      phone: '(38) 3690-1234',
      status: 'scheduled'
    },
    {
      id: '3',
      doctor: 'Dra. Ana Oliveira',
      specialty: 'Endocrinologia',
      date: '2024-03-15',
      time: '16:00',
      location: 'Clínica Especializada',
      phone: '(38) 3212-5678',
      status: 'completed'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    location: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctor || !formData.specialty || !formData.date || !formData.time) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const appointmentData: Appointment = {
      id: editingId || Date.now().toString(),
      ...formData,
      status: 'scheduled'
    };

    if (editingId) {
      setAppointments(prev => prev.map(apt => 
        apt.id === editingId ? appointmentData : apt
      ));
      toast.success('Consulta atualizada com sucesso!');
    } else {
      setAppointments(prev => [...prev, appointmentData]);
      toast.success('Consulta agendada com sucesso!');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      location: '',
      phone: '',
      notes: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData({
      doctor: appointment.doctor,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      phone: appointment.phone,
      notes: appointment.notes || ''
    });
    setEditingId(appointment.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast.success('Consulta excluída com sucesso!');
    }
  };

  const handleCall = (phone: string, doctor: string) => {
    const phoneNumber = phone.replace(/\D/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    toast.success(`Ligando para ${doctor}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Realizada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'scheduled' && new Date(apt.date) >= new Date()
  );

  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || new Date(apt.date) < new Date()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Minhas Consultas
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie seus agendamentos médicos
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nova Consulta
        </button>
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {editingId ? 'Editar Consulta' : 'Nova Consulta'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Médico *
                </label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do médico"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Especialidade *
                </label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Cardiologia"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Horário *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Local
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="Hospital ou clínica"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="(38) 3000-0000"
                />
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
                  placeholder="Notas adicionais..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {editingId ? 'Atualizar' : 'Agendar'}
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

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Próximas Consultas ({upcomingAppointments.length})
        </h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Nenhuma consulta agendada
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {appointment.doctor}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      {appointment.specialty}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                  {appointment.location && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{appointment.location}</span>
                    </div>
                  )}
                </div>

                {appointment.notes && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {appointment.phone && (
                    <button
                      onClick={() => handleCall(appointment.phone, appointment.doctor)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Histórico de Consultas ({pastAppointments.length})
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pastAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 opacity-75"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {appointment.doctor}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.specialty}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-3 w-3 mr-2" />
                    <span>{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;