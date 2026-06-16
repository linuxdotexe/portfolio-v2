import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({ label: 'Published At', validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: false, validation: { isRequired: true } }),
        tags: fields.multiselect({
          label: 'Tags',
          options: [
            { label: 'Tech', value: 'tech' },
            { label: 'Essay', value: 'essay' },
            { label: 'Film', value: 'film' },
            { label: 'Learning', value: 'learning' },
            { label: 'Misc', value: 'misc' },
          ],
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    pursuits: collection({
      label: 'Pursuits',
      slugField: 'title',
      path: 'src/content/pursuits/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'Human description — e.g. "a system that sends you your own thoughts back"',
          validation: { isRequired: true },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Complete', value: 'complete' },
            { label: 'Archived', value: 'archived' },
          ],
          defaultValue: 'active',
        }),
        builtWith: fields.array(
          fields.text({ label: 'Technology' }),
          { label: 'Built With', itemLabel: (props) => props.fields.value.value || 'Technology' }
        ),
        links: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Links', itemLabel: (props) => props.fields.label.value || 'Link' }
        ),
        featuredImage: fields.image({
          label: 'Featured Image',
          directory: 'public/images/pursuits',
          publicPath: '/images/pursuits',
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: 'Home',
      path: 'src/content/home/',
      schema: {
        bio: fields.text({
          label: 'Bio',
          multiline: true,
          description: 'Short about-adjacent paragraph. Not your job title.',
          validation: { isRequired: true },
        }),
        currentlyBuilding: fields.text({ label: 'Currently Building' }),
        currentlyReading: fields.text({ label: 'Currently Reading' }),
        currentlyWatching: fields.text({ label: 'Currently Watching' }),
        currentlyListening: fields.text({ label: 'Currently Listening To' }),
      },
    }),
  },
});
