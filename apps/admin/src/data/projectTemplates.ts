export interface ProjectTemplate {
  name: string
  description: string
  phases: {
    name: string
    tasks: string[]
  }[]
}

export const projectTemplates: ProjectTemplate[] = [
  {
    name: 'Web Development (Standard)',
    description: 'Complete flow from brief to deployment',
    phases: [
      {
        name: 'BRIEF & PLANNING',
        tasks: ['Requirement Discovery', 'Content & Asset Gathering', 'Sitemap & Information Architecture']
      },
      {
        name: 'UI/UX DESIGN',
        tasks: ['Lo-Fi Wireframing', 'Hi-Fi UI Design', 'Prototype Review', 'Design Revision']
      },
      {
        name: 'DEVELOPMENT',
        tasks: ['Environment Setup', 'Frontend Development', 'Responsive Optimization', 'CMS/Backend Integration']
      },
      {
        name: 'TESTING & LAUNCH',
        tasks: ['Cross-browser Testing', 'Performance Optimization', 'SEO Infrastructure', 'Domain Pointing & SSL']
      }
    ]
  },
  {
    name: 'Brand Identity',
    description: 'Logo and visual branding process',
    phases: [
      {
        name: 'DISCOVERY',
        tasks: ['Brand Questionnaire', 'Market Research', 'Moodboard Creation']
      },
      {
        name: 'CONCEPTING',
        tasks: ['Sketching & Ideation', 'Digital Concept V1', 'Logo Alternatives']
      },
      {
        name: 'REFINEMENT',
        tasks: ['Client Presentation', 'Typography Selection', 'Color System Definition']
      },
      {
        name: 'DELIVERY',
        tasks: ['Final Brand Handbook', 'High-Res Asset Export', 'Social Media Kit']
      }
    ]
  },
  {
    name: 'Basic Task List',
    description: 'Minimum phases for small projects',
    phases: [
      {
        name: 'PREPARATION',
        tasks: ['Finalize Brief']
      },
      {
        name: 'EXECUTION',
        tasks: ['Major Working Phase']
      },
      {
        name: 'DELIVERY',
        tasks: ['Final Submission']
      }
    ]
  }
]
