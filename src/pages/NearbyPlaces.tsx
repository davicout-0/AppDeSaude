import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Filter, Star } from 'lucide-react';

interface HealthFacility {
  id: string;
  name: string;
  type: 'hospital' | 'ubs' | 'clinic' | 'laboratory';
  address: string;
  phone: string;
  hours: string;
  specialties: string[];
  isPublic: boolean;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const healthFacilities: HealthFacility[] = [
  {
    id: '1',
    name: 'Hospital Universitário Clemente de Faria',
    type: 'hospital',
    address: 'Av. Cula Mangabeira, 562 - Santo Expedito',
    phone: '(38) 3224-8373',
    hours: '24 horas',
    specialties: ['Emergência', 'Clínica Médica', 'Cirurgia Geral', 'Pediatria'],
    isPublic: true,
    distance: 2.5,
    coordinates: {
      lat: -16.7298,
      lng: -43.8780,
    },
  },
  {
    id: '2',
    name: 'Santa Casa de Montes Claros',
    type: 'hospital',
    address: 'Praça Honorato Alves, 22 - Centro',
    phone: '(38) 3229-2500',
    hours: '24 horas',
    specialties: ['Emergência', 'Cardiologia', 'Oncologia', 'Ortopedia'],
    isPublic: false,
    distance: 1.8,
    coordinates: {
      lat: -16.7205,
      lng: -43.8678,
    },
  },
  {
    id: '3',
    name: 'UBS Delfino Magalhães',
    type: 'ubs',
    address: 'R. Mangabeiras, 683 - Delfino Magalhães',
    phone: '(38) 3229-3350',
    hours: '07:00 às 17:00',
    specialties: ['Clínica Geral', 'Pediatria', 'Ginecologia', 'Enfermagem'],
    isPublic: true,
    distance: 3.2,
    coordinates: {
      lat: -16.7154,
      lng: -43.8589,
    },
  },
  {
    id: '4',
    name: 'Centro de Especialidades Médicas',
    type: 'clinic',
    address: 'Av. José Corrêa Machado, 1000 - Ibituruna',
    phone: '(38) 3690-1234',
    hours: '08:00 às 18:00',
    specialties: ['Cardiologia', 'Neurologia', 'Endocrinologia', 'Dermatologia'],
    isPublic: false,
    distance: 1.5,
    coordinates: {
      lat: -16.7245,
      lng: -43.8701,
    },
  },
  {
    id: '5',
    name: 'Laboratório São Lucas',
    type: 'laboratory',
    address: 'R. Tupinambás, 13 - Melo',
    phone: '(38) 3212-2434',
    hours: '06:00 às 18:00',
    specialties: ['Análises Clínicas', 'Radiologia', 'Ultrassonografia'],
    isPublic: false,
    distance: 0.9,
    coordinates: {
      lat: -16.7198,
      lng: -43.8645,
    },
  },
];

export default function NearbyPlaces() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const allSpecialties = Array.from(
    new Set(healthFacilities.flatMap(facility => facility.specialties))
  ).sort();

  const filteredFacilities = healthFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    const matchesSpecialty = selectedSpecialty === 'all' || facility.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesType && matchesSpecialty;
  });

  const handleOpenMaps = (facility: HealthFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Estabelecimentos de Saúde</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou endereço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os tipos</option>
              <option value="hospital">Hospitais</option>
              <option value="ubs">UBS</option>
              <option value="clinic">Clínicas</option>
              <option value="laboratory">Laboratórios</option>
            </select>
            
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as especialidades</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFacilities.map(facility => (
          <div
            key={facility.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{facility.address}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Phone size={16} className="mr-2" />
                  <span className="text-sm">{facility.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">{facility.hours}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  facility.isPublic
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}
              >
                {facility.isPublic ? 'Público' : 'Privado'}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Especialidades:
              </h4>
              <div className="flex flex-wrap gap-2">
                {facility.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {facility.distance.toFixed(1)}km de distância
              </span>
              <button
                onClick={() => handleOpenMaps(facility)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Navigation size={16} />
                Ver Rota
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}