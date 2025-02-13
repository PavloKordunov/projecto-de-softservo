import NavBar from "@/components/Navbar";
import NavPanel from "@/components/NavPanel";

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="flex xl:gap-24 flex-col xl:flex-row">
          <div className="flex justify-center xl:justify-start h-[100%]">
            <NavPanel/>
          </div>
            {children}
        </section>
    );
  }