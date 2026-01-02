import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { useThemeStore } from '../store/themeStore';
import type { ThemeSettings } from '../store/themeStore';
// import { saveUserTheme } from '../services/diaryService';
import { useAuthStore } from '../store/authStore';
import { FiChevronLeft, FiLogOut } from 'react-icons/fi';
import '../styles/Settings.css';

const PRESET_THEMES = [
  {
    name: '玫瑰粉',
    primaryColor: '#ff6b9d',
    secondaryColor: '#c44569',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    darkMode: false,
  },
  {
    name: '深蓝',
    primaryColor: '#0066cc',
    secondaryColor: '#003d99',
    backgroundColor: '#f0f2f5',
    textColor: '#1a1a1a',
    darkMode: false,
  },
  {
    name: '夜间模式',
    primaryColor: '#ff6b9d',
    secondaryColor: '#c44569',
    backgroundColor: '#1a1a1a',
    textColor: '#e0e0e0',
    darkMode: true,
  },
  {
    name: '薄荷绿',
    primaryColor: '#1abc9c',
    secondaryColor: '#16a085',
    backgroundColor: '#f5fffe',
    textColor: '#2c3e50',
    darkMode: false,
  },
  {
    name: '落日黄',
    primaryColor: '#f39c12',
    secondaryColor: '#e67e22',
    backgroundColor: '#fef5e7',
    textColor: '#34495e',
    darkMode: false,
  },
  {
    name: '深紫',
    primaryColor: '#9b59b6',
    secondaryColor: '#8e44ad',
    backgroundColor: '#ecf0f1',
    textColor: '#2c3e50',
    darkMode: false,
  },
];

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [saving, setSaving] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const applyTheme = (newTheme: Partial<ThemeSettings>) => {
    setTheme(newTheme);
    applyThemeToDOM(newTheme);
  };

  const applyThemeToDOM = (themeColors: Partial<ThemeSettings>) => {
    const root = document.documentElement;
    if (themeColors.primaryColor)
      root.style.setProperty('--color-primary', themeColors.primaryColor);
    if (themeColors.secondaryColor)
      root.style.setProperty('--color-secondary', themeColors.secondaryColor);
    if (themeColors.backgroundColor)
      root.style.setProperty('--color-background', themeColors.backgroundColor);
    if (themeColors.textColor)
      root.style.setProperty('--color-text', themeColors.textColor);
    if (themeColors.darkMode !== undefined) {
      root.style.setProperty(
        '--dark-mode',
        themeColors.darkMode ? '1' : '0'
      );
    }
  };

  const saveTheme = async () => {
    if (!user) return;

    setSaving(true);
    try {
      // 模拟保存到本地存储
      setTimeout(() => {
        localStorage.setItem(`theme_${user.uid}`, JSON.stringify(theme));
        alert('主题保存成功！');
        setSaving(false);
      }, 300);
    } catch (error) {
      alert('保存失败');
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('确定要登出吗？')) {
      try {
        // 模拟登出 - 清除本地存储和用户信息
        localStorage.removeItem('currentUser');
        navigate('/login');
      } catch (error) {
        alert('登出失败');
      }
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button
          className="back-button"
          onClick={() => navigate('/')}
          title="返回主页"
        >
          <FiChevronLeft size={24} />
        </button>
        <h1>设置</h1>
      </div>

      <div className="settings-content">
        {/* 主题预设 */}
        <div className="settings-section">
          <h2>预设主题</h2>
          <div className="theme-grid">
            {PRESET_THEMES.map((preset) => (
              <button
                key={preset.name}
                className="theme-card"
                onClick={() => applyTheme(preset)}
              >
                <div className="theme-preview">
                  <div
                    className="theme-color-primary"
                    style={{ backgroundColor: preset.primaryColor }}
                  ></div>
                  <div
                    className="theme-color-secondary"
                    style={{ backgroundColor: preset.secondaryColor }}
                  ></div>
                </div>
                <p>{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 自定义主题 */}
        <div className="settings-section">
          <div className="section-header">
            <h2>自定义主题</h2>
            <button
              className="toggle-customizer"
              onClick={() => setShowCustomizer(!showCustomizer)}
            >
              {showCustomizer ? '隐藏' : '显示'}
            </button>
          </div>

          {showCustomizer && (
            <div className="customizer">
              <div className="color-picker-group">
                <label htmlFor="primary-color">主要颜色</label>
                <div className="color-input-wrapper">
                  <input
                    id="primary-color"
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => {
                      applyTheme({ primaryColor: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => {
                      applyTheme({ primaryColor: e.target.value });
                    }}
                    placeholder="#ff6b9d"
                  />
                </div>
              </div>

              <div className="color-picker-group">
                <label htmlFor="secondary-color">次要颜色</label>
                <div className="color-input-wrapper">
                  <input
                    id="secondary-color"
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => {
                      applyTheme({ secondaryColor: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={(e) => {
                      applyTheme({ secondaryColor: e.target.value });
                    }}
                    placeholder="#c44569"
                  />
                </div>
              </div>

              <div className="color-picker-group">
                <label htmlFor="bg-color">背景颜色</label>
                <div className="color-input-wrapper">
                  <input
                    id="bg-color"
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => {
                      applyTheme({ backgroundColor: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    value={theme.backgroundColor}
                    onChange={(e) => {
                      applyTheme({ backgroundColor: e.target.value });
                    }}
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div className="color-picker-group">
                <label htmlFor="text-color">文字颜色</label>
                <div className="color-input-wrapper">
                  <input
                    id="text-color"
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => {
                      applyTheme({ textColor: e.target.value });
                    }}
                  />
                  <input
                    type="text"
                    value={theme.textColor}
                    onChange={(e) => {
                      applyTheme({ textColor: e.target.value });
                    }}
                    placeholder="#333333"
                  />
                </div>
              </div>

              <div className="dark-mode-toggle">
                <label htmlFor="dark-mode">深色模式</label>
                <input
                  id="dark-mode"
                  type="checkbox"
                  checked={theme.darkMode}
                  onChange={(e) => {
                    applyTheme({ darkMode: e.target.checked });
                  }}
                />
              </div>

              <button
                className="save-theme-button"
                onClick={saveTheme}
                disabled={saving}
              >
                {saving ? '保存中...' : '保存自定义主题'}
              </button>
            </div>
          )}
        </div>

        {/* 用户信息 */}
        <div className="settings-section user-section">
          <h2>账户信息</h2>
          <div className="user-info">
            <p>
              <strong>邮箱:</strong> {user?.email || '匿名用户'}
            </p>
            <p>
              <strong>用户ID:</strong> {user?.uid?.substring(0, 16)}...
            </p>
          </div>
        </div>

        {/* 登出按钮 */}
        <div className="settings-section">
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <FiLogOut size={18} />
            登出
          </button>
        </div>
      </div>
    </div>
  );
};
