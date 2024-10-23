import React, { useState, useEffect } from 'react';
import RuleEditor from './components/RuleEditor';
import RuleList from './components/RuleList';
import UserEligibilityChecker from './components/UserEligibilityChecker';
import { Rule } from './types/RuleTypes';
import { Cpu } from 'lucide-react';

function App() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    const savedRules = localStorage.getItem('rules');
    if (savedRules) {
      setRules(JSON.parse(savedRules));
    }
  }, []);

  const saveRule = (newRule: Rule) => {
    const updatedRules = [...rules, newRule];
    setRules(updatedRules);
    localStorage.setItem('rules', JSON.stringify(updatedRules));
  };

  const deleteRule = (id: string) => {
    const updatedRules = rules.filter((rule) => rule.id !== id);
    setRules(updatedRules);
    localStorage.setItem('rules', JSON.stringify(updatedRules));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Cpu className="w-16 h-16 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
            Rule Engine with AST
          </h1>
          <p className="mt-3 text-xl text-gray-600">Create, manage, and evaluate eligibility rules with ease</p>
        </header>
        <main className="space-y-8">
          <RuleEditor onSave={saveRule} />
          <RuleList rules={rules} onDelete={deleteRule} />
          <UserEligibilityChecker rules={rules} />
        </main>
      </div>
    </div>
  );
}

export default App;