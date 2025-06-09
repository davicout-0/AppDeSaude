import React from 'react';
import { Heart, MapPin, Clock, Shield, BarChart3, Users, Bell, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Heart,
      title: 'Monitoramento de Sinais Vitais',
      description: 'Registre e acompanhe pressão arterial, frequência cardíaca, saturação de oxigênio e outros indicadores importantes.',
      benefits: [
        'Histórico completo de medições',
        'Gráficos e tendências',
        'Alertas para valores anormais',
        'Comparação com médias locais'
      ]
    },
    {
      icon: MapPin,
      title: 'Localizador de Estabelecimentos',
      description: 'Encontre hospitais, UBS, clínicas e laboratórios em Montes Claros com informações atualizadas.',
      benefits: [
        'Mais de 150 estabelecimentos cadastrados',
        'Rotas e navegação integrada',
        'Informações de contato e horários',
        'Filtros por especialidade'
      ]
    },
    {
      icon: Clock,
      title: 'Lembretes de Medicação',
      description: 'Nunca mais esqueça de tomar seus medicamentos com nosso sistema inteligente de lembretes.',
      benefits: [
        'Múltiplos horários por medicamento',
        'Notificações personalizáveis',
        'Controle de aderência',
        'Histórico de doses tomadas'
      ]
    },
    {
      icon: BarChart3,
      title: 'Relatórios e Análises',
      description: 'Visualize seus dados de saúde através de gráficos intuitivos e relatórios detalhados.',
      benefits: [
        'Gráficos interativos',
        'Tendências de longo prazo',
        'Relatórios para médicos',
        'Exportação de dados'
      ]
    },
    {
      icon: Shield,
      title: 'Segurança e Privacidade',
      description: 'Seus dados médicos protegidos com criptografia de ponta e total conformidade com a LGPD.',
      benefits: [
        'Criptografia end-to-end',
        'Conformidade com LGPD',
        'Backup automático',
        'Controle total dos seus dados'
      ]
    },
    {
      icon: Users,
      title: 'Gamificação e Motivação',
      description: 'Sistema de pontos, conquistas e ranking para motivar o cuidado contínuo com a saúde.',
      benefits: [
        'Pontos por atividades',
        'Conquistas desbloqueáveis',
        'Ranking comunitário',
        'Metas personalizadas'
      ]
    }
  ];

  const mobileFeatures = [
    {
      icon: Smartphone,
      title: 'App Mobile Responsivo',
      description: 'Interface otimizada para todos os dispositivos'
    },
    {
      icon: Bell,
      title: 'Notificações Push',
      description: 'Lembretes importantes direto no seu celular'
    },
    {
      icon: Heart,
      title: 'Modo Offline',
      description: 'Registre dados mesmo sem internet'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Funcionalidades Completas
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubra todas as ferramentas que o APP DE SAÚDE DIGITAL oferece 
              para cuidar da sua saúde de forma inteligente e eficiente.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Principais Funcionalidades
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tudo que você precisa para monitorar e cuidar da sua saúde
            </p>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <feature.icon className="h-12 w-12 text-blue-500 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-lg ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <feature.icon className="h-32 w-32 text-blue-500 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Otimizado para Mobile
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Acesse suas informações de saúde a qualquer hora, em qualquer lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mobileFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre-se agora e tenha acesso a todas essas funcionalidades gratuitamente
          </p>
          <a
            href="/register"
            className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-block"
          >
            Criar Conta Gratuita
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;