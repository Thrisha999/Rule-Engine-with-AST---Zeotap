export type NodeType = 'operator' | 'operand';

export interface Node {
  type: NodeType;
  left?: Node;
  right?: Node;
  value?: string | number;
  operator?: string;
  attribute?: string;
}

export interface Rule {
  id: string;
  name: string;
  ast: Node;
}

export interface UserData {
  age: number;
  department: string;
  salary: number;
  experience: number;
}