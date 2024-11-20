import React from 'react';
import { ErrorPage } from '../../errors/ErrorPage';

export const PermissionConfirmation = () => (
    <ErrorPage
        error_code={201}
        title="Stworzenie permisji udane"
        description="Sprawdź pocztę elektroniczną aby uzyskać kod do weryfikacji dwuetapowej."
    />
);
