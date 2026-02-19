export const createWhatsappUrl = (message: string) => {
    const phone = import.meta.env.VITE_PHONE
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = `Hola, quiero adquirir una cuenta en finansas MDD.
Mi nombre es ...`;