import React, { useState } from 'react';
import { Rule, UserData, Node } from '../types/RuleTypes';
import { evaluateRule, combineRules } from '../utils/ruleParser';
import { CheckCircle, XCircle, User } from 'lucide-react';

interface UserEligibilityCheckerProps {
  rules: Rule[];
}

const UserEligibilityChecker: React.FC<UserEligibilityCheckerProps> = ({ rules }) => {
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    department: '',
    salary: 0,
    experience: 0,
  });
  const [result, setResult] = useState<boolean | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: name === 'department' ? value : Number(value),
    }));
  };

  const checkEligibility = () => {
    if (rules.length === 0) {
      alert('No rules available. Please create at least one rule.');
      return;
    }

    let debugOutput = 'Evaluation process:\n\n';

    const evaluateRuleWithDebug = (node: Node, data: Record<string, any>): boolean => {
      if (node.type === 'operand') {
        const result = evaluateRule(node, data);
        debugOutput += `Evaluating: ${node.attribute} ${node.operator} ${node.value} = ${result}\n`;
        return result;
      } else if (node.type === 'operator') {
        const leftResult = evaluateRuleWithDebug(node.left!, data);
        const rightResult = evaluateRuleWithDebug(node.right!, data);
        const result = node.operator === 'AND' ? leftResult && rightResult : leftResult || rightResult;
        debugOutput += `Combining: ${leftResult} ${node.operator} ${rightResult} = ${result}\n`;
        return result;
      }
      throw new Error('Invalid node type');
    };

    const combinedRule = combineRules(rules.map((rule) => rule.ast));
    debugOutput += 'Combined rule structure:\n' + JSON.stringify(combinedRule, null, 2) + '\n\n';

    const isEligible = evaluateRuleWithDebug(combinedRule, userData);
    setResult(isEligible);
    setDebugInfo(debugOutput);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center">
        <User className="w-8 h-8 mr-2 text-indigo-600" />
        Check User Eligibility
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={userData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={userData.salary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Experience (years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={userData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
      </div>
      <button
        onClick={checkEligibility}
        className="w-full px-6 py-3 text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-md hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
      >
        Check Eligibility
      </button>
      {result !== null && (
        <div className={`mt-6 p-6 rounded-lg ${result ? 'bg-green-100' : 'bg-red-100'} transition-all duration-300`}>
          {result ? (
            <div className="flex items-center text-green-800">
              <CheckCircle className="w-8 h-8 mr-3" />
              <span className="text-lg font-semibold">User is eligible based on the current rules.</span>
            </div>
          ) : (
            <div className="flex items-center text-red-800">
              <XCircle className="w-8 h-8 mr-3" />
              <span className="text-lg font-semibold">User is not eligible based on the current rules.</span>
            </div>
          )}
        </div>
      )}
      {debugInfo && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
          <pre className="whitespace-pre-wrap text-sm">{debugInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default UserEligibilityChecker;