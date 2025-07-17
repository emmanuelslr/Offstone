export default {
  name: 'keyFigure',
  title: 'Key Figure',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'value',
      title: 'Valeur',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icône',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
