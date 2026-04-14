import HeroSection     from '../components/HomeComponents/HeroSection'
import StackingCards   from '../components/HomeComponents/StackingCards'
import AboutStrip      from '../components/HomeComponents/AboutStrip'
import FullwidthBanner from '../components/HomeComponents/FullwidthBanner'
import ValuesSection   from '../components/HomeComponents/ValuesSection'

export default function Home() {
  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="bg-soul-black text-soul-white"
    >
      <HeroSection />
      <StackingCards />
      <AboutStrip />
      <FullwidthBanner />
      <ValuesSection />
    </main>
  )
}