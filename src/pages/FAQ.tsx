import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData = [
    {
      category: 'Geral',
      questions: [
        {
          question: 'O que é o APP DE SAÚDE DIGITAL?',
          answer: 'É um aplicativo desenvolvido para ajudar você a monitorar sua saúde, encontrar estabelecimentos médicos em Montes Claros-MG e gerenciar seus medicamentos de forma inteligente e segura.'
        },
        {
          question: 'O aplicativo é gratuito?',
          answer: 'Sim! O APP DE SAÚDE DIGITAL é completamente gratuito para todos os usuários. Nosso objetivo é democratizar o acesso à informação de saúde.'
        },
        {
          question: 'Preciso ser de Montes Claros para usar?',
          answer: 'Embora o app seja otimizado para Montes Claros-MG, você pode usar as funcionalidades de monitoramento de saúde em qualquer lugar. A busca por estabelecimentos é específica para a região.'
        }
      ]
    },
    {
      category: 'Conta e Segurança',
      questions: [
        {
          question: 'Como criar uma conta?',
          answer: 'Clique em "Cadastrar" na página inicial, preencha seus dados básicos (nome, email e senha) e confirme seu email. É rápido e simples!'
        },
        {
          question: 'Meus dados estão seguros?',
          answer: 'Absolutamente! Utilizamos criptografia de ponta, seguimos as normas da LGPD e seus dados médicos são armazenados com a máxima segurança. Você tem controle total sobre suas informações.'
        },
        {
          question: 'Posso excluir minha conta?',
          answer: 'Sim, você pode excluir sua conta a qualquer momento através das configurações. Todos os seus dados serão permanentemente removidos de nossos servidores.'
        },
        {
          question: 'Esqueci minha senha, o que fazer?',
          answer: 'Na tela de login, clique em "Esqueceu a senha?" e digite seu email. Enviaremos instruções para redefinir sua senha.'
        }
      ]
    },
    {
      category: 'Funcionalidades',
      questions: [
        {
          question: 'Como registrar meus sinais vitais?',
          answer: 'No dashboard, clique em "Nova Medição" e insira seus dados (pressão arterial, frequência cardíaca, etc.). O sistema salvará automaticamente e criará gráficos para acompanhamento.'
        },
        {
          question: 'Como configurar lembretes de medicação?',
          answer: 'Acesse a seção "Medicamentos" no dashboard, adicione seus remédios com horários específicos. O app enviará notificações nos horários programados.'
        },
        {
          question: 'Como encontrar hospitais próximos?',
          answer: 'Use a função "Locais Próximos" no menu. O app mostrará estabelecimentos de saúde na sua região com informações de contato, horários e rotas.'
        },
        {
          question: 'Posso exportar meus dados?',
          answer: 'Sim! Você pode gerar relatórios em PDF com seu histórico de saúde para levar ao médico ou para backup pessoal.'
        }
      ]
    },
    {
      category: 'Suporte Técnico',
      questions: [
        {
          question: 'O app funciona offline?',
          answer: 'Algumas funcionalidades funcionam offline, como registro de medicamentos tomados. Para sincronização completa e busca de estabelecimentos, é necessária conexão com internet.'
        },
        {
          question: 'Em quais dispositivos posso usar?',
          answer: 'O app é responsivo e funciona em smartphones, tablets e computadores através do navegador web. Compatível com Android, iOS, Windows, Mac e Linux.'
        },
        {
          question: 'Estou com problemas técnicos, o que fazer?',
          answer: 'Entre em contato conosco através da página "Contato" ou envie um email para suporte@saudedigital.com. Nossa equipe responde em até 24 horas.'
        },
        {
          question: 'Como atualizar o aplicativo?',
          answer: 'Por ser um app web, as atualizações são automáticas. Sempre que acessar, você terá a versão mais recente com todas as melhorias e correções.'
        }
      ]
    },
    {
      category: 'Privacidade',
      questions: [
        {
          question: 'Quem pode ver meus dados médicos?',
          answer: 'Apenas você tem acesso aos seus dados médicos. Não compartilhamos informações pessoais com terceiros sem seu consentimento explícito.'
        },
        {
          question: 'Vocês vendem meus dados?',
          answer: 'Jamais! Não vendemos, alugamos ou compartilhamos dados pessoais. Sua privacidade é nossa prioridade máxima.'
        },
        {
          question: 'Como vocês usam meus dados?',
          answer: 'Usamos seus dados apenas para fornecer os serviços do app: lembretes, gráficos, relatórios e melhorias na experiência. Tudo conforme nossa Política de Privacidade.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Encontre respostas para as dúvidas mais comuns sobre o APP DE SAÚDE DIGITAL
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar pergunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Nenhuma pergunta encontrada para "{searchTerm}"
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Tente buscar com outras palavras ou entre em contato conosco
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div
                          key={itemIndex}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <span className="font-medium text-gray-900 dark:text-white">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-blue-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-blue-500" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Entre em Contato
            </a>
            <a
              href="mailto:suporte@saudedigital.com"
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Enviar Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;