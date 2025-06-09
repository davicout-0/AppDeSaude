import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: 'hospital' | 'clinic' | 'equipment' | 'staff' | 'facility';
}

interface ImageGalleryProps {
  images: Image[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `${currentImage.title}.jpg`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Image */}
        <div className="max-w-4xl max-h-full flex flex-col items-center">
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {/* Image Info */}
          <div className="mt-4 text-center text-white">
            <h3 className="text-xl font-semibold mb-2">{currentImage.title}</h3>
            {currentImage.description && (
              <p className="text-gray-300 mb-4">{currentImage.description}</p>
            )}
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-gray-400">
                {currentIndex + 1} de {images.length}
              </span>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                    index === currentIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sample images for the health app
export const healthImages: Image[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Hospital Moderno',
    description: 'Fachada de hospital com tecnologia avançada',
    category: 'hospital'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Equipe Médica',
    description: 'Profissionais de saúde dedicados ao seu cuidado',
    category: 'staff'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Consulta Médica',
    description: 'Atendimento personalizado e humanizado',
    category: 'clinic'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Equipamentos Médicos',
    description: 'Tecnologia de ponta para diagnósticos precisos',
    category: 'equipment'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Ambiente Hospitalar',
    description: 'Instalações modernas e confortáveis',
    category: 'facility'
  }
];