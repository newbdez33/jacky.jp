import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="container mx-auto">
        <Hero />
      </div>
    </main>
  );
}
