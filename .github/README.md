# GitHub Configuration

This directory contains GitHub-specific configuration files for the BayEngage Agent project.

## 🔄 GitHub Actions Workflows

### CI/CD Workflows

#### **ci.yml** - Continuous Integration
- **Triggers**: Push to main/develop, Pull requests
- **Jobs**:
  - **Test**: Runs tests on Node.js 18, 20, and 22
  - **Lint**: TypeScript type checking
  - **Build**: Compiles TypeScript and uploads artifacts
- **Features**:
  - Multi-version testing matrix
  - Code coverage upload to Codecov
  - Artifact preservation

#### **pr-checks.yml** - Pull Request Checks
- **Triggers**: Pull request events
- **Jobs**:
  - **Validate PR**: Checks PR title follows conventional commits
  - **Size Check**: Reports build size in PR comments
  - **Test Coverage**: Generates coverage reports
- **Features**:
  - Semantic PR title validation
  - TODO/FIXME detection
  - Bundle size tracking
  - Coverage reporting

#### **security.yml** - Security Scanning
- **Triggers**: Push, Pull requests, Weekly schedule
- **Jobs**:
  - **Dependency Review**: Checks for vulnerable dependencies in PRs
  - **NPM Audit**: Runs npm security audit
  - **CodeQL**: GitHub's code scanning for vulnerabilities
  - **Secret Scan**: Detects leaked secrets using TruffleHog
- **Features**:
  - Automated vulnerability detection
  - Secret leak prevention
  - Security advisories

#### **deploy.yml** - Deployment
- **Triggers**: Push to main, Version tags
- **Jobs**:
  - **Deploy to Vercel**: Automatic deployment
  - **Publish to NPM**: Publishes on version tags
  - **Create Release**: GitHub release creation
- **Features**:
  - Automatic production deployments
  - Version-based NPM publishing
  - Release notes generation

#### **release.yml** - Release Management
- **Triggers**: Push to main
- **Jobs**:
  - Uses Release Please for automated releases
  - Creates changelogs
  - Bumps versions
  - Publishes to NPM
- **Features**:
  - Conventional commit-based versioning
  - Automated changelog
  - NPM package publishing

#### **dependabot-auto-merge.yml** - Automated Dependency Updates
- **Triggers**: Dependabot pull requests
- **Jobs**:
  - Auto-merges patch and minor version updates
- **Features**:
  - Safe automatic merging
  - Version-aware approval

#### **stale.yml** - Issue Management
- **Triggers**: Daily schedule
- **Jobs**:
  - Marks inactive issues/PRs as stale
  - Auto-closes after inactivity period
- **Features**:
  - Configurable stale periods
  - Exempt labels support

## 📋 Templates

### Pull Request Template
- **Location**: `PULL_REQUEST_TEMPLATE.md`
- **Features**:
  - Structured PR description
  - Change type checklist
  - Testing verification
  - Review checklist

### Issue Templates

#### Bug Report (`bug_report.md`)
- Reproduction steps
- Environment details
- Error logs
- Expected vs actual behavior

#### Feature Request (`feature_request.md`)
- Problem statement
- Proposed solution
- Use cases
- Implementation suggestions

## 👥 CODEOWNERS

Defines code ownership for automatic review requests.

**Current owners**:
- Default: `@palani`
- Documentation: `@palani`
- GitHub Actions: `@palani`
- Source code: `@palani`
- Tests: `@palani`

## 🤖 Dependabot

**Configuration**: `dependabot.yml`

**Update Schedule**:
- **NPM**: Weekly on Mondays at 9:00 AM
- **GitHub Actions**: Weekly on Mondays at 9:00 AM

**Settings**:
- Maximum 10 open PRs
- Auto-assigned to `@palani`
- Labeled as `dependencies` and `automated`

## 🔒 Required Secrets

Configure these in your GitHub repository settings:

### Deployment
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID
- `NPM_TOKEN` - NPM publishing token

### Security & Coverage
- `CODECOV_TOKEN` - Codecov upload token (optional)

### GitHub
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## 🚀 Workflow Usage

### Running CI on Pull Requests

```bash
# Create a PR with semantic title
git checkout -b feat/new-feature
git commit -m "feat: add new feature"
git push origin feat/new-feature
# Open PR - CI will run automatically
```

### Creating a Release

```bash
# Commit with conventional commits
git commit -m "feat: add new tool"
git push origin main

# Release Please will create a PR
# Merge the PR to trigger release
```

### Manual Workflow Triggers

Some workflows support manual triggering via GitHub UI:
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"

## 📊 Status Badges

Add these to your main README.md:

```markdown
![CI](https://github.com/yourusername/agentkit-bayengage/workflows/CI/badge.svg)
![Security](https://github.com/yourusername/agentkit-bayengage/workflows/Security/badge.svg)
![Deploy](https://github.com/yourusername/agentkit-bayengage/workflows/Deploy/badge.svg)
```

## 🔧 Customization

### Updating Node.js Versions

Edit `ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x] # Modify here
```

### Changing Stale Periods

Edit `stale.yml`:

```yaml
days-before-issue-stale: 60  # Days before marking stale
days-before-issue-close: 30  # Days before closing
```

### Modifying Dependabot Schedule

Edit `dependabot.yml`:

```yaml
schedule:
  interval: 'weekly'  # Options: daily, weekly, monthly
  day: 'monday'
  time: '09:00'
```

## 🐛 Troubleshooting

### CI Failing

1. Check workflow logs in Actions tab
2. Verify all dependencies are installed
3. Ensure tests pass locally: `npm test`
4. Check TypeScript compilation: `npm run type-check`

### Deployment Failing

1. Verify secrets are configured correctly
2. Check Vercel/NPM token permissions
3. Ensure build succeeds: `npm run build`

### Dependabot Issues

1. Check `dependabot.yml` syntax
2. Verify GitHub permissions
3. Review dependency compatibility

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)
- [CodeQL Analysis](https://codeql.github.com/)
- [Release Please](https://github.com/googleapis/release-please)

## 🤝 Contributing

When contributing, ensure:
- PR title follows [Conventional Commits](https://www.conventionalcommits.org/)
- All CI checks pass
- Tests are added for new features
- Documentation is updated

## 📝 Workflow Diagram

```
Push/PR → CI Workflow → Tests + Lint + Build
       ↓
    Security Scan → Vulnerability Check + Secret Scan
       ↓
    PR Checks → Title Validation + Coverage + Size
       ↓
    Merge to main → Deploy to Vercel
                  ↓
              Release Please → Version Bump + Changelog
                            ↓
                        NPM Publish
```

---

Last updated: October 2025
