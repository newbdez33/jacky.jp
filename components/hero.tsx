

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-0">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-500">
            Hello! I&apos;m Jacky <span className="inline-block hover:animate-wave origin-bottom-right">👋</span>
          </h1>
          
          <p className="text-2xl md:text-4xl font-medium text-muted-foreground leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            I&apos;m a passionate <span className="text-foreground">Full-Stack Developer</span> who also works on <span className="text-foreground">Blockchain</span> and <span className="text-foreground">Finance</span> related projects, and on creating innovative solutions that tackle complex user challenges.
          </p>
        </div>


      </div>
    </section>
  );
}
