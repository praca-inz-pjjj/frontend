import React from 'react';
import { ErrorPage } from './ErrorPage';

export const ServerError = () => (
    <ErrorPage 
        error_code={500}
        title="Wewnętrzny błąd serwera"
        description="Coś poszło nie tak po naszej stronie. Spróbuj ponownie później."
    />
)