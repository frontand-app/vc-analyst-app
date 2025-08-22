
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Github, Menu, X, User, LogOut, Settings, CreditCard, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Simplified navigation - everything routes to the one VC analyst app
  const navigation = [
    { name: "Home", href: "/" },
    { name: "VC Analyst", href: "/workflow/loop-over-rows?mode=vc-analyst" },
    { name: "Executions", href: "/executions" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">VC Analyst</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/frontand-app/vc-analyst-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm text-gray-900">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-foreground ${
                      isActive(item.href)
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <a
                    href="https://github.com/frontand-app/vc-analyst-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                  
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Simplified Footer */}
      <footer className="border-t bg-secondary mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">VC Analyst</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="https://github.com/frontand-app/vc-analyst-app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                GitHub
              </a>
              <span className="sr-only">© 2025 VC Analyst</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
