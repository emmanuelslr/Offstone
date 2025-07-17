export default {
  name: 'homepageSection',
  title: 'Homepage Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'ctaText',
      title: 'Texte du bouton',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'Lien du bouton',
      type: 'url',
    },
  ],
}
