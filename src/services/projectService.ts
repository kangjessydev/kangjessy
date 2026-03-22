export interface Project {
  id: string
  client_id: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'review' | 'done'
  progress: number
  price: number
  paid_amount: number
  payment_status: 'pending' | 'partial' | 'paid'
  start_date: string
  deadline: string
  preview_url?: string
  figma_url?: string
  drive_url?: string
  github_url?: string
}

const mockProjects: Project[] = [
  {
      id: "proj-mock",
      client_id: "mock-client-1",
      name: "Mock Project",
      description: "This is a mock project since DB is disabled.",
      status: "in_progress",
      progress: 50,
      price: 15000000,
      paid_amount: 5000000,
      payment_status: "partial",
      start_date: new Date().toISOString().split('T')[0] || '2026-01-01',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '2026-01-01',
  }
];

export const projectService = {
  async getProjectTasks(projectId: string) {
    return [
        { id: 'task-1', project_id: projectId, title: 'Mock Task 1', completed: true, sort_order: 1 },
        { id: 'task-2', project_id: projectId, title: 'Mock Task 2', completed: false, sort_order: 2 }
    ];
  },

  // Ambil proyek spesifik untuk Client Portal
  async getClientProjects(clientId: string) {
    return mockProjects.filter(p => p.client_id === clientId) || mockProjects;
  },

  async getProjectById(projectId: string) {
    if (!projectId) return null;
    return {
        ...mockProjects[0],
        clients: { name: 'John Doe', email: 'john@example.com', budget: '15000000' },
        tasks: await this.getProjectTasks(projectId)
    } as any;
  },

  // Buat proyek baru (saat order masuk)
  async createProject(projectData: any) {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const payload = {
      id: "proj-" + Date.now(),
      name: projectData.name || 'Project Baru',
      client_id: projectData.client_id || 'mock-client-1',
      description: projectData.description || '-',
      status: projectData.status || 'pending',
      progress: projectData.progress || 0,
      price: projectData.price || 0,
      paid_amount: 0,
      payment_status: 'pending',
      start_date: projectData.start_date || today.toISOString().split('T')[0],
      deadline: projectData.deadline || nextWeek.toISOString().split('T')[0],
      preview_url: projectData.preview_url || '-'
    };

    console.warn('Agency is running in hardcoded mode. Returning mock createProject.');
    mockProjects.push(payload as any);
    return {
        ...payload,
        clients: { name: 'Mock Client', email: 'mock@example.com' }
    };
  }
}
