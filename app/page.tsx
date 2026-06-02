import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main>
      <Hero />
      <div style={{ borderTop: "1px solid var(--border)" }} />
      <Projects />
      <div style={{ borderTop: "1px solid var(--border)" }} />
      <Services />
      <div style={{ borderTop: "1px solid var(--border)" }} />
      <Chat />
      <footer
        className="px-6 md:px-16 py-8 text-xs text-center"
        style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
      >
        Jasiel Nuevo · Buenos Aires · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
