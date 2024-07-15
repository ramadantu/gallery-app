import prisma from '../../prisma/prisma-client.js';
import { create as createLogger } from '../logging.js';

const logger = createLogger('images:fetch-image');

const fetchImageById = async (request, response) => {
  try {
    const imageId = parseInt(request.params.id);
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });

    response.status(200).json(image);
  } catch (error) {
    logger.error('Error fetching image by id: ', error);
    response.status(500).json({ errorMessage: `Error fetching image by id ${request.params.id}` });
  }
};

const fetchAllImages = async (request, response) => {
  try {
    const pagesOfImages = [];
    let page = await prisma.image.findMany({
      take: 6,
    });
    page.length > 0 && pagesOfImages.push(page);

    for (let i = 0; page.length === 6; i = i + 6) {
      page = await prisma.image.findMany({
        skip: i,
        take: 6,
      });
      pagesOfImages.push(page);
    }

    response.status(200).json(pagesOfImages);
  } catch (error) {
    logger.error('Error fetching all images: ', error);
    response.status(500).json({ errorMessage: `Error fetching all images` });
  }
};

export { fetchImageById, fetchAllImages };
