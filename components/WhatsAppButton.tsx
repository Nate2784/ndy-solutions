// components/WhatsAppButton.tsx
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/251999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-200 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}