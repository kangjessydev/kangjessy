/**
 * Common formatters for the Admin application
 */

/**
 * Maps technical source names to human-readable labels
 */
export function getSourceLabel(source: string | undefined): string {
  if (!source) return "Unknown";
  switch (source) {
    case "web_consultation_wait":
    case "Konsultasi Proposal":
      return "Konsultasi Proposal";
    case "web_consultation_instant":
    case "Konsultasi WhatsApp":
      return "Konsultasi WhatsApp";
    case "contact_form":
      return "Form Kontak (Lama)";
    case "order_form":
      return "Pesanan Produk";
    case "order_whatsapp":
      return "Pesanan via WA";
    default:
      return source;
  }
}

/**
 * Returns CSS classes for source badges based on the source name
 */
export function getSourceClass(source: string | undefined): string {
  if (!source) return "bg-slate-100 text-slate-500 border-slate-200";
  const normalized = source.toLowerCase();
  
  // Proposal - Elegant Blue/Violet
  if (normalized.includes("proposal") || normalized.includes("wait")) {
    return "bg-violet-100 text-violet-700 border-violet-200 shadow-sm shadow-violet-500/5";
  }
  
  // WhatsApp - Fresh Green
  if (normalized.includes("whatsapp") || normalized.includes("instant")) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-500/5";
  }
  
  // Order - Professional Amber/Orange
  if (normalized.includes("order") || normalized.includes("pesanan")) {
    return "bg-amber-100 text-amber-700 border-amber-200 shadow-sm shadow-amber-500/5";
  }
  
  return "bg-slate-100 text-slate-600 border-slate-200";
}

/**
 * Formats a currency value in IDR
 */
export function formatCurrency(price: number | string | undefined | null): string {
  const num = typeof price === 'string' ? parseFloat(price) : (price || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

/**
 * Formats a date string to IDR locale
 */
export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
