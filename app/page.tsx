import BeachHouseCalendar from "@/components/beach-house-calendar"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-[2rem] mt-[2rem]">
          <h1 className="text-3xl font-semilight text-center font-nothing text-[5rem] text-[#6CD4FF]">Praia</h1>
          <img src="/assets/gifs/Summer-sun.gif" alt="Sun" className="w-20 h-20" />
        </div>
        <BeachHouseCalendar />
      </div>
    </main>
  )
}
