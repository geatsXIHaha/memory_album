import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const navigate = useNavigate();
  const { user, loading, setUser, setLoading } = useAuthStore();
  const { loadTheme } = useThemeStore();

  useEffect(() => {
    // 模拟认证状态检查 - 检查本地存储中是否有用户
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);
        loadTheme(user.uid);
      }
      setLoading(false);
    };

    checkAuth();
    
    // 注释掉Firebase认证检查
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);
    //   if (currentUser) {
    //     loadTheme(currentUser.uid);
    //   }
    // });
    // return unsubscribe;
  }, [setUser, setLoading, loadTheme]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return element;
};
