import BeachHouseCalendar from "@/components/beach-house-calendar"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light text-sky-900 mb-6 text-center">Praia</h1>
        <BeachHouseCalendar />
      </div>
    </main>
  )
}
