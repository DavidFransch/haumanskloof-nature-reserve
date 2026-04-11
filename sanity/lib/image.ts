import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '../env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
