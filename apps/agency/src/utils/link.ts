export const isExternalLink = (url: string | undefined | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Check for explicit protocols
    if (url.startsWith('http://') || url.startsWith('https://') || url.includes('://')) {
        return true;
    }
    
    // Check for tel, mailto, etc.
    if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('wa.me')) {
        return true;
    }
    
    // Check for domain-like strings that are not internal paths
    // A domain usually has a dot and doesn't start with / or #
    // Also ignore short things that might be filenames like "image.png" if not starting with /
    // but in our context, menu/blueprint links are either /paths or domains.
    if (url.includes('.') && !url.startsWith('/') && !url.startsWith('#') && !url.startsWith('./') && !url.startsWith('../')) {
        return true;
    }
    
    return false;
};

export const ensureProtocol = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('#')) {
        return url;
    }
    // If it's a domain-like string, prepend https://
    if (url.includes('.') && !url.startsWith('/') && !url.startsWith('#')) {
        return `https://${url}`;
    }
    return url;
};
