import BeachHouseCalendar from "@/components/beach-house-calendar"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-[3rem] mt-[3rem]">
          <h1 className="text-3xl font-semilight font-color-[#6CD4FF] text-center font-['Nothing_Pena'] text-[5rem]">Praia</h1>
          <img src="/assets/gifs/Summer-sun.gif" alt="Sun" className="w-20 h-20" />
        </div>
        <BeachHouseCalendar />
      </div>
    </main>
  )
}
