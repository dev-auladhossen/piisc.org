const photo = (filename) => new URL(`../assets/images/${filename}`, import.meta.url).href
export const galleryPhotos = [
  { id: 'reading', category: 'Academics', image: photo('807658670_122168336486964101_987858460138339590_n.jpg'), caption: 'A young reader discovers new stories in the classroom.' },
  { id: 'award', category: 'Events', image: photo('achievement.jpg'), caption: 'A student receives recognition during a school award presentation.' },
  { id: 'sports', category: 'Sports', image: photo('beyond-class.jpg'), caption: 'Students enjoy a game of cricket in the indoor play area.' },
  { id: 'classroom', category: 'Campus', image: photo('689045475_122152959812964101_8935659708127068659_n.jpg'), caption: 'A bright classroom provides space for learning and discovery.' },
  { id: 'friends', category: 'Academics', image: photo('618814465_122140092008964101_7447186655001681018_n.jpg'), caption: 'Classmates share a cheerful moment during classroom activities.' },
  { id: 'projects', category: 'Academics', image: photo('creative-2.jpg'), caption: 'Students proudly display their colourful classroom projects.' },
  { id: 'community', category: 'Events', image: photo('811616765_122168591282964101_4710661168324455192_n.jpg'), caption: 'Students and teachers come together for a school programme.' },
  { id: 'cricket', category: 'Sports', image: photo('797906186_122167339418964101_6759979402932873183_n.jpg'), caption: 'A friendly cricket game gives students a chance to play together.' },
  { id: 'group', category: 'Academics', image: photo('group.jpg'), caption: 'Students explore picture books around a shared classroom table.' },
  { id: 'friendship', category: 'Events', image: photo('funtime.jpg'), caption: 'Classmates celebrate friendship with a playful group photograph.' },
  { id: 'campus-concept', category: 'Campus', image: photo('campus-front.png'), caption: 'School-supplied concept artwork illustrates the PIISC campus vision.' },
  { id: 'campus-view', category: 'Campus', image: photo('campus-view.png'), caption: 'A school-supplied concept visual presents another view of the campus.' },
]
