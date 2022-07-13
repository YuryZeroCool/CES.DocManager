const path = require('path');

module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react-hook-form",
    "import"
  ],
  "extends": [
    "airbnb", 
    "airbnb/hooks",
    "airbnb-typescript",
    // "react-app",
    // "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hook-form/recommended",
  ],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": ["./tsconfig.json"],
        "tsconfigRootDir": __dirname,
      }
    }
  ],
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "amd": true
  },
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'jsx-a11y/label-has-associated-control': ['error', {
      'required': {
        'some': ['nesting', 'id']
      }
    }],
    'jsx-a11y/label-has-for': ['error', {
      'required': {
        'some': ['nesting', 'id']
      }
    }]
  }
}
