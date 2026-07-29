export type Memory = {
  date: string
  title: string
  note: string
  imageUrl?: string
  alt?: string
  videoUrl?: string
}

type MediaConfig = Record<string, {
  fileId: string
  type?: 'image' | 'video'
  alt?: string
}>

export const reunionDate = '2026-08-21T21:00:00-07:00'

function readMediaConfig(): MediaConfig {
  const value = import.meta.env.VITE_MEDIA_CONFIG
  if (!value) return {}

  try {
    return JSON.parse(value) as MediaConfig
  } catch {
    console.error('VITE_MEDIA_CONFIG must be valid JSON.')
    return {}
  }
}

const mediaConfig = readMediaConfig()

function getMedia(date: string): Pick<Memory, 'imageUrl' | 'videoUrl' | 'alt'> {
  const media = mediaConfig[date]
  if (!media?.fileId) return {}

  return {
    imageUrl: `https://drive.google.com/thumbnail?id=${media.fileId}&sz=w1600`,
    videoUrl: media.type === 'video' ? `https://drive.google.com/file/d/${media.fileId}/preview` : undefined,
    alt: media.alt ?? `Memory for ${date}`,
  }
}

const days = [
  ['2026-07-28', 'The first page', 'A little corner of the internet, counting every sunrise until I am with you.'],
  ['2026-07-29', 'Ze Flower', 'Cant wait to see my flower in her full glory. Flower hairrr.. 💮'],
  ['2026-07-30', 'Our kind of magic', 'Somehow the ordinary moments with you become the ones I keep forever.'],
  ['2026-07-31', 'July, wrapped', 'To close out this July, I pulled something out from last july. The best fireworks we have ever seen.'],
  ['2026-08-01', 'Hello, August', 'Starting my second favorite month with sassy Somu. Just look at her 😍'],
  ['2026-08-02', 'Baby', 'Baby Momo say Hiiii.. He would be soo excited to meet you.'],
  ['2026-08-03', 'Goofballzooo', 'That Rooling on the floor launging. Doggo jaisa.'],
  ['2026-08-04', 'And I got influenced', 'Hello there from a fellow goofball. And no I am not changing back.'],
  ['2026-08-05', 'Fun activites', 'Even during tough times, we had a lot of fun. As long as I am with you, there are no tough times.'],
  ['2026-08-06', 'Our soundtrack', 'I want it that wayy....   Damn tho, we looked soo different back then.'],
  ['2026-08-07', 'Two weeks', 'Fourteen more sleeps. We have done harder things than fourteen sleeps.'],
  ['2026-08-08', 'A tiny time capsule', 'A memory of us, saved for exactly today.'],
  ['2026-08-09', 'Sunday softness', 'The slow calls, the comfortable silences, the feeling of being known.'],
  ['2026-08-10', 'Worth every mile', '2,451 miles have nothing on us.'],
  ['2026-08-11', 'Ten days', 'We are close enough to count on both hands now.'],
  ['2026-08-12', 'My favorite notification', 'It has always been your name lighting up my screen.'],
  ['2026-08-13', 'The next chapter', 'There are plans waiting for us that do not need Wi-Fi.'],
  ['2026-08-14', 'One week', 'Seven days until the airport becomes my favorite place.'],
  ['2026-08-15', 'A promise kept', 'Every day apart was also a day we kept moving toward each other.'],
  ['2026-08-16', 'Five days', 'The suitcase is practically packing itself.'],
  ['2026-08-17', 'Almost there', 'Soon “goodnight” will not mean hanging up.'],
  ['2026-08-18', 'Three days', 'Three more sunsets between this moment and us.'],
  ['2026-08-19', 'Two days', 'This time tomorrow, I will be checking everything twice.'],
  ['2026-08-20', 'Tomorrow', 'One last sleep with a continent in the middle.'],
  ['2026-08-21', 'Today', 'No more countdown. Tonight, I am coming home to you.'],
] as const


export const memories: Memory[] = days.map(([date, title, note]) => ({
  date,
  title,
  note,
  ...getMedia(date),
}))