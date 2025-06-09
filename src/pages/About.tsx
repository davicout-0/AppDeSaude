import React from 'react';
import { Heart, Users, Target, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Usuários Ativos', value: '10,000+', icon: Users },
    { label: 'Medições Registradas', value: '500,000+', icon: Heart },
    { label: 'Estabelecimentos Cadastrados', value: '150+', icon: Target },
    { label: 'Anos de Experiência', value: '5+', icon: Award },
  ];

  const team = [
    {
      name: 'Dr. Carlos Silva',
      role: 'Diretor Médico',
      description: 'Especialista em cardiologia com mais de 15 anos de experiência.',
    },
    {
      name: 'Ana Santos',
      role: 'Desenvolvedora Principal',
      description: 'Especialista em tecnologias de saúde digital e segurança de dados.',
    },
    {
      name: 'Maria Oliveira',
      role: 'Coordenadora de UX',
      description: 'Focada em criar experiências intuitivas para usuários de todas as idades.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sobre o APP DE SAÚDE DIGITAL
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desenvolvido especialmente para a comunidade de Montes Claros-MG, 
              nosso aplicativo revoluciona o cuidado com a saúde através da tecnologia.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Democratizar o acesso à informação de saúde e facilitar o cuidado preventivo 
                através de uma plataforma digital intuitiva e segura.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Acreditamos que todos merecem ter controle sobre sua saúde, 
                com acesso fácil a informações médicas, lembretes de medicação 
                e localização de serviços de saúde próximos.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
              <Heart className="h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cuidado Centrado no Paciente
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Colocamos você no centro do seu cuidado de saúde, 
                fornecendo ferramentas para monitorar, acompanhar e melhorar 
                seu bem-estar de forma contínua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Números
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              O impacto que estamos causando na comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center"
              >
                <stat.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Profissionais dedicados ao seu bem-estar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-500 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Transparência
                </h3>
                <p className="text-blue-100">
                  Informações claras e acessíveis sobre sua saúde
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Segurança
                </h3>
                <p className="text-blue-100">
                  Proteção máxima dos seus dados pessoais e médicos
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Inovação
                </h3>
                <p className="text-blue-100">
                  Tecnologia de ponta para melhorar seu cuidado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;