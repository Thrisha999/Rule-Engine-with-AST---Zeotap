# Rule Engine with AST

A powerful and flexible rule engine built with React and TypeScript that uses Abstract Syntax Trees (AST) for rule evaluation. This application allows you to create, manage, and evaluate complex business rules with a beautiful, user-friendly interface.

![Rule Engine Demo](https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2000)

## Features

- 🎯 **Visual Rule Creation**: Intuitive interface for creating complex business rules
- 🌳 **AST-Based Evaluation**: Robust rule parsing and evaluation using Abstract Syntax Trees
- 💾 **Persistent Storage**: Rules are automatically saved to localStorage
- 🔍 **Real-Time Validation**: Instant feedback on rule syntax and evaluation
- 📊 **Debug Information**: Detailed evaluation process visualization
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rule-engine-ast.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Creating Rules

1. Navigate to the "Create New Rule" section
2. Enter a descriptive name for your rule
3. Write your rule using the following syntax:
   ```
   age > 25 AND department = 'Engineering'
   ```

### Supported Operators

- Comparison: `>`, `<`, `=`, `>=`, `<=`
- Logical: `AND`, `OR`
- Grouping: `(`, `)`

### Example Rules

```
age >= 30 AND salary > 50000
department = 'Sales' AND experience >= 5
(age < 35 AND department = 'IT') OR salary >= 80000
```

### Checking Eligibility

1. Fill in the user data fields (age, department, salary, experience)
2. Click "Check Eligibility"
3. View the result and detailed evaluation process

## Project Structure

```
src/
├── components/
│   ├── RuleEditor.tsx      # Rule creation interface
│   ├── RuleList.tsx        # Saved rules management
│   └── UserEligibilityChecker.tsx # Rule evaluation interface
├── types/
│   └── RuleTypes.ts        # TypeScript type definitions
├── utils/
│   └── ruleParser.ts       # AST creation and evaluation logic
└── App.tsx                 # Main application component
```

## Technical Details

- Built with React 18 and TypeScript
- Uses Abstract Syntax Trees for rule parsing and evaluation
- Implements the Operator Precedence algorithm
- Supports complex nested expressions
- Provides detailed debugging information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by business rule engines and expression parsers
- UI design influenced by modern web applications
- Built with ❤️ using React and TypeScript