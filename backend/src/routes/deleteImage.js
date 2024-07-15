import prisma from '../../prisma/prisma-client.js';
import { create as createLogger } from '../logging.js';

const logger = createLogger('images:delete-image');

const deleteImageById = async (request, response) => {
  try {
    const imageId = parseInt(request.params.id);
    const image = await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    response.status(200).json(image);
  } catch (error) {
    logger.error('Error deleting image by id: ', error);
    response.status(500).json({ errorMessage: `Error deleting image by id ${request.params.id}` });
  }
};

export { deleteImageById };
