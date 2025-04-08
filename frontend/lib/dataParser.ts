export function parseDate(isoDate: string): string {
    const now = new Date();
    const date = new Date(isoDate);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const periods = [
        { name: ["рік", "роки", "років"], seconds: 31536000 },
        { name: ["місяць", "місяці", "місяців"], seconds: 2592000 },
        { name: ["день", "дні", "днів"], seconds: 86400 },
        { name: ["година", "години", "годин"], seconds: 3600 },
        { name: ["хвилина", "хвилини", "хвилин"], seconds: 60 },
        { name: ["секунда", "секунди", "секунд"], seconds: 1 }
    ];

    for (const period of periods) {
        const value = Math.floor(diffInSeconds / period.seconds);
        if (value >= 1) {
            let form;
            if (value % 10 === 1 && value % 100 !== 11) form = 0;
            else if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) form = 1;
            else form = 2; // 0, 5-20, 25-30, ...
            return `${value} ${period.name[form]} тому`;
        }
    }

    return "щойно";
}