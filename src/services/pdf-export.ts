import { jsPDF } from 'jspdf';
import type { Subject, Quiz, Exercise, Project, CodingExercise, WrittenExercise } from '../core/types';

export interface PDFExportOptions {
  includeSolutions: boolean;
}

export function isCodingExercise(exercise: Exercise): exercise is CodingExercise {
  return 'starterCode' in exercise;
}

export function getDifficultyLabel(difficulty?: number): string {
  if (!difficulty) return '';
  const labels = ['', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert'];
  return labels[difficulty] || '';
}

// Strip markdown formatting for plain text
export function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '') // headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/`(.+?)`/g, '$1') // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/^\s*[-*+]\s+/gm, '• ') // list items
    .replace(/^\s*\d+\.\s+/gm, '') // numbered lists
    .trim();
}

// Wrap text to fit within page width
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('');
      continue;
    }
    const wrapped = doc.splitTextToSize(paragraph, maxWidth);
    lines.push(...wrapped);
  }

  return lines;
}

export async function generateSubjectPDF(
  subject: Subject,
  quizzes: Quiz[],
  exercises: Exercise[],
  projects: Project[],
  options: PDFExportOptions,
  onProgress?: (stage: string) => void
): Promise<void> {
  onProgress?.('Creating PDF...');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const subjectQuizzes = quizzes.filter(q => q.subjectId === subject.id);
  const subjectExercises = exercises.filter(e => e.subjectId === subject.id);
  const subjectProjects = projects.filter(p => p.subjectId === subject.id);

  // Helper to check if we need a new page
  const checkNewPage = (neededSpace: number = 20) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Helper to add text with automatic wrapping
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = wrapText(doc, text, contentWidth);
    const lineHeight = fontSize * 0.4;

    for (const line of lines) {
      checkNewPage(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
  };

  // Helper to add a section header
  const addSectionHeader = (title: string) => {
    checkNewPage(30);
    y += 5;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(99, 102, 241); // Indigo color
    doc.text(title, margin, y);
    y += 8;
    doc.setDrawColor(99, 102, 241);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setTextColor(0, 0, 0);
  };

  // Helper to add a subsection header
  const addSubsectionHeader = (title: string) => {
    checkNewPage(20);
    y += 3;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 60);
    doc.text(title, margin, y);
    y += 6;
    doc.setTextColor(0, 0, 0);
  };

  // Helper to add a styled code block
  const addCodeBlock = (code: string, language?: string) => {
    // Add language label if provided
    if (language) {
      doc.setTextColor(100, 100, 140);
      addText(`[${language.toUpperCase()}]`, 8, true);
      doc.setTextColor(0, 0, 0);
    }

    // Switch to monospace font
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    
    // Sanitize code: normalize line endings and replace tabs
    const safeCode = code.replace(/\r\n/g, '\n').replace(/\t/g, '    ');
    
    const codeLines = safeCode.split('\n');
    const lineHeight = 5; // Slightly taller line height for better readability

    for (const line of codeLines) {
      // Preserve leading whitespace
      const leadingSpaces = line.match(/^\s*/)?.[0].length || 0;
      const indentString = ' '.repeat(leadingSpaces);
      const content = line.trim();

      // Even empty lines get a background to maintain the block look
      if (!content) {
        checkNewPage(lineHeight);
        
        // Background
        doc.setFillColor(240, 240, 240); // Clearly visible light gray
        doc.rect(margin, y - 1, contentWidth, lineHeight, 'F');
        
        // Left accent border (darker gray)
        doc.setFillColor(200, 200, 200);
        doc.rect(margin, y - 1, 1, lineHeight, 'F');
        
        y += lineHeight;
        continue;
      }

      // Wrap content
      const indentWidth = leadingSpaces * 2; 
      const availableWidth = contentWidth - indentWidth - 2; // -2 for right padding
      
      // Ensure font is active for splitTextToSize calculation
      doc.setFont('courier', 'normal');
      const wrappedLines = doc.splitTextToSize(content, availableWidth);

      for (const wLine of wrappedLines) {
         checkNewPage(lineHeight);
         
         // 1. Draw Background
         doc.setFillColor(240, 240, 240);
         doc.rect(margin, y - 1, contentWidth, lineHeight, 'F');

         // 2. Draw Left Accent Border
         doc.setFillColor(200, 200, 200);
         doc.rect(margin, y - 1, 1, lineHeight, 'F');

         // 3. Draw Text
         const displayText = (wLine === wrappedLines[0]) 
           ? indentString + wLine 
           : indentString + '  ' + wLine;

         doc.setFont('courier', 'normal'); // Re-apply font
         doc.setFontSize(9);
         doc.setTextColor(50, 50, 80); // Dark blue-gray text
         
         // Offset x by 3mm (1mm border + 2mm padding)
         doc.text(displayText, margin + 3, y + 2.5); 
         
         y += lineHeight;
      }
    }

    // Revert to standard font
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    y += 4; // Add some space after the block
  };

  // ============ COVER PAGE ============
  onProgress?.('Adding cover page...');

  // Title
  y = 60;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241);
  doc.text(subject.code, pageWidth / 2, y, { align: 'center' });

  y += 15;
  doc.setFontSize(28);
  doc.setTextColor(30, 30, 60);
  const titleLines = doc.splitTextToSize(subject.title, contentWidth);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 12;

  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Year ${subject.year} • Semester ${subject.semester} • ${subject.estimatedHours} hours`, pageWidth / 2, y, { align: 'center' });

  // Description
  y += 20;
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  const descLines = wrapText(doc, subject.description, contentWidth - 20);
  for (const line of descLines) {
    doc.text(line, margin + 10, y);
    y += 5;
  }

  // Learning Objectives
  y += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 60);
  doc.text('Learning Objectives', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  for (const objective of subject.learningObjectives) {
    const objLines = wrapText(doc, `• ${objective}`, contentWidth - 10);
    for (const line of objLines) {
      doc.text(line, margin + 5, y);
      y += 5;
    }
    y += 2;
  }

  // ============ TOPICS ============
  onProgress?.('Adding topics...');

  for (let i = 0; i < subject.topics.length; i++) {
    const topic = subject.topics[i];
    doc.addPage();
    y = margin;

    addSectionHeader(`Topic ${i + 1}: ${topic.title}`);

    if (topic.content) {
      // Process markdown content - simplified
      const plainText = stripMarkdown(topic.content);
      const paragraphs = plainText.split('\n\n');

      for (const para of paragraphs) {
        if (para.trim()) {
          addText(para.trim(), 10);
          y += 3;
        }
      }
    } else {
      addText('Content not yet available.', 10, true);
    }

    // Add topic quizzes if solutions enabled
    if (options.includeSolutions) {
      const topicQuizzes = subjectQuizzes.filter(q => q.topicId === topic.id);
      if (topicQuizzes.length > 0) {
        y += 10;
        addSubsectionHeader('Quiz Answers');

        for (const quiz of topicQuizzes) {
          addText(quiz.title, 11, true);
          y += 3;

          for (let qi = 0; qi < quiz.questions.length; qi++) {
            const q = quiz.questions[qi];
            checkNewPage(30);

            addText(`Q${qi + 1}: ${q.prompt}`, 10);

            // Show code snippet if present
            if (q.codeSnippet) {
              y += 2;
              addCodeBlock(q.codeSnippet);
            }

            let answer = '';
            if (typeof q.correctAnswer === 'boolean') {
              answer = q.correctAnswer ? 'True' : 'False';
            } else if (q.options && typeof q.correctAnswer === 'number') {
              answer = q.options[q.correctAnswer];
            } else {
              answer = String(q.correctAnswer);
            }

            doc.setTextColor(34, 139, 34); // Green
            addText(`Answer: ${answer}`, 10, true);
            doc.setTextColor(0, 0, 0);

            doc.setTextColor(100, 100, 100);
            addText(q.explanation, 9);
            doc.setTextColor(0, 0, 0);
            y += 5;
          }
        }
      }
    }
  }

  // ============ EXERCISES ============
  onProgress?.('Adding exercises...');

  if (subjectExercises.length > 0) {
    doc.addPage();
    y = margin;
    addSectionHeader('Exercises');

    for (let i = 0; i < subjectExercises.length; i++) {
      const exercise = subjectExercises[i];
      checkNewPage(50);

      const difficulty = getDifficultyLabel(exercise.difficulty);
      addSubsectionHeader(`${i + 1}. ${exercise.title}${difficulty ? ` (${difficulty})` : ''}`);

      // Description
      addText(stripMarkdown(exercise.description), 10);
      y += 3;

      if (isCodingExercise(exercise)) {
        // Language
        doc.setTextColor(100, 100, 100);
        addText(`Language: ${exercise.language}`, 9);
        doc.setTextColor(0, 0, 0);

        // Test cases (visible ones only)
        const visibleTests = exercise.testCases.filter(tc => !tc.isHidden);
        if (visibleTests.length > 0) {
          y += 3;
          addText('Test Cases:', 10, true);
          for (const tc of visibleTests) {
            addText(`  Input: ${tc.input} → Expected: ${tc.expectedOutput}`, 9);
          }
        }

        // Solution if enabled
        if (options.includeSolutions) {
          y += 5;
          doc.setTextColor(34, 139, 34);
          addText('Solution:', 10, true);
          doc.setTextColor(0, 0, 0);
          y += 2;
          addCodeBlock(exercise.solution, exercise.language);
        }
      } else {
        // Written exercise
        const written = exercise as WrittenExercise;
        if (options.includeSolutions && written.solution) {
          y += 5;
          doc.setTextColor(34, 139, 34);
          addText('Solution:', 10, true);
          doc.setTextColor(0, 0, 0);
          addText(stripMarkdown(written.solution), 10);
        }
      }

      y += 8;
    }
  }

  // ============ PROJECTS ============
  onProgress?.('Adding projects...');

  if (subjectProjects.length > 0) {
    doc.addPage();
    y = margin;
    addSectionHeader('Projects');

    for (let i = 0; i < subjectProjects.length; i++) {
      const project = subjectProjects[i];
      checkNewPage(50);

      addSubsectionHeader(`${i + 1}. ${project.title}`);
      doc.setTextColor(100, 100, 100);
      addText(`Estimated time: ${project.estimatedHours} hours`, 9);
      doc.setTextColor(0, 0, 0);
      y += 3;

      addText(stripMarkdown(project.description), 10);
      y += 5;

      addText('Requirements:', 10, true);
      for (const req of project.requirements) {
        addText(`• ${req}`, 10);
      }
      y += 5;

      // Rubric
      addText('Grading Rubric:', 10, true);
      for (const criterion of project.rubric) {
        addText(`${criterion.name} (${criterion.weight}%)`, 10, true);
        for (const level of criterion.levels) {
          addText(`  ${level.score}pts - ${level.label}: ${level.description}`, 9);
        }
        y += 3;
      }

      y += 10;
    }
  }

  // ============ QUIZZES (questions only, if solutions disabled) ============
  if (!options.includeSolutions && subjectQuizzes.length > 0) {
    doc.addPage();
    y = margin;
    addSectionHeader('Quizzes');

    for (const quiz of subjectQuizzes) {
      checkNewPage(30);
      addSubsectionHeader(quiz.title);

      for (let qi = 0; qi < quiz.questions.length; qi++) {
        const q = quiz.questions[qi];
        checkNewPage(25);

        addText(`${qi + 1}. ${q.prompt}`, 10);

        if (q.codeSnippet) {
          y += 2;
          addCodeBlock(q.codeSnippet);
          y += 2;
        }

        if (q.options) {
          const letters = ['A', 'B', 'C', 'D', 'E'];
          for (let oi = 0; oi < q.options.length; oi++) {
            addText(`   ${letters[oi]}. ${q.options[oi]}`, 10);
          }
        } else if (q.type === 'true_false') {
          addText('   True / False', 10);
        } else {
          addText('   Answer: _________________', 10);
        }

        y += 5;
      }
      y += 5;
    }
  }

  // Save the PDF
  onProgress?.('Saving PDF...');
  const filename = `${subject.code}-${subject.title.replace(/\s+/g, '-')}.pdf`;
  doc.save(filename);
  onProgress?.('Complete!');
}

export function getSubjectContentStats(
  subject: Subject,
  quizzes: Quiz[],
  exercises: Exercise[],
  projects: Project[]
): { topics: number; quizzes: number; exercises: number; projects: number } {
  return {
    topics: subject.topics.length,
    quizzes: quizzes.filter(q => q.subjectId === subject.id).length,
    exercises: exercises.filter(e => e.subjectId === subject.id).length,
    projects: projects.filter(p => p.subjectId === subject.id).length,
  };
}
