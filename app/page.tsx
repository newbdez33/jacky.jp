import { Hero } from "@/components/hero";
import { GithubContributions } from "@/components/github-contributions";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="container mx-auto">
        <Hero />
        <GithubContributions />
      </div>
    </main>
  );
}
