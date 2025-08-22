
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  PlayCircle,
  BarChart3,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-8">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              AI-Powered VC Analysis
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            VC ANALYST
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Analyze startup data and investment opportunities with AI-powered research workflows. Upload your CSV and get instant insights.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link to="/workflow/loop-over-rows?mode=vc-analyst">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-medium">
                <PlayCircle className="mr-2 w-5 h-5" />
                START ANALYSIS
              </Button>
            </Link>
            <Link to="/workflow/loop-over-rows">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full px-8 py-4 text-lg font-medium"
              >
                TRY FOR FREE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose VC Analyst?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built specifically for venture capital professionals and startup analysts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground">
                AI-powered analysis of startup metrics, market positioning, and investment potential with detailed scoring
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Batch Processing</h3>
              <p className="text-muted-foreground">
                Upload CSV files with hundreds of startups and get comprehensive analysis for your entire pipeline
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Instant Results</h3>
              <p className="text-muted-foreground">
                Get detailed investment recommendations, market analysis, and scoring in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to analyze your startup portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Upload Data</h3>
              <p className="text-muted-foreground">
                Upload your CSV file with startup information - company names, websites, industries, funding data
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Set Analysis</h3>
              <p className="text-muted-foreground">
                Choose your analysis criteria - investment scoring, market analysis, competitive positioning
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Get Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed analysis with investment scores, recommendations, and actionable insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Transform your startup analysis workflow with AI-powered insights.
          </p>
          <Link to="/workflow/loop-over-rows?mode=vc-analyst">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-full"
            >
              <PlayCircle className="mr-2 w-5 h-5" />
              Start VC Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
