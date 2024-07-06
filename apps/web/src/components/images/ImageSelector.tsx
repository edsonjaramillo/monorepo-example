'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ImageAsset } from 'db';

import { folders } from 'common';

import { Button, cn } from 'ui';

import { useImageSelector } from '../../context/web.context';
import { clientFetcher } from '../../utils/web.clients';

type ImageSelectorProperties = {
  field: string;
};

export function ImageSelector({ field }: ImageSelectorProperties) {
  const { setValue } = useFormContext();
  const { selectedFolder, setFolder } = useImageSelector();
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const endpoint = `/employee/images/${selectedFolder}`;
      const { data: images, status } = await clientFetcher.get<ImageAsset[]>(endpoint);
      if (status === 'success') {
        setImages(images);
      }
    })();
  }, [selectedFolder]);

  return (
    <div className="rounded border border-grayscale-300 p-4 shadow">
      <div className="mb-8 flex gap-2">
        {folders.map((folder) => (
          <Button
            key={folder}
            type="button"
            color={selectedFolder === folder ? 'success' : 'primary'}
            onClick={() => {
              setFolder(folder);
            }}>
            {folder}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((image) => (
          <div key={image.id} className="flex gap-3">
            <button
              type="button"
              className={cn(
                selectedImage === image.id && 'ring-4 ring-info',
                'relative size-20 overflow-hidden rounded',
              )}
              onClick={() => {
                setSelectedImage(image.id);
                setValue(field, image.id);
              }}>
              <img src={image.url} alt={'helllo'} className="h-full w-full object-cover" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
