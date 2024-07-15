import prisma from '../../prisma/prisma-client.js';
import { create as createLogger } from '../logging.js';
import path from 'path';

const logger = createLogger('images:create-image');

const createImage = async (request, response) => {
  try {
    const image = request.file;
    const { title, description } = request.body;
    const createdImage = await prisma.image.create({
      data: {
        title,
        description,
        path: `var/assets/images/${image.originalname}`,
      },
    });

    response.status(200).json(createdImage);
  } catch (error) {
    logger.error('Error creating image: ', error);
    response.status(500).json({ errorMessage: 'Error creating image' });
  }
};

export { createImage };
