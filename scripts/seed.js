import { PrismaClient } from '@prisma/client';
import { fr, Faker } from '@faker-js/faker';

export const faker = new Faker({
  locale: [fr],
});

const prisma = new PrismaClient();

async function main() {
    // Create multiple tags
    const tagNames = ['fresh', 'meals', 'ideas'];
    
    // Use Prisma's createMany method to insert the tags into the database
    // Maps over tagNames array to format the data for the creation query
    const createdTags = await prisma.tag.createMany({
        data: tagNames.map(name => ({ name })),
    });

    // Fetch all tags from the database after creation
    const allTags = await prisma.tag.findMany();

    // Prepare an empty array to store article data
    const articles = [];

    // Create 10 articles
    for (let i = 1; i <= 10; i++) {
        // Randomly shuffle the fetched tags and select a random subset for the article
        const articleTags = allTags
            .sort(() => 0.5 - Math.random()) // Shuffle array using a random comparator
            .slice(0, Math.floor(Math.random() * allTags.length) + 1); // Select a random number of tags

        // Create a new article in the database
        const article = await prisma.article.create({
            data: {
                title: `Article Title ${i}`,  // Set title using current index
                text: `This is the text for article ${i}.`,  // Create dummy article text
                slug: `article-title-${i}`,  // Generate a URL-friendly slug for the article
                createdAt: new Date(),  // Set creation date to current time
                tags: {
                    create: articleTags.map(tag => ({
                        // For each selected tag, create a tag connection for the article
                        tag: {
                            connect: { id: tag.id }  // Connect tag by its ID
                        }
                    }))
                }
            }
        });

        // For each article, create 5 comments
        for (let j = 1; j <= 5; j++) {
            await prisma.comment.create({
                data: {
                    text: `This is comment ${j} for article ${i}.`,  // Create dummy comment text
                    articleId: article.id,  // Link the comment to the current article by its ID
                    userId: `user${j}`,  // Assign a dummy user ID for simplicity
                    createdAt: new Date(),  // Set comment creation date to current time
                },
            });
        }
    }

    console.log('Seeding completed.');  // Log success message after seeding
}

main()

// Error handling: Catch and log any error that occurs during the execution of `main`
.catch(e => {
    console.error(e);  // Log the error
    process.exit(1);  // Exit the process with an error code (1 indicates failure)
})

// Finally block ensures Prisma client disconnects from the database
.finally(async () => {
    await prisma.$disconnect();  // Close the connection to the database
});