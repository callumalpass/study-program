# Resource Planning

## Introduction

Resource planning involves identifying, acquiring, and managing all the assets you'll need to complete your capstone project successfully. Unlike large software teams with dedicated budgets and infrastructure, capstone students must be creative and strategic about resource allocation. You're working with constraints: limited budget (often zero), finite time, and typically solo effort.

Effective resource planning ensures you have the right tools, services, knowledge, and support when you need them. It prevents last-minute scrambles for access, unexpected costs, and blockers that could derail your timeline. By planning resources early, you can leverage free tiers, student discounts, open-source tools, and academic resources to build professional-quality software without breaking the bank.

## Learning Objectives

By the end of this lesson, you will be able to:

- Identify all resource categories needed for your project
- Evaluate and select appropriate tools and services
- Leverage free tiers, student programs, and open-source alternatives
- Plan for computational, storage, and API resources
- Organize human resources including mentors, advisors, and testers
- Create a resource budget and timeline
- Set up sustainable development workflows
- Identify and access learning resources efficiently

## Categories of Resources

### Technical Infrastructure Resources

**Development Environment:**
- Computer hardware (laptop, desktop)
- Operating system
- Code editor or IDE
- Terminal/command-line tools
- Version control software
- Containers and virtualization (Docker, VirtualBox)

**Cloud and Hosting:**
- Application hosting platform
- Database hosting
- File storage
- CDN for static assets
- Domain name
- SSL certificates

**Third-Party Services:**
- Authentication providers
- Email services
- SMS/notification services
- Payment processors
- Analytics platforms
- Monitoring and logging services

**Development Tools:**
- Package managers
- Build tools and bundlers
- Testing frameworks
- Linters and formatters
- CI/CD platforms
- Project management tools

### Knowledge Resources

**Learning Materials:**
- Documentation and tutorials
- Online courses
- Books and articles
- Video content
- Sample code and templates
- Stack Overflow and forums

**Technical Expertise:**
- Project advisor
- Industry mentors
- Peer developers
- Online communities
- Office hours and tutoring
- Code review partners

### Human Resources

**Project Team:**
- You (primary developer)
- Project advisor (guidance)
- Domain experts (validation)
- Beta testers (feedback)
- Code reviewers (quality assurance)

**User Research:**
- Interview participants
- Survey respondents
- Usability test users
- Beta testers

### Time Resources

**Development Time:**
- Weekly time allocation
- Deep work blocks
- Learning time
- Debugging buffer
- Documentation time

**Support Time:**
- Advisor meetings
- Peer collaboration
- Office hours
- Community support

### Financial Resources

**Potential Costs:**
- Cloud hosting beyond free tier
- Domain registration
- API usage fees
- Premium tools or services
- Design assets (icons, images)
- Testing infrastructure

**Budget Sources:**
- Personal budget
- Student credits (AWS, Azure, GCP)
- GitHub Student Pack
- University resources
- Open-source alternatives (free)

## Tool and Service Selection

### Evaluation Criteria

When selecting tools and services, consider:

**1. Cost:**
- Is there a free tier sufficient for your needs?
- Are student discounts available?
- What's the pricing beyond free tier?
- Are there hidden costs?

**2. Learning Curve:**
- How long to become productive?
- Quality of documentation
- Community size and support
- Prior experience with similar tools

**3. Feature Set:**
- Does it meet your requirements?
- Is it too simple or too complex?
- Scalability for future needs
- Integration with other tools

**4. Reliability:**
- Uptime and stability
- Company/project longevity
- Community activity
- Support quality

**5. Lock-in Risk:**
- How easy to migrate away?
- Data export capabilities
- Standard vs. proprietary formats
- Community vs. vendor-controlled

### Free Tier Strategies

**Maximize Free Tiers:**

Many services offer generous free tiers perfect for capstone projects:

**Hosting Platforms:**
- **Vercel:** Free hosting for frontend applications, serverless functions
- **Netlify:** Static site hosting, forms, functions
- **Render:** Free web services, databases, static sites
- **Fly.io:** Free tier for small apps
- **Railway:** $5 free credit monthly
- **Heroku:** Limited free tier (pay attention to usage)

**Databases:**
- **Supabase:** PostgreSQL with 500MB free
- **PlanetScale:** MySQL with generous free tier
- **MongoDB Atlas:** 512MB free
- **Neon:** Serverless PostgreSQL
- **CockroachDB:** Free tier available

**Backend Services:**
- **Firebase:** Authentication, database, hosting (generous free tier)
- **Supabase:** Auth, database, storage, edge functions
- **AWS Free Tier:** 12 months of various services (Lambda, S3, EC2)
- **Google Cloud Platform:** $300 credit for 90 days
- **Microsoft Azure:** $200 credit, many free services

**Monitoring & Analytics:**
- **Sentry:** Error tracking (5k events/month free)
- **LogRocket:** Session replay (1k sessions/month)
- **Google Analytics:** Free forever
- **PostHog:** Product analytics (1M events/month)
- **Prometheus + Grafana:** Open source, self-hosted

**Email Services:**
- **SendGrid:** 100 emails/day free
- **Mailgun:** 5000 emails/month free for 3 months
- **Amazon SES:** 62,000 emails/month via EC2
- **Resend:** 3000 emails/month free

### GitHub Student Developer Pack

If you're a student, access to GitHub Student Developer Pack is essential:

**Included Benefits:**
- GitHub Pro (advanced features)
- Name.com: Free domain for 1 year
- Heroku: Platform credits
- Digital Ocean: $200 credit
- Microsoft Azure: $100 credit
- Bootstrap Studio: Free license
- JetBrains IDE: Free access
- Canva: Free Pro for 1 year
- And many more...

**How to Access:**
1. Go to education.github.com
2. Verify student status (school email or ID)
3. Access benefits dashboard
4. Claim needed services

### Open Source Alternatives

Prioritize open-source tools when possible:

| Category | Proprietary | Open Source Alternative |
|----------|-------------|------------------------|
| IDE | Visual Studio | VS Code, Vim, Neovim |
| Database | Oracle | PostgreSQL, MySQL |
| Monitoring | New Relic | Prometheus, Grafana |
| Design | Photoshop | GIMP, Figma (free tier) |
| Diagramming | Visio | Draw.io, Mermaid |
| API Testing | Postman (limited) | Insomnia, HTTPie |
| CI/CD | CircleCI | GitHub Actions (free for public) |
| Project Management | Jira | Taiga, GitLab Issues |

**Benefits:**
- No cost
- No lock-in
- Community support
- Transparency
- Learning opportunity

## Resource Planning by Project Phase

### Planning Phase Resources

**Needed:**
- Diagramming tool (architecture, ERD, wireframes)
- Research time
- Advisor availability
- Documentation template

**Recommended Tools:**
- **Diagramming:** Draw.io, Excalidraw, Mermaid, Figma
- **Documentation:** Markdown, Google Docs, Notion
- **Research:** Google Scholar, Stack Overflow, GitHub
- **Planning:** Trello, Notion, GitHub Projects

**Time Allocation:** 10-15% of total project time

### Design Phase Resources

**Needed:**
- UI/UX design tools
- Database design tools
- API design documentation
- Feedback from potential users

**Recommended Tools:**
- **UI Design:** Figma (free), Penpot (open source)
- **Database Design:** dbdiagram.io, DrawSQL
- **API Design:** Swagger/OpenAPI, Postman
- **Icons:** Heroicons, Font Awesome, Lucide
- **Color Palettes:** Coolors, Tailwind CSS colors

**Time Allocation:** 10-15% of total project time

### Development Phase Resources

**Needed:**
- Development environment
- Version control
- Package managers
- Frameworks and libraries
- Development database
- API keys for third-party services

**Recommended Setup:**

**Frontend Stack:**
- **Framework:** React, Vue, Svelte (all free)
- **Bundler:** Vite, Next.js (free)
- **CSS:** Tailwind, Styled Components (free)
- **State Management:** Zustand, Redux (free)
- **Testing:** Vitest, Jest, Testing Library (free)

**Backend Stack:**
- **Runtime:** Node.js, Python, Go (all free)
- **Framework:** Express, FastAPI, Fiber (all free)
- **ORM:** Prisma, TypeORM, SQLAlchemy (free)
- **Authentication:** Passport.js, next-auth (free)
- **API Framework:** tRPC, GraphQL (free)

**Time Allocation:** 50-60% of total project time

### Testing Phase Resources

**Needed:**
- Testing frameworks
- Test data
- Beta testers
- Testing infrastructure
- Performance testing tools
- Accessibility testing tools

**Recommended Tools:**
- **Unit Testing:** Jest, Vitest, pytest (free)
- **E2E Testing:** Playwright, Cypress (free)
- **Performance:** Lighthouse, WebPageTest (free)
- **Accessibility:** axe DevTools, WAVE (free)
- **Load Testing:** k6, Artillery (free/open source)
- **Visual Regression:** Percy (free tier), Chromatic

**Time Allocation:** 15-20% of total project time

### Deployment Phase Resources

**Needed:**
- Hosting platform
- Domain name
- SSL certificate
- CI/CD pipeline
- Monitoring setup
- Documentation hosting

**Recommended Tools:**
- **Hosting:** Vercel, Netlify, Render (free tiers)
- **Domain:** Name.com via GitHub Student Pack, or Namecheap
- **SSL:** Let's Encrypt (free, often auto via hosting)
- **CI/CD:** GitHub Actions (free for public repos)
- **Monitoring:** Sentry, UptimeRobot (free tiers)
- **Docs:** GitHub Pages, GitBook, Docusaurus (free)

**Time Allocation:** 5-10% of total project time

## Resource Budget Template

```markdown
# Resource Budget: [Project Name]

## Financial Budget

### Confirmed Costs: $0
- Domain: $0 (GitHub Student Pack - Name.com)
- Hosting: $0 (Vercel free tier)
- Database: $0 (Supabase free tier)
- Email: $0 (SendGrid free tier)

### Potential Costs: $0-50
- Cloud hosting if exceeded free tier: $0-25/month
- Additional email sending: $0-15/month
- Premium icon set: $0-10 (optional)

### Budget Sources
- GitHub Student Developer Pack: Various credits
- Personal budget: $50 contingency
- Total Available: $50

### Risk Mitigation
- Monitor free tier usage weekly
- Set up billing alerts
- Have backup free services identified

## Time Budget

### Weekly Time Allocation: 18 hours
- Deep work (coding): 12 hours
- Learning/research: 3 hours
- Meetings/communication: 2 hours
- Documentation: 1 hour

### Total Project Time: 288 hours over 16 weeks
- Planning: 30 hours (10%)
- Design: 36 hours (12%)
- Development: 162 hours (56%)
- Testing: 36 hours (12%)
- Deployment: 15 hours (5%)
- Documentation: 9 hours (3%)

## Technical Resources

### Development Environment
- [x] Laptop: MacBook Pro (owned)
- [x] IDE: VS Code (free)
- [x] Terminal: iTerm2 (free)
- [x] Git: Installed (free)
- [x] Docker: Docker Desktop (free tier)

### Hosting & Services
- [x] Frontend Hosting: Vercel (free)
- [x] Database: Supabase (free tier, 500MB)
- [x] Authentication: Supabase Auth (included)
- [x] File Storage: Supabase Storage (1GB free)
- [x] Email: SendGrid (100/day free)
- [x] Domain: ecotracker.dev via Student Pack
- [x] SSL: Automatic via Vercel

### Third-Party APIs
- [x] Weather Data: OpenWeather API (1000 calls/day free)
- [x] Maps: Mapbox (50k loads/month free)
- [ ] Analytics: Google Analytics (free)
- [ ] Error Tracking: Sentry (5k events/month)

### Development Tools
- [x] Version Control: GitHub (free)
- [x] CI/CD: GitHub Actions (free)
- [x] Project Management: GitHub Projects (free)
- [x] Design: Figma (free tier)
- [x] API Testing: Insomnia (free)

## Human Resources

### Advisor & Mentorship
- [x] Faculty Advisor: Dr. Smith (weekly 30min meetings)
- [x] Industry Mentor: Sarah Johnson (bi-weekly check-ins)
- [ ] Code Review: Peer exchange with 2 classmates

### User Research
- Target: 5-8 beta testers
- Sources:
  - University sustainability club (contacted)
  - Reddit r/sustainability (will post)
  - Friends/family (backup)

### Domain Expertise
- Environmental science consultation: Prof. Davis (contacted, willing)

## Learning Resources

### Priority Learning (allocated time)
- [x] TypeScript: 8 hours (completed)
- [ ] Supabase: 6 hours (week 2)
- [ ] Chart.js: 4 hours (week 9)
- [ ] Deployment: 3 hours (week 14)

### Documentation References
- React docs (react.dev)
- Supabase docs
- TypeScript handbook
- MDN Web Docs

### Community Support
- Stack Overflow
- Reddit r/webdev
- Supabase Discord
- University CS community

## Resource Monitoring

### Weekly Checklist
- [ ] Check Vercel usage
- [ ] Check Supabase database size
- [ ] Check API rate limits
- [ ] Review time tracking
- [ ] Update resource status

### Trigger Points
- **Database:** If >80% of 500MB, plan migration or cleanup
- **API Calls:** If >80% of daily limit, implement caching
- **Time:** If consistently over 20hrs/week, reduce scope
- **Budget:** If costs >$10/month, review and optimize
```

## Sustainable Development Setup

### Local Development Environment

**Essential Setup:**
```bash
# Required installations
- Node.js (LTS version)
- Git
- Code editor with extensions
- Database client (TablePlus, DBeaver)
- API client (Insomnia, Postman)

# Recommended tools
- Docker (for consistent environments)
- Make or Task runner
- Environment manager (nvm, pyenv)
```

**Configuration:**
```bash
# .env.example (commit this)
DATABASE_URL=postgresql://localhost:5432/myapp
API_KEY=your_key_here
NODE_ENV=development

# .env.local (never commit, actually used)
DATABASE_URL=postgresql://localhost:5432/myapp
API_KEY=actual_secret_key_12345
NODE_ENV=development
```

**Workspace Organization:**
```
projects/
├── capstone/
│   ├── README.md
│   ├── docs/
│   ├── src/
│   ├── tests/
│   ├── scripts/
│   └── .env.local
├── learning/
│   ├── typescript-tutorial/
│   ├── react-experiments/
│   └── graphql-practice/
└── resources/
    ├── bookmarks.md
    ├── code-snippets/
    └── meeting-notes/
```

### Productivity Tools

**Focus and Time Management:**
- **Pomodoro Timer:** Pomofocus, Forest app
- **Time Tracking:** Toggl, Clockify (free)
- **Focus Music:** Brain.fm, lofi streams
- **Website Blockers:** Cold Turkey, Freedom

**Note-Taking and Knowledge Management:**
- **Technical Notes:** Obsidian, Notion, Markdown files
- **Code Snippets:** SnippetsLab, Gist
- **Bookmarks:** Raindrop.io, Notion
- **Meeting Notes:** Template in project repo

**Communication:**
- **Advisor:** Email + scheduled meetings
- **Async Updates:** Slack, Discord
- **Screen Recording:** Loom (free tier for demos)

### Version Control Strategy

**Git Workflow:**
```bash
# Main branches
main          # Production-ready code
develop       # Integration branch

# Feature branches
feature/auth
feature/dashboard
feature/data-viz

# Bug fix branches
fix/login-bug
hotfix/critical-security
```

**Commit Conventions:**
```bash
feat: Add user authentication
fix: Resolve database connection issue
docs: Update API documentation
test: Add unit tests for auth service
refactor: Simplify data fetching logic
chore: Update dependencies
```

**Backup Strategy:**
- Primary: GitHub (push daily)
- Secondary: GitLab mirror (push weekly)
- Local: Time Machine or equivalent (automatic)
- Critical Docs: Google Drive or Dropbox

## API and Rate Limit Management

### Rate Limit Planning

**Track API Quotas:**
```markdown
## API Usage Tracking

### OpenWeather API
- Limit: 1,000 calls/day
- Current Usage: ~150 calls/day
- Projected Peak: 400 calls/day (with 50 active users)
- Status: ✅ Safe
- Mitigation: Cache responses for 30 minutes

### SendGrid Email
- Limit: 100 emails/day
- Current Usage: ~5 emails/day (testing)
- Projected Peak: 30 emails/day
- Status: ✅ Safe
- Mitigation: Batch notifications, avoid unnecessary emails

### Mapbox Maps
- Limit: 50,000 map loads/month
- Current Usage: ~500/month (development)
- Projected Peak: 10,000/month
- Status: ✅ Safe
- Mitigation: Cache tiles, lazy load maps
```

### Caching Strategy

**Reduce API Calls:**
```typescript
// Cache API responses
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

async function getWeatherData(location: string) {
  const cached = cache.get(location);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchFromWeatherAPI(location);
  cache.set(location, {
    data,
    timestamp: Date.now()
  });

  return data;
}
```

**Database Query Optimization:**
```typescript
// Use database indexes
// Cache expensive queries
// Implement pagination
// Use connection pooling
```

## Resource Checklist

### Before Project Start
- [ ] Development computer ready (sufficient RAM, storage)
- [ ] Development environment set up
- [ ] Version control configured (Git + GitHub)
- [ ] Code editor installed with extensions
- [ ] Project management tool selected and configured
- [ ] Free tier accounts created for planned services
- [ ] GitHub Student Pack claimed (if applicable)
- [ ] Domain reserved (if needed)
- [ ] Advisor meetings scheduled
- [ ] Learning resources identified and bookmarked

### Week 1-2
- [ ] All development tools installed
- [ ] Database set up (local and cloud)
- [ ] API keys obtained for third-party services
- [ ] CI/CD pipeline configured
- [ ] Documentation repository initialized
- [ ] Time tracking started
- [ ] Resource monitoring dashboard created

### Ongoing
- [ ] Weekly resource usage reviews
- [ ] Monthly cost checks (if applicable)
- [ ] Quarterly evaluation of tool effectiveness
- [ ] Regular backups verified
- [ ] API rate limits monitored
- [ ] Learning resource effectiveness assessed

### Before Deployment
- [ ] Production hosting account ready
- [ ] Domain and SSL configured
- [ ] Environment variables documented
- [ ] Monitoring and logging set up
- [ ] Backup and recovery tested
- [ ] Cost projections for post-free-tier

## Common Resource Pitfalls

### Insufficient Computer Resources

**Problem:** Laptop can't handle development demands

**Prevention:**
- Check system requirements early
- Use cloud development environments if needed (GitHub Codespaces, Gitpod)
- Optimize local development (close unnecessary apps)
- Use lighter-weight alternatives

### Exceeding Free Tiers Unexpectedly

**Problem:** Sudden costs when free tier exceeded

**Prevention:**
- Set up billing alerts
- Monitor usage weekly
- Implement caching aggressively
- Have backup free services ready
- Stay well below limits (aim for 70% max)

### Tool Proliferation

**Problem:** Too many tools, losing track, wasted time

**Prevention:**
- Evaluate tools carefully before adopting
- Prefer integrated solutions
- Document all tools in one place
- Regularly prune unused tools
- Resist shiny object syndrome

### Dependency on Unavailable Resources

**Problem:** Blocked waiting for advisor, mentor, or external resource

**Prevention:**
- Schedule meetings in advance
- Have multiple backup resources
- Work on parallel tasks when blocked
- Build in buffer for dependencies
- Communicate needs early

### Inadequate Backup

**Problem:** Work lost due to insufficient backups

**Prevention:**
- Multiple backup locations
- Automated backups
- Regular restore testing
- Version control for everything
- Cloud storage for critical documents

## Summary

Resource planning is about being strategic and proactive. By identifying all needed resources early, leveraging free tiers and student benefits, and monitoring usage throughout the project, you ensure smooth execution without unexpected blockers or costs.

The key is balance: don't over-invest in tools you don't need, but don't under-invest in resources critical to success. Start with free and open-source options, validate they meet your needs, and only pay for premium services when absolutely necessary.

Remember that resources aren't just technical—time, knowledge, and human support are equally important. Plan for learning time, schedule advisor meetings, recruit beta testers early, and build a sustainable development workflow. With proper resource planning, you can build professional-quality software on a student budget.

## Additional Resources

- GitHub Student Developer Pack: education.github.com
- Free-for.dev: Comprehensive list of free tiers
- Awesome-Selfhosted: Open-source alternatives
- StackShare: Tool comparisons and recommendations
- Product Hunt: Discover new tools
- r/webdev, r/programming: Community tool discussions
- Your university's IT services and student resources
