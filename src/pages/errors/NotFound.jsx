import React from 'react';
import { ErrorPage } from './ErrorPage';

export const NotFoundPage = () => (
    <ErrorPage
        error_code={404}
        title="Nie znaleziono strony"
        description="Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona."
    />
);