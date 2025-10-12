# Code Quality & Linting Guide

## 🎯 Overview

This project uses ESLint and Prettier to maintain consistent code quality and formatting across the codebase.

## 📦 Tools Installed

- **ESLint** `^9.37.0` - Latest version with flat config system
- **Prettier** `^3.6.2` - Latest code formatter
- **TypeScript ESLint** `^8.46.0` - TypeScript-specific linting rules
- **eslint-plugin-prettier** `^5.5.4` - Runs Prettier as an ESLint rule
- **eslint-config-prettier** `^10.1.8` - Disables conflicting ESLint rules

## 🚀 Quick Start

### Run All Checks

```bash
npm run check
```

This runs type checking, linting, and format checking all at once.

### Individual Commands

```bash
# Linting
npm run lint              # Check for linting errors
npm run lint:fix          # Auto-fix linting errors

# Formatting
npm run format            # Format all files
npm run format:check      # Check if files are formatted

# Type Checking
npm run type-check        # Run TypeScript compiler checks
```

## 📋 Configuration Files

### ESLint Configuration (`eslint.config.js`)

Uses the new **flat config** format (ESLint 9+):

- TypeScript recommended rules
- Prettier integration
- Custom rules for code quality
- Separate rules for test files

### Prettier Configuration (`.prettierrc.json`)

- **Single quotes** for strings
- **Semicolons** required
- **2-space** indentation
- **100 character** line width
- **Trailing commas** (ES5 compatible)

## 🔍 Linting Rules

### TypeScript Rules

This project uses a **pragmatic approach** to TypeScript linting, balancing strict type safety with development velocity.

```typescript
// Enforced Rules (errors)
'@typescript-eslint/no-floating-promises': 'error'
'@typescript-eslint/no-misused-promises': 'error'
'@typescript-eslint/await-thenable': 'error'
'@typescript-eslint/array-type': ['error', { default: 'array' }] // Use T[] not Array<T>

// Warnings (suggestions)
'@typescript-eslint/no-explicit-any': 'warn'
'@typescript-eslint/require-await': 'warn'
'@typescript-eslint/prefer-nullish-coalescing': 'warn'
'@typescript-eslint/prefer-promise-reject-errors': 'warn'

// Disabled (for pragmatic development)
'@typescript-eslint/explicit-function-return-type': 'off'
'@typescript-eslint/explicit-module-boundary-types': 'off'
'@typescript-eslint/no-unsafe-assignment': 'off'
'@typescript-eslint/no-unsafe-member-access': 'off'
'@typescript-eslint/no-unsafe-return': 'off'
'@typescript-eslint/no-unsafe-call': 'off'
'@typescript-eslint/no-unsafe-argument': 'off'
```

### General Rules

```javascript
// Code Quality
'no-console': ['warn', { allow: ['warn', 'error'] }]
'no-debugger': 'error'
'prefer-const': 'error'
'no-var': 'error'

// Import Organization
'sort-imports': ['error', {
  ignoreCase: true,
  ignoreDeclarationSort: true,
}]
```

### Test File Rules

Test files have relaxed rules:

- `@typescript-eslint/no-explicit-any`: off
- `no-console`: off

## 🎨 Formatting Standards

### Code Style

```typescript
// ✅ Good - Single quotes, semicolons, proper spacing
import { tool } from '@openai/agents';

const result = await client.get<Contact>('/contacts', {
  headers: { 'Content-Type': 'application/json' },
});

// ❌ Bad - Double quotes, no semicolons, inconsistent spacing
import { tool } from '@openai/agents';

const result = await client.get<Contact>('/contacts', {
  headers: { 'Content-Type': 'application/json' },
});
```

### Line Length

```typescript
// ✅ Good - Stays within 100 characters
const response = await client.post<Campaign>('/campaigns', {
  name: input.name,
  subject: input.subject,
});

// ❌ Bad - Exceeds 100 characters
const response = await client.post<Campaign>('/campaigns', {
  name: input.name,
  subject: input.subject,
  fromName: input.fromName,
});
```

### Import Organization

```typescript
// ✅ Good - Organized imports
import { tool } from '@openai/agents';
import { z } from 'zod';
import { getBayEngageClient } from '../client.js';
import type { Contact, APIResponse } from '../types/index.js';

// ❌ Bad - Mixed type and value imports
import { tool } from '@openai/agents';
import { Contact, APIResponse } from '../types/index.js';
import { z } from 'zod';
```

## 🔧 VS Code Integration

### Automatic Formatting

The project includes VS Code settings (`.vscode/settings.json`) that enable:

1. **Format on Save** - Auto-format files when saving
2. **ESLint Auto-fix** - Fix linting errors on save
3. **Prettier as Default** - Use Prettier for all formatting

### Recommended Extensions

Install these VS Code extensions (`.vscode/extensions.json`):

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **TypeScript** (`ms-vscode.vscode-typescript-next`)
- **Vitest** (`vitest.explorer`)

## 🎯 Pre-commit Workflow

### Manual Checks Before Commit

```bash
# 1. Format code
npm run format

# 2. Check types
npm run type-check

# 3. Run linter
npm run lint:fix

# 4. Run tests
npm test

# Or run everything at once
npm run check && npm test
```

### GitHub Actions Integration

The CI pipeline automatically runs:

1. **Lint Check** (`.github/workflows/lint.yml`)
   - ESLint validation
   - Prettier format check
   - TypeScript type check

2. **On Every**:
   - Push to main/develop
   - Pull request creation

## 🐛 Common Issues & Solutions

### Issue: "Parsing error" in ESLint

**Solution**: Ensure `tsconfig.json` is valid and in the project root:

```bash
npm run type-check
```

### Issue: "Prettier not formatting"

**Solution**: Check file is not in `.prettierignore`:

```bash
# Check if file should be formatted
prettier --check src/your-file.ts
```

### Issue: "ESLint and Prettier conflicts"

**Solution**: This shouldn't happen as we use `eslint-config-prettier`, but if it does:

```bash
# Remove conflicting rules manually in eslint.config.js
npm install --save-dev eslint-config-prettier
```

### Issue: "Import order not auto-fixing"

**Solution**: Import sorting is automatic with Prettier, but may need manual organization:

```typescript
// Group imports: external, internal, types
import { external } from 'external-package';
import { internal } from './internal';
import type { Type } from './types';
```

## 📝 Ignoring Files

### .eslintignore

```
node_modules/
dist/
coverage/
*.config.js
```

### .prettierignore

```
node_modules/
dist/
coverage/
package-lock.json
```

## 🎓 Best Practices

### 1. Run Checks Before Committing

```bash
npm run check
```

### 2. Fix Issues Automatically

```bash
npm run lint:fix && npm run format
```

### 3. Use Type Imports

```typescript
// ✅ Good
import type { Contact } from './types.js';
import { tool } from '@openai/agents';

// ❌ Avoid
import { tool, type FunctionTool } from '@openai/agents';
```

### 4. Handle Promises Properly

```typescript
// ✅ Good - Awaited promise
const result = await client.get('/contacts');

// ❌ Bad - Floating promise
client.get('/contacts'); // ESLint error!
```

### 5. Use Const Over Let

```typescript
// ✅ Good
const client = getBayEngageClient();

// ❌ Bad (if value doesn't change)
let client = getBayEngageClient();
```

## 🚀 Advanced Configuration

### Custom Rules

To add custom ESLint rules, edit `eslint.config.js`:

```javascript
export default tseslint.config(
  // ... existing config
  {
    rules: {
      // Add your custom rules here
      'no-magic-numbers': ['warn', { ignore: [0, 1] }],
    },
  }
);
```

### Custom Prettier Settings

Edit `.prettierrc.json`:

```json
{
  "printWidth": 120, // Change line width
  "tabWidth": 4, // Use 4-space tabs
  "useTabs": true // Use tabs instead of spaces
}
```

## 📊 Code Quality Metrics

Track these metrics in your codebase:

- **0 ESLint errors** in `main` branch
- **0 TypeScript errors** before merging PRs
- **100% formatted files** (via Prettier)
- **No console.log** in production code (use console.error/warn)

## 🔗 Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

## 📞 Troubleshooting

### Still Having Issues?

1. **Clear Node Modules**:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Restart VS Code**: Reload window to refresh ESLint/Prettier

3. **Check Versions**:

   ```bash
   npm list eslint prettier
   ```

4. **View ESLint Output**: VS Code → Output → ESLint

---

**Last Updated**: October 2025

**Maintainer**: Development Team

**Questions**: Open an issue on GitHub
