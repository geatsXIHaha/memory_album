import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
// import { saveDiary } from '../services/diaryService';
import type { DiaryEntry } from '../services/diaryService';
// import { uploadImage, compressImage } from '../services/imageService';
import { FiChevronLeft, FiImage, FiX } from 'react-icons/fi';
import { format } from 'date-fns';
import '../styles/AddEntry.css';

interface LocationState {
  diary?: DiaryEntry;
}

const MOODS = ['😊', '😔', '😍', '😴', '😤', '🤔', '😎', '😘'];

export const AddEntry: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const state = location.state as LocationState | undefined;
  const existingDiary = state?.diary;

  const [date, setDate] = useState(
    existingDiary ? existingDiary.date : format(new Date(), 'yyyy-MM-dd')
  );
  const [content, setContent] = useState(existingDiary?.content || '');
  const [mood, setMood] = useState(existingDiary?.mood || '');
  const [location_name, setLocation] = useState(existingDiary?.location || '');
  const [images, setImages] = useState<string[]>(existingDiary?.images || []);
  const [uploadingImages, setUploadingImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    existingDiary?.images || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError('');
    const newFiles = [...uploadingImages, ...files];
    setUploadingImages(newFiles);

    // 生成预览URL
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrls((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    if (index < uploadingImages.length) {
      setUploadingImages(uploadingImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index - uploadingImages.length));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!content.trim()) {
      setError('请输入日记内容');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 模拟保存到本地存储
      setTimeout(() => {
        try {
          // 获取现有日记
          const stored = localStorage.getItem(`diaries_${user.uid}`);
          const diaries = stored ? JSON.parse(stored) : [];

          if (existingDiary) {
            // 更新现有日记
            const index = diaries.findIndex((d: DiaryEntry) => d.id === existingDiary.id);
            if (index !== -1) {
              diaries[index] = {
                ...existingDiary,
                date,
                content,
                mood,
                location: location_name,
                images: previewUrls,
                updatedAt: Date.now(),
              };
            }
          } else {
            // 添加新日记
            const newDiary: DiaryEntry = {
              id: 'diary_' + Date.now(),
              date,
              content,
              mood,
              location: location_name,
              images: previewUrls,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
            diaries.push(newDiary);
          }

          // 保存到本地存储
          localStorage.setItem(`diaries_${user.uid}`, JSON.stringify(diaries));

          // 显示成功提示
          alert(existingDiary ? '日记已更新!' : '日记已保存!');
          navigate('/diary-list');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : '保存失败';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }, 300);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '保存失败';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="add-entry-container">
      <div className="add-entry-header">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          title="返回"
        >
          <FiChevronLeft size={24} />
        </button>
        <h1>{existingDiary ? '编辑日记' : '写日记'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="add-entry-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <label htmlFor="date">日期</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-section">
          <label>心情</label>
          <div className="mood-selector">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                className={`mood-button ${mood === m ? 'active' : ''}`}
                onClick={() => setMood(m)}
                title={m}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="location">位置 (可选)</label>
          <input
            id="location"
            type="text"
            value={location_name}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="例如: 家里, 公园, 咖啡店"
          />
        </div>

        <div className="form-section">
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你们的故事..."
            rows={8}
            required
          />
          <div className="char-count">{content.length} / 10000</div>
        </div>

        <div className="form-section">
          <label>图片 ({previewUrls.length})</label>
          <div className="image-upload">
            <label className="upload-button">
              <FiImage size={20} />
              <span>添加图片</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                disabled={loading}
              />
            </label>
          </div>

          {previewUrls.length > 0 && (
            <div className="image-preview">
              {previewUrls.map((url, index) => (
                <div key={index} className="preview-item">
                  <img src={url} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            取消
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? '保存中...' : existingDiary ? '更新日记' : '保存日记'}
          </button>
        </div>
      </form>
    </div>
  );
};
