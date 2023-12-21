import { useEffect, useState } from 'react';
import { DiaryEntry } from '../types';
import { getAll } from '../services/diaryService';
import NewDiaryForm from './NewDiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  const concatDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <>
      <div>
        <NewDiaryForm concatDiary={concatDiary} />
        <h2>Diary entries</h2>
        {diaries.map((diary) => {
          return (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.weather}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
