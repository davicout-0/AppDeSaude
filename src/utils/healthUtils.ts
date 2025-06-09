export const generateRandomMeasurement = () => {
  return {
    systolic: Math.floor(Math.random() * (140 - 110) + 110),
    diastolic: Math.floor(Math.random() * (90 - 70) + 70),
    heartRate: Math.floor(Math.random() * (85 - 65) + 65),
    spO2: Math.floor(Math.random() * (100 - 95) + 95),
    timestamp: new Date().toISOString(),
  };
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeatherMock = () => {
  // Realistic data for Montes Claros-MG
  return {
    temperature: 28,
    humidity: 65,
    pressure: 1012,
    condition: 'Parcialmente nublado',
  };
};

export const getHealthTip = (weather: ReturnType<typeof getWeatherMock>) => {
  if (weather.temperature > 30) {
    return 'Mantenha-se hidratado hoje! O calor está intenso.';
  }
  if (weather.humidity < 30) {
    return 'Umidade baixa! Use soro fisiológico nas narinas.';
  }
  return 'Dia agradável para uma caminhada leve!';
};