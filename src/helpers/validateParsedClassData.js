
const validateChildData = (row) => {
    if (!row.hasOwnProperty("Imię")) {
        return { error: "Pole 'Imię' jest wymagane." };
    }
    if (!row.hasOwnProperty("Nazwisko")) {
        return { error: "Pole 'Nazwisko' jest wymagane." };
    }
    if (!row.hasOwnProperty("Data urodzenia")) {
        return { error: "Pole 'Data urodzenia' jest wymagane." };
    }
    if (!row["Imię"]) {
        return { error: "Pole 'Imię' nie może być puste." };
    }
    if (!row["Nazwisko"]) {
        return { error: "Pole 'Nazwisko' nie może być puste." };
    }
    if (!row["Data urodzenia"]) {
        return { error: "Pole 'Data urodzenia' nie może być puste." };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row["Data urodzenia"])) {
        return { error: "Pole 'Data urodzenia' musi być w formacie RRRR-MM-DD." };
    }
}

export const validateAndMapParsedChildrenData = (parsedData, classroom_id) => {
    if (!parsedData.length) {
        return { error: "Plik jest pusty." };
    }
    if (parsedData.length > 50) {
        return { error: "Plik może zawierać maksymalnie 50 wierszy." };
    }
    for (const row of parsedData) {
        const validationResult = validateChildData(row);
        if (validationResult?.error) {
            return validationResult;
        }
    }
    return { data: parsedData.map(row => ({ first_name: row["Imię"], last_name: row["Nazwisko"], birth_date: row["Data urodzenia"], classroom: classroom_id })) };
}
