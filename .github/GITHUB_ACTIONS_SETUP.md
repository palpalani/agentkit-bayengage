# GitHub Actions Setup Guide

## 🎯 Quick Setup

### 1. Configure Repository Secrets

Navigate to: `Settings` → `Secrets and variables` → `Actions`

Add the following secrets:

#### **Required for Deployment**
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
NPM_TOKEN=your_npm_token_here
```

#### **Optional for Coverage**
```
CODECOV_TOKEN=your_codecov_token_here
```

### 2. Enable GitHub Actions

1. Go to repository `Settings` → `Actions` → `General`
2. Select: **Allow all actions and reusable workflows**
3. Enable: **Read and write permissions**
4. Enable: **Allow GitHub Actions to create and approve pull requests**

### 3. Enable Dependabot

1. Go to `Settings` → `Code security and analysis`
2. Enable: **Dependabot alerts**
3. Enable: **Dependabot security updates**
4. Enable: **Dependabot version updates**

### 4. Enable CodeQL Scanning

1. Go to `Security` → `Code scanning`
2. Click **Set up** for CodeQL
3. Or it will run automatically via the `security.yml` workflow

## 📋 Workflow Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | Push, PR | Run tests, lint, build |
| **PR Checks** | PR events | Validate PR, size check, coverage |
| **Security** | Push, PR, Weekly | Security scans, dependency review |
| **Deploy** | Push to main, Tags | Deploy to Vercel, publish to NPM |
| **Release** | Push to main | Automated versioning & releases |
| **Dependabot Auto-Merge** | Dependabot PRs | Auto-merge safe updates |
| **Stale** | Daily | Mark and close inactive issues/PRs |

## 🔐 Getting Tokens

### Vercel Token

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Get token
vercel token create
```

Or get from: https://vercel.com/account/tokens

### NPM Token

1. Login to npmjs.com
2. Go to Access Tokens
3. Generate New Token → Automation
4. Copy token

### Codecov Token

1. Sign up at codecov.io
2. Connect your GitHub repository
3. Copy the upload token

## 🚦 Testing Workflows Locally

### Using Act (GitHub Actions Local Runner)

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run a workflow
act -j test  # Run test job
act push     # Simulate push event
act pull_request  # Simulate PR event

# With secrets
act --secret-file .secrets
```

### Manual Validation

```bash
# Check workflow syntax
npx @action-validator/cli .github/workflows/*.yml

# Validate GitHub Actions locally
npm install -g actionlint
actionlint
```

## 📊 Monitoring Workflows

### View Workflow Status

```bash
# Using GitHub CLI
gh run list
gh run view <run-id>
gh run watch

# View logs
gh run view <run-id> --log
```

### Status Dashboard

Visit: `https://github.com/YOUR_USERNAME/agentkit-bayengage/actions`

## 🔧 Common Customizations

### Change Node.js Versions

Edit `.github/workflows/ci.yml`:

```yaml
matrix:
  node-version: [18.x, 20.x, 22.x]  # Add/remove versions
```

### Modify Test Coverage Threshold

Add to `package.json`:

```json
{
  "vitest": {
    "coverage": {
      "statements": 80,
      "branches": 80,
      "functions": 80,
      "lines": 80
    }
  }
}
```

### Add New Workflow

Create `.github/workflows/your-workflow.yml`:

```yaml
name: Your Workflow
on: [push]
jobs:
  your-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello"
```

## 🐛 Troubleshooting

### Workflow Not Triggering

1. Check workflow syntax
2. Verify branch name matches trigger
3. Check if workflows are enabled
4. Review repository permissions

### Permission Errors

```yaml
# Add to workflow
permissions:
  contents: write
  pull-requests: write
```

### Secret Not Found

1. Verify secret name matches exactly (case-sensitive)
2. Check secret is set at repository level
3. Ensure workflow has permission to access secrets

### Cache Issues

```bash
# Clear GitHub Actions cache
gh cache delete --all
```

Or add to workflow:

```yaml
- name: Clear cache
  run: |
    gh cache delete --all
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📈 Optimization Tips

### Speed Up Workflows

1. **Use caching**:
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
```

2. **Run jobs in parallel**:
```yaml
jobs:
  test:
    # ...
  lint:
    # ...
  # These run in parallel
```

3. **Skip redundant jobs**:
```yaml
if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

### Reduce Workflow Minutes

1. Use `ubuntu-latest` (faster than macOS/Windows)
2. Cache dependencies
3. Use matrix strategy for parallel tests
4. Skip workflows for docs-only changes:

```yaml
on:
  push:
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

## 🔄 Migration Checklist

- [x] Created `.github` directory
- [x] Added workflows
- [x] Configured Dependabot
- [x] Created issue templates
- [x] Added PR template
- [x] Set up CODEOWNERS
- [ ] Configure repository secrets
- [ ] Enable Actions in settings
- [ ] Enable Dependabot
- [ ] Test workflows
- [ ] Add status badges to README

## 📚 Additional Resources

### Official Docs
- [GitHub Actions](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub CLI](https://cli.github.com/)

### Tools
- [Act - Local GitHub Actions](https://github.com/nektos/act)
- [Action Validator](https://github.com/mpalmer/action-validator)
- [Actionlint](https://github.com/rhysd/actionlint)

### Best Practices
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/best-practices-for-github-actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

## 💡 Tips

1. **Use GITHUB_TOKEN** instead of PAT when possible
2. **Pin action versions** using SHA for security
3. **Use matrix strategy** for testing multiple versions
4. **Cache dependencies** to speed up workflows
5. **Use concurrency** to cancel outdated runs:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

## 🎓 Learning Path

1. Start with CI workflow - understand basic testing
2. Add PR checks - learn about PR automation
3. Implement security scanning - understand security best practices
4. Set up deployment - learn CD practices
5. Automate releases - master version management

---

**Need help?** Check the [GitHub Community Forum](https://github.community/) or open an issue!
