-- Create executions table for tracking workflow runs
CREATE TABLE IF NOT EXISTS public.executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flow_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    inputs JSONB NOT NULL,
    outputs JSONB,
    model_used TEXT DEFAULT 'gemini-2.5-flash',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    credits_used DECIMAL(10,4) DEFAULT 0,
    execution_time_ms INTEGER,
    error_message TEXT,
    scheduled_execution_id UUID,
    is_scheduled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_executions_user_id ON public.executions(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_created_at ON public.executions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_executions_status ON public.executions(status);
CREATE INDEX IF NOT EXISTS idx_executions_flow_id ON public.executions(flow_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies so users can only see their own executions
CREATE POLICY "Users can view their own executions" ON public.executions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own executions" ON public.executions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own executions" ON public.executions
    FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON public.executions TO authenticated;
GRANT ALL ON public.executions TO service_role;
