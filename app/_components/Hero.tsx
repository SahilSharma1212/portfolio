
import HeroText from './HeroText'
import SlotMachine from './SlotMachine'

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-10 pr-14 gap-5 overflow-hidden">
            <div className="flex-1 w-full flex justify-center md:justify-start">
                <HeroText />
            </div>
            <div className="flex-1 w-full flex justify-center md:justify-end">
                <SlotMachine />
            </div>
        </section>
    )
}
