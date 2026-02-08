const API_URL = "https://script.google.com/macros/s/AKfycbwUhWeniMS8wY2XaovKP0J49wOeXxsxkZ4PF_MhQANlRxtS0jL4meTC1F72aqSDjQ0T/exec";

export interface TimelineItem {
  title: string;
  date: string;
  status: 'done' | 'current' | 'pending';
}

export interface OrderData {
  orderId: string;
  projectName: string;
  clientName: string;
  status: 'pending' | 'in_progress' | 'review' | 'done';
  progress: number;
  timeline: TimelineItem[];
  links: {
    preview?: string;
    invoice?: string;
  };
}

export const getOrderByID = async (id: string): Promise<OrderData | null> => {
  try {
    const response = await fetch(`${API_URL}?id=${id}`);
    const result = await response.json();

    if (result.success) {
      return result.data;
    }
    return null;
  } catch (e) {
    console.error("API Error", e);
    return null;
  }
};
