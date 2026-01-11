
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col px-4 md:px-0 pb-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            Hello! I&apos;m Jacky <span className="inline-block hover:animate-wave origin-bottom-right">👋</span>
          </h1>
          
          <p className="text-lg text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            I&apos;m a passionate <span className="text-foreground">Full-Stack Developer</span> based in <span className="text-foreground">Tokyo</span>, currently focusing on <span className="text-foreground">AI</span>, <span className="text-foreground">Blockchain</span>, and <span className="text-foreground">trading bot</span> projects, creating innovative solutions that tackle complex user challenges.
          </p>
        </div>

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          <p className="text-sm text-muted-foreground">You can check these links if you wish to</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://x.com/newbdez33" target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/newbdez33" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
