import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, MapPin, Clock, Star, Menu, X, Moon, Sun, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ImageGallery, healthImages } from '../components/ImageGallery';

const Landing = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

  const features = [
    {
      icon: Heart,
      title: 'Monitoramento de Saúde',
      description: 'Acompanhe seus sinais vitais e histórico médico em tempo real',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: MapPin,
      title: 'Locais de Saúde',
      description: 'Encontre hospitais, UBS e clínicas próximas a você',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Clock,
      title: 'Lembretes de Medicação',
      description: 'Nunca esqueça de tomar seus medicamentos',
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Seus dados médicos protegidos com criptografia',
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Paciente',
      content: 'O app me ajudou muito a controlar minha pressão arterial. Recomendo!',
      rating: 5,
      image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'João Santos',
      role: 'Diabético',
      content: 'Excelente para acompanhar meus níveis de glicose e medicamentos.',
      rating: 5,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Ana Oliveira',
      role: 'Idosa',
      content: 'Muito fácil de usar. Meus filhos ficam mais tranquilos agora.',
      rating: 5,
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg fixed w-full z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                APP DE SAÚDE DIGITAL
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors">
                Funcionalidades
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors">
                Sobre
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors">
                Contato
              </Link>
              <Link to="/faq" className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors">
                FAQ
              </Link>
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors flex items-center gap-1"
              >
                <ImageIcon size={16} />
                Galeria
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
              </button>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Cadastrar
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-colors">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/features"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Funcionalidades
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Sobre
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Contato
                </Link>
                <Link
                  to="/faq"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  FAQ
                </Link>
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Galeria
                </button>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-blue-500 text-white rounded-md text-center transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Sua Saúde em
                <span className="text-blue-500"> Suas Mãos</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Monitore sua saúde de forma inteligente com o APP DE SAÚDE DIGITAL. 
                Acompanhe sinais vitais, encontre estabelecimentos de saúde em Montes Claros 
                e mantenha seu histórico médico sempre atualizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 text-center"
                >
                  Começar Agora
                </Link>
                <Link
                  to="/features"
                  className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all text-center"
                >
                  Ver Funcionalidades
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profissionais de saúde"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">10,000+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Usuários ativos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tudo que você precisa para cuidar da sua saúde
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Depoimentos reais de quem já usa o app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para cuidar melhor da sua saúde?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de usuários que já confiam no APP DE SAÚDE DIGITAL
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-block"
          >
            Cadastre-se Gratuitamente
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold">APP DE SAÚDE DIGITAL</span>
              </div>
              <p className="text-gray-400">
                Cuidando da sua saúde com tecnologia e carinho.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Funcionalidades</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Email: suporte@saudedigital.com</span></li>
                <li><span className="text-gray-400">Telefone: (38) 3229-0000</span></li>
                <li><span className="text-gray-400">WhatsApp: (38) 99999-0000</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Localização</h3>
              <p className="text-gray-400">
                Montes Claros - MG<br />
                Brasil
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 APP DE SAÚDE DIGITAL. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Gallery */}
      <ImageGallery
        images={healthImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
};

export default Landing;