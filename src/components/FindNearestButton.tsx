import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface NearestPlace {
  name: string;
  address: string;
  phone: string;
  distance: number;
  type: string;
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const nearestPlaces: NearestPlace[] = [
  {
    name: 'UPA Norte',
    address: 'Av. Donato Quintino, 90 - Planalto',
    phone: '(38) 3690-2200',
    distance: 0.8,
    type: 'Pronto Atendimento',
    isOpen: true,
    coordinates: { lat: -16.7123, lng: -43.8567 }
  },
  {
    name: 'Hospital Universitário',
    address: 'Av. Cula Mangabeira, 562 - Santo Expedito',
    phone: '(38) 3224-8373',
    distance: 1.2,
    type: 'Hospital',
    isOpen: true,
    coordinates: { lat: -16.7298, lng: -43.8780 }
  },
  {
    name: 'Santa Casa',
    address: 'Praça Honorato Alves, 22 - Centro',
    phone: '(38) 3229-2500',
    distance: 1.5,
    type: 'Hospital',
    isOpen: true,
    coordinates: { lat: -16.7205, lng: -43.8678 }
  }
];

export const FindNearestButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFindNearest = () => {
    setLoading(true);
    // Simulate geolocation
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
      toast.success('Estabelecimentos próximos encontrados!');
    }, 1500);
  };

  const openInMaps = (place: NearestPlace) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`;
    window.open(url, '_blank');
    toast.success(`Abrindo rota para ${place.name}`);
  };

  const callPlace = (place: NearestPlace) => {
    const phoneNumber = place.phone.replace(/\D/g, '');
    window.open(`tel:${phoneNumber}`, '_self');
    toast.success(`Ligando para ${place.name}...`);
  };

  return (
    <>
      <button
        onClick={handleFindNearest}
        disabled={loading}
        className="fixed bottom-6 left-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
        aria-label="Encontrar mais próximo"
      >
        {loading ? (
          <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <MapPin className="h-6 w-6" />
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Estabelecimentos Próximos
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {nearestPlaces.map((place, index) => (
                <div
                  key={index}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {place.name}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {place.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        place.isOpen 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {place.isOpen ? 'Aberto' : 'Fechado'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {place.distance}km
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {place.address}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openInMaps(place)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Navigation className="h-4 w-4" />
                      Ver Rota
                    </button>
                    <button
                      onClick={() => callPlace(place)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Dica:</strong> Os estabelecimentos são ordenados por distância. 
                Verifique os horários de funcionamento antes de se deslocar.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};