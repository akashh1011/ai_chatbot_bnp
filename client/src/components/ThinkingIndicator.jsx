import { Bot } from "lucide-react";

const ThinkingIndicator = () => (
  <div className="flex justify-start gap-4">
    <div className="flex items-center justify-center flex-shrink-0 bg-gray-100 border rounded-full w-9 h-9 animate-pulse">
      <Bot size={18} className="text-gray-400" />
    </div>
    <div className="px-5 py-3.5 rounded-2xl bg-gray-50 text-gray-400 text-sm italic">
      AI is thinking...
    </div>
  </div>
);


export default ThinkingIndicator;