import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="page-404">
      <div className="page-404__header">404</div>
      <div className="page-404__main">Страница не найдена...</div>
      <Link to="/">Перейти на главную страницу</Link>
    </div>
  );
}
