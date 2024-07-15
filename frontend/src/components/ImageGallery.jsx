import * as React from 'react';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { EditImageDialog } from './dialogs/EditImageDialog';

export const ImageGallery = ({ id, images, setOnImageListChanges }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [activeImageData, setActiveImageData] = useState({});

  const handleEdit = (image) => {
    setActiveImageData(image);
    setOpenEditDialog(true);
  };

  useEffect(() => {
    console.log('Images: ', images);
  }, [images]);

  return (
    <ImageList id={`${id}-image-list`} sx={{ width: 900, height: 450 }} cols={3}>
      <EditImageDialog
        id={`${id}-edit-image-dialog`}
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        data={activeImageData}
        setOnSuccess={setOnImageListChanges}
      />
      {images.map((image) => (
        <ImageListItem id={`${id}-image-list-item`} key={image.id}>
          <img
            id={`${id}-image-list-item-image`}
            srcSet={`${image.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${image.path}?w=248&fit=crop&auto=format`}
            alt={image.title}
            loading='lazy'
          />
          <ImageListItemBar
            id={`${id}-image-list-item-bar`}
            title={image.title}
            subtitle={image.description}
            actionIcon={
              <IconButton
                id='1'
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${image.title}`}
                onClick={() => handleEdit(image)}
              >
                <EditIcon id='2' />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
