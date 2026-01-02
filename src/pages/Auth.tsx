import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInAnonymously,
// } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import '../styles/Auth.css';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟认证 - 直接使用模拟用户
    setTimeout(() => {
      try {
        if (!email.trim()) {
          setError('请输入邮箱');
          setLoading(false);
          return;
        }

        if (!isLogin && password !== confirmPassword) {
          setError('密码不一致');
          setLoading(false);
          return;
        }

        // 创建模拟用户对象
        const mockUser = {
          uid: 'mock_user_' + Date.now(),
          email: email,
          displayName: email.split('@')[0],
        };

        // 保存到localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));

        setUser(mockUser as any);
        navigate('/');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '认证失败';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleAnonymousLogin = async () => {
    setError('');
    setLoading(true);
    
    // 模拟匿名登录
    setTimeout(() => {
      try {
        const mockUser = {
          uid: 'anonymous_' + Date.now(),
          email: null,
          displayName: '匿名用户',
        };
        
        // 保存到localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        
        setUser(mockUser as any);
        navigate('/');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '匿名登录失败';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">💑 情侣日记</h1>
        <h2 className="auth-subtitle">{isLogin ? '登录' : '注册'}</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">邮箱</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              disabled={loading}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">确认密码</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请确认密码"
                disabled={loading}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? '处理中...' : isLogin ? '登录' : '注册'}
          </button>
        </form>

        <div className="auth-divider">或</div>

        <button
          className="auth-button anonymous"
          onClick={handleAnonymousLogin}
          disabled={loading}
        >
          {loading ? '处理中...' : '匿名登录'}
        </button>

        <p className="auth-toggle">
          {isLogin ? '没有账号？' : '已有账号？'}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            disabled={loading}
            className="toggle-button"
          >
            {isLogin ? '注册' : '登录'}
          </button>
        </p>
      </div>
    </div>
  );
};
