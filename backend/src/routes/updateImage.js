import prisma from '../../prisma/prisma-client.js';
import { create as createLogger } from '../logging.js';

const logger = createLogger('images:update-image');

const updateImageById = async (request, response) => {
  try {
    const imageId = parseInt(request.params.id);
    const { title, description } = request.body;
    const image = await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        title,
        description,
      },
    });

    response.status(200).json(image);
  } catch (error) {
    logger.error('Error updating image by id: ', error);
    response.status(500).json({ errorMessage: `Error updating image by id ${request.params.id}` });
  }
};

export { updateImageById };
