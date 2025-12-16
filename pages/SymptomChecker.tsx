import React, { useState } from 'react';
import { getSymptomAnalysis } from '../services/geminiService';
import { Send, Bot, AlertTriangle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Assuming standard markdown parsing is desired, but strict rules say use built-in. I will use simple rendering.

const SymptomChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setAnalysis(null);
    const result = await getSymptomAnalysis(input);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-brand-600 p-6 flex items-center">
            <Bot className="h-8 w-8 text-white mr-3" />
            <div>
                <h2 className="text-xl font-bold text-white">AI Health Assistant</h2>
                <p className="text-brand-100 text-sm">Powered by Gemini 2.5 Flash</p>
            </div>
        </div>

        <div className="p-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Disclaimer: This AI tool is for informational purposes only and does not provide medical diagnosis. In case of emergency, call local emergency services immediately.
                        </p>
                    </div>
                </div>
            </div>

            {!analysis && (
                <div className="mb-8 text-center text-slate-500">
                    <p className="mb-2">Describe your symptoms below.</p>
                    <p className="text-sm">Example: "I have a throbbing headache on the right side and sensitivity to light."</p>
                </div>
            )}

            <div className="space-y-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your symptoms here..."
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 min-h-[120px] p-4 text-slate-800 border"
                />
                
                <button
                    onClick={handleAnalyze}
                    disabled={loading || !input.trim()}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Analyze Symptoms
                        </>
                    )}
                </button>
            </div>

            {analysis && (
                <div className="mt-8 border-t border-slate-200 pt-8 animate-fade-in">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Analysis Result</h3>
                    <div className="bg-slate-50 rounded-lg p-6 text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {analysis}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;