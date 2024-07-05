export const ImagesKeys = {
  bulk(limit: number, offset: number) {
    return `images:bulk:l:${limit}:o:${offset}`;
  },

  byId(id: string) {
    return `images:${id}`;
  },

  byFolder(folder: string) {
    return `images:folder:${folder}`;
  },

  count() {
    return 'images:count';
  },

  onCreate() {
    return ['images:bulk:*', 'images:folder:*'];
  },

  onUpdate() {
    return ['images:bulk:*', 'images:folder:*'];
  },

  onDelete(id: string) {
    return ['images', `images:${id}`, 'images:folder:*'];
  },
};
