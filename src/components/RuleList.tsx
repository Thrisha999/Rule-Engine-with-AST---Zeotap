import React from 'react';
import { Rule } from '../types/RuleTypes';
import { Trash2 } from 'lucide-react';

interface RuleListProps {
  rules: Rule[];
  onDelete: (id: string) => void;
}

const RuleList: React.FC<RuleListProps> = ({ rules, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Saved Rules</h2>
      {rules.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No rules saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {rules.map((rule) => (
            <li key={rule.id} className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <span className="font-medium text-indigo-800">{rule.name}</span>
              <button
                onClick={() => onDelete(rule.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleList;