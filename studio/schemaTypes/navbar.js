export default {
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    {
      name: 'logoSvg',
      title: 'Logo SVG',
      type: 'text',
    },
    {
      name: 'links',
      title: 'Liens',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'href', title: 'Lien', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'buttons',
      title: 'Boutons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'href', title: 'Lien', type: 'string' }
          ]
        }
      ]
    }
  ]
}
