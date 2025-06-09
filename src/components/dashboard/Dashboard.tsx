import React from 'react';
import { CurrentMeasurement } from './CurrentMeasurement';
import { MedicationReminders } from './MedicationReminders';
import { WeatherWidget } from './WeatherWidget';
import { AppointmentsWidget } from './AppointmentsWidget';
import { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  return (
    <div className="p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard de Saúde</h2>
        
        <CurrentMeasurement />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MedicationReminders />
          <div className="space-y-6">
            <WeatherWidget />
            <AppointmentsWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;