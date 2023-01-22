import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleService {
  constructor(private prisma: PrismaService) {}

  /**
   * 1. Creates a User with anto-generated id (for example, 20)
   * 2. Creates two new Post records and sets the authorId of both records to 20
   * @returns user record
   */
  async createUserAndPosts() {
    const userAndPosts = await this.prisma.user.create({
      data: {
        writtenPosts: {
          create: [
            { title: 'Prisma Day 2020' },
            { title: 'How to write a Prisma schema' },
          ],
        },
      },
    });

    return userAndPosts;
  }

  /**
   * 1. Retrieves the User record with an id of 20
   * 2. Retrieves all Post records with an authorId of 20
   * @param id user id
   * @returns user record with all related posts
   */
  async getAuthorAndPosts(id = 20) {
    const authorAndPosts = await this.prisma.user.findUnique({
      where: { id },
      include: { writtenPosts: true },
    });

    return authorAndPosts;
  }

  /**
   * 1. The query first looks for the user with an id of 20
   * 2. The query then sets the authorID foreign key to 20. This links the post
   * with an id of 4 to the user with an id of 20
   * 3. In this query, the current value of authorId does not matter. The query
   * changes authorId to 20, no matter its current value.
   * @param userId userId
   * @param postId postId
   */
  async connectUserWithPost(userId = 20, postId = 4) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        writtenPosts: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }
}
