export const ImagesKeys = {
  all() {
    return 'images';
  },

  byId(id: string) {
    return `images:${id}`;
  },

  byFolder(folder: string) {
    return `images:folder:${folder}`;
  },

  onUpdate() {
    return ['images', 'images:folder:*'];
  },

  onDelete(id: string) {
    return ['images', `images:${id}`, 'images:folder:*'];
  },
};
