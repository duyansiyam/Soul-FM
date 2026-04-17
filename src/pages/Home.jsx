import HeroSection     from '../components/HomeComponents/HeroSection'
import MeetTheDJs      from '../components/HomeComponents/MeetTheDJs'
import AboutStrip      from '../components/HomeComponents/AboutStrip'
import FullwidthBanner from '../components/HomeComponents/FullwidthBanner'
import ValuesSection   from '../components/HomeComponents/ValuesSection'
import AppBanner       from '../components/HomeComponents/AppBanner'

export default function Home() {
  return (
    <main
      style={{ fontFamily: 'var(--font-body)' }}
      className="bg-soul-black text-soul-white"
    >
      <HeroSection />
      <MeetTheDJs />
      <AppBanner />
      <AboutStrip />
      <FullwidthBanner />
      <ValuesSection />
    </main>
  )
}