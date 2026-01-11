import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-6 md:py-8 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You can check these links if you wish to</p>
          <div className="flex gap-2">
            <Button size="sm" asChild className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
              <Link href="https://x.com/newbdez33" target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Link>
            </Button>
            <Button size="sm" asChild className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
              <Link href="https://github.com/newbdez33" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <p>Made with ❤️</p>
          <p>
            © {new Date().getFullYear()} Jacky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
