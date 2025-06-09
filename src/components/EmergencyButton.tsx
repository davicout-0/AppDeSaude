import React, { useState } from 'react';
import { Phone, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface EmergencyContact {
  name: string;
  number: string;
  type: 'emergency' | 'health' | 'police' | 'fire';
}

const emergencyContacts: EmergencyContact[] = [
  { name: 'SAMU', number: '192', type: 'emergency' },
  { name: 'Bombeiros', number: '193', type: 'fire' },
  { name: 'Polícia Militar', number: '190', type: 'police' },
  { name: 'Hospital Universitário', number: '(38) 3224-8373', type: 'health' },
  { name: 'Santa Casa', number: '(38) 3229-2500', type: 'health' },
];

export const EmergencyButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleEmergencyCall = (contact: EmergencyContact) => {
    const phoneNumber = contact.number.replace(/\D/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    toast.success(`Ligando para ${contact.name}...`);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 transform hover:scale-110 animate-pulse"
        aria-label="Emergência"
      >
        <Phone className="h-6 w-6" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Emergência
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleEmergencyCall(contact)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    contact.type === 'emergency'
                      ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 border-2 border-red-500'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {contact.number}
                      </p>
                    </div>
                    <Phone className="h-5 w-5 text-blue-500" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Atenção:</strong> Use apenas em casos de emergência real. 
                Para consultas médicas, utilize os estabelecimentos de saúde próximos.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};