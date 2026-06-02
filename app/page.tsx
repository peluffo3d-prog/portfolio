import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <Chat />
      <footer
        style={{ fontFamily: "'Inter', sans-serif", background: "#060606", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        className="px-5 sm:px-8 md:px-12 py-8 flex items-center justify-between"
      >
        <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Jasiel · Buenos Aires · {new Date().getFullYear()}
        </span>
        <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Desarrollador de Software & IA
        </span>
      </footer>
    </main>
  );
}
