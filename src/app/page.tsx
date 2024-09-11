'use client'
import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState('');
  const [essay, setEssay] = useState('');

  const { complete: generateIdeas } = useCompletion({
    api: '/api/generate-ideas',
  });

  const { complete: generateEssay } = useCompletion({
    api: '/api/generate-essay',
  });

  const handleGenerateIdeas = async () => {
    const result = await generateIdeas(topic);
    setIdeas(result.split('\n').filter(idea => idea.trim() !== ''));
  };

  const handleGenerateEssay = async () => {
    const result = await generateEssay(selectedIdea);
    setEssay(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Topic to Essay Generator</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        className="border p-2 mb-4 w-full text-black"
      />
      <button
        onClick={handleGenerateIdeas}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Ideas
      </button>
      {ideas.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Select an idea:</h2>
          <ul>
            {ideas.map((idea, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => setSelectedIdea(idea)}
                  className={`p-2 rounded ${
                    selectedIdea === idea ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {idea}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedIdea && (
        <div className="mt-4">
          <button
            onClick={handleGenerateEssay}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Generate Essay
          </button>
        </div>
      )}
      {essay && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Essay:</h2>
          <p className="whitespace-pre-wrap">{essay}</p>
        </div>
      )}
    </div>
  );
}
