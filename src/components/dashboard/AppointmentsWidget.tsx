import React from 'react';
import { Calendar } from 'lucide-react';

const appointments = [
  {
    id: 1,
    doctor: 'Dra. Maria Silva',
    specialty: 'Cardiologia',
    date: '2024-03-25',
    time: '14:30',
  },
  {
    id: 2,
    doctor: 'Dr. João Santos',
    specialty: 'Clínico Geral',
    date: '2024-04-02',
    time: '09:15',
  },
  {
    id: 3,
    doctor: 'Dra. Ana Oliveira',
    specialty: 'Endocrinologia',
    date: '2024-04-10',
    time: '16:00',
  },
];

export const AppointmentsWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="text-blue-500" />
        Próximas Consultas
      </h3>

      <div className="space-y-4">
        {appointments.map(appointment => (
          <div
            key={appointment.id}
            className="border dark:border-gray-700 rounded-lg p-4 transition-all hover:border-blue-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{appointment.doctor}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {appointment.specialty}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Date(appointment.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};