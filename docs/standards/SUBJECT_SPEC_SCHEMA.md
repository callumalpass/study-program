# Subject Specification Schema

Per-subject specification files guide content creation toward pedagogically appropriate material. Each subject gets a `subject-spec.yaml` that documents what good content looks like for that specific subject and justifies assessment choices.

---

## File Location

```
src/subjects/{subject-id}/subject-spec.yaml
```

---

## Schema

```yaml
# ==============================================================================
# SUBJECT IDENTITY
# ==============================================================================

id: string                    # e.g., "math303"
title: string                 # e.g., "Real Analysis"
category: string              # e.g., "math", "cs", "econ", "philosophy", etc.

role:
  level: "introductory" | "intermediate" | "advanced" | "capstone"

  # The core transformation this subject achieves in the student
  transformation: string
  # e.g., "From 'calculus works' to 'I can prove why calculus works'"
  # e.g., "From 'I can't program' to 'I can solve problems with code'"

# ==============================================================================
# CURRICULUM
# ==============================================================================

curriculum:
  # Minimum average word count per subtopic (base standard: 800)
  # Proof-heavy or conceptually dense subjects may need more
  subtopic_word_target: number
  # e.g., 800 for programming (code speaks for itself)
  # e.g., 1000 for proofs (need worked examples + counterexamples)

  # What students should already know before taking this subject
  prerequisite_knowledge:
    - string                  # e.g., "Basic algebra and arithmetic"
    - string                  # e.g., "Comfortable with mathematical notation"

  # High-level concepts that MUST be covered (guides topic creation)
  # Not 1:1 with topics—these are curriculum requirements
  essential_concepts:
    - string                  # e.g., "Variables and data types"
    - string                  # e.g., "Control flow (conditionals, loops)"
    - string                  # e.g., "Functions and decomposition"

  # Optional: concepts explicitly out of scope
  out_of_scope:               # Optional
    - string                  # e.g., "Object-oriented programming (covered in CS102)"
    - string                  # e.g., "Measure theory (graduate-level topic)"

# ==============================================================================
# PEDAGOGICAL APPROACH
# ==============================================================================

pedagogy:
  # How knowledge is structured in this subject
  knowledge_type: "procedural" | "conceptual" | "proof-based" | "applied" | "mixed"

  # What successful mastery looks like (specific, observable)
  mastery_indicators:
    - string                  # e.g., "Constructs epsilon-delta proofs for novel limits"
    - string                  # e.g., "Translates word problems into working code"

  # Common failure modes to actively address in content
  common_struggles:
    - string                  # e.g., "Confusing quantifier order in definitions"
    - string                  # e.g., "Writing code that works for examples but fails edge cases"

# ==============================================================================
# CONTENT STANDARDS
# ==============================================================================

content:
  # Subject-specific requirements beyond the base standard
  subtopic_requirements:
    - string                  # e.g., "Each definition followed by a non-example"
    - string                  # e.g., "Proof sketches before formal proofs"
    - string                  # e.g., "All code examples must be runnable as-is"

  # Notation or technical conventions (if any)
  conventions:
    - string                  # e.g., "LaTeX for all mathematical expressions"
    - string                  # e.g., "Python 3.10+ with type hints"

# ==============================================================================
# ASSESSMENT PHILOSOPHY
# ==============================================================================

assessment:
  # Why these assessment types for this subject
  philosophy: string
  # e.g., "Proof-writing is the core skill; exams must require construction, not recognition.
  #        Fewer deep problems reveal understanding better than many shallow ones."
  # e.g., "Programming fluency comes from volume of practice with immediate feedback.
  #        Many small exercises with automated testing builds confidence."

  # What assessments specifically measure in this subject
  measures:
    - string                  # e.g., "Ability to construct valid proofs"
    - string                  # e.g., "Code correctness across edge cases"

  # What to avoid in assessments
  anti_patterns:
    - string                  # e.g., "Memorization of specific proofs from the text"
    - string                  # e.g., "Syntax trivia without problem-solving"

# ==============================================================================
# GRADING THRESHOLDS
# ==============================================================================

grading:
  passing_score: number       # Percentage required to pass (e.g., 60, 70)

  # Optional: different thresholds for different assessment types
  thresholds:                 # Optional section
    exercises: number         # e.g., 70 - must pass 70% of exercises
    quizzes: number           # e.g., 65
    exams: number             # e.g., 60

  # Grading philosophy
  rationale: string
  # e.g., "Higher threshold because proof-writing is pass/fail—partial proofs don't count"
  # e.g., "Lower threshold because this is an introductory subject focused on building confidence"

# ==============================================================================
# EXERCISE SPECIFICATIONS
# ==============================================================================

exercises:
  # Why exercises are structured this way
  rationale: string
  # e.g., "Scaffolds proof-writing from fill-in-the-gap to full construction"

  # Exercise type and validation distribution
  #
  # Available types:
  #   - coding: Has starterCode, language. May have testCases.
  #   - written: Prose/proof response. Has solution for AI comparison.
  #
  # Validation methods:
  #   - automated: Uses testCases for pass/fail (coding only)
  #   - ai: AI evaluates against solution (coding without tests, or written)
  #
  types:
    coding_with_tests: string   # e.g., "80%" - coding validated by test cases
    coding_ai_evaluated: string # e.g., "10%" - coding evaluated by AI (no tests)
    written: string             # e.g., "10%" - prose/proof evaluated by AI
    justification: string
    # e.g., "Intro programming - tests provide immediate feedback for beginners"
    # e.g., "Algorithms - design exercises need AI evaluation, implementations need tests"
    # e.g., "Pure math - all proofs evaluated by AI"

  # Quantity per topic (flexible range)
  per_topic:
    minimum: number
    target: number
    maximum: number
    justification: string

  # Difficulty distribution (overrides base standard 3/3/4/3/3 if needed)
  difficulty_distribution:    # Optional - omit to use base standard
    1: number
    2: number
    3: number
    4: number
    5: number
    justification: string

# ==============================================================================
# QUIZ SPECIFICATIONS
# ==============================================================================

quizzes:
  rationale: string

  per_topic:
    count: number             # Quizzes per topic (base: 3)
    questions_each: number    # Questions per quiz (base: 5)
    justification: string

  # Question type distribution
  # Available types: multiple_choice, fill_blank, true_false, code_output, coding, written
  question_types:
    multiple_choice: string   # e.g., "50%" - conceptual understanding
    true_false: string        # e.g., "15%" - common misconceptions
    fill_blank: string        # e.g., "10%" - terminology, syntax
    code_output: string       # e.g., "25%" - code tracing (CS subjects)
    coding: string            # e.g., "0%" - short coding problems
    written: string           # e.g., "0%" - short prose/proof answers
    justification: string

# ==============================================================================
# EXAM SPECIFICATIONS
# ==============================================================================

exams:
  rationale: string
  # e.g., "8-10 proof problems over 2.5 hours allows depth; time pressure tests fluency"

  midterm:
    questions:
      minimum: number
      target: number
      maximum: number
    duration_minutes: number
    format: string            # e.g., "5-6 proofs, 2-3 definitions"
    coverage: string          # e.g., "Topics 1-4"

  final:
    questions:
      minimum: number
      target: number
      maximum: number
    duration_minutes: number
    format: string
    coverage: string
    cumulative: boolean

# ==============================================================================
# PROJECT SPECIFICATIONS
# ==============================================================================

projects:
  required: boolean
  count: number               # 0 if not required

  # If projects are used
  rationale: string           # Why projects for this subject (or why not)
  goals:                      # What projects should demonstrate
    - string
  estimated_hours: string     # e.g., "10-15"

# ==============================================================================
# SUBJECT-SPECIFIC RED FLAGS
# ==============================================================================

red_flags:
  # Content problems specific to this subject (not universal quality issues)
  - string                    # e.g., "Exercise requires specific proof from text, not technique"
  - string                    # e.g., "Code solution uses library that wasn't taught"

# ==============================================================================
# NOTES
# ==============================================================================

notes: string                 # Optional guidance for content creators
```

---

## Relationship to Base Standard

| Aspect | Base Standard | Subject Spec |
|--------|---------------|--------------|
| Topics per subject | 7 | 7 (fixed) |
| Subtopics per topic | 7 | 7 (fixed) |
| Subtopic word count | 800+ | **Configurable target** (e.g., 1000 for proofs) |
| Essential concepts | Not specified | **Required curriculum outline** |
| Exercises per topic | 16 | **Range with justification** |
| Quizzes per topic | 3 × 5 | **Configurable** |
| Exam questions | 25-30 / 40-45 | **Range with justification** |
| Difficulty distribution | 3/3/4/3/3 | **Configurable** |
| Passing threshold | Not specified | **Per-subject** |
| Projects | 2-3 for CS | **Per-subject decision** |

The base standard provides structure. The subject spec provides justified customization.
