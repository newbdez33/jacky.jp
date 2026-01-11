import { Hero } from "@/components/hero";
import { GithubContributions } from "@/components/github-contributions";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground pt-12 md:pt-20">
      <div className="container mx-auto">
        <Hero />
        <GithubContributions />
      </div>
    </main>
  );
}
