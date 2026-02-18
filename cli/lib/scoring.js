function normalizeValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim().toLowerCase();
}

export function normalizeCodeOutput(value) {
  if (value === undefined || value === null) return '';
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/ +/g, ' ')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s*:\s*/g, ': ')
    .replace(/\[\s+/g, '[')
    .replace(/\s+\]/g, ']')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\{\s+/g, '{')
    .replace(/\s+\}/g, '}');
}

export function getCorrectOptionIndex(question) {
  const correctAnswer = question.correctAnswer;
  const optionsLength = Array.isArray(question.options) ? question.options.length : 0;

  if (typeof correctAnswer === 'number') {
    if (Number.isInteger(correctAnswer) && correctAnswer >= 0 && correctAnswer < optionsLength) {
      return correctAnswer;
    }
    return -1;
  }

  if (typeof correctAnswer === 'string' && Array.isArray(question.options)) {
    const byValue = question.options.indexOf(correctAnswer);
    if (byValue !== -1) return byValue;

    const trimmed = correctAnswer.trim();
    if (/^[A-Za-z]$/.test(trimmed)) {
      const idx = trimmed.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      if (idx >= 0 && idx < optionsLength) return idx;
    }

    const asNum = Number(trimmed);
    if (Number.isInteger(asNum) && asNum >= 0 && asNum < optionsLength) {
      return asNum;
    }
  }

  return -1;
}

export function normalizeMultipleChoiceAnswer(answer, optionsLength) {
  if (typeof answer === 'number') {
    return Number.isInteger(answer) ? answer : -1;
  }
  if (typeof answer === 'string') {
    const trimmed = answer.trim();
    if (/^[A-Za-z]$/.test(trimmed)) {
      return trimmed.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    }
    const asNum = Number(trimmed);
    if (Number.isInteger(asNum)) {
      return asNum;
    }
  }
  return optionsLength;
}

export function isCorrectNonCoding(question, answer) {
  if (answer === undefined || answer === null) {
    return false;
  }

  switch (question.type) {
    case 'multiple_choice': {
      const correctIndex = getCorrectOptionIndex(question);
      if (correctIndex < 0) return false;
      const answerIndex = normalizeMultipleChoiceAnswer(answer, question.options?.length ?? 0);
      return answerIndex === correctIndex;
    }
    case 'true_false':
      return answer === question.correctAnswer;
    case 'code_output':
      return normalizeCodeOutput(answer) === normalizeCodeOutput(question.correctAnswer);
    case 'fill_blank':
    case 'written':
      return normalizeValue(answer) === normalizeValue(question.correctAnswer);
    default:
      return false;
  }
}

export function calculateScore(totalQuestions, correctCount) {
  if (!totalQuestions) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function summarizePassFail(results) {
  const passed = results.filter((r) => r.passed).length;
  return {
    passed,
    total: results.length,
    failed: results.length - passed,
    allPassed: passed === results.length,
  };
}
