const images = [
  { pic: '/images/u1.jpeg', label: 'catpipe' },
  { pic: '/images/u2.jpeg', label: 'pebbles' },
  { pic: '/images/u3.jpeg', label: 'icebear' },
  { pic: '/images/u1.jpeg', label: 'catpipe' },
  { pic: '/images/u2.jpeg', label: 'pebbles' },
  { pic: '/images/u3.jpeg', label: 'icebear' },
  { pic: '/images/u1.jpeg', label: 'catpipe' },
  { pic: '/images/u2.jpeg', label: 'pebbles' },
  { pic: '/images/u3.jpeg', label: 'icebear' }
]
    
const handleScroll = () => {
  const sectionTops = [].map.call(document.getElementsByClassName('mobile-text'), node => node.getBoundingClientRect().top + window.scrollY)
  const sectionBottoms = [].map.call(document.getElementsByClassName('text-block'), node => node.getBoundingClientRect().bottom + window.scrollY)
  const windowPositionOld = window.scrollY + (window.innerHeight / 1.4)
  const windowPosition = window.scrollY + (window.innerHeight / 1.8)
  const aboveOld = sectionBottoms.filter(e => e < windowPosition).length
  const above = sectionTops.filter(e => e < windowPosition).length - 1
  const image = images[above]
  if (document.getElementById('photo').src !== image.pic) {
    document.getElementById('photo').src = image.pic
    document.getElementById('photo').alt = image.label
    document.getElementById('photo-label').textContent = image.label
  }
};
    
window.addEventListener('scroll', handleScroll);