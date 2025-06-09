import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Phone, MapPin, Camera, Edit, Save, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    address: 'Montes Claros - MG'
  });
  const [phoneVerification, setPhoneVerification] = useState({
    code: '',
    isVerifying: false,
    isVerified: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Imagem muito grande. Máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast.success('Foto carregada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        ...formData,
        photoUrl: profileImage || undefined
      });
      setIsEditing(false);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    }
  };

  const handlePhoneVerification = () => {
    if (!formData.phone) {
      toast.error('Digite um número de telefone');
      return;
    }

    setPhoneVerification({ ...phoneVerification, isVerifying: true });
    
    // Simulate SMS sending
    setTimeout(() => {
      toast.success('Código SMS enviado para ' + formData.phone);
      setPhoneVerification({ ...phoneVerification, isVerifying: false });
    }, 2000);
  };

  const verifyCode = () => {
    if (phoneVerification.code === '123456') { // Mock verification
      setPhoneVerification({ ...phoneVerification, isVerified: true });
      toast.success('Telefone verificado com sucesso!');
    } else {
      toast.error('Código inválido. Tente 123456 para demonstração.');
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header with background */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                {profileImage || user?.photoUrl ? (
                  <img
                    src={profileImage || user?.photoUrl}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name || 'Nome do Usuário'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Membro desde {new Date(user?.createdAt || Date.now()).getFullYear()}
              </p>
            </div>
            
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4 mr-2" />
                Nome Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{formData.name || 'Não informado'}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </label>
              <p className="text-gray-900 dark:text-white">{formData.email}</p>
              <p className="text-xs text-gray-500">Email não pode ser alterado</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                Telefone
                {phoneVerification.isVerified && (
                  <Check className="h-4 w-4 ml-2 text-green-500" />
                )}
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(38) 99999-9999"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  
                  {formData.phone && !phoneVerification.isVerified && (
                    <div className="space-y-2">
                      <button
                        onClick={handlePhoneVerification}
                        disabled={phoneVerification.isVerifying}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        {phoneVerification.isVerifying ? 'Enviando...' : 'Verificar por SMS'}
                      </button>
                      
                      {phoneVerification.isVerifying === false && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={phoneVerification.code}
                            onChange={(e) => setPhoneVerification({ ...phoneVerification, code: e.target.value })}
                            placeholder="Código SMS (use 123456)"
                            className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                          />
                          <button
                            onClick={verifyCode}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Verificar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {formData.phone || 'Não informado'}
                  {phoneVerification.isVerified && (
                    <span className="ml-2 text-green-500 text-sm">✓ Verificado</span>
                  )}
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                Data de Nascimento
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {formData.birthDate 
                    ? new Date(formData.birthDate).toLocaleDateString('pt-BR')
                    : 'Não informado'
                  }
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Endereço
              </label>
              <p className="text-gray-900 dark:text-white">{formData.address}</p>
            </div>
          </div>

          {/* Health Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Estatísticas de Saúde
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300">Medições</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Este mês</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-300">Consultas</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">3</p>
                <p className="text-sm text-green-600 dark:text-green-400">Agendadas</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-300">Medicamentos</h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Ativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;