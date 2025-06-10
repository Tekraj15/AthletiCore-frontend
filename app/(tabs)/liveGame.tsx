import React, { useState, useEffect, useCallback } from 'react';
// add this near the other imports
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

// Type definitions
type AttemptStatus = 'available' | 'pending' | 'submitted';
type AttemptResult = 'success' | 'failed' | null;
type LiftType = 'squat' | 'bench' | 'deadlift';

interface Attempt {
  round: number;
  weight: number;
  status: AttemptStatus;
  result: AttemptResult;
  locked: boolean;
  changes: number;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

interface PendingSubmission {
  lift: LiftType;
  round: number;
  weight: number;
}

interface Athlete {
  name: string;
  weightClass: string;
  bodyWeight: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  weightClass: string;
  bodyWeight: string;
  squat: { best: number; attempts: string[] };
  bench: { best: number; attempts: string[] };
  deadlift: { best: number; attempts: string[] };
  total: number;
  glPoints: number;
  isRecord: boolean;
  recentChange: boolean;
  isCurrentUser?: boolean;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const PowerliftingCompetition = () => {
  // Mock athlete data
  const [currentAthlete] = useState<Athlete>({
    name: "Sarah Johnson",
    weightClass: "63kg",
    bodyWeight: "62.4kg"
  });

  // Lift attempts state
  const [attempts, setAttempts] = useState<Record<LiftType, Attempt[]>>({
    squat: [
      { round: 1, weight: 120, status: 'submitted', result: 'success', locked: true, changes: 0 },
      { round: 2, weight: 127.5, status: 'submitted', result: 'success', locked: true, changes: 0 },
      { round: 3, weight: 135, status: 'pending', result: null, locked: false, changes: 2 }
    ],
    bench: [
      { round: 1, weight: 70, status: 'pending', result: null, locked: false, changes: 2 },
      { round: 2, weight: 75, status: 'available', result: null, locked: false, changes: 2 },
      { round: 3, weight: 80, status: 'available', result: null, locked: false, changes: 2 }
    ],
    deadlift: [
      { round: 1, weight: 150, status: 'available', result: null, locked: false, changes: 2 },
      { round: 2, weight: 160, status: 'available', result: null, locked: false, changes: 2 },
      { round: 3, weight: 167.5, status: 'available', result: null, locked: false, changes: 2 }
    ]
  });

  // UI States
  const [activeTab, setActiveTab] = useState<LiftType>('squat');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(45);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [pendingSubmission, setPendingSubmission] = useState<PendingSubmission | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [compactView, setCompactView] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'rank', direction: 'asc' });

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1, name: "Maria Rodriguez", weightClass: "63kg", bodyWeight: "62.1kg",
      squat: { best: 140, attempts: ['140✓', '147.5✓', '152.5✗'] },
      bench: { best: 85, attempts: ['80✓', '85✓', '90✗'] },
      deadlift: { best: 170, attempts: ['165✓', '170✓', '175✗'] },
      total: 395, glPoints: 425.8, isRecord: true, recentChange: false
    },
    {
      rank: 2, name: "Sarah Johnson", weightClass: "63kg", bodyWeight: "62.4kg",
      squat: { best: 127.5, attempts: ['120✓', '127.5✓', '135○'] },
      bench: { best: 0, attempts: ['70○', '75○', '80○'] },
      deadlift: { best: 0, attempts: ['150○', '160○', '167.5○'] },
      total: 127.5, glPoints: 137.2, isRecord: false, recentChange: true, isCurrentUser: true
    },
    {
      rank: 3, name: "Emma Thompson", weightClass: "63kg", bodyWeight: "61.8kg",
      squat: { best: 125, attempts: ['120✓', '125✓', '130✗'] },
      bench: { best: 77.5, attempts: ['72.5✓', '77.5✓', '82.5✗'] },
      deadlift: { best: 155, attempts: ['150✓', '155✓', '162.5✗'] },
      total: 357.5, glPoints: 385.7, isRecord: false, recentChange: false
    }
  ]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 60);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock WebSocket connection
  useEffect(() => {
    const connectionTimer = setInterval(() => {
      setIsConnected(Math.random() > 0.1);
    }, 5000);
    return () => clearInterval(connectionTimer);
  }, []);

  // Show notification
  const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Handle weight change
  const handleWeightChange = (lift: LiftType, round: number, weight: string) => {
    setAttempts(prev => ({
      ...prev,
      [lift]: prev[lift].map((attempt: Attempt) => 
        attempt.round === round 
          ? { ...attempt, weight: parseFloat(weight) || 0 }
          : attempt
      )
    }));
  };

  // Handle submission
  const handleSubmit = (lift: LiftType, round: number) => {
    const attempt = attempts[lift].find((a: Attempt) => a.round === round);
    if (attempt) {
      setPendingSubmission({ lift, round, weight: attempt.weight });
      setShowConfirmDialog(true);
    }
  };

  // Confirm submission
  const confirmSubmission = () => {
    if (!pendingSubmission) return;
    
    const { lift, round, weight } = pendingSubmission;
    
    setAttempts(prev => ({
      ...prev,
      [lift]: prev[lift].map((attempt: Attempt) => 
        attempt.round === round 
          ? { ...attempt, status: 'submitted' as AttemptStatus, changes: Math.max(0, attempt.changes - 1) }
          : attempt
      )
    }));

    showNotification(`${lift.charAt(0).toUpperCase() + lift.slice(1)} attempt ${round} submitted: ${weight}kg`);
    setShowConfirmDialog(false);
    setPendingSubmission(null);
  };

  // Sort leaderboard
  const sortedLeaderboard = React.useMemo(() => {
    return [...leaderboard].sort((a, b) => {
      if (sortConfig.key === 'rank') return a.rank - b.rank;
      if (sortConfig.key === 'name') return a.name.localeCompare(b.name);
      if (sortConfig.key === 'total') return sortConfig.direction === 'asc' ? a.total - b.total : b.total - a.total;
      if (sortConfig.key === 'glPoints') return sortConfig.direction === 'asc' ? a.glPoints - b.glPoints : b.glPoints - a.glPoints;
      return 0;
    });
  }, [leaderboard, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status: AttemptStatus, result: AttemptResult) => {
    if (status === 'submitted') return result === 'success' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300';
    if (status === 'pending') return 'bg-yellow-100 border-yellow-300';
    return 'bg-white border-gray-300';
  };

  const getStatusIcon = (status: AttemptStatus, result: AttemptResult) => {
    if (status === 'submitted' && result === 'success') return <span className="w-4 h-4 text-green-600 font-bold">✓</span>;
    if (status === 'submitted' && result === 'failed') return <span className="w-4 h-4 text-red-600 font-bold">✗</span>;
    if (status === 'pending') return <span className="w-4 h-4 text-yellow-600">⏰</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <FiCheck className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
            <p className="mb-6">
              Submit {pendingSubmission?.lift} attempt {pendingSubmission?.round}: {pendingSubmission?.weight}kg?
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSubmission}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ATTEMPT SUBMISSION PANEL */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{currentAthlete.name}</h1>
                <p className="text-blue-100">
                  {currentAthlete.weightClass} • {currentAthlete.bodyWeight}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  {isConnected ? (
                    <span className="w-5 h-5 text-green-300">📶</span>
                  ) : (
                    <span className="w-5 h-5 text-red-300">📶</span>
                  )}
                  <span className="text-sm">
                    {isConnected ? 'Connected' : 'Reconnecting...'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5">⏰</span>
                  <span className="text-lg font-mono">
                    {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              {(['squat', 'bench', 'deadlift'] as LiftType[]).map(lift => (
                <button
                  key={lift}
                  onClick={() => setActiveTab(lift)}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === lift 
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {lift.charAt(0).toUpperCase() + lift.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Attempt Boxes */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {attempts[activeTab].map((attempt: Attempt) => (
                <div
                  key={attempt.round}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    getStatusColor(attempt.status, attempt.result)
                  } ${attempt.status === 'pending' ? 'ring-2 ring-yellow-200' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-700">
                      Attempt {attempt.round}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(attempt.status, attempt.result)}
                      {!attempt.locked && attempt.changes > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {attempt.changes} changes
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <input
                      type="number"
                      step="0.5"
                      value={attempt.weight}
                      onChange={(e) => handleWeightChange(activeTab, attempt.round, e.target.value)}
                      disabled={attempt.locked}
                      className={`w-full text-2xl font-bold text-center p-2 border rounded ${
                        attempt.locked 
                          ? 'bg-gray-100 cursor-not-allowed' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                    <p className="text-center text-sm text-gray-500 mt-1">kg</p>
                  </div>

                  <button
                    onClick={() => handleSubmit(activeTab, attempt.round)}
                    disabled={attempt.locked || attempt.status === 'submitted'}
                    className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                      attempt.locked || attempt.status === 'submitted'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : attempt.status === 'pending'
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {attempt.status === 'submitted' ? 'Submitted' : 
                     attempt.status === 'pending' ? 'Update' : 'Submit'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REAL-TIME LEADERBOARD */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Live Leaderboard</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCompactView(!compactView)}
                  className="text-sm bg-purple-500 hover:bg-purple-400 px-3 py-1 rounded"
                >
                  {compactView ? 'Expanded' : 'Compact'}
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-3 text-left font-semibold cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSort('rank')}>
                    <div className="flex items-center gap-1">
                      #
                      {sortConfig.key === 'rank' && (
                        sortConfig.direction === 'asc' ? <span className="w-4 h-4">▲</span> : <span className="w-4 h-4">▼</span>
                      )}
                    </div>
                  </th>
                  <th className="p-3 text-left font-semibold cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      Name
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? <span className="w-4 h-4">▲</span> : <span className="w-4 h-4">▼</span>
                      )}
                    </div>
                  </th>
                  {!compactView && (
                    <>
                      <th className="p-3 text-left font-semibold">Class</th>
                      <th className="p-3 text-left font-semibold">BW</th>
                    </>
                  )}
                  <th className="p-3 text-center font-semibold">S</th>
                  <th className="p-3 text-center font-semibold">B</th>
                  <th className="p-3 text-center font-semibold">D</th>
                  <th className="p-3 text-center font-semibold cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('total')}>
                    <div className="flex items-center justify-center gap-1">
                      Total
                      {sortConfig.key === 'total' && (
                        sortConfig.direction === 'asc' ? <span className="w-4 h-4">▲</span> : <span className="w-4 h-4">▼</span>
                      )}
                    </div>
                  </th>
                  <th className="p-3 text-center font-semibold cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('glPoints')}>
                    <div className="flex items-center justify-center gap-1">
                      GL Pts
                      {sortConfig.key === 'glPoints' && (
                        sortConfig.direction === 'asc' ? <span className="w-4 h-4">▲</span> : <span className="w-4 h-4">▼</span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((athlete: LeaderboardEntry, index: number) => (
                  <tr
                    key={athlete.name}
                    className={`border-b transition-colors ${
                      athlete.isCurrentUser 
                        ? 'bg-blue-50 border-blue-200' 
                        : athlete.recentChange 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{athlete.rank}</span>
                        {athlete.rank === 1 && <span className="w-4 h-4 text-yellow-500">🏆</span>}
                        {athlete.rank === 2 && <span className="w-4 h-4 text-gray-400">🥈</span>}
                        {athlete.rank === 3 && <span className="w-4 h-4 text-amber-600">🥉</span>}
                        {athlete.isRecord && <span className="text-xs bg-red-500 text-white px-1 rounded">WR</span>}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold">{athlete.name}</div>
                      {athlete.isCurrentUser && (
                        <div className="text-xs text-blue-600 font-medium">YOU</div>
                      )}
                    </td>
                    {!compactView && (
                      <>
                        <td className="p-3 text-sm">{athlete.weightClass}</td>
                        <td className="p-3 text-sm">{athlete.bodyWeight}</td>
                      </>
                    )}
                    <td className="p-3 text-center">
                      <div className="font-bold">{athlete.squat.best || '-'}</div>
                      {!compactView && (
                        <div className="text-xs text-gray-500">
                          {athlete.squat.attempts.join(' ')}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="font-bold">{athlete.bench.best || '-'}</div>
                      {!compactView && (
                        <div className="text-xs text-gray-500">
                          {athlete.bench.attempts.join(' ')}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="font-bold">{athlete.deadlift.best || '-'}</div>
                      {!compactView && (
                        <div className="text-xs text-gray-500">
                          {athlete.deadlift.attempts.join(' ')}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center font-bold text-lg">
                      {athlete.total || '-'}
                    </td>
                    <td className="p-3 text-center font-semibold">
                      {athlete.glPoints.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerliftingCompetition;