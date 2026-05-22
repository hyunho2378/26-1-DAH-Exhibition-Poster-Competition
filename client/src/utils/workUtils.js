export function getWorkById(works, id) {
  return works.find(w => w.id === id) ?? null
}

export function getAdjacentWorks(works, id) {
  const index = works.findIndex(w => w.id === id)
  return {
    prev: index > 0 ? works[index - 1] : null,
    next: index < works.length - 1 ? works[index + 1] : null,
  }
}

export function getAwardWorks(works) {
  return {
    grand:        works.filter(w => w.award === 'grand'),
    excellence:   works.filter(w => w.award === 'excellence'),
    encouragement: works.filter(w => w.award === 'encouragement'),
    none:         works.filter(w => !w.award),
  }
}
