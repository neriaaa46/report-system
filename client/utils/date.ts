export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return date.toLocaleString("he-IL", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: timeZone
    }).replace(/\./g, '/')
}

export function getTodayDate(): string {
    const today: Date = new Date()
    return today.toISOString()
}