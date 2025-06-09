import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, AlertTriangle, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

interface EmergencyResponse {
  text: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

export const EmergencyChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente de emergência do APP DE SAÚDE DIGITAL. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date(),
      priority: 'low'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emergencyKeywords = {
    critical: ['infarto', 'derrame', 'avc', 'parada cardíaca', 'não respira', 'inconsciente', 'sangramento grave'],
    high: ['dor no peito', 'falta de ar', 'tontura', 'vômito', 'febre alta', 'dor intensa'],
    medium: ['dor de cabeça', 'náusea', 'mal estar', 'cansaço', 'dor'],
    low: ['consulta', 'medicamento', 'dúvida', 'informação']
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const classifyEmergency = (text: string): 'low' | 'medium' | 'high' | 'critical' => {
    const lowerText = text.toLowerCase();
    
    for (const keyword of emergencyKeywords.critical) {
      if (lowerText.includes(keyword)) return 'critical';
    }
    for (const keyword of emergencyKeywords.high) {
      if (lowerText.includes(keyword)) return 'high';
    }
    for (const keyword of emergencyKeywords.medium) {
      if (lowerText.includes(keyword)) return 'medium';
    }
    return 'low';
  };

  const generateResponse = (userMessage: string, priority: 'low' | 'medium' | 'high' | 'critical'): EmergencyResponse => {
    const lowerMessage = userMessage.toLowerCase();

    if (priority === 'critical') {
      return {
        text: '🚨 EMERGÊNCIA CRÍTICA DETECTADA! Ligue IMEDIATAMENTE para o SAMU (192) ou vá ao hospital mais próximo. Não perca tempo!',
        priority: 'critical',
        actions: [
          {
            label: 'Ligar SAMU (192)',
            action: () => window.open('tel:192', '_self')
          },
          {
            label: 'Ver Hospitais Próximos',
            action: () => toast.success('Redirecionando para hospitais próximos...')
          }
        ]
      };
    }

    if (priority === 'high') {
      return {
        text: '⚠️ Situação que requer atenção médica urgente. Recomendo procurar atendimento médico o mais rápido possível. Posso ajudá-lo a encontrar o local mais próximo.',
        priority: 'high',
        actions: [
          {
            label: 'Encontrar UPA/Hospital',
            action: () => toast.success('Buscando estabelecimentos próximos...')
          },
          {
            label: 'Ligar para Hospital',
            action: () => window.open('tel:38322483730', '_self')
          }
        ]
      };
    }

    if (priority === 'medium') {
      if (lowerMessage.includes('dor de cabeça')) {
        return {
          text: 'Dor de cabeça pode ter várias causas. Se for intensa ou persistente, procure atendimento médico. Enquanto isso, descanse em local escuro e silencioso.',
          priority: 'medium'
        };
      }
      return {
        text: 'Entendo sua preocupação. Para sintomas persistentes, recomendo agendar uma consulta médica. Posso ajudá-lo a encontrar estabelecimentos de saúde próximos.',
        priority: 'medium'
      };
    }

    // Low priority responses
    if (lowerMessage.includes('medicamento')) {
      return {
        text: 'Para dúvidas sobre medicamentos, consulte sempre um médico ou farmacêutico. Posso ajudá-lo a encontrar farmácias próximas.',
        priority: 'low'
      };
    }

    if (lowerMessage.includes('consulta')) {
      return {
        text: 'Posso ajudá-lo a encontrar estabelecimentos de saúde para agendar consultas. Que tipo de especialidade você procura?',
        priority: 'low'
      };
    }

    return {
      text: 'Obrigado por entrar em contato. Como posso ajudá-lo com questões de saúde? Se for uma emergência, digite "emergência" para atendimento prioritário.',
      priority: 'low'
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const priority = classifyEmergency(inputText);
      const response = generateResponse(inputText, priority);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        priority: response.priority
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Show priority notification
      if (priority === 'critical') {
        toast.error('EMERGÊNCIA CRÍTICA - Procure atendimento imediato!');
      } else if (priority === 'high') {
        toast.error('Situação urgente - Procure atendimento médico!');
      }
    }, 1000 + Math.random() * 1000);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'bg-gray-50 dark:bg-gray-700';
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-40 transition-all duration-200 transform hover:scale-110"
        aria-label="Chat de Emergência"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md h-96 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-green-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-semibold">Chat de Emergência</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : `${getPriorityColor(message.priority)} text-gray-800 dark:text-gray-200`
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};