import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
// import { getDiaries } from '../services/diaryService';
import type { DiaryEntry } from '../services/diaryService';
import { FiPlus, FiSettings, FiBook } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import '../styles/Home.css';

// 模拟数据
const MOCK_DIARIES: DiaryEntry[] = [
  {
    id: '1',
    date: format(new Date(), 'yyyy-MM-dd'),
    content: '今天和你一起去公园散步，天气很好，阳光透过树叶撒下来，你笑得很灿烂。希望以后每天都能这样一起走过。',
    mood: '😊',
    location: '中央公园',
    images: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    date: format(new Date(Date.now() - 1000 * 60 * 60 * 24), 'yyyy-MM-dd'),
    content: '一起看了那部电影，你说喜欢里面的情节。我们坐在电影院的爆米花味道里，讨论着剧情。这些小时刻都很珍贵。',
    mood: '😍',
    location: '电影院',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: '3',
    date: format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), 'yyyy-MM-dd'),
    content: '你做的饭菜真的很好吃，虽然你说有点咸，但我觉得刚刚好。能吃到你用心做的饭，是最幸福的事。',
    mood: '😘',
    location: '家里',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: '4',
    date: format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), 'yyyy-MM-dd'),
    content: '下雨天，我们一起看着窗外的雨，你靠在我的肩膀上。时光在这一刻似乎停止了。',
    mood: '😔',
    location: '窗边',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: '5',
    date: format(new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), 'yyyy-MM-dd'),
    content: '你突然说想学做蛋糕，我们一起在厨房里笑闹，面粉撒了一地。虽然最后的蛋糕不是很完美，但这个过程充满了欢乐。',
    mood: '😎',
    location: '厨房',
    images: [],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    streak: 0,
  });

  useEffect(() => {
    if (!user) return;

    const loadDiaries = async () => {
      setLoading(true);
      // 从本地存储加载日记，如果没有则使用模拟数据
      const stored = localStorage.getItem(`diaries_${user.uid}`);
      const data = stored ? JSON.parse(stored) : MOCK_DIARIES;
      const sorted = data.sort(
        (a: DiaryEntry, b: DiaryEntry) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setDiaries(sorted);

      // 计算统计数据
      const now = new Date();
      const thisMonthDiaries = sorted.filter((d: DiaryEntry) => {
        const entryDate = parseISO(d.date);
        return (
          entryDate.getMonth() === now.getMonth() &&
          entryDate.getFullYear() === now.getFullYear()
        );
      });

      // 计算连续打卡天数
      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      
      for (const diary of sorted) {
        const entryDate = parseISO(diary.date);
        entryDate.setHours(0, 0, 0, 0);
        const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0 || daysDiff === 1) {
          streak++;
          currentDate = entryDate;
        } else {
          break;
        }
      }

      setStats({
        total: sorted.length,
        thisMonth: thisMonthDiaries.length,
        streak,
      });

      setLoading(false);
    };

    loadDiaries();
  }, [user]);

  const recentDiaries = diaries.slice(0, 5);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>💑 情侣日记</h1>
          <p>记录我们的故事</p>
        </div>
        <button
          className="settings-btn"
          onClick={() => navigate('/settings')}
          title="设置"
        >
          <FiSettings size={24} />
        </button>
      </header>

      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="home-content">
          {/* 统计卡片 */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">总日记数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.thisMonth}</div>
              <div className="stat-label">本月日记</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.streak}</div>
              <div className="stat-label">连续打卡</div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="quick-actions">
            <button
              className="action-btn primary"
              onClick={() => navigate('/add-entry')}
            >
              <FiPlus size={20} />
              <span>写日记</span>
            </button>
            <button
              className="action-btn secondary"
              onClick={() => navigate('/diary-list')}
            >
              <FiBook size={20} />
              <span>查看日记</span>
            </button>
          </div>

          {/* 最近的日记 */}
          <section className="recent-section">
            <div className="section-header">
              <h2>最近的日记</h2>
              {recentDiaries.length > 0 && (
                <button
                  className="view-all"
                  onClick={() => navigate('/diary-list')}
                >
                  查看全部 →
                </button>
              )}
            </div>

            {recentDiaries.length === 0 ? (
              <div className="empty-state">
                <p>还没有日记呢</p>
                <p className="hint">点击"写日记"开始记录你们的故事吧</p>
              </div>
            ) : (
              <div className="recent-list">
                {recentDiaries.map((diary) => (
                  <div
                    key={diary.id}
                    className="recent-item"
                    onClick={() => navigate('/diary-list', { state: { selectedId: diary.id } })}
                  >
                    <div className="recent-date">
                      {format(parseISO(diary.date), 'MMM dd', { locale: zhCN })}
                    </div>
                    <div className="recent-content">
                      {diary.mood && <span className="mood">{diary.mood}</span>}
                      <p>{diary.content.substring(0, 80)}...</p>
                      {diary.images && diary.images.length > 0 && (
                        <span className="image-badge">📷 {diary.images.length}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 提示信息 */}
          <div className="info-banner">
            <p>💝 坚持记录，让每个美好时刻永远保存</p>
          </div>
        </div>
      )}
    </div>
  );
};
