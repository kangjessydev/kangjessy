import { allFaqs } from './allFaqs';

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// Filter FAQs that are meant for home page and sort by priority if available
export const homeFaq: FAQ[] = allFaqs
  .filter(item => item.placement.includes('home'))
  .sort((a, b) => (b.priority || 0) - (a.priority || 0))
  .map(item => ({
    question: item.question,
    answer: item.answer,
    category: item.category
  }));
