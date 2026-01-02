import { database } from '../config/firebase';
import { ref, get, set, remove } from 'firebase/database';

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  images: string[];
  createdAt: number;
  updatedAt: number;
  mood?: string;
  location?: string;
}

// 获取用户的所有日记
export const getDiaries = async (userId: string): Promise<DiaryEntry[]> => {
  try {
    const snapshot = await get(ref(database, `diaries/${userId}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, entry]: [string, any]) => ({
        ...entry,
        id,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting diaries:', error);
    return [];
  }
};

// 获取特定日期的日记
export const getDiaryByDate = async (
  userId: string,
  date: string
): Promise<DiaryEntry | null> => {
  try {
    const snapshot = await get(ref(database, `diaries/${userId}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const entry = Object.entries(data).find(
        ([_, entryData]: [string, any]) => entryData.date === date
      );
      if (entry) {
        const result: DiaryEntry = { ...entry[1] as any, id: entry[0] };
        return result;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting diary:', error);
    return null;
  }
};

// 创建或更新日记
export const saveDiary = async (
  userId: string,
  entry: Omit<DiaryEntry, 'id'>
): Promise<string> => {
  try {
    const existing = await getDiaryByDate(userId, entry.date);
    const entryRef = existing
      ? ref(database, `diaries/${userId}/${existing.id}`)
      : ref(database, `diaries/${userId}/${Date.now()}`);

    const dataToSave = {
      ...entry,
      updatedAt: Date.now(),
    };

    if (!existing) {
      dataToSave.createdAt = Date.now();
    }

    await set(entryRef, dataToSave);
    return existing?.id || `${Date.now()}`;
  } catch (error) {
    console.error('Error saving diary:', error);
    throw error;
  }
};

// 删除日记
export const deleteDiary = async (userId: string, entryId: string) => {
  try {
    await remove(ref(database, `diaries/${userId}/${entryId}`));
  } catch (error) {
    console.error('Error deleting diary:', error);
    throw error;
  }
};

// 获取用户主题设置
export const getUserTheme = async (userId: string) => {
  try {
    const snapshot = await get(ref(database, `users/${userId}/theme`));
    return snapshot.val() || null;
  } catch (error) {
    console.error('Error getting theme:', error);
    return null;
  }
};

// 保存用户主题设置
export const saveUserTheme = async (userId: string, theme: any) => {
  try {
    await set(ref(database, `users/${userId}/theme`), theme);
  } catch (error) {
    console.error('Error saving theme:', error);
    throw error;
  }
};
