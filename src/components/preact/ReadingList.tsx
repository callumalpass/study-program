import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import type { Reading, ReadingType } from '@/core/types';
import { Icons } from '@/components/icons';

interface ReadingListProps {
  readings: Reading[];
  topicTitle?: string;
}

const typeLabels: Record<ReadingType, string> = {
  paper: 'Academic Paper',
  documentation: 'Documentation',
  textbook: 'Textbook',
  article: 'Article',
  rfc: 'RFC',
  video: 'Video',
};

const typeIcons: Record<ReadingType, string> = {
  paper: Icons.FileText,
  documentation: Icons.Globe,
  textbook: Icons.Book,
  article: Icons.FileText,
  rfc: Icons.FileText,
  video: Icons.Video,
};

function formatAuthors(authors: string[] | undefined): string {
  if (!authors || authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(' & ');
  return `${authors[0]} et al.`;
}

function formatEstimatedTime(minutes: number | undefined): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

export function ReadingList({ readings, topicTitle }: ReadingListProps) {
  const { required, optional } = useMemo(() => {
    const required = readings.filter(r => r.required);
    const optional = readings.filter(r => !r.required);
    return { required, optional };
  }, [readings]);

  if (readings.length === 0) return null;

  const renderReading = (reading: Reading) => (
    <a
      key={reading.id}
      href={reading.url}
      target="_blank"
      rel="noopener noreferrer"
      class={`reading-item reading-type-${reading.type}`}
    >
      <span class="reading-icon" dangerouslySetInnerHTML={{ __html: typeIcons[reading.type] }} />
      <div class="reading-content">
        <div class="reading-header">
          <span class="reading-title">{reading.title}</span>
          <span class="reading-external" dangerouslySetInnerHTML={{ __html: Icons.ExternalLink }} />
        </div>
        <div class="reading-meta">
          {reading.authors && reading.authors.length > 0 && (
            <span class="reading-authors">{formatAuthors(reading.authors)}</span>
          )}
          {reading.year && (
            <span class="reading-year">({reading.year})</span>
          )}
          <span class="reading-type-badge">{typeLabels[reading.type]}</span>
          {reading.estimatedMinutes && (
            <span class="reading-time">
              <span class="time-icon" dangerouslySetInnerHTML={{ __html: Icons.Clock }} />
              {formatEstimatedTime(reading.estimatedMinutes)}
            </span>
          )}
        </div>
        {reading.description && (
          <p class="reading-description">{reading.description}</p>
        )}
      </div>
    </a>
  );

  return (
    <section class="reading-list" aria-labelledby="readings-heading">
      <div class="reading-list-header">
        <span class="reading-list-icon" dangerouslySetInnerHTML={{ __html: Icons.BookOpen }} />
        <h2 id="readings-heading">Readings</h2>
        {topicTitle && <span class="reading-list-context">for {topicTitle}</span>}
      </div>

      {required.length > 0 && (
        <div class="reading-group">
          <h3 class="reading-group-title required">
            Required
            <span class="reading-count">{required.length}</span>
          </h3>
          <div class="reading-items">
            {required.map(renderReading)}
          </div>
        </div>
      )}

      {optional.length > 0 && (
        <div class="reading-group">
          <h3 class="reading-group-title optional">
            Further Reading
            <span class="reading-count">{optional.length}</span>
          </h3>
          <div class="reading-items">
            {optional.map(renderReading)}
          </div>
        </div>
      )}
    </section>
  );
}
