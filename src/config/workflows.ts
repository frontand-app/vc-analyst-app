import { WorkflowConfig } from '@/components/WorkflowBase';
import { BarChart3 } from 'lucide-react';

// VC Analyst - Only Loop Over Rows workflow
export const workflows: Record<string, WorkflowConfig> = {
  'loop-over-rows': {
    id: 'loop-over-rows',
    title: 'VC Analyst - Loop Over Rows',
    description: 'AI-powered analysis for venture capital research and startup evaluation',
    icon: BarChart3,
    color: 'blue',
    status: 'live',
    category: 'VC Research',
    
    inputs: [
      {
        id: 'csv_data',
        label: 'Startup Data (CSV)',
        type: 'csv',
        placeholder: 'Company,Website,Industry,Funding\nTechCorp,techcorp.com,SaaS,$2M',
        required: true,
        helpText: 'Upload your startup/company data with headers'
      },
      {
        id: 'prompt',
        label: 'VC Analysis Instructions',
        type: 'textarea',
        placeholder: 'Analyze each startup and provide: Investment Score (1-10), Market Size, Competitive Position, and Investment Recommendation.',
        required: true,
        helpText: 'Tell the AI what VC analysis to perform on each startup'
      }
    ],
    
    templates: [
      {
        id: 'investment-scoring',
        title: 'Investment Scoring',
        description: 'Score startups for investment potential',
        prompt: 'Analyze each startup and provide: Investment Score (1-10), Market Size (Small/Medium/Large), Competitive Advantage, Team Quality, and Investment Recommendation (Pass/Consider/Strong Interest).',
        sampleData: {
          csv_data: `Company,Website,Industry,Stage
TechCorp,techcorp.com,SaaS,Series A
AI Startup,aistartup.io,AI/ML,Seed
FinTech Co,fintech.com,Fintech,Series B`
        }
      },
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        description: 'Analyze market positioning and opportunities',
        prompt: 'Analyze each company and provide: Market Size, TAM/SAM analysis, Competitive Landscape, Growth Potential, and Market Risk Assessment.'
      },
      {
        id: 'due-diligence',
        title: 'Due Diligence',
        description: 'Comprehensive due diligence analysis',
        prompt: 'Perform due diligence analysis: Business Model Viability, Revenue Streams, Key Risks, Team Assessment, and Overall Investment Grade (A/B/C/D).'
      }
    ],
    
    endpoint: 'https://scaile--loop-over-rows-fastapi-app.modal.run/process',
    supportsGoogleSearch: true,
    supportsTestMode: true,

    // VC Analyst mode is the default and only mode
    modes: [
      { id: 'vc-analyst', label: 'VC Analyst' }
    ],
    defaultModeId: 'vc-analyst',
    
    estimatedTime: {
      base: 15,
      perItem: 5,
      withSearch: 8
    },
    
    outputType: 'table',
    downloadable: true,
    
    visualExplanation: {
      title: 'How VC Analysis Works',
      overview: 'Upload startup data and let AI perform comprehensive venture capital analysis on each company. Perfect for deal flow analysis, investment scoring, and market research.',
      estimatedTime: '2-10 minutes',
      complexity: 'easy',
      steps: [
        {
          step: 1,
          title: 'Upload Startup Data',
          description: 'Upload CSV with startup information you want to analyze',
          icon: 'upload',
          type: 'input',
          example: 'startup_pipeline.csv with columns: company_name, website, industry, funding_stage',
          details: 'Include any data you have: websites, funding info, team details, metrics'
        },
        {
          step: 2,
          title: 'Define VC Analysis',
          description: 'Tell the AI what investment analysis to perform',
          icon: 'settings',
          type: 'config',
          example: '"Analyze investment potential, market size, competitive position, and provide investment recommendation"',
          details: 'Be specific about what VC metrics and insights you want for each startup'
        },
        {
          step: 3,
          title: 'AI VC Analysis',
          description: 'Advanced AI performs comprehensive analysis on each startup',
          icon: 'cpu',
          type: 'processing',
          example: 'TechCorp → "Score: 8/10, Large TAM, Strong team, Recommend: Strong Interest"',
          details: 'AI analyzes business model, market, team, competition, and investment potential'
        },
        {
          step: 4,
          title: 'Investment Report',
          description: 'Download detailed VC analysis report for your deal flow',
          icon: 'download',
          type: 'output',
          example: 'Original data + Investment_Score, Market_Analysis, Risk_Assessment, Recommendation',
          details: 'Comprehensive report ready for investment committee review'
        }
      ],
      useCases: [
        'Deal flow analysis and scoring',
        'Market opportunity assessment',
        'Competitive landscape analysis',
        'Investment committee preparation',
        'Portfolio company evaluation',
        'Due diligence automation'
      ],
      tips: [
        'Include as much startup data as possible for better analysis',
        'Use specific VC terminology in your prompts',
        'Start with a small batch to refine your analysis criteria',
        'Consider market context in your analysis instructions'
      ]
    }
  }
};

// Helper functions
export const getWorkflow = (id: string): WorkflowConfig | undefined => {
  return workflows[id];
};

export const getAllWorkflows = (): WorkflowConfig[] => {
  return [workflows['loop-over-rows']];
};

export const getWorkflowsByStatus = (live: boolean = true): WorkflowConfig[] => {
  return getAllWorkflows().filter(workflow => 
    live ? workflow.status === 'live' : workflow.status === 'coming-soon'
  );
};