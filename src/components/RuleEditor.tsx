import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { createRule } from '../utils/ruleParser';
import { Rule } from '../types/RuleTypes';

interface RuleEditorProps {
  onSave: (rule: Rule) => void;
}

const RuleEditor: React.FC<RuleEditorProps> = ({ onSave }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');

  const handleSave = () => {
    try {
      const ast = createRule(ruleString);
      const newRule: Rule = {
        id: Date.now().toString(),
        name: ruleName,
        ast,
      };
      onSave(newRule);
      setRuleName('');
      setRuleString('');
    } catch (error) {
      alert('Invalid rule string. Please check your syntax.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Create New Rule</h2>
      <div className="mb-6">
        <label htmlFor="ruleName" className="block text-sm font-medium text-gray-700 mb-2">
          Rule Name
        </label>
        <input
          type="text"
          id="ruleName"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          placeholder="Enter rule name"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="ruleString" className="block text-sm font-medium text-gray-700 mb-2">
          Rule String
        </label>
        <textarea
          id="ruleString"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          rows={4}
          placeholder="Enter rule string (e.g., age > 30 AND department = 'Sales')"
        />
      </div>
      <button
        onClick={handleSave}
        className="flex items-center justify-center w-full px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Rule
      </button>
    </div>
  );
};

export default RuleEditor;