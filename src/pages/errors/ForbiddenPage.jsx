import React from 'react';
import { ErrorPage } from './ErrorPage';

export const ForbiddenPage = () => (
    <ErrorPage
        error_code={403}
        title="Brak dostępu"
        description="Nie masz uprawnień do uzyskania dostępu do tej strony."
    />
);