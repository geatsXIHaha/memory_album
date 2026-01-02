import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
// import { getDiaries, deleteDiary } from '../services/diaryService';
import type { DiaryEntry } from '../services/diaryService';
import { FiEdit2, FiTrash2, FiChevronLeft } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import '../styles/DiaryList.css';

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

export const DiaryList: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntry | null>(null);

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
      setLoading(false);
    };

    loadDiaries();
  }, [user]);

  const handleDelete = (id: string) => {
    if (!user || !window.confirm('确定要删除这篇日记吗？')) return;

    try {
      // 从本地存储中删除
      const stored = localStorage.getItem(`diaries_${user.uid}`);
      if (stored) {
        const diaries = JSON.parse(stored);
        const updated = diaries.filter((d: DiaryEntry) => d.id !== id);
        localStorage.setItem(`diaries_${user.uid}`, JSON.stringify(updated));
      }

      setDiaries(diaries.filter((d) => d.id !== id));
      setSelectedDiary(null);
      alert('日记已删除');
    } catch (error) {
      alert('删除失败');
    }
  };

  const handleEdit = (diary: DiaryEntry) => {
    navigate('/add-entry', { state: { diary } });
  };

  const filteredDiaries = searchDate
    ? diaries.filter((d) => d.date.includes(searchDate))
    : diaries;

  return (
    <div className="diary-list-container">
      <div className="diary-list-header">
        <button
          className="back-button"
          onClick={() => navigate('/')}
          title="返回主页"
        >
          <FiChevronLeft size={24} />
        </button>
        <h1>过往日记</h1>
        <div className="search-box">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="搜索日期"
          />
          {searchDate && (
            <button onClick={() => setSearchDate('')} className="clear-search">
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="diary-list-content">
        <div className="diary-list-main">
          {loading ? (
            <div className="loading">加载中...</div>
          ) : filteredDiaries.length === 0 ? (
            <div className="empty-state">
              <p>还没有日记呢</p>
              <button onClick={() => navigate('/add-entry')} className="create-button">
                +创建第一篇日记
              </button>
            </div>
          ) : (
            <ul className="diary-list">
              {filteredDiaries.map((diary) => (
                <li
                  key={diary.id}
                  className={`diary-item ${selectedDiary?.id === diary.id ? 'active' : ''}`}
                  onClick={() => setSelectedDiary(diary)}
                >
                  <div className="diary-item-date">
                    {format(parseISO(diary.date), 'MMM dd', { locale: zhCN })}
                  </div>
                  <div className="diary-item-preview">
                    {diary.mood && <span className="mood-badge">{diary.mood}</span>}
                    <p>{diary.content.substring(0, 50)}...</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedDiary && (
          <div className="diary-detail">
            <div className="detail-header">
              <h2>{format(parseISO(selectedDiary.date), 'yyyy年MM月dd日 EEEE', { locale: zhCN })}</h2>
              {selectedDiary.mood && <span className="mood-badge">{selectedDiary.mood}</span>}
            </div>

            {selectedDiary.location && (
              <div className="detail-location">📍 {selectedDiary.location}</div>
            )}

            <div className="detail-content">
              {selectedDiary.content}
            </div>

            {selectedDiary.images && selectedDiary.images.length > 0 && (
              <div className="detail-images">
                {selectedDiary.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
              </div>
            )}

            <div className="detail-actions">
              <button
                className="action-button edit"
                onClick={() => handleEdit(selectedDiary)}
              >
                <FiEdit2 size={16} /> 编辑
              </button>
              <button
                className="action-button delete"
                onClick={() => handleDelete(selectedDiary.id)}
              >
                <FiTrash2 size={16} /> 删除
              </button>
            </div>

            <div className="detail-meta">
              <small>
                更新于: {format(new Date(selectedDiary.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
