export const toKSTDate = (date: Date | string | null): Date | null => {
    if (!date) return null;

    const utcDate = new Date(date);

    // UTC+9 (한국 시간)으로 변환
    return new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
};