---
id: cs204-t2-elicitation
title: "Elicitation Techniques"
order: 2
---

# Requirements Elicitation Techniques

Requirements elicitation is the process of discovering, extracting, and gathering requirements from stakeholders and other sources. It is one of the most challenging aspects of requirements engineering because stakeholders often have difficulty articulating their needs, may have conflicting requirements, or may not know what they want until they see it. Successful elicitation requires using multiple techniques and carefully selecting the right approach for each situation.

## Interviews

Interviews are one of the most commonly used elicitation techniques, involving one-on-one or small group discussions with stakeholders to understand their needs, goals, and constraints.

### Types of Interviews

**Structured Interviews**: Use a predetermined set of questions asked in a specific order. This approach ensures consistency across multiple stakeholders and makes it easier to compare responses. Example questions might include: "What are the three most important features you need?" or "How many concurrent users do you expect?"

**Unstructured Interviews**: Follow a more conversational approach with open-ended questions, allowing stakeholders to discuss what they consider important. This technique is valuable for exploratory discovery when you're still trying to understand the problem domain.

**Semi-Structured Interviews**: Combine both approaches with a set of core questions but flexibility to pursue interesting topics as they emerge. This is often the most effective approach, balancing consistency with adaptability.

### Interview Best Practices

**Preparation**: Research the stakeholder's role, department, and potential needs before the interview. Prepare open-ended questions that encourage detailed responses. For example, instead of "Do you need reporting features?" ask "Tell me about how you currently analyze and report on your data."

**Active Listening**: Pay attention not just to what is said, but how it's said. Listen for pain points, frustrations, and emotional cues. Take notes, but maintain eye contact and engagement. Use phrases like "Tell me more about that" to encourage elaboration.

**Question Techniques**: Use the "Five Whys" technique to uncover root causes. If a stakeholder says "We need faster reports," ask "Why do you need faster reports?" This might reveal the underlying need is actually about making time-sensitive decisions, which could lead to different solutions.

**Avoiding Bias**: Don't lead witnesses. Instead of "Would you like the system to do X?" ask "How do you currently handle this task?" Let stakeholders describe their needs rather than confirming your assumptions.

**Documentation**: Summarize key points during the interview to confirm understanding: "So if I understand correctly, you need to process customer orders within 24 hours, is that right?" Send written summaries after interviews for stakeholder confirmation.

## Workshops and JAD Sessions

Joint Application Development (JAD) workshops bring together diverse stakeholders in facilitated sessions to define requirements collaboratively. These intensive sessions can accomplish in days what might take weeks through individual interviews.

### Workshop Structure

**Participant Selection**: Include representatives from all key stakeholder groups: end users, business owners, technical teams, and subject matter experts. Limit groups to 8-12 people for productive discussion.

**Facilitation**: A skilled facilitator (ideally someone not invested in the outcome) guides discussion, manages conflicts, keeps the group focused, and ensures all voices are heard. The facilitator should prevent dominant personalities from overshadowing quieter participants.

**Activities**: Workshops might include brainstorming sessions, prioritization exercises (like MoSCoW: Must have, Should have, Could have, Won't have), use case development, or prototyping sessions.

### Workshop Techniques

**Brainstorming**: Generate ideas without immediate criticism. Set a time limit (e.g., 15 minutes) and encourage quantity over quality initially. Use techniques like round-robin where each person contributes in turn.

**Affinity Mapping**: Write requirements or ideas on sticky notes, then collaboratively group related items. This helps identify themes and organize complex requirement sets.

**Prioritization**: Use techniques like dot voting (each participant gets limited votes to allocate to their top priorities) or the MoSCoW method to establish what's essential versus what's desirable.

## Observation and Ethnographic Studies

Observation involves watching users perform their current tasks in their actual work environment. This technique is invaluable because people often can't accurately describe what they do, and they may have developed workarounds that indicate problems with current systems.

### Types of Observation

**Passive Observation**: Watch users work without interfering. Take notes on their actions, tools they use, challenges they encounter, and informal processes. This provides authentic insight into actual practice versus stated procedures.

**Active Observation**: Ask questions while observing: "Why did you do that?" or "What would you do if X happened?" This clarifies the reasoning behind actions.

**Apprenticing**: Actually perform the user's job yourself to gain firsthand experience of the challenges and requirements. This deep immersion provides insights no interview can match.

### Observation Best Practices

Observe multiple users to identify patterns versus individual quirks. Watch for workarounds - these often indicate requirements the current system doesn't meet. Note the context: interruptions, time pressures, environmental factors that affect work. Be aware that observation can change behavior (the Hawthorne effect) - users may work more carefully or differently when being watched.

## Prototyping

Prototyping involves creating early, simplified versions of the system to help stakeholders visualize and react to proposed solutions. The adage "I'll know it when I see it" makes prototyping particularly valuable for user interface requirements and innovative features.

### Types of Prototypes

**Low-Fidelity Prototypes**: Paper sketches, wireframes, or simple mockups that show layout and basic functionality. These are quick and cheap to create and modify, making them ideal for early exploration. Tools like Balsamiq or even hand-drawn sketches work well.

**High-Fidelity Prototypes**: Interactive mockups that closely resemble the final product in appearance and functionality. Tools like Figma, Adobe XD, or coded prototypes using frameworks like Bootstrap provide realistic user experiences.

**Throwaway Prototypes**: Created specifically for requirements discovery and then discarded. The code is not production-quality - it's designed to be quick and expendable.

**Evolutionary Prototypes**: Started as prototypes but refined into the actual system. This approach requires more discipline to ensure code quality from the start.

### Prototyping Process

**Define Objectives**: Be clear about what you're trying to learn from the prototype. Are you validating a workflow, testing navigation, or confirming a visual design?

**Build Quickly**: Don't perfect the prototype. Include just enough to get meaningful feedback. Use placeholder text and images. Focus on the aspects you're testing.

**Iterate**: Show the prototype to stakeholders, gather feedback, revise, and repeat. Each iteration should address specific questions or concerns raised in the previous round.

**Document Learning**: The real value of prototyping is what you learn, not the prototype itself. Document insights, decisions made, and requirements discovered during the prototyping process.

## Questionnaires and Surveys

When you have many stakeholders or need to gather information from geographically distributed users, questionnaires and surveys provide an efficient elicitation method.

### Survey Design Principles

**Clear Questions**: Avoid jargon and ambiguity. Each question should address one topic only. Bad: "Are the current reports timely and useful?" Good: Two separate questions about timeliness and usefulness.

**Mix Question Types**: Use multiple choice for quantifiable data, rating scales (1-5) for satisfaction or importance, and open-ended questions for detailed feedback. Balance the need for data with respondent fatigue - surveys over 20 questions see significant drop-off.

**Logical Flow**: Group related questions together. Start with easy, non-threatening questions to build engagement. Save demographic questions for the end.

**Pilot Testing**: Test your survey with a small group before full distribution to identify confusing questions or technical issues.

## Document Analysis

Examining existing documentation provides requirements information without requiring stakeholder time. Analyze current system documentation, business process documents, regulations, standards, competitor products, and customer support logs.

Look for explicit requirements in specifications and contracts. Identify implicit requirements from business rules and procedures. Find gaps where documentation is silent on important topics. Note contradictions between different documents that need resolution.

## Choosing the Right Technique

Different situations call for different techniques. Use interviews for stakeholder-specific needs and sensitive topics. Employ workshops when you need group consensus and have scheduling flexibility. Apply observation for process-intensive work where users can't easily articulate their needs. Use prototyping for novel interfaces or features where stakeholders need to see possibilities. Deploy surveys for broad user populations and statistical validation.

Most successful projects use multiple techniques. For example, start with document analysis to understand context, conduct interviews to identify key stakeholders and issues, run workshops to build consensus on priorities, use prototyping to refine interface requirements, and validate findings with surveys of the broader user population.

## Conclusion

Requirements elicitation is both an art and a science. Different techniques reveal different types of requirements and work better with different stakeholders. The most effective requirements engineers master multiple techniques and know when to apply each one. They combine analytical skills with interpersonal abilities, technical understanding with business awareness. By thoughtfully selecting and skillfully applying elicitation techniques, you can uncover the true needs of stakeholders and establish a solid foundation for successful software development.
