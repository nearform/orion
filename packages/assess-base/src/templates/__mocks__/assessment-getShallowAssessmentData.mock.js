export default {
  assessment_by_pk: {
    id: 159,
    key: 'efqm-2020-advanced',
    name: 'New Assessment Test',
    status: 'in-progress',
    internal: false,
    key_information: {
      overview: 'Key information - facts and figures',
      'management-structure': 'Key information - structure and activities',
      'challenges-and-strategy': 'Key information - challenges and strategy',
      'operations-partners-suppliers':
        'Key information - operations, partners and suppliers',
      'market-offerings-and-customers':
        'Key information - offerings and customers',
    },
    scoring: [],
    owner: { user_groups: [{ group: { id: 23, parent_id: null } }] },
    files: [
      {
        file_name: 'test-upload.rtf',
        file_size: 427,
        s3_key:
          'uploads/assessment/159/ced8bd1f2e3f9a71a9a590b742a4e04e551f8208260390fcf0732ca8a64f9068.rtf',
      },
      {
        file_name: 'test-upload2.rtf',
        file_size: 429,
        s3_key: 'uploads/assessment/159/some-key.rtf',
      },
    ],
  },
}
