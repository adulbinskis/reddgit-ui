export function formatDate(dateString: Date, format: string): string {

    if(dateString === undefined) return '';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: format.includes('yyyy') ? 'numeric' : undefined,
        month: format.includes('MM') ? '2-digit' : undefined,
        day: format.includes('dd') ? '2-digit' : undefined,
        hour: format.includes('HH') ? '2-digit' : undefined,
        minute: format.includes('mm') ? '2-digit' : undefined,
        second: format.includes('ss') ? '2-digit' : undefined,
        timeZoneName: format.includes('zzz') ? 'short' : undefined
    };

    return date.toLocaleString('en-US', options);
}