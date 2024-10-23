import { Node, NodeType } from '../types/RuleTypes';

const operatorPrecedence: { [key: string]: number } = {
  'AND': 2,
  'OR': 1,
};

function tokenize(ruleString: string): string[] {
  return ruleString.replace(/([()><=])/g, ' $1 ').split(/\s+/).filter(Boolean);
}

function parseCondition(tokens: string[]): Node {
  const [attribute, operator, ...valueParts] = tokens;
  const value = valueParts.join(' ').replace(/^['"]|['"]$/g, ''); // Remove quotes if present
  return {
    type: 'operand',
    attribute,
    operator,
    value: isNaN(Number(value)) ? value : Number(value),
  };
}

function parseExpression(tokens: string[]): Node {
  const output: Node[] = [];
  const operators: string[] = [];

  while (tokens.length > 0) {
    const token = tokens.shift()!;
    if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators[operators.length - 1] !== '(') {
        const operator = operators.pop()!;
        const right = output.pop()!;
        const left = output.pop()!;
        output.push({ type: 'operator', operator, left, right });
      }
      operators.pop(); // Remove the '('
    } else if (token === 'AND' || token === 'OR') {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        operatorPrecedence[operators[operators.length - 1]] >= operatorPrecedence[token]
      ) {
        const operator = operators.pop()!;
        const right = output.pop()!;
        const left = output.pop()!;
        output.push({ type: 'operator', operator, left, right });
      }
      operators.push(token);
    } else {
      output.push(parseCondition([token, ...tokens.splice(0, 2)]));
    }
  }

  while (operators.length > 0) {
    const operator = operators.pop()!;
    const right = output.pop()!;
    const left = output.pop()!;
    output.push({ type: 'operator', operator, left, right });
  }

  return output[0];
}

export function createRule(ruleString: string): Node {
  const tokens = tokenize(ruleString);
  return parseExpression(tokens);
}

export function combineRules(rules: Node[]): Node {
  if (rules.length === 0) {
    throw new Error('No rules provided');
  }
  if (rules.length === 1) {
    return rules[0];
  }
  return rules.reduce((combined, rule) => ({
    type: 'operator',
    operator: 'AND',
    left: combined,
    right: rule,
  }));
}

export function evaluateRule(node: Node, data: Record<string, any>): boolean {
  if (node.type === 'operand') {
    const { attribute, operator, value } = node;
    const dataValue = data[attribute!];
    
    // Convert both values to the same type for comparison
    const typedValue = typeof dataValue === 'string' ? String(value) : Number(value);
    const typedDataValue = typeof dataValue === 'string' ? String(dataValue) : Number(dataValue);

    switch (operator) {
      case '>': return typedDataValue > typedValue;
      case '<': return typedDataValue < typedValue;
      case '=': return typedDataValue === typedValue;
      case '>=': return typedDataValue >= typedValue;
      case '<=': return typedDataValue <= typedValue;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  } else if (node.type === 'operator') {
    const { operator, left, right } = node;
    switch (operator) {
      case 'AND': return evaluateRule(left!, data) && evaluateRule(right!, data);
      case 'OR': return evaluateRule(left!, data) || evaluateRule(right!, data);
      case '(': return evaluateRule(left!, data); // Handle parentheses by evaluating the inner expression
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  }
  throw new Error('Invalid node type');
}