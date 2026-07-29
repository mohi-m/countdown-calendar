export type Memory = {
  date: string
  title: string
  note: string
  imageUrl: string
  alt: string
}

export const reunionDate = '2026-08-21T21:00:00-07:00'

const photos = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1400&q=85',
]

const days = [
  ['2026-07-28', 'The first page', 'A little corner of the internet, counting every sunrise until I am with you.'],
  ['2026-07-29', 'That laugh', 'The one I can hear perfectly, even with a whole country between us.'],
  ['2026-07-30', 'Our kind of magic', 'Somehow the ordinary moments with you become the ones I keep forever.'],
  ['2026-07-31', 'July, wrapped', 'One month closer. One month full of calls, stories, and choosing each other.'],
  ['2026-08-01', 'Hello, August', 'This is the month. The distance finally has an expiration date.'],
  ['2026-08-02', 'A favorite frame', 'Replace this with a photo that instantly takes us back.'],
  ['2026-08-03', 'Three little things', 'Your kindness, your curiosity, and the way you make anywhere feel like home.'],
  ['2026-08-04', 'NYC is waiting', 'Every street here has heard about you by now.'],
  ['2026-08-05', 'LA is calling', 'Soon I will trade this screen for your hand in mine.'],
  ['2026-08-06', 'Our soundtrack', 'Add the song we always come back to right here.'],
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

export const memories: Memory[] = days.map(([date, title, note], index) => ({
  date,
  title,
  note,
  imageUrl: photos[index % photos.length],
  alt: `Placeholder for our memory on ${date}`,
}))