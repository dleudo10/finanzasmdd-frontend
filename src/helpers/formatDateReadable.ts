export function formatDateReadable(isoString: string): string {
    if (!isoString) return "";

    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";

    const month = new Intl.DateTimeFormat("es", { month: "long" }).format(d);
    const day = d.getDate();

    return `${day} de ${month} de ${d.getFullYear()}`;
}