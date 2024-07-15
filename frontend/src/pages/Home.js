import '../css/pages/Home.css';
import { ImageGallery } from '../components/ImageGallery';
import { CreateImageDialog } from '../components/dialogs/CreateImageDialog';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllImages } from '../api/images';
import { ErrorHandler } from '../components/ErrorHandler';

const Home = ({ id }) => {
  const [responseError, setResponseError] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [images, setImages] = useState([]);
  const [onImageListChanges, setOnImageListChanges] = useState(false);

  const handleCreate = () => setOpenCreateDialog(true);

  const onFetchAllImages = () => {
    fetchAllImages()
      .then((data) => {
        setImages(data.flat(1));
        setOnImageListChanges(false);
      })
      .catch((_error) => {
        setResponseError({ type: 'error', message: 'Error fetching images' });
      });
  };

  useEffect(() => {
    onImageListChanges && onFetchAllImages();
  }, [onImageListChanges]);

  useEffect(() => {
    onFetchAllImages();
  }, []);

  return (
    <div id={`${id}-main-div`} className='home'>
      <ErrorHandler id={`${id}-error`} error={responseError} showGlobalAlert />
      <CreateImageDialog
        id={`${id}-create-image-dialog`}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        setOnSuccess={setOnImageListChanges}
      />
      <Button id={`${id}-button-add-image`} variant='outlined' onClick={handleCreate}>
        Add Image
      </Button>
      <ImageGallery
        id={`${id}-image-gallery`}
        className='gallery'
        images={images}
        onImageListChanges={onImageListChanges}
        setOnImageListChanges={setOnImageListChanges}
      />
    </div>
  );
};

export default Home;
