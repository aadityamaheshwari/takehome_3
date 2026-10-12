import { useEffect, useState } from 'react';
import type {
  CourseProgress,
  LearnerProgressResponse,
  ApiErrorResponse,
  StatusFilter,
} from './types';

export function App() {
  const [learnerId, setLearnerId] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('in_progress');
  const [courses, setCourses] = useState<CourseProgress[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const url = `/api/learners/${learnerId}/progress?status=${statusFilter}`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const errData = (await res.json().catch(() => ({}))) as ApiErrorResponse;
          throw new Error(errData.error || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json() as Promise<LearnerProgressResponse>;
      })
      .then((body) => {
        if (isMounted) {
          setCourses(body.courses);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message);
          setCourses(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [learnerId, statusFilter]);

  return (
    <main className="page">
      <p className="eyebrow">Docebo · pilot</p>
      <h1>My progress</h1>
      <p className="lede">Viewing learning progress for learner {learnerId}.</p>

      {/* Demo Controls */}
      <div className="controls-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ marginRight: '0.5rem', fontWeight: 600 }}>Switch Learner:</label>
          <button
            type="button"
            onClick={() => setLearnerId(1)}
            style={{ fontWeight: learnerId === 1 ? 'bold' : 'normal', marginRight: '0.25rem' }}
          >
            Learner 1
          </button>
          <button
            type="button"
            onClick={() => setLearnerId(2)}
            style={{ fontWeight: learnerId === 2 ? 'bold' : 'normal', marginRight: '0.25rem' }}
          >
            Learner 2
          </button>
          <button
            type="button"
            onClick={() => setLearnerId(999)}
            style={{ fontWeight: learnerId === 999 ? 'bold' : 'normal' }}
          >
            Learner 999 (404 Error)
          </button>
        </div>

        <div>
          <label htmlFor="status-filter" style={{ marginRight: '0.5rem', fontWeight: 600 }}>
            Filter Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not_started">Not Started</option>
            <option value="all">All Courses</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container" style={{ padding: '2rem 0', opacity: 0.7 }}>
          <p>Loading course progress...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="error-banner" style={{ padding: '1rem', background: '#fde8e8', color: '#9b1c1c', borderRadius: '6px', marginBottom: '1rem' }}>
          <h3>Unable to load progress</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && courses && courses.length === 0 && (
        <div className="empty-state" style={{ padding: '2rem 0', color: '#666' }}>
          <p>No courses found matching status "{statusFilter}".</p>
        </div>
      )}

      {/* Course List */}
      {!loading && !error && courses && courses.length > 0 && (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.courseId} className="course">
              <h2>{course.title}</h2>
              <p className="meta">
                {course.completionPercentage}% · {new Date(course.lastActivityAt).toLocaleDateString()}
              </p>
              {course.isStale && <span className="badge">Inactive</span>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
