import React, { createContext, useContext, useState, useEffect } from 'react';

interface HealthData {
  systolic: number;
  diastolic: number;
  heartRate: number;
  spO2: number;
  timestamp: string;
}

interface Medication {
  id: string;
  name: string;
  schedule: string[];
  taken: boolean[];
}

interface HealthContextType {
  measurements: HealthData[];
  medications: Medication[];
  addMeasurement: (data: HealthData) => void;
  toggleMedication: (medicationId: string, scheduleIndex: number) => void;
  cityAverages: {
    systolic: number;
    diastolic: number;
    heartRate: number;
    spO2: number;
  };
}

const defaultCityAverages = {
  systolic: 122,
  diastolic: 78,
  heartRate: 75,
  spO2: 97,
};

const defaultMedications: Medication[] = [
  {
    id: '1',
    name: 'Losartana 50mg',
    schedule: ['08:00', '20:00'],
    taken: [false, false],
  },
  {
    id: '2',
    name: 'Metformina 850mg',
    schedule: ['14:00'],
    taken: [false],
  },
  {
    id: '3',
    name: 'AAS 100mg',
    schedule: ['20:00'],
    taken: [false],
  },
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [measurements, setMeasurements] = useState<HealthData[]>(() => {
    const saved = localStorage.getItem('healthMeasurements');
    return saved ? JSON.parse(saved) : [];
  });

  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : defaultMedications;
  });

  useEffect(() => {
    localStorage.setItem('healthMeasurements', JSON.stringify(measurements));
  }, [measurements]);

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const addMeasurement = (data: HealthData) => {
    setMeasurements(prev => [...prev, data].slice(-7));
  };

  const toggleMedication = (medicationId: string, scheduleIndex: number) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === medicationId
          ? {
              ...med,
              taken: med.taken.map((t, i) => (i === scheduleIndex ? !t : t)),
            }
          : med
      )
    );
  };

  return (
    <HealthContext.Provider
      value={{
        measurements,
        medications,
        addMeasurement,
        toggleMedication,
        cityAverages: defaultCityAverages,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};