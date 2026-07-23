import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <div className="w-full max-w-md card-premium p-8 relative z-10 bg-white/80 backdrop-blur-xl">
        <div className="space-y-2 text-center pb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-glow">
            <span className="text-white font-bold text-3xl font-serif">P</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Login Admin
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Sistem Informasi Desa Pudonggala
          </p>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
