import type { ImageRule } from 'sanity'
import { apiVersion } from '../env'

// Images larger than this trigger a (non-blocking) warning in Studio.
const MAX_IMAGE_SIZE_BYTES = 500 * 1024

export const IMAGE_SIZE_WARNING_MESSAGE =
  'This image is larger than 500 KB. Please compress it using squoosh.app before uploading to keep the site fast. Hero and large landscape images may exceed this limit — aim to keep them under 2–3 MB.'

/**
 * Non-blocking file-size warning for image fields.
 *
 * Fetches the uploaded asset's size via GROQ and warns (does not error, so it
 * never blocks publishing) when it exceeds 500 KB. Only runs once an image has
 * actually been uploaded — empty fields are skipped.
 *
 * Usage:
 *   validation: (Rule) => imageSizeWarning(Rule)
 *   // combine with other rules:
 *   validation: (Rule) => [Rule.required(), imageSizeWarning(Rule)]
 */
export function imageSizeWarning(rule: ImageRule): ImageRule {
  return rule
    .custom(async (value: { asset?: { _ref?: string } } | undefined, context) => {
      const assetRef = value?.asset?._ref
      if (!assetRef) return true

      const client = context.getClient({ apiVersion })
      const size = await client.fetch<number | null>('*[_id == $id][0].size', {
        id: assetRef,
      })

      if (typeof size === 'number' && size > MAX_IMAGE_SIZE_BYTES) {
        return IMAGE_SIZE_WARNING_MESSAGE
      }
      return true
    })
    .warning()
}
