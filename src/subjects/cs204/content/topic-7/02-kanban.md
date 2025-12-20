# Kanban

Kanban is a visual workflow management method that originated in Japanese manufacturing and has been successfully adapted for software development and knowledge work. The word "kanban" literally means "visual signal" or "card" in Japanese, reflecting the method's emphasis on visualization and signaling.

## Origins and Philosophy

Kanban was developed by Taiichi Ohno at Toyota in the 1940s as a scheduling system for lean manufacturing and just-in-time production. The goal was to improve manufacturing efficiency by producing only what was needed, when it was needed, and in the amount needed. This approach minimized inventory and waste while maximizing flow.

David Anderson adapted Kanban for knowledge work and software development in the early 2000s, recognizing that many of its principles applied equally well to managing the flow of work items through a development process. Unlike prescriptive methodologies that require specific roles or ceremonies, Kanban is an evolutionary change method that works with your existing process.

The philosophy underlying Kanban is fundamentally different from many other Agile approaches. Rather than mandating specific practices, Kanban provides a set of principles and properties that help teams visualize their work, limit work in progress, and continuously improve their process.

## Core Principles

Kanban is built on four foundational principles that guide its implementation and use.

### Start With What You Do Now

Kanban does not require you to change your existing process, roles, or responsibilities. You begin by visualizing your current workflow as it exists today. This principle reduces resistance to change because it respects current roles, responsibilities, and job titles. Teams can adopt Kanban without the disruption of reorganizing or redefining how they work.

This approach acknowledges that your current process likely has value and that evolution is often more effective than revolution. By starting where you are, you can make incremental improvements based on actual observations rather than theoretical ideal states.

### Agree to Pursue Incremental, Evolutionary Change

Kanban encourages making small, incremental changes rather than dramatic transformations. The method is designed to meet minimal resistance, enabling continuous, incremental, and evolutionary changes to your system. Revolutionary change typically faces significant resistance because it threatens the status quo and creates uncertainty.

By making small changes and observing their effects, teams can learn what works in their specific context. This empirical approach reduces risk and allows the team to adapt the method to their unique situation rather than forcing their situation to fit a predefined method.

### Respect the Current Process, Roles, and Responsibilities

Existing processes, roles, responsibilities, and titles likely have value and are worth preserving. Kanban recognizes that these elements developed for good reasons and that wholesale replacement may eliminate valuable practices along with problematic ones.

This principle also reduces fear and resistance. When people know their current role is respected and not under immediate threat, they are more likely to engage constructively with improvement efforts.

### Encourage Acts of Leadership at All Levels

Leadership is not restricted to management. Kanban encourages continuous improvement at all levels of the organization, from individual contributors to senior leadership. Everyone is encouraged to provide ideas and show leadership to implement positive changes and improvements.

This principle empowers individuals to make improvements in their immediate work environment without waiting for top-down directives. It creates a culture where improvement is everyone's responsibility, not just management's.

## Core Properties

Kanban systems share six core properties that define how they operate.

### Visualize Workflow

The most visible aspect of Kanban is the Kanban board, which provides a visual representation of work items flowing through the process. Each column on the board represents a stage in the workflow, and cards represent individual work items.

Visualization serves multiple purposes:
- Makes work visible that would otherwise be invisible
- Reveals where work is blocked or piling up
- Shows the distribution of different types of work
- Enables quick status communication without meetings
- Helps identify bottlenecks and inefficiencies

A typical software development Kanban board might have columns like: Backlog, Analysis, Development, Testing, and Done. More sophisticated boards might split columns into "doing" and "done" states to better track flow.

### Limit Work in Progress (WIP)

WIP limits are constraints on how many work items can be in a particular state at any given time. This is perhaps the most powerful and counterintuitive property of Kanban. By limiting WIP, you force the team to finish work before starting new work.

The benefits of WIP limits include:
- **Faster delivery**: Focusing on fewer items means individual items complete faster
- **Better quality**: Less context switching means fewer mistakes
- **Revealed bottlenecks**: WIP limits make bottlenecks obvious when work piles up
- **Improved flow**: Limiting WIP encourages even, sustainable flow
- **Reduced risk**: Smaller batches of work reduce the risk of large-scale failures

Setting appropriate WIP limits requires experimentation. Start conservatively (often based on team size) and adjust based on observations. If work regularly stalls waiting for the next stage, the WIP limit may be too restrictive. If the board fills up with in-progress items, limits may be too generous.

### Manage Flow

Flow refers to the smooth movement of work items through the system. Good flow means work moves steadily through stages without excessive waiting or blockage. Poor flow manifests as work piling up in certain stages while other stages starve for work.

Managing flow involves:
- Monitoring cycle time (how long items take to complete)
- Identifying and removing blockers quickly
- Balancing the rate of work entering the system with the rate of work completing
- Ensuring work doesn't sit waiting between stages
- Smoothing out variations in work arrival and completion

Teams often use cumulative flow diagrams to visualize flow over time, showing how work accumulates in different stages and revealing trends and patterns.

### Make Process Policies Explicit

For a team to improve a process, they must first understand it. Explicit policies make the process visible and discussable. Policies might include:
- Definition of what each column means
- Criteria for moving work between columns
- How to handle blocked items
- Priority schemes for selecting work
- WIP limits and their rationale

When policies are explicit and visible (often posted on or near the board), everyone can see how the system is supposed to work. This makes it possible to have rational discussions about changing policies and helps new team members understand expectations.

### Implement Feedback Loops

Kanban systems implement several feedback loops at different scales:
- **Daily standups**: Quick synchronization of the team around the board
- **Replenishment meetings**: Regular cadence for adding new work to the system
- **Service delivery reviews**: Periodic examination of delivered work and metrics
- **Operations reviews**: Less frequent reviews of overall process health and policies

These feedback loops ensure the team regularly inspects their work and their process, enabling continuous improvement.

### Improve Collaboratively, Evolve Experimentally

Improvement in Kanban is based on the scientific method. When the team identifies a problem or opportunity, they form a hypothesis about how a change might improve things, implement the change as an experiment, and observe the results.

This approach uses models and the scientific method to implement evolutionary change. Teams make small changes, measure their impact, and decide whether to keep, modify, or abandon the change. Over time, this evolutionary approach leads to a process highly adapted to the team's specific context.

## Kanban Boards in Practice

A Kanban board is more than just a visualization tool; it is the central artifact around which the team organizes its work.

### Physical vs. Digital Boards

Physical boards (using a whiteboard, sticky notes, and tape) offer several advantages:
- High visibility to everyone walking by
- Tactile interaction that many people find satisfying
- No technical barriers to use
- Easy to modify and experiment with

Digital boards (using tools like Jira, Trello, or Azure DevOps) provide different benefits:
- Access for distributed teams
- Automated metrics and reporting
- Integration with other development tools
- Persistent history and data

Many teams use both: a physical board for daily team use and a digital board that mirrors it for remote workers and reporting purposes.

### Designing Your Board

Board design should reflect your actual workflow. Start by mapping out the stages work goes through from commitment to delivery. Be realistic about the current process rather than designing for an idealized future state.

Consider including:
- Separate columns for waiting states (e.g., "Ready for Development" vs. "In Development")
- Swimlanes for different work types, priorities, or team members
- A "blocked" or "expedite" section for special situations
- Clear WIP limits displayed on each column
- Policy information visible near the board

### Card Design

Cards should contain enough information to be useful but not so much that they become hard to maintain. Typical information includes:
- Brief description of the work
- Unique identifier linking to detailed documentation
- Work type (feature, bug, technical debt, etc.)
- Size estimate or actual time spent
- Who is working on it
- Blockers or dependencies

Color coding cards by work type or priority can provide visual insights at a glance.

## Metrics and Improvement

Kanban emphasizes using metrics to drive improvement. Key metrics include:

### Lead Time

Lead time measures the time from when work is requested until it is delivered. This metric matters to customers and stakeholders who want to know how long their requests will take.

### Cycle Time

Cycle time measures the time from when work is started until it is completed. This metric helps the team understand their capacity and predict future performance. Tracking cycle time for different work types can reveal interesting patterns.

### Throughput

Throughput measures how many items the team completes in a given time period. While not the only important metric, throughput indicates the team's capacity and helps with planning.

### Work Item Age

Work item age shows how long current in-progress items have been in the system. Unusually old items may indicate problems that need attention.

These metrics support forecasting and improvement. By understanding their typical cycle time and throughput, teams can make probabilistic forecasts about when work will complete. By analyzing trends, teams can identify whether changes improve performance.

## Kanban vs. Scrum

While both Kanban and Scrum are Agile approaches, they differ significantly:

- **Scrum** is prescriptive, defining specific roles, events, and artifacts. It works in time-boxed iterations (Sprints) and involves batch planning.
- **Kanban** is adaptive, starting with your current process and evolving it. It works in continuous flow without iterations or batch planning.

Neither is inherently better; they suit different contexts. Some teams even combine elements of both in approaches sometimes called "Scrumban."

## Common Pitfalls

Teams new to Kanban often encounter challenges:
- **No WIP limits**: Without WIP limits, you have a visualized process but not Kanban
- **WIP limits too high**: Limits set so high they are never constraining
- **Not addressing blockers**: Visualizing blocked work without acting on it
- **Focusing only on the board**: Neglecting the metrics and continuous improvement
- **Cherry-picking work**: Violating pull principles by starting work out of priority order

Success with Kanban requires commitment to its principles, not just adopting its most visible practice (the board).
