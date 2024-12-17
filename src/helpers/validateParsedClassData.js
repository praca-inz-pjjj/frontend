
const validateChildData = (row) => {
    if (!row.hasOwnProperty("Imię")) {
        return { error: "Brak kolumny 'Imię'" };
    }
    if (!row.hasOwnProperty("Nazwisko")) {
        return { error: "Brak kolumny 'Nazwisko'" };
    }
    if (!row.hasOwnProperty("Data urodzenia")) {
        return { error: "Brak kolmny 'Data urodzenia'" };
    }
    if (!/^\d{2}.\d{2}.\d{4}$/.test(row["Data urodzenia"])) {
        return { error: "Nieprawidłowy format daty urodzenia" };
    }
}

export const validateParsedChildrenData = (parsedData) => {
    if (!parsedData.length) {
        return { error: "Plik jest pusty" };
    }
    if (parsedData.length > 50) {
        return { error: "Plik może zawierać maksymalnie 50 wierszy" };
    }
    for (const row of parsedData) {
        const validationResult = validateChildData(row);
        if (validationResult?.error) {
            return validationResult;
        }
    }
    return { data: parsedData };
}
