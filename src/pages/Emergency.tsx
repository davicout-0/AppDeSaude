import React from 'react';
import { Phone, AlertTriangle, MapPin, Clock, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Emergency = () => {
  const emergencyServices = [
    {
      name: 'SAMU - Serviço de Atendimento Móvel de Urgência',
      number: '192',
      description: 'Atendimento médico de urgência e emergência',
      available: '24 horas',
      type: 'medical'
    },
    {
      name: 'Bombeiros',
      number: '193',
      description: 'Combate a incêndios, resgates e emergências',
      available: '24 horas',
      type: 'fire'
    },
    {
      name: 'Polícia Militar',
      number: '190',
      description: 'Segurança pública e emergências policiais',
      available: '24 horas',
      type: 'police'
    },
    {
      name: 'Defesa Civil',
      number: '199',
      description: 'Emergências ambientais e desastres naturais',
      available: '24 horas',
      type: 'civil'
    }
  ];

  const hospitalEmergencies = [
    {
      name: 'Hospital Universitário Clemente de Faria',
      number: '(38) 3224-8373',
      address: 'Av. Cula Mangabeira, 562 - Santo Expedito',
      specialties: ['Trauma', 'Cardiologia', 'Neurologia']
    },
    {
      name: 'Santa Casa de Montes Claros',
      number: '(38) 3229-2500',
      address: 'Praça Honorato Alves, 22 - Centro',
      specialties: ['Emergência Geral', 'Pediatria', 'Ortopedia']
    },
    {
      name: 'UPA Norte',
      number: '(38) 3690-2200',
      address: 'Av. Donato Quintino, 90 - Planalto',
      specialties: ['Pronto Atendimento', 'Urgência']
    }
  ];

  const handleCall = (number: string, name: string) => {
    const phoneNumber = number.replace(/\D/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    toast.success(`Ligando para ${name}...`);
  };

  const openMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(`${address}, Montes Claros, MG`);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Emergências
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Acesso rápido aos serviços de emergência em Montes Claros-MG
        </p>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 mb-8">
        <div className="flex items-center">
          <Heart className="h-6 w-6 text-red-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Em caso de emergência médica grave
            </h3>
            <p className="text-red-700 dark:text-red-300 mt-1">
              Ligue imediatamente para o SAMU (192) ou dirija-se ao hospital mais próximo
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Serviços de Emergência
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyServices.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-red-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.available}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCall(service.number, service.name)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {service.number}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Emergencies */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Hospitais com Pronto Socorro
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {hospitalEmergencies.map((hospital, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {hospital.name}
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {hospital.address}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Especialidades:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(hospital.number, hospital.name)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Ligar
                </button>
                <button
                  onClick={() => openMaps(hospital.address)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  Localizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
          Informações Importantes
        </h3>
        <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
          <li>• Mantenha sempre seus documentos e cartão do SUS em mãos</li>
          <li>• Em caso de intoxicação, ligue para o Centro de Informações Toxicológicas: 0800 722 6001</li>
          <li>• Para emergências psiquiátricas, procure o CAPS ou ligue para o CVV: 188</li>
          <li>• Tenha sempre anotados os telefones de emergência e seus medicamentos de uso contínuo</li>
        </ul>
      </div>
    </div>
  );
};

export default Emergency;