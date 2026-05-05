# Validation

Use validation as the trust boundary for agent-authored content.

Core commands:

```bash
stup content validate --content-pack <pack-dir>
stup content index
stup plan validate
stup learner derive --check
```

Validation checks include:

- pack manifest presence and schema version
- duplicate pack object IDs
- subject prerequisites
- track subject references
- topic quiz and exercise references
- assessment question IDs, answers, options, and explanations
- prerequisite graph cycles
- concept references when a concept graph is present
- project rubric totals when rubrics declare weights

Validation JSON is available with `--json` for precise agent handling.
